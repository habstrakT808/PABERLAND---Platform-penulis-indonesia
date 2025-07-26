"use client";

import { useState, useEffect } from "react";
import { getSignedImageUrl, supabase } from "@/lib/supabase";

interface SignedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  onError?: () => void;
}

export default function SignedImage({
  src,
  alt,
  className = "",
  fallbackSrc,
  onError,
}: SignedImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      if (!src) {
        setIsLoading(false);
        return;
      }

      try {
        console.log("SignedImage: Loading image with src:", src);

        // If it's already a full URL (signed or public), use it directly
        if (src.startsWith("http")) {
          console.log("SignedImage: Using direct URL");

          // Check if it's a valid image URL (not Google search URL, etc.)
          if (
            src.includes("google.com/url") ||
            src.includes("googleusercontent.com")
          ) {
            console.error("SignedImage: Invalid Google URL detected:", src);
            setHasError(true);
            setIsLoading(false);
            return;
          }

          setImageUrl(src);
          setIsLoading(false);
          return;
        }

        // For file paths, try public URL first
        console.log("SignedImage: Trying public URL for path:", src);
        const { data: publicData } = supabase.storage
          .from("images")
          .getPublicUrl(src);

        if (publicData?.publicUrl) {
          console.log("SignedImage: Using public URL:", publicData.publicUrl);
          setImageUrl(publicData.publicUrl);
          setIsLoading(false);
          return;
        }

        // Fallback to signed URL if public fails
        console.log("SignedImage: Trying signed URL for path:", src);
        const signedUrl = await getSignedImageUrl(src);
        if (signedUrl) {
          console.log("SignedImage: Got signed URL successfully");
          setImageUrl(signedUrl);
        } else {
          console.error("SignedImage: Failed to get any URL for path:", src);
          setHasError(true);
        }
      } catch (error) {
        console.error("SignedImage: Error loading image:", error);
        console.error("SignedImage: Source was:", src);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [src]);

  if (isLoading) {
    return (
      <div className={`animate-pulse bg-gray-200 ${className}`}>
        <div className="w-full h-full bg-gray-300 rounded"></div>
      </div>
    );
  }

  if (hasError || !imageUrl) {
    if (fallbackSrc) {
      return (
        <img
          src={fallbackSrc}
          alt={alt}
          className={className}
          onError={onError}
        />
      );
    }
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
      >
        <span className="text-gray-500 text-sm">Image not available</span>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      onError={() => {
        console.error("SignedImage: Image failed to load:", imageUrl);
        setHasError(true);
        onError?.();
      }}
    />
  );
}
