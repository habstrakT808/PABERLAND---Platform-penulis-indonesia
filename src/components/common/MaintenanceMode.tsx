"use client";

import { useSettings } from "@/contexts/SettingsContext";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

export default function MaintenanceMode() {
  const { settings, loading } = useSettings();

  // Don't show maintenance mode while loading or if maintenance mode is disabled
  if (loading || !settings.maintenanceMode) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-90 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center shadow-2xl">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Cog6ToothIcon className="w-8 h-8 text-yellow-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {settings.siteName}
        </h1>
        
        <div className="text-6xl mb-6">🔧</div>
        
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Sedang Dalam Pemeliharaan
        </h2>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          Kami sedang melakukan pemeliharaan sistem untuk meningkatkan layanan kami. 
          Silakan cek kembali dalam beberapa saat.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Perkiraan waktu selesai:</strong> 1-2 jam
          </p>
        </div>
        
        <div className="mt-6 text-xs text-gray-500">
          Terima kasih atas kesabaran Anda
        </div>
      </div>
    </div>
  );
}
