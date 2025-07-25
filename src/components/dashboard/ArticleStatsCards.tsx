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
    totalArticles: number;
    publishedArticles: number;
    draftArticles: number;
    totalViews: number;
    totalLikes: number;
    totalComments: number;
  };
}

export default function ArticleStatsCards({ stats }: ArticleStatsCardsProps) {
  const cards = [
    {
      title: "Total Artikel",
      value: stats.totalArticles,
      icon: DocumentTextIcon,
      color: "indigo",
      bgColor: "bg-indigo-500",
      lightBg: "bg-indigo-50 dark:bg-indigo-900/20",
      textColor: "text-indigo-600 dark:text-indigo-400",
    },
    {
      title: "Dipublikasikan",
      value: stats.publishedArticles,
      icon: CheckCircleIcon,
      color: "green",
      bgColor: "bg-green-500",
      lightBg: "bg-green-50 dark:bg-green-900/20",
      textColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "Draft",
      value: stats.draftArticles,
      icon: DocumentIcon,
      color: "yellow",
      bgColor: "bg-yellow-500",
      lightBg: "bg-yellow-50 dark:bg-yellow-900/20",
      textColor: "text-yellow-600 dark:text-yellow-400",
    },
    {
      title: "Total Views",
      value: stats.totalViews.toLocaleString(),
      icon: EyeIcon,
      color: "blue",
      bgColor: "bg-blue-500",
      lightBg: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Total Likes",
      value: stats.totalLikes.toLocaleString(),
      icon: HeartIcon,
      color: "red",
      bgColor: "bg-red-500",
      lightBg: "bg-red-50 dark:bg-red-900/20",
      textColor: "text-red-600 dark:text-red-400",
    },
    {
      title: "Total Komentar",
      value: stats.totalComments.toLocaleString(),
      icon: ChatBubbleLeftIcon,
      color: "purple",
      bgColor: "bg-purple-500",
      lightBg: "bg-purple-50 dark:bg-purple-900/20",
      textColor: "text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                {card.title}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {card.value}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${card.lightBg}`}>
              <card.icon className={`w-8 h-8 ${card.textColor}`} />
            </div>
          </div>

          {/* Progress bar for published vs draft */}
          {(card.title === "Dipublikasikan" || card.title === "Draft") &&
            stats.totalArticles > 0 && (
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>
                    {Math.round(
                      (parseInt(card.value.toString()) / stats.totalArticles) *
                        100
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${card.bgColor} transition-all duration-300`}
                    style={{
                      width: `${
                        (parseInt(card.value.toString()) /
                          stats.totalArticles) *
                        100
                      }%`,
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
