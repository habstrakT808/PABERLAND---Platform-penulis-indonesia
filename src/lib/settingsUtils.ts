import { adminHelpers } from './adminHelpers';

// Cache settings to avoid repeated database calls
let settingsCache: any = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getCachedSettings() {
  const now = Date.now();
  
  // Return cached settings if still valid
  if (settingsCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return settingsCache;
  }

  // Fetch fresh settings
  try {
    settingsCache = await adminHelpers.getAllSettings();
    cacheTimestamp = now;
    return settingsCache;
  } catch (error) {
    console.error('Error fetching settings:', error);
    return settingsCache || {}; // Return cached settings if available, otherwise empty object
  }
}

export function clearSettingsCache() {
  settingsCache = null;
  cacheTimestamp = 0;
}

// Check if registration is allowed
export async function isRegistrationAllowed(): Promise<boolean> {
  const settings = await getCachedSettings();
  return settings.allow_registration !== false;
}

// Check if maintenance mode is enabled
export async function isMaintenanceMode(): Promise<boolean> {
  const settings = await getCachedSettings();
  return settings.maintenance_mode === true;
}

// Check if email verification is required
export async function isEmailVerificationRequired(): Promise<boolean> {
  const settings = await getCachedSettings();
  return settings.require_email_verification !== false;
}

// Check if articles are auto-approved
export async function isArticleAutoApproved(): Promise<boolean> {
  const settings = await getCachedSettings();
  return settings.auto_approve_articles !== false;
}

// Check if moderation is required
export async function isModerationRequired(): Promise<boolean> {
  const settings = await getCachedSettings();
  return settings.require_moderation === true;
}

// Get maximum article length
export async function getMaxArticleLength(): Promise<number> {
  const settings = await getCachedSettings();
  return settings.max_article_length || 50000;
}

// Check if anonymous comments are allowed
export async function areAnonymousCommentsAllowed(): Promise<boolean> {
  const settings = await getCachedSettings();
  return settings.allow_anonymous_comments === true;
}

// Check if email notifications are enabled
export async function areEmailNotificationsEnabled(): Promise<boolean> {
  const settings = await getCachedSettings();
  return settings.email_notifications !== false;
}

// Check if admin notifications are enabled
export async function areAdminNotificationsEnabled(): Promise<boolean> {
  const settings = await getCachedSettings();
  return settings.admin_notifications !== false;
}

// Check if report notifications are enabled
export async function areReportNotificationsEnabled(): Promise<boolean> {
  const settings = await getCachedSettings();
  return settings.report_notifications !== false;
}

// Check if weekly digest is enabled
export async function isWeeklyDigestEnabled(): Promise<boolean> {
  const settings = await getCachedSettings();
  return settings.weekly_digest !== false;
}

// Get site name
export async function getSiteName(): Promise<string> {
  const settings = await getCachedSettings();
  return settings.site_name || 'PaberLand';
}

// Get site description
export async function getSiteDescription(): Promise<string> {
  const settings = await getCachedSettings();
  return settings.site_description || 'Platform Komunitas Penulis Indonesia';
}

// Apply settings to article creation
export async function applyArticleSettings(articleData: any) {
  const autoApproved = await isArticleAutoApproved();
  const maxLength = await getMaxArticleLength();
  
  return {
    ...articleData,
    published: autoApproved,
    // Add any other article-specific settings here
  };
}

// Apply settings to user registration
export async function applyRegistrationSettings(userData: any) {
  const emailVerificationRequired = await isEmailVerificationRequired();
  
  return {
    ...userData,
    email_verified: !emailVerificationRequired,
    // Add any other registration-specific settings here
  };
}
