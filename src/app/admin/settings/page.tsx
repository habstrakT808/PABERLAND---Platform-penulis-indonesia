// src/app/admin/settings/page.tsx
"use client";

import { useState, useEffect } from "react";
import AdminProtectedRoute from "@/components/admin/AdminProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Cog6ToothIcon,
  ShieldCheckIcon,
  BellIcon,
  GlobeAltIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

function AdminSettingsContent() {
  const [settings, setSettings] = useState({
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
  });

  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("site");

  const tabs = [
    { id: "site", label: "Site Settings", icon: GlobeAltIcon },
    { id: "users", label: "User Management", icon: UserGroupIcon },
    { id: "content", label: "Content Settings", icon: DocumentTextIcon },
    { id: "notifications", label: "Notifications", icon: BellIcon },
    { id: "security", label: "Security", icon: ShieldCheckIcon },
  ];

  const handleSave = async () => {
    setSaving(true);
    try {
      // Here you would save settings to database
      // For now, we'll simulate the save
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Pengaturan berhasil disimpan!");
    } catch (error) {
      toast.error("Gagal menyimpan pengaturan");
    } finally {
      setSaving(false);
    }
  };

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const renderSiteSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Nama Site
        </label>
        <input
          type="text"
          value={settings.siteName}
          onChange={(e) => handleSettingChange("siteName", e.target.value)}
          className="w-full px-3 py-2 border border-blue-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Deskripsi Site
        </label>
        <textarea
          value={settings.siteDescription}
          onChange={(e) =>
            handleSettingChange("siteDescription", e.target.value)
          }
          rows={3}
          className="w-full px-3 py-2 border border-blue-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div>
          <h4 className="font-medium text-yellow-800">Maintenance Mode</h4>
          <p className="text-sm text-yellow-700">
            Nonaktifkan akses public ke site
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.maintenanceMode}
            onChange={(e) =>
              handleSettingChange("maintenanceMode", e.target.checked)
            }
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
        </label>
      </div>
    </div>
  );

  const renderUserSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-blue-200 rounded-lg bg-blue-50">
          <div>
            <h4 className="font-medium text-gray-900">
              Allow User Registration
            </h4>
            <p className="text-sm text-gray-700">Izinkan user baru mendaftar</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.allowRegistration}
              onChange={(e) =>
                handleSettingChange("allowRegistration", e.target.checked)
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 border border-blue-200 rounded-lg bg-blue-50">
          <div>
            <h4 className="font-medium text-gray-900">
              Require Email Verification
            </h4>
            <p className="text-sm text-gray-700">
              Wajibkan verifikasi email saat registrasi
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.requireEmailVerification}
              onChange={(e) =>
                handleSettingChange(
                  "requireEmailVerification",
                  e.target.checked
                )
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 border border-blue-200 rounded-lg bg-blue-50">
          <div>
            <h4 className="font-medium text-gray-900">
              Auto Approve New Users
            </h4>
            <p className="text-sm text-gray-700">
              Otomatis approve user baru tanpa review manual
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoApproveUsers}
              onChange={(e) =>
                handleSettingChange("autoApproveUsers", e.target.checked)
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderContentSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-blue-200 rounded-lg bg-blue-50">
          <div>
            <h4 className="font-medium text-gray-900">Auto Approve Articles</h4>
            <p className="text-sm text-gray-700">
              Otomatis publish konten tanpa review manual
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoApproveArticles}
              onChange={(e) =>
                handleSettingChange("autoApproveArticles", e.target.checked)
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Maximum Article Length (characters)
          </label>
          <input
            type="number"
            value={settings.maxArticleLength}
            onChange={(e) =>
              handleSettingChange("maxArticleLength", parseInt(e.target.value))
            }
            min="1000"
            max="100000"
            className="w-full px-3 py-2 border border-blue-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center justify-between p-4 border border-blue-200 rounded-lg bg-blue-50">
          <div>
            <h4 className="font-medium text-gray-900">
              Allow Anonymous Comments
            </h4>
            <p className="text-sm text-gray-700">
              Izinkan komentar tanpa login
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.allowAnonymousComments}
              onChange={(e) =>
                handleSettingChange("allowAnonymousComments", e.target.checked)
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-blue-200 rounded-lg bg-blue-50">
          <div>
            <h4 className="font-medium text-gray-900">Email Notifications</h4>
            <p className="text-sm text-gray-700">
              Kirim notifikasi via email ke users
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) =>
                handleSettingChange("emailNotifications", e.target.checked)
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 border border-blue-200 rounded-lg bg-blue-50">
          <div>
            <h4 className="font-medium text-gray-900">Admin Notifications</h4>
            <p className="text-sm text-gray-700">
              Notifikasi untuk aktivitas admin
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.adminNotifications}
              onChange={(e) =>
                handleSettingChange("adminNotifications", e.target.checked)
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 border border-blue-200 rounded-lg bg-blue-50">
          <div>
            <h4 className="font-medium text-gray-900">Report Notifications</h4>
            <p className="text-sm text-gray-700">
              Notifikasi untuk laporan konten baru
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.reportNotifications}
              onChange={(e) =>
                handleSettingChange("reportNotifications", e.target.checked)
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 border border-blue-200 rounded-lg bg-blue-50">
          <div>
            <h4 className="font-medium text-gray-900">Weekly Digest</h4>
            <p className="text-sm text-gray-700">
              Ringkasan mingguan aktivitas platform
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.weeklyDigest}
              onChange={(e) =>
                handleSettingChange("weeklyDigest", e.target.checked)
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <ExclamationTriangleIcon className="w-6 h-6 text-red-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-red-800 mb-2">Security Settings</h4>
            <p className="text-sm text-red-700 mb-4">
              Pengaturan keamanan platform. Berhati-hati dalam mengubah
              pengaturan ini.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-red-700">
                  Rate Limiting Enabled
                </span>
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-red-700">HTTPS Enforced</span>
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-red-700">
                  SQL Injection Protection
                </span>
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-red-700">XSS Protection</span>
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 mb-2">Backup & Recovery</h4>
        <p className="text-sm text-blue-700 mb-3">
          Database backup otomatis setiap hari pada pukul 02:00 WIB
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Download Latest Backup
        </button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "site":
        return renderSiteSettings();
      case "users":
        return renderUserSettings();
      case "content":
        return renderContentSettings();
      case "notifications":
        return renderNotificationSettings();
      case "security":
        return renderSecuritySettings();
      default:
        return renderSiteSettings();
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black">
              ⚙️ Pengaturan Admin
            </h1>
            <p className="text-gray-700 mt-1">
              Konfigurasi dan pengaturan platform PaberLand
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {saving ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Menyimpan...
              </div>
            ) : (
              "Simpan Pengaturan"
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-700 hover:bg-blue-50"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white/95 rounded-xl shadow-sm p-6 border border-blue-100">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {tabs.find((tab) => tab.id === activeTab)?.label}
              </h2>
            </div>

            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminSettingsPage() {
  return (
    <AdminProtectedRoute>
      <AdminLayout>
        <AdminSettingsContent />
      </AdminLayout>
    </AdminProtectedRoute>
  );
}
