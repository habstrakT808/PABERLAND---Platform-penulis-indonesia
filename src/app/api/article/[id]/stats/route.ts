import { NextRequest, NextResponse } from "next/server";
import { supabase, commentHelpers, likeHelpers } from "@/lib/supabase";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: articleId } = await params;

    // Fetch article data directly from database using ID
    const { data: article, error: articleError } = await supabase
      .from('articles')
      .select('views')
      .eq('id', articleId)
      .single();
    
    if (articleError || !article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    // Get real-time comment count
    const commentCount = await commentHelpers.getCommentCount(articleId);

    // Get real-time likes count from article_likes table
    const likesCount = await likeHelpers.getLikesCount(articleId);

    // Sync likes count to articles table for consistency
    await likeHelpers.syncLikesCount(articleId);

    return NextResponse.json({
      views: article.views || 0,
      likesCount: likesCount,
      commentsCount: commentCount,
    });
  } catch (error) {
    console.error("Error fetching article stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 