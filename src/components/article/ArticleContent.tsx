"use client";

import ReportButton from "@/components/reports/ReportButton";

interface ArticleContentProps {
  content: string;
  className?: string;
  articleId?: string;
  articleTitle?: string;
}

export default function ArticleContent({
  content,
  className = "",
  articleId,
  articleTitle,
}: ArticleContentProps) {
  return (
    <div className={`article-content ${className}`}>
      {/* Enhanced CSS untuk styling konten dari TinyMCE */}
      <style jsx global>{`
        .article-content {
          max-width: none;
          color: #374151;
          line-height: 1.7;
        }

        .dark .article-content {
          color: #e5e7eb;
        }

        /* Typography */
        .article-content h1,
        .article-content h2,
        .article-content h3,
        .article-content h4,
        .article-content h5,
        .article-content h6 {
          color: #1f2937;
          font-weight: 600;
          line-height: 1.3;
          margin-top: 2em;
          margin-bottom: 0.5em;
        }

        .dark .article-content h1,
        .dark .article-content h2,
        .dark .article-content h3,
        .dark .article-content h4,
        .dark .article-content h5,
        .dark .article-content h6 {
          color: #f9fafb;
        }

        .article-content h1 {
          font-size: 2.25rem;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 0.5rem;
        }

        .dark .article-content h1 {
          border-bottom-color: #4b5563;
        }

        .article-content h2 {
          font-size: 1.875rem;
          color: #4f46e5;
        }

        .dark .article-content h2 {
          color: #818cf8;
        }

        .article-content h3 {
          font-size: 1.5rem;
          color: #7c3aed;
        }

        .dark .article-content h3 {
          color: #a78bfa;
        }

        .article-content h4 {
          font-size: 1.25rem;
        }

        .article-content h5 {
          font-size: 1.125rem;
        }

        .article-content h6 {
          font-size: 1rem;
          font-weight: 700;
        }

        /* Paragraphs */
        .article-content p {
          margin-bottom: 1.25em;
          text-align: justify;
          line-height: 1.8;
        }

        /* Lists */
        .article-content ul,
        .article-content ol {
          margin: 1.5em 0;
          padding-left: 1.5em;
        }

        .article-content li {
          margin: 0.5em 0;
          line-height: 1.6;
        }

        .article-content ul li {
          list-style-type: disc;
        }

        .article-content ol li {
          list-style-type: decimal;
        }

        /* Blockquotes */
        .article-content blockquote {
          border-left: 4px solid #4f46e5;
          margin: 2em 0;
          padding: 1.5em 2em;
          background: #f8fafc;
          border-radius: 0 8px 8px 0;
          font-style: italic;
          color: #4b5563;
          position: relative;
        }

        .dark .article-content blockquote {
          background: #1e293b;
          border-left-color: #818cf8;
          color: #cbd5e1;
        }

        .article-content blockquote::before {
          content: '"';
          font-size: 4rem;
          color: #4f46e5;
          position: absolute;
          top: -0.5rem;
          left: 0.5rem;
          font-family: Georgia, serif;
        }

        .dark .article-content blockquote::before {
          color: #818cf8;
        }

        /* Code */
        .article-content code {
          background: #f3f4f6;
          color: #dc2626;
          padding: 0.2em 0.4em;
          border-radius: 4px;
          font-family: "Monaco", "Consolas", "Courier New", monospace;
          font-size: 0.9em;
        }

        .dark .article-content code {
          background: #374151;
          color: #fca5a5;
        }

        .article-content pre {
          background: #1f2937;
          color: #f9fafb;
          padding: 1.5em;
          border-radius: 8px;
          overflow-x: auto;
          margin: 2em 0;
          border: 1px solid #374151;
        }

        .dark .article-content pre {
          background: #0f172a;
          border-color: #1e293b;
        }

        .article-content pre code {
          background: transparent;
          color: inherit;
          padding: 0;
          border-radius: 0;
        }

        /* Images */
        .article-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          margin: 2em auto;
          display: block;
        }

        /* Tables */
        .article-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2em 0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }

        .article-content th,
        .article-content td {
          padding: 12px 16px;
          text-align: left;
          border: 1px solid #e5e7eb;
        }

        .dark .article-content th,
        .dark .article-content td {
          border-color: #4b5563;
        }

        .article-content th {
          background: #4f46e5;
          color: white;
          font-weight: 600;
        }

        .article-content tbody tr:nth-child(even) {
          background: #f9fafb;
        }

        .dark .article-content tbody tr:nth-child(even) {
          background: #1f2937;
        }

        /* Links */
        .article-content a {
          color: #4f46e5;
          text-decoration: underline;
          transition: color 0.2s ease;
        }

        .article-content a:hover {
          color: #3730a3;
        }

        .dark .article-content a {
          color: #818cf8;
        }

        .dark .article-content a:hover {
          color: #a78bfa;
        }

        /* Horizontal Rules */
        .article-content hr {
          border: none;
          height: 2px;
          background: linear-gradient(to right, #4f46e5, #7c3aed, #4f46e5);
          margin: 3em 0;
          border-radius: 1px;
        }

        /* Emphasis */
        .article-content strong {
          font-weight: 600;
          color: #1f2937;
        }

        .dark .article-content strong {
          color: #f9fafb;
        }

        .article-content em {
          font-style: italic;
          color: #4b5563;
        }

        .dark .article-content em {
          color: #9ca3af;
        }

        /* First paragraph special styling */
        .article-content > p:first-of-type {
          font-size: 1.125rem;
          line-height: 1.7;
          color: #4b5563;
          margin-bottom: 1.5em;
        }

        .dark .article-content > p:first-of-type {
          color: #9ca3af;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .article-content h1 {
            font-size: 1.875rem;
          }

          .article-content h2 {
            font-size: 1.5rem;
          }

          .article-content h3 {
            font-size: 1.25rem;
          }

          .article-content blockquote {
            padding: 1em 1.5em;
            margin: 1.5em 0;
          }

          .article-content pre {
            padding: 1em;
            font-size: 0.875rem;
          }

          .article-content table {
            font-size: 0.875rem;
          }

          .article-content th,
          .article-content td {
            padding: 8px 12px;
          }
        }
      `}</style>

      <div dangerouslySetInnerHTML={{ __html: content }} />
      {/* Report Button */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <ReportButton
          contentType="article"
          contentId={articleId || ""}
          contentTitle={articleTitle || ""}
          className="text-xs"
        />
      </div>
    </div>
  );
}
