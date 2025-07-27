// src/app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

type Article = {
  id: any;
  title: any;
  excerpt: any;
  cover_image: any;
  category: any;
  slug: any;
  views: any;
  likes_count: any;
  comments_count: any;
  created_at: any;
  profiles: {
    id: any;
    full_name: any;
    avatar_url: any;
  };
};

type Author = {
  id: any;
  full_name: any;
  bio: any;
  avatar_url: any;
  created_at: any;
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const type = searchParams.get('type') || 'all'; // 'articles', 'authors', 'all'
  const category = searchParams.get('category');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  if (!query || query.trim().length < 2) {
    return NextResponse.json({
      success: false,
      message: 'Query minimal 2 karakter'
    }, { status: 400 });
  }

  try {
    const results: {
      articles: Article[];
      authors: Author[];
      totalArticles: number;
      totalAuthors: number;
      currentPage: number;
      totalPages: number;
    } = {
      articles: [],
      authors: [],
      totalArticles: 0,
      totalAuthors: 0,
      currentPage: page,
      totalPages: 0
    };

    // Search Articles
    if (type === 'all' || type === 'articles') {
      let articlesQuery = supabase
        .from('articles')
        .select(`
          id,
          title,
          excerpt,
          cover_image,
          category,
          slug,
          views,
          likes_count,
          comments_count,
          created_at,
          profiles:author_id (
            id,
            full_name,
            avatar_url
          )
        `, { count: 'exact', head: false })
        .eq('published', true)
        .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (category && category !== 'all') {
        articlesQuery = articlesQuery.eq('category', category);
      }

      // Pagination for articles
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      articlesQuery = articlesQuery.range(from, to);

      const { data: articles, error: articlesError, count: articlesCount } = await articlesQuery;

      if (articlesError) {
        console.error('Error searching articles:', articlesError);
      } else {
        results.articles = articles?.map((article: any) => ({
          ...article,
          profiles: Array.isArray(article.profiles) ? article.profiles[0] : article.profiles
        })) || [];
        results.totalArticles = articlesCount || 0;
      }
    }

    // Search Authors
    if (type === 'all' || type === 'authors') {
      const { data: authors, error: authorsError, count: authorsCount } = await supabase
        .from('profiles')
        .select(`
          id,
          full_name,
          bio,
          avatar_url,
          created_at
        `, { count: 'exact', head: false })
        .or(`full_name.ilike.%${query}%,bio.ilike.%${query}%`)
        .order('full_name', { ascending: true })
        .range(0, 99); // Ambil maksimal 100 penulis, frontend batasi 6 per page

      if (authorsError) {
        console.error('Error searching authors:', authorsError);
      } else {
        results.authors = authors || [];
        results.totalAuthors = authorsCount || 0;
      }
    }

    // Calculate total pages (based on articles for now)
    results.totalPages = Math.ceil(results.totalArticles / limit);

    return NextResponse.json({
      success: true,
      query,
      type,
      category,
      ...results
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({
      success: false,
      message: 'Terjadi kesalahan saat mencari'
    }, { status: 500 });
  }
}