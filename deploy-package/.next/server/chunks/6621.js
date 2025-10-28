"use strict";exports.id=6621,exports.ids=[6621],exports.modules={56621:(a,b,c)=>{c.d(b,{ND:()=>g,TI:()=>h,TW:()=>k,vs:()=>j,w2:()=>i,xA:()=>l}),c(61223);var d=c(66437);let e="https://ujbygopdxsarjkkgkvmv.supabase.co",f="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqYnlnb3BkeHNhcmpra2drdm12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMjk3MTQsImV4cCI6MjA2ODkwNTcxNH0.zQTqlaKfCkS9Vg0zwd7JgA2cOXpKnQxqd86dwEgCxsk";if(!e)throw Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable");if(!f)throw Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable");console.log("\uD83D\uDD27 Supabase Config:",{url:e,keyLength:f.length,environment:"production"});let g=(0,d.UU)(e,f),h={async checkUserLike(a,b){let{data:c,error:d}=await g.from("article_likes").select("id").eq("article_id",a).eq("user_id",b).single();return d&&"PGRST116"!==d.code?(console.error("Error checking user like:",d),!1):!!c},async syncLikesCount(a){try{let{count:b,error:c}=await g.from("article_likes").select("*",{count:"exact",head:!0}).eq("article_id",a);if(c)return console.error("Error counting likes:",c),0;let d=b||0,{error:e}=await g.from("articles").update({likes_count:d,updated_at:new Date().toISOString()}).eq("id",a);return e&&console.error("Error updating article likes count:",e),d}catch(a){return console.error("Error syncing likes count:",a),0}},async toggleLike(a,b){try{let{data:c,error:d}=await g.from("article_likes").select("id").eq("article_id",a).eq("user_id",b).single();if(d&&"PGRST116"!==d.code)return console.error("Error checking existing like:",d),{success:!1,isLiked:!1,error:d.message};if(c){let{error:c}=await g.from("article_likes").delete().eq("article_id",a).eq("user_id",b);if(c)return console.error("Error removing like:",c),{success:!1,isLiked:!0,error:c.message};return await this.syncLikesCount(a),{success:!0,isLiked:!1}}{let{error:c}=await g.from("article_likes").insert([{article_id:a,user_id:b}]);if(c)return console.error("Error adding like:",c),{success:!1,isLiked:!1,error:c.message};return await this.syncLikesCount(a),{success:!0,isLiked:!0}}}catch(a){return console.error("Error toggling like:",a),{success:!1,isLiked:!1,error:"Terjadi kesalahan sistem"}}},async getLikesCount(a){try{let{count:b,error:c}=await g.from("article_likes").select("*",{count:"exact",head:!0}).eq("article_id",a);if(c)return console.error("Error getting likes count:",c),0;return b||0}catch(a){return console.error("Error getting likes count:",a),0}},async getArticleLikes(a,b=10){let{data:c,error:d}=await g.from("article_likes").select(`
        id,
        user_id,
        created_at,
        profiles:user_id (
          full_name,
          avatar_url,
          role
        )
      `).eq("article_id",a).order("created_at",{ascending:!1}).limit(b);return d?(console.error("Error fetching article likes:",d),[]):c?.map(a=>({...a,profiles:Array.isArray(a.profiles)?a.profiles[0]:a.profiles}))||[]},async getUserLikedArticles(a,b=1,c=10){let d=(b-1)*c,{data:e,error:f,count:h}=await g.from("article_likes").select(`
        created_at,
        articles:article_id (
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
        )
      `,{count:"exact"}).eq("user_id",a).order("created_at",{ascending:!1}).range(d,d+c-1);return f?(console.error("Error fetching user liked articles:",f),{articles:[],totalCount:0,totalPages:0}):{articles:e?.map(a=>({...a.articles,liked_at:a.created_at,profiles:Array.isArray(a.articles?.profiles)?a.articles.profiles[0]:a.articles?.profiles})).filter(a=>a.id)||[],totalCount:h||0,totalPages:Math.ceil((h||0)/c)}}},i={async getArticle(a){try{console.log(`🔍 Fetching article: ${a}`);let{data:b,error:c}=await g.from("articles").select(`
        *,
        profiles:author_id (
          id,
          full_name,
          avatar_url,
          bio
        )
      `).eq("slug",a).eq("published",!0).single();if(c)return console.error("Error fetching article:",c),null;return b&&console.log(`📊 Article "${b.title}" - Views from DB: ${b.views}`),b}catch(a){return console.error("Unexpected error in getArticle:",a),null}},async incrementViews(a){try{console.log(`🔄 Incrementing views for article: ${a}`);let{data:b,error:c}=await g.from("articles").select("views, title, published").eq("id",a).single();if(c)return void console.error(`❌ Error fetching article ${a}:`,c);if(!b)return void console.error(`❌ Article ${a} not found`);if(!b.published)return void console.log(`ℹ️  Article ${a} is not published, skipping view increment`);let d=b.views??0,e=d+1;console.log(`📊 Article: ${b.title}`),console.log(`📊 Current views: ${d} -> New views: ${e}`);let{data:f,error:h}=await g.from("articles").update({views:e,updated_at:new Date().toISOString()}).eq("id",a).select("views").single();if(h)return void console.error(`❌ Error updating views for article ${a}:`,h);if(!f)return void console.error(`❌ No data returned after update for article ${a}`);console.log(`✅ Successfully incremented views for article ${a}`),console.log(`✅ Updated views in database: ${f.views}`);let{data:i,error:j}=await g.from("articles").select("views").eq("id",a).single();j?console.error(`❌ Error verifying update for article ${a}:`,j):console.log(`🔍 Verification - Views in database: ${i?.views}`)}catch(b){console.error(`❌ Unexpected error incrementing views for article ${a}:`,b)}},async manualIncrementViews(a){try{let{data:b,error:c}=await g.from("articles").select("views, title, published").eq("id",a).single();if(c||!b||!b.published)return void console.error(`❌ Manual increment failed for article ${a}:`,c);let d=b.views??0,e=d+1,{error:f}=await g.from("articles").update({views:e,updated_at:new Date().toISOString()}).eq("id",a);if(f)return void console.error(`❌ Manual increment update failed for article ${a}:`,f);console.log(`✅ Manual increment successful for article ${a}: ${d} -> ${e}`)}catch(b){console.error(`❌ Manual increment error for article ${a}:`,b)}},async getTotalViews(){try{let{data:a,error:b}=await g.from("articles").select("views").eq("published",!0);if(b)return console.error("Error fetching total views:",b),0;return a?.reduce((a,b)=>a+(b.views||0),0)||0}catch(a){return console.error("Unexpected error in getTotalViews:",a),0}},async getRelatedArticles(a,b,c=3){let{data:d,error:e}=await g.from("articles").select(`
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
          full_name,
          avatar_url
        )
      `).eq("category",b).eq("published",!0).neq("id",a).order("created_at",{ascending:!1}).limit(c);return e?(console.error("Error fetching related articles:",e),[]):(d||[]).map(a=>({...a,profiles:Array.isArray(a.profiles)?a.profiles[0]:a.profiles}))},async getAuthorArticles(a,b,c=3){let{data:d,error:e}=await g.from("articles").select(`
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
          full_name,
          avatar_url
        )
      `).eq("author_id",a).eq("published",!0).neq("id",b).order("created_at",{ascending:!1}).limit(c);return e?(console.error("Error fetching author articles:",e),[]):(d||[]).map(a=>({...a,profiles:Array.isArray(a.profiles)?a.profiles[0]:a.profiles}))},calculateReadingTime:a=>Math.ceil(a.split(/\s+/).length/200),formatDate:a=>new Date(a).toLocaleDateString("id-ID",{year:"numeric",month:"long",day:"numeric"}),formatRelativeTime(a){let b=new Date,c=new Date(a),d=Math.floor((b.getTime()-c.getTime())/1e3);if(d<60)return"Baru saja";if(d<3600){let a=Math.floor(d/60);return`${a} menit yang lalu`}if(d<86400){let a=Math.floor(d/3600);return`${a} jam yang lalu`}{if(!(d<2592e3))return this.formatDate(a);let b=Math.floor(d/86400);return`${b} hari yang lalu`}}},j={async getArticleComments(a){let{data:b,error:c}=await g.from("comments").select(`
        id,
        article_id,
        author_id,
        content,
        parent_id,
        created_at,
        updated_at,
        profiles:author_id (
          id,
          full_name,
          avatar_url
        )
      `).eq("article_id",a).order("created_at",{ascending:!0});if(c)return console.error("Error fetching comments:",c),[];let d=b||[],e=new Map,f=[];return d.forEach(a=>{let b={...a,profiles:Array.isArray(a.profiles)?a.profiles[0]:a.profiles,replies:[],reply_count:0};e.set(a.id,b)}),d.forEach(a=>{let b=e.get(a.id);if(a.parent_id){let c=e.get(a.parent_id);c&&(c.replies.push(b),c.reply_count=(c.reply_count||0)+1)}else f.push(b)}),f},async updateArticleCommentCount(a){try{let{count:b,error:c}=await g.from("comments").select("*",{count:"exact",head:!0}).eq("article_id",a);if(c)return void console.error("Error counting comments:",c);let{error:d}=await g.from("articles").update({comments_count:b||0,updated_at:new Date().toISOString()}).eq("id",a);d&&console.error("Error updating article comment count:",d)}catch(a){console.error("Unexpected error updating comment count:",a)}},async addComment(a,b,c,d){try{let{data:e,error:f}=await g.from("comments").insert([{article_id:a,author_id:b,content:c.trim(),parent_id:d||null}]).select().single();if(f)return console.error("Error adding comment:",f),{success:!1,error:f.message};return await this.updateArticleCommentCount(a),{success:!0,data:e}}catch(a){return console.error("Unexpected error adding comment:",a),{success:!1,error:"Terjadi kesalahan saat menambahkan komentar"}}},async updateComment(a,b,c){let{data:d,error:e}=await g.from("comments").update({content:c.trim(),updated_at:new Date().toISOString()}).eq("id",a).eq("author_id",b).select(`
        id,
        article_id,
        author_id,
        content,
        parent_id,
        created_at,
        updated_at,
        profiles:author_id (
          id,
          full_name,
          avatar_url
        )
      `).single();return e?(console.error("Error updating comment:",e),{success:!1,error:e.message}):{success:!0,data:d}},async deleteComment(a,b){try{let{data:c,error:d}=await g.from("comments").select("article_id").eq("id",a).eq("author_id",b).single();if(d)return console.error("Error fetching comment for deletion:",d),{success:!1,error:"Komentar tidak ditemukan"};let{error:e}=await g.from("comments").delete().eq("id",a).eq("author_id",b);if(e)return console.error("Error deleting comment:",e),{success:!1,error:e.message};return c?.article_id&&await this.updateArticleCommentCount(c.article_id),{success:!0}}catch(a){return console.error("Unexpected error deleting comment:",a),{success:!1,error:"Terjadi kesalahan saat menghapus komentar"}}},async getCommentCount(a){let{count:b,error:c}=await g.from("comments").select("*",{count:"exact",head:!0}).eq("article_id",a);return c?(console.error("Error getting comment count:",c),0):b||0},formatCommentDate(a){let b=new Date,c=new Date(a),d=Math.floor((b.getTime()-c.getTime())/1e3);return d<60?"Baru saja":d<3600?`${Math.floor(d/60)} menit yang lalu`:d<86400?`${Math.floor(d/3600)} jam yang lalu`:d<2592e3?`${Math.floor(d/86400)} hari yang lalu`:c.toLocaleDateString("id-ID",{year:"numeric",month:"long",day:"numeric"})}};function k(a){if(!a)return null;if(a.startsWith("http"))try{return new URL(a),a}catch{return null}let b=a.startsWith("/")?a.slice(1):a;return`https://ujbygopdxsarjkkgkvmv.supabase.co/storage/v1/object/public/images/${b}`}let l=a=>a.toLowerCase().replace(/[^a-z0-9\s]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").trim()}};