// Server-only backup helpers
// This file should only be imported in server components or API routes
// DO NOT import this file in client components

import fs from 'fs';
import path from 'path';

export async function createBackup() {
  try {
    console.log('Creating database backup...');
    
    // Dynamic import of backup script (only works server-side)
    const { createBackup: createBackupScript } = await import('../../../scripts/backup-database.js');
    
    // Execute backup script
    const result = await createBackupScript();
    
    if (result.success) {
      console.log('Backup created successfully:', result.backup.id);
      return {
        success: true,
        backup: {
          id: result.backup.id,
          created_at: result.backup.created_at,
          size: result.backup.size,
          status: 'completed',
          expires_at: result.backup.expires_at
        }
      };
    } else {
      console.error('Backup failed:', result.error);
      return { success: false, error: result.error || 'Failed to create backup' };
    }
  } catch (error: any) {
    console.error('Error creating backup:', error);
    return { success: false, error: error.message || 'Failed to create backup' };
  }
}

export async function getBackupStatus() {
  try {
    const BACKUP_DIR = process.env.BACKUP_DIR || path.join(process.cwd(), 'backups');
    
    // Check if backup directory exists
    if (!fs.existsSync(BACKUP_DIR)) {
      return {
        success: true,
        lastBackup: null,
        message: 'No backups found. Backup directory does not exist.'
      };
    }
    
    // Find all backup files
    const files = fs.readdirSync(BACKUP_DIR);
    const backupFiles = files
      .filter((f: string) => f.startsWith('backup_') && f.endsWith('.sql.gz'))
      .map((f: string) => {
        const filePath = path.join(BACKUP_DIR, f);
        const stats = fs.statSync(filePath);
        return {
          name: f,
          path: filePath,
          size: stats.size,
          modified: stats.mtime
        };
      })
      .sort((a: any, b: any) => b.modified.getTime() - a.modified.getTime()); // Sort by date, newest first
    
    if (backupFiles.length === 0) {
      return {
        success: true,
        lastBackup: null,
        message: 'No backups found.'
      };
    }
    
    // Get latest backup
    const latestBackup = backupFiles[0];
    const sizeMB = (latestBackup.size / 1024 / 1024).toFixed(2);
    
    // Try to read metadata file
    let metadata = null;
    const metadataFile = latestBackup.name.replace('.sql.gz', '.json');
    const metadataPath = path.join(BACKUP_DIR, metadataFile);
    
    if (fs.existsSync(metadataPath)) {
      try {
        metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
      } catch (error) {
        console.error('Error reading metadata file:', error);
      }
    }
    
    // Calculate next scheduled backup (daily at 02:00 WIB)
    const now = new Date();
    const nextBackup = new Date(now);
    nextBackup.setHours(2, 0, 0, 0);
    if (nextBackup <= now) {
      nextBackup.setDate(nextBackup.getDate() + 1);
    }
    
    return {
      success: true,
      lastBackup: {
        id: metadata?.backup_id || latestBackup.name.replace('.sql.gz', ''),
        created_at: latestBackup.modified.toISOString(),
        size: `${sizeMB} MB`,
        size_bytes: latestBackup.size,
        status: 'completed',
        file_name: latestBackup.name,
        expires_at: metadata?.expires_at || null
      },
      totalBackups: backupFiles.length,
      nextScheduled: nextBackup.toISOString(),
      retentionDays: 30
    };
  } catch (error: any) {
    console.error('Error getting backup status:', error);
    return { success: false, error: error.message || 'Failed to get backup status' };
  }
}

export async function listBackups() {
  try {
    const BACKUP_DIR = process.env.BACKUP_DIR || path.join(process.cwd(), 'backups');
    
    if (!fs.existsSync(BACKUP_DIR)) {
      return { success: true, backups: [] };
    }
    
    const files = fs.readdirSync(BACKUP_DIR);
    const backupFiles = files
      .filter((f: string) => f.startsWith('backup_') && f.endsWith('.sql.gz'))
      .map((f: string) => {
        const filePath = path.join(BACKUP_DIR, f);
        const stats = fs.statSync(filePath);
        
        // Try to read metadata
        let metadata = null;
        const metadataFile = f.replace('.sql.gz', '.json');
        const metadataPath = path.join(BACKUP_DIR, metadataFile);
        
        if (fs.existsSync(metadataPath)) {
          try {
            metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
          } catch (error) {
            // Ignore metadata read errors
          }
        }
        
        return {
          id: metadata?.backup_id || f.replace('.sql.gz', ''),
          file_name: f,
          created_at: stats.mtime.toISOString(),
          size: `${(stats.size / 1024 / 1024).toFixed(2)} MB`,
          size_bytes: stats.size,
          status: 'completed',
          expires_at: metadata?.expires_at || null
        };
      })
      .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    
    return {
      success: true,
      backups: backupFiles,
      total: backupFiles.length
    };
  } catch (error: any) {
    console.error('Error listing backups:', error);
    return { success: false, error: error.message || 'Failed to list backups' };
  }
}

