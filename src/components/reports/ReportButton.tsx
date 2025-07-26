// src/components/reports/ReportButton.tsx
"use client";

import { useState } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";
import ReportModal from "./ReportModal";

interface ReportButtonProps {
  contentType: "article" | "comment" | "user";
  contentId: string;
  contentTitle?: string;
  className?: string;
}

export default function ReportButton({
  contentType,
  contentId,
  contentTitle,
  className = "",
}: ReportButtonProps) {
  const { user } = useAuth();
  const [showReportModal, setShowReportModal] = useState(false);

  const handleReportClick = () => {
    if (!user) {
      alert("Silakan login untuk melaporkan konten");
      return;
    }
    setShowReportModal(true);
  };

  return (
    <>
      <button
        onClick={handleReportClick}
        className={`inline-flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors ${className}`}
        title="Laporkan konten ini"
      >
        <ExclamationTriangleIcon className="w-4 h-4" />
        <span className="text-sm">Laporkan</span>
      </button>

      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        contentType={contentType}
        contentId={contentId}
        contentTitle={contentTitle}
      />
    </>
  );
}
