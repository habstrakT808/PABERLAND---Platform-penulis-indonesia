"use client";

import { useEffect, useRef } from "react";

interface ViewTrackerProps {
  articleId: string;
  articleSlug: string;
}

export default function ViewTracker({
  articleId,
  articleSlug,
}: ViewTrackerProps) {
  const hasIncremented = useRef(false);
  const incrementTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Prevent multiple increments in the same session
    if (hasIncremented.current) {
      console.log(
        `🔄 Client: Views already incremented for article: ${articleId}`
      );
      return;
    }

    const incrementViews = async () => {
      try {
        console.log(`🔄 Client: Incrementing views for article: ${articleId}`);

        const response = await fetch(
          `/api/article/${articleId}/increment-views`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(
            `✅ Client: Views incremented successfully: ${data.views} views`
          );
          hasIncremented.current = true; // Mark as incremented
        } else {
          console.error(
            `❌ Client: Failed to increment views: ${response.status}`
          );
        }
      } catch (error) {
        console.error(`❌ Client: Error incrementing views:`, error);
      }
    };

    // Add debouncing to prevent rapid calls
    if (incrementTimeout.current) {
      clearTimeout(incrementTimeout.current);
    }

    incrementTimeout.current = setTimeout(() => {
      incrementViews();
    }, 500); // Wait 500ms before incrementing

    // Cleanup function
    return () => {
      if (incrementTimeout.current) {
        clearTimeout(incrementTimeout.current);
      }
    };
  }, [articleId]);

  // This component doesn't render anything
  return null;
}
