const fs = require('fs');
const path = require('path');

// Fungsi untuk menghapus console.log dengan lebih aman
function removeConsoleLogs(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Pattern yang lebih aman - hanya menghapus console.log yang lengkap
    const patterns = [
      /console\.log\([^)]*\);\s*\n?/g,
      /console\.error\([^)]*\);\s*\n?/g,
      /console\.warn\([^)]*\);\s*\n?/g,
      /console\.info\([^)]*\);\s*\n?/g,
      /console\.debug\([^)]*\);\s*\n?/g
    ];
    
    patterns.forEach(pattern => {
      content = content.replace(pattern, '');
    });
    
    // Hanya tulis jika ada perubahan dan syntax masih valid
    if (content !== originalContent) {
      // Basic syntax check - pastikan kurung seimbang
      const openBraces = (content.match(/\{/g) || []).length;
      const closeBraces = (content.match(/\}/g) || []).length;
      const openParens = (content.match(/\(/g) || []).length;
      const closeParens = (content.match(/\)/g) || []).length;
      
      if (openBraces === closeBraces && openParens === closeParens) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Cleaned: ${filePath}`);
        return true;
      } else {
        console.log(`⚠️  Skipped (syntax check failed): ${filePath}`);
        return false;
      }
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

console.log('🔄 This script was already run. Skipping to avoid further damage.');
console.log('📝 Manual fixes needed for damaged files.');