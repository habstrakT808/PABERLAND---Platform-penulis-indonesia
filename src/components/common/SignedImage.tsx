"use client";

import { useState, useEffect } from "react";
import { getSignedImageUrl, supabase } from "@/lib/supabase";

interface SignedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  onError?: () => void;
  width?: number;
  height?: number;
  fit?: "cover" | "contain" | "inside" | "outside";
}

export default function SignedImage({
  src,
  alt,
  className = "",
  fallbackSrc,
  onError,
  width,
  height,
  fit = "cover",
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

          // For Supabase Storage URLs, add transform parameters if needed
          let url = src;
          if (url.includes("supabase.co/storage") && (width || height)) {
            const params = new URLSearchParams();
            if (width) params.append("width", width.toString());
            if (height) params.append("height", height.toString());
            if (fit) params.append("fit", fit);
            url += (url.includes("?") ? "&" : "?") + params.toString();
          }

          console.log("SignedImage: Using direct URL:", url);
          setImageUrl(url);
          setIsLoading(false);
          return;
        }

        // If it's a file path (doesn't start with http), try to get public URL
        if (!src.startsWith("http")) {
          console.log("SignedImage: Processing file path:", src);

          // For file paths, try public URL first
          console.log("SignedImage: Trying public URL for path:", src);
          const { data: publicData } = supabase.storage
            .from("images")
            .getPublicUrl(src);

          let url = publicData?.publicUrl || null;
          // Add transform query if needed
          if (url && (width || height)) {
            const params = new URLSearchParams();
            if (width) params.append("width", width.toString());
            if (height) params.append("height", height.toString());
            if (fit) params.append("fit", fit);
            url += (url.includes("?") ? "&" : "?") + params.toString();
          }
          if (url) {
            console.log("SignedImage: Using public URL:", url);
            setImageUrl(url);
            setIsLoading(false);
            return;
          }

          // Fallback to signed URL if public fails
          console.log("SignedImage: Trying signed URL for path:", src);
          const signedUrl = await getSignedImageUrl(src);
          let finalUrl = signedUrl;
          if (signedUrl && (width || height)) {
            const params = new URLSearchParams();
            if (width) params.append("width", width.toString());
            if (height) params.append("height", height.toString());
            if (fit) params.append("fit", fit);
            finalUrl +=
              (signedUrl.includes("?") ? "&" : "?") + params.toString();
          }
          if (finalUrl) {
            console.log("SignedImage: Got signed URL successfully");
            setImageUrl(finalUrl);
          } else {
            console.error("SignedImage: Failed to get any URL for path:", src);
            setHasError(true);
          }
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
  }, [src, width, height, fit]);

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

  // If we have a direct URL that starts with http, try to use it directly as fallback
  if (src.startsWith("http") && !imageUrl) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        onError={(e) => {
          console.error("SignedImage: Direct URL failed to load:", src);
          console.error("SignedImage: Error details:", e);
          setHasError(true);
          onError?.();
        }}
      />
    );
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      onError={(e) => {
        console.error("SignedImage: Image failed to load:", imageUrl);
        console.error("SignedImage: Error details:", e);
        console.error("SignedImage: Original src:", src);
        console.error("SignedImage: Error type:", e.type);
        console.error("SignedImage: Error target:", e.target);
        setHasError(true);
        onError?.();
      }}
    />
  );
}
