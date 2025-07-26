"use client";

import {
  DocumentTextIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  CheckCircleIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";

interface ArticleStatsCardsProps {
  stats: {
    totalArticles?: number;
    publishedArticles?: number;
    draftArticles?: number;
    totalViews?: number;
    totalLikes?: number;
    totalComments?: number;
  };
}

export default function ArticleStatsCards({ stats }: ArticleStatsCardsProps) {
  // Destructure stats with default values to prevent undefined errors
  const {
    totalArticles = 0,
    publishedArticles = 0,
    draftArticles = 0,
    totalViews = 0,
    totalLikes = 0,
    totalComments = 0,
  } = stats;

  // Helper function to safely format numbers
  const formatNumber = (value: number | undefined | null): string => {
    if (value === undefined || value === null) return "0";
    return value.toLocaleString();
  };

  const cards = [
    {
      title: "Total Konten",
      value: totalArticles,
      icon: DocumentTextIcon,
      color: "blue",
      bgColor: "bg-blue-500",
      lightBg: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Dipublikasikan",
      value: publishedArticles,
      icon: CheckCircleIcon,
      color: "blue",
      bgColor: "bg-blue-500",
      lightBg: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Draft",
      value: draftArticles,
      icon: DocumentIcon,
      color: "blue",
      bgColor: "bg-blue-500",
      lightBg: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Total Views",
      value: formatNumber(totalViews),
      icon: EyeIcon,
      color: "blue",
      bgColor: "bg-blue-500",
      lightBg: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Total Likes",
      value: formatNumber(totalLikes),
      icon: HeartIcon,
      color: "blue",
      bgColor: "bg-blue-500",
      lightBg: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Total Komentar",
      value: formatNumber(totalComments),
      icon: ChatBubbleLeftIcon,
      color: "blue",
      bgColor: "bg-blue-500",
      lightBg: "bg-blue-50",
      textColor: "text-blue-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white/95 rounded-lg shadow-lg p-6 border border-blue-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">
                {card.title}
              </p>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${card.lightBg}`}>
              <card.icon className={`w-8 h-8 ${card.textColor}`} />
            </div>
          </div>

          {/* Progress bar for published vs draft */}
          {(card.title === "Dipublikasikan" || card.title === "Draft") &&
            totalArticles > 0 && (
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>
                    {Math.round(
                      (parseInt(card.value.toString()) / totalArticles) * 100
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${card.bgColor} transition-all duration-300`}
                    style={{
                      width: `${Math.min(
                        (parseInt(card.value.toString()) / totalArticles) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            )}
        </div>
      ))}
    </div>
  );
}
