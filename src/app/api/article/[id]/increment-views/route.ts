import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const articleId = params.id;
    
    console.log(`🔄 API: Starting increment for article: ${articleId}`);
    
    // First, get current views to log the before state
    const { data: currentData, error: currentError } = await supabase
      .from('articles')
      .select('views, title')
      .eq('id', articleId)
      .single();
    
    if (currentError) {
      console.error(`❌ API: Error fetching current views:`, currentError);
      return NextResponse.json(
        { error: 'Failed to fetch current article data' },
        { status: 500 }
      );
    }
    
    const currentViews = currentData.views || 0;
    console.log(`📊 API: Current views before increment: ${currentViews} for "${currentData.title}"`);
    
    // Use the safe database function to increment views
    const { data: incrementResult, error: incrementError } = await supabase
      .rpc('increment_article_views_safe', { article_id: articleId });
    
    if (incrementError) {
      console.error(`❌ API: Error using safe increment function:`, incrementError);
      return NextResponse.json(
        { error: 'Failed to increment views' },
        { status: 500 }
      );
    }
    
    console.log(`✅ API: Increment result: ${incrementResult} views`);
    
    // Get the updated article data to verify
    const { data: updatedData, error: fetchError } = await supabase
      .from('articles')
      .select('views, title')
      .eq('id', articleId)
      .single();
    
    if (fetchError) {
      console.error(`❌ API: Error fetching updated article:`, fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch updated article' },
        { status: 500 }
      );
    }
    
    const newViews = updatedData.views || 0;
    const incrementAmount = newViews - currentViews;
    
    console.log(`📊 API: Views changed from ${currentViews} to ${newViews} (increment: +${incrementAmount})`);
    
    if (incrementAmount !== 1) {
      console.warn(`⚠️ API: Unexpected increment amount: ${incrementAmount} (expected: 1)`);
    }
    
    return NextResponse.json({
      success: true,
      views: newViews,
      title: updatedData.title,
      incrementAmount: incrementAmount
    });
    
  } catch (error) {
    console.error(`❌ API: Unexpected error:`, error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 