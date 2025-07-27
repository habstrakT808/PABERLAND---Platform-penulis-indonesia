# 🌟 PaberLand - Platform Komunitas Penulis Indonesia

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TinyMCE](https://img.shields.io/badge/TinyMCE-40B5A8?style=for-the-badge&logo=tinymce&logoColor=white)](https://www.tiny.cloud/)

**✨ Platform komunitas penulis Indonesia yang memungkinkan berbagi karya sastra berkualitas ✨**

[🚀 Demo Live](#) • [📖 Dokumentasi](#dokumentasi) • [🐛 Laporkan Bug](#kontribusi) • [💡 Request Feature](#kontribusi)

</div>

---

## 🎯 **Tentang PaberLand**

PaberLand adalah platform komunitas modern untuk penulis Indonesia yang ingin berbagi karya sastra mereka. Dari cerpen hingga novel berseri, dari puisi hingga artikel - semua dapat dipublikasikan dengan mudah dan professional.

### 🌈 **Visi & Misi**

- 🏛️ **Membangun Komunitas Literasi** - Menyediakan ruang aman bagi penulis untuk berkarya
- 🌍 **Demokratisasi Publikasi** - Kesempatan yang sama untuk semua penulis
- 📚 **Meningkatkan Literasi** - Akses mudah ke karya sastra berkualitas
- 🤝 **Networking Penulis** - Menghubungkan sesama penulis di seluruh Nusantara

---

## ⚡ **Fitur Unggulan**

<table>
<tr>
<td width="50%">

### ✍️ **Professional Writing Experience**

- 🎨 **TinyMCE Editor** dengan fitur lengkap
- 📝 **Template System** (artikel, cerpen, puisi, dll)
- 💾 **Auto-save** setiap 30 detik
- 📱 **Mobile-responsive** editor
- 🖼️ **Drag & drop** image support

### 🔍 **Advanced Search & Discovery**

- 🎯 **Global search** dengan real-time suggestions
- 📂 **Category filtering** yang comprehensive
- 👥 **Author directory** dengan portfolio
- 🏷️ **Tag-based** content organization
- 📊 **Advanced analytics** per kategori

</td>
<td width="50%">

### 💬 **Interactive Community**

- 🧵 **Threaded comments** dengan nested replies
- ❤️ **Real-time like system** dengan optimistic updates
- 👤 **Public profiles** dengan portfolio showcase
- 🔔 **Smart notifications** untuk engagement
- 📈 **Social analytics** dan insights

### 🛡️ **Enterprise Security**

- 🔐 **Row Level Security** (RLS) policies
- ✅ **Email verification** system
- 🛂 **Protected routes** dengan authentication
- 🧹 **Content sanitization** otomatis
- 🔒 **Secure password** management

</td>
</tr>
</table>

---

## 🚀 **Tech Stack Modern**

<div align="center">

| Frontend                                                                                 | Backend                                                                            | Database                                                                                 | Tools                                                                        |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs)        | ![Supabase](https://img.shields.io/badge/Supabase-181818?style=flat&logo=supabase) | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql) | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel) |
| ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript) | ![API Routes](https://img.shields.io/badge/API_Routes-000000?style=flat)           | ![RLS](https://img.shields.io/badge/Row_Level_Security-green?style=flat)                 | ![TinyMCE](https://img.shields.io/badge/TinyMCE-40B5A8?style=flat)           |
| ![Tailwind](https://img.shields.io/badge/Tailwind-38B2AC?style=flat&logo=tailwind-css)   | ![Authentication](https://img.shields.io/badge/Supabase_Auth-3ECF8E?style=flat)    | ![Triggers](https://img.shields.io/badge/DB_Triggers-blue?style=flat)                    | ![React Hot Toast](https://img.shields.io/badge/Hot_Toast-FF6B6B?style=flat) |

</div>

---

## 📸 **Screenshots**

<div align="center">

### 🏠 Homepage

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/414d7ca4-0137-4439-b8d0-084f4f997317" />

### ✍️ Professional Writing Interface

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/43669e1c-c7f7-4b77-a549-dc328c08cfc5" />

### 📱 Mobile Responsive Design

<img width="1919" height="869" alt="image" src="https://github.com/user-attachments/assets/1d2e2f21-0a05-4e13-8c0a-dd41ab33bbac" />

</div>

---

## 🛠️ **Quick Start**

### **Prerequisites**

- Node.js 18+
- npm atau yarn
- Akun Supabase
- TinyMCE API Key (gratis)

### **Installation**

```bash
# 1️⃣ Clone repository
git clone https://github.com/yourusername/paberland.git
cd paberland

# 2️⃣ Install dependencies
npm install

# 3️⃣ Setup environment variables
cp .env.example .env.local
# Edit .env.local dengan konfigurasi Anda

# 4️⃣ Setup database
# Jalankan migrations di Supabase Dashboard

# 5️⃣ Run development server
npm run dev
```

### **Environment Variables**

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# TinyMCE Configuration
NEXT_PUBLIC_TINYMCE_API_KEY=your-tinymce-api-key

# App Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 📂 **Project Structure**

```
paberland/
├── 📁 public/                  # Static assets
├── 📁 src/
│   ├── 📁 app/                # Next.js 14 App Router
│   │   ├── 📁 admin/          # Admin dashboard
│   │   ├── 📁 api/            # API routes
│   │   ├── 📁 auth/           # Authentication pages
│   │   ├── 📁 dashboard/      # User dashboard
│   │   └── 📁 write/          # Writing interface
│   ├── 📁 components/         # Reusable components
│   │   ├── 📁 editor/         # TinyMCE editor
│   │   ├── 📁 auth/           # Auth components
│   │   ├── 📁 comments/       # Comment system
│   │   └── 📁 social/         # Social features
│   ├── 📁 contexts/           # React contexts
│   └── 📁 lib/                # Utility functions
├── 📁 supabase/
│   └── 📁 migrations/         # Database migrations
└── 📄 Configuration files
```

---

## 🎯 **Development Roadmap**

### ✅ **Completed Features**

<details>
<summary><strong>🏆 Phase 1-6: Core Platform (100% Complete)</strong></summary>

- ✅ **Authentication System** - Registration, login, email verification
- ✅ **Professional Writing** - TinyMCE editor dengan template system
- ✅ **Article Management** - CRUD operations dengan advanced filtering
- ✅ **Comment System** - Threaded comments dengan real-time updates
- ✅ **Search & Discovery** - Global search, categories, author directory
- ✅ **Social Features** - Like system, public profiles, follow system

</details>

### 🚧 **In Progress**

- 🔄 **Admin Panel** - Content moderation & site management
- 🔄 **Notification System** - Real-time notifications & email alerts
- 🔄 **Analytics Dashboard** - Author insights & content performance

### 🔮 **Upcoming Features**

- 📱 **PWA Support** - Offline reading capability
- 🖼️ **Image Upload** - Supabase Storage integration
- 📧 **Email Campaigns** - Newsletter & content digest
- 🤖 **AI Features** - Content suggestions & auto-tagging
- 📱 **Mobile App** - React Native implementation

---

## 🏗️ **Database Schema**

<details>
<summary><strong>📊 View Database Structure</strong></summary>

```sql
-- 👤 User Profiles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  full_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 📝 Articles
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  author_id UUID REFERENCES profiles(id),
  published BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  slug TEXT UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 💬 Comments with Threading
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id UUID REFERENCES articles(id),
  author_id UUID REFERENCES profiles(id),
  content TEXT NOT NULL,
  parent_id UUID REFERENCES comments(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- ❤️ Like System
CREATE TABLE article_likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id UUID REFERENCES articles(id),
  user_id UUID REFERENCES profiles(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(article_id, user_id)
);

-- 👥 Follow System
CREATE TABLE follows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  follower_id UUID REFERENCES profiles(id),
  following_id UUID REFERENCES profiles(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(follower_id, following_id)
);
```

</details>

---

## 🤝 **Contributing**

Kami sangat menghargai kontribusi dari komunitas! Ada beberapa cara untuk berkontribusi:

### 🐛 **Bug Reports**

Temukan bug? [Buat issue baru](https://github.com/yourusername/paberland/issues/new?template=bug_report.md)

### 💡 **Feature Requests**

Punya ide fitur? [Request feature baru](https://github.com/yourusername/paberland/issues/new?template=feature_request.md)

### 🔧 **Code Contributions**

1. **Fork** repository ini
2. **Create** feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to branch (`git push origin feature/AmazingFeature`)
5. **Open** Pull Request

### 📝 **Development Guidelines**

- Gunakan **TypeScript** untuk type safety
- Follow **Next.js 14** best practices
- Implementasikan **proper error handling**
- Tambahkan **loading states** untuk UX yang better
- Ensure **mobile responsiveness**
- Include **accessibility features**

---

## 📊 **Performance Metrics**

<div align="center">

| Metric                | Target      | Current Status |
| --------------------- | ----------- | -------------- |
| 🚀 Page Load Time     | < 3s        | ✅ Achieved    |
| 📱 Mobile Performance | > 90        | ✅ Optimized   |
| 🔍 SEO Score          | > 95        | ✅ Excellent   |
| ♿ Accessibility      | WCAG 2.1 AA | ✅ Compliant   |
| 🛡️ Security           | A+ Grade    | ✅ Secured     |

</div>

---

## 📄 **License**

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 **Acknowledgments**

- [Next.js](https://nextjs.org/) - The React framework for production
- [Supabase](https://supabase.com/) - The open source Firebase alternative
- [TinyMCE](https://www.tiny.cloud/) - The world's most advanced WYSIWYG editor
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Heroicons](https://heroicons.com/) - Beautiful hand-crafted SVG icons

---

## 📞 **Contact & Support**

<div align="center">

**💌 Ada pertanyaan? Jangan ragu untuk menghubungi!**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yourusername)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:your.email@domain.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/yourprofile)

---

**⭐ Jika project ini membantu Anda, berikan star ya! ⭐**

**🇮🇩 Dibuat dengan ❤️ untuk komunitas penulis Indonesia 🇮🇩**

</div>
