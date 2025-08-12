"use client";

import { useState, useEffect } from "react";
import AdminProtectedRoute from "@/components/admin/AdminProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import { adminHelpers } from "@/lib/adminHelpers";
import { getCachedSettings, clearSettingsCache } from "@/lib/settingsUtils";
import toast from "react-hot-toast";

export default function SettingsTestPage() {
  const [testResults, setTestResults] = useState<any>({});
  const [running, setRunning] = useState(false);

  const runTests = async () => {
    setRunning(true);
    const results: any = {};

    try {
      // Test 1: Get all settings
      console.log("🧪 Test 1: Getting all settings...");
      const allSettings = await adminHelpers.getAllSettings();
      results.getAllSettings = {
        success: !!allSettings,
        data: allSettings,
        timestamp: new Date().toISOString()
      };

      // Test 2: Get settings by category
      console.log("🧪 Test 2: Getting settings by category...");
      const siteSettings = await adminHelpers.getSettingsByCategory('site');
      results.getSettingsByCategory = {
        success: !!siteSettings,
        data: siteSettings,
        timestamp: new Date().toISOString()
      };

      // Test 3: Update a setting
      console.log("🧪 Test 3: Updating a setting...");
      const updateResult = await adminHelpers.updateSetting('site_name', 'PaberLand Test');
      results.updateSetting = {
        success: updateResult.success,
        data: updateResult,
        timestamp: new Date().toISOString()
      };

      // Test 4: Update multiple settings
      console.log("🧪 Test 4: Updating multiple settings...");
      const multiUpdateResult = await adminHelpers.updateMultipleSettings({
        site_description: 'Test Description',
        max_article_length: 60000
      });
      results.updateMultipleSettings = {
        success: multiUpdateResult.success,
        data: multiUpdateResult,
        timestamp: new Date().toISOString()
      };

      // Test 5: Test cached settings
      console.log("🧪 Test 5: Testing cached settings...");
      const cachedSettings = await getCachedSettings();
      results.cachedSettings = {
        success: !!cachedSettings,
        data: cachedSettings,
        timestamp: new Date().toISOString()
      };

      // Test 6: Clear cache
      console.log("🧪 Test 6: Clearing cache...");
      clearSettingsCache();
      results.clearCache = {
        success: true,
        timestamp: new Date().toISOString()
      };

      // Test 7: Backup functions
      console.log("🧪 Test 7: Testing backup functions...");
      const backupStatus = await adminHelpers.getBackupStatus();
      results.backupStatus = {
        success: backupStatus.success,
        data: backupStatus,
        timestamp: new Date().toISOString()
      };

      // Test 8: Create backup
      console.log("🧪 Test 8: Creating backup...");
      const createBackup = await adminHelpers.createBackup();
      results.createBackup = {
        success: createBackup.success,
        data: createBackup,
        timestamp: new Date().toISOString()
      };

      // Restore original settings
      console.log("🧪 Restoring original settings...");
      await adminHelpers.updateMultipleSettings({
        site_name: 'PaberLand',
        site_description: 'Platform Komunitas Penulis Indonesia',
        max_article_length: 50000
      });

      setTestResults(results);
      toast.success("All tests completed successfully!");

    } catch (error) {
      console.error("Test failed:", error);
      toast.error("Some tests failed. Check console for details.");
    } finally {
      setRunning(false);
    }
  };

  return (
    <AdminProtectedRoute>
      <AdminLayout>
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              🧪 Settings Test Page
            </h1>
            <p className="text-gray-700 mt-1">
              Test all settings functionality
            </p>
          </div>

          <div className="mb-6">
            <button
              onClick={runTests}
              disabled={running}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {running ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Running Tests...
                </div>
              ) : (
                "Run All Tests"
              )}
            </button>
          </div>

          {Object.keys(testResults).length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Test Results</h2>
              
              {Object.entries(testResults).map(([testName, result]: [string, any]) => (
                <div key={testName} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900 capitalize">
                      {testName.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      result.success 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {result.success ? 'PASS' : 'FAIL'}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2">
                    {result.timestamp}
                  </div>
                  
                  {result.data && (
                    <details className="text-sm">
                      <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                        View Details
                      </summary>
                      <pre className="mt-2 p-2 bg-gray-50 rounded text-xs overflow-auto">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </AdminLayout>
    </AdminProtectedRoute>
  );
}
