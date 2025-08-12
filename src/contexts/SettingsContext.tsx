"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { adminHelpers } from '@/lib/adminHelpers';

interface Settings {
  // Site Settings
  siteName: string;
  siteDescription: string;
  maintenanceMode: boolean;

  // User Settings
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  autoApproveUsers: boolean;

  // Content Settings
  autoApproveArticles: boolean;
  requireModeration: boolean;
  maxArticleLength: number;
  allowAnonymousComments: boolean;

  // Notification Settings
  emailNotifications: boolean;
  adminNotifications: boolean;
  reportNotifications: boolean;
  weeklyDigest: boolean;
}

interface SettingsContextType {
  settings: Settings;
  loading: boolean;
  updateSettings: (newSettings: Partial<Settings>) => Promise<boolean>;
  refreshSettings: () => Promise<void>;
}

const defaultSettings: Settings = {
  // Site Settings
  siteName: "PaberLand",
  siteDescription: "Platform Komunitas Penulis Indonesia",
  maintenanceMode: false,

  // User Settings
  allowRegistration: true,
  requireEmailVerification: true,
  autoApproveUsers: true,

  // Content Settings
  autoApproveArticles: true,
  requireModeration: false,
  maxArticleLength: 50000,
  allowAnonymousComments: false,

  // Notification Settings
  emailNotifications: true,
  adminNotifications: true,
  reportNotifications: true,
  weeklyDigest: true,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const allSettings = await adminHelpers.getAllSettings();
      
      if (allSettings) {
        setSettings({
          // Site Settings
          siteName: allSettings.site_name || defaultSettings.siteName,
          siteDescription: allSettings.site_description || defaultSettings.siteDescription,
          maintenanceMode: allSettings.maintenance_mode || defaultSettings.maintenanceMode,

          // User Settings
          allowRegistration: allSettings.allow_registration !== false,
          requireEmailVerification: allSettings.require_email_verification !== false,
          autoApproveUsers: allSettings.auto_approve_users !== false,

          // Content Settings
          autoApproveArticles: allSettings.auto_approve_articles !== false,
          requireModeration: allSettings.require_moderation || defaultSettings.requireModeration,
          maxArticleLength: allSettings.max_article_length || defaultSettings.maxArticleLength,
          allowAnonymousComments: allSettings.allow_anonymous_comments || defaultSettings.allowAnonymousComments,

          // Notification Settings
          emailNotifications: allSettings.email_notifications !== false,
          adminNotifications: allSettings.admin_notifications !== false,
          reportNotifications: allSettings.report_notifications !== false,
          weeklyDigest: allSettings.weekly_digest !== false,
        });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      // Keep default settings if loading fails
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings: Partial<Settings>): Promise<boolean> => {
    try {
      // Prepare settings for database
      const settingsToUpdate: Record<string, any> = {};
      
      if (newSettings.siteName !== undefined) settingsToUpdate.site_name = newSettings.siteName;
      if (newSettings.siteDescription !== undefined) settingsToUpdate.site_description = newSettings.siteDescription;
      if (newSettings.maintenanceMode !== undefined) settingsToUpdate.maintenance_mode = newSettings.maintenanceMode;
      if (newSettings.allowRegistration !== undefined) settingsToUpdate.allow_registration = newSettings.allowRegistration;
      if (newSettings.requireEmailVerification !== undefined) settingsToUpdate.require_email_verification = newSettings.requireEmailVerification;
      if (newSettings.autoApproveUsers !== undefined) settingsToUpdate.auto_approve_users = newSettings.autoApproveUsers;
      if (newSettings.autoApproveArticles !== undefined) settingsToUpdate.auto_approve_articles = newSettings.autoApproveArticles;
      if (newSettings.requireModeration !== undefined) settingsToUpdate.require_moderation = newSettings.requireModeration;
      if (newSettings.maxArticleLength !== undefined) settingsToUpdate.max_article_length = newSettings.maxArticleLength;
      if (newSettings.allowAnonymousComments !== undefined) settingsToUpdate.allow_anonymous_comments = newSettings.allowAnonymousComments;
      if (newSettings.emailNotifications !== undefined) settingsToUpdate.email_notifications = newSettings.emailNotifications;
      if (newSettings.adminNotifications !== undefined) settingsToUpdate.admin_notifications = newSettings.adminNotifications;
      if (newSettings.reportNotifications !== undefined) settingsToUpdate.report_notifications = newSettings.reportNotifications;
      if (newSettings.weeklyDigest !== undefined) settingsToUpdate.weekly_digest = newSettings.weeklyDigest;

      const result = await adminHelpers.updateMultipleSettings(settingsToUpdate);
      
      if (result.success) {
        // Update local state
        setSettings(prev => ({ ...prev, ...newSettings }));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error updating settings:', error);
      return false;
    }
  };

  const refreshSettings = async () => {
    await loadSettings();
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{
      settings,
      loading,
      updateSettings,
      refreshSettings,
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
