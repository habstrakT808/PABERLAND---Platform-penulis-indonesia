import { NextRequest, NextResponse } from "next/server";
import { supabase, commentHelpers } from "@/lib/supabase";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const articleId = params.id;

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

    // Get likes count from article_likes table
    const { count: likesCount, error: likesError } = await supabase
      .from('article_likes')
      .select('*', { count: 'exact', head: true })
      .eq('article_id', articleId);

    if (likesError) {
      console.error('Error fetching likes count:', likesError);
    }

    return NextResponse.json({
      views: article.views || 0,
      likesCount: likesCount || 0,
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