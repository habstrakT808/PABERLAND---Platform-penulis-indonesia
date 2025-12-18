# Panduan Pengujian Maintainability (NF-04)

## Target Pengujian
**Kode menggunakan TypeScript dan mengikuti standar coding**

## Tools yang Digunakan

### 1. Visual Studio Code / Editor
Editor kode untuk melihat dan memeriksa file konfigurasi dan source code.

### 2. Terminal / Command Line
Untuk menjalankan perintah TypeScript dan ESLint.

### 3. Browser / File Explorer
Untuk melihat struktur direktori proyek.

---

## Langkah-Langkah Pengujian

### 1. Verifikasi Konfigurasi TypeScript

#### A. Screenshot `tsconfig.json`

**Langkah:**
1. Buka file `tsconfig.json` di root proyek
2. Pastikan file terlihat lengkap dengan semua konfigurasi
3. Ambil screenshot yang menunjukkan:
   - `"strict": true` (penting untuk type checking ketat)
   - `"target"` dan `"lib"` 
   - `"paths"` dengan alias `@/*`
   - `"include"` yang mencakup file TypeScript

**Contoh Screenshot:**
```
tsconfig.json
├── compilerOptions
│   ├── strict: true ✅
│   ├── target: "ES2017"
│   ├── lib: ["dom", "dom.iterable", "esnext"]
│   └── paths: { "@/*": ["./src/*"] }
└── include: ["next-env.d.ts", "**/*.ts", "**/*.tsx"]
```

**Cara Screenshot:**
- Buka file di VS Code
- Tekan `Ctrl+Shift+P` → ketik "Screenshot" (jika ada extension)
- Atau gunakan `Windows + Shift + S` untuk Snipping Tool
- Atau gunakan `Alt + Print Screen` untuk screenshot window aktif

#### B. Screenshot `package.json` (bagian dependencies)

**Langkah:**
1. Buka file `package.json`
2. Scroll ke bagian `devDependencies`
3. Ambil screenshot yang menunjukkan:
   - `"typescript": "^5"`
   - `"@types/node": "^20"`
   - `"@types/react": "^19"`
   - `"@types/react-dom": "^19"`

**Contoh Screenshot:**
```json
"devDependencies": {
  "typescript": "^5", ✅
  "@types/node": "^20", ✅
  "@types/react": "^19", ✅
  "@types/react-dom": "^19", ✅
  "eslint": "^9",
  "eslint-config-next": "15.4.3"
}
```

---

### 2. Verifikasi Struktur Proyek

#### A. Screenshot Struktur Direktori `src/`

**Langkah:**
1. Buka folder `src/` di VS Code atau File Explorer
2. Pastikan struktur direktori terlihat jelas
3. Ambil screenshot yang menunjukkan:
   - Folder `app/` dengan file `.tsx`
   - Folder `components/` dengan file `.tsx`
   - Folder `lib/` dengan file `.ts`
   - Folder `contexts/` dengan file `.tsx`

**Cara Screenshot di VS Code:**
1. Buka Explorer sidebar (ikon folder di kiri)
2. Expand folder `src/`
3. Ambil screenshot dengan `Windows + Shift + S` atau Snipping Tool

**Cara Screenshot di File Explorer:**
1. Buka File Explorer
2. Navigate ke folder proyek
3. Buka folder `src/`
4. Ambil screenshot dengan `Windows + Shift + S`

**Contoh Struktur yang Harus Terlihat:**
```
src/
├── app/
│   ├── page.tsx ✅
│   ├── layout.tsx ✅
│   └── article/
│       └── [slug]/
│           └── page.tsx ✅
├── components/
│   ├── article/
│   │   └── LikeButton.tsx ✅
│   └── auth/
│       └── LoginForm.tsx ✅
├── lib/
│   └── supabase.ts ✅
└── contexts/
    └── AuthContext.tsx ✅
```

#### B. Verifikasi File Extension

**Langkah:**
1. Buka beberapa file di folder `src/`
2. Pastikan semua file menggunakan ekstensi `.ts` atau `.tsx`
3. Tidak ada file `.js` atau `.jsx` untuk source code utama

**File yang Harus Diperiksa:**
- ✅ `src/app/page.tsx` (React component)
- ✅ `src/lib/supabase.ts` (TypeScript utility)
- ✅ `src/components/article/LikeButton.tsx` (React component)
- ✅ `src/middleware.ts` (TypeScript middleware)

**Cara Screenshot:**
- Buka file di VS Code
- Perhatikan ekstensi file di tab (`.ts` atau `.tsx`)
- Ambil screenshot beberapa file untuk menunjukkan penggunaan TypeScript

---

### 3. Verifikasi Konfigurasi ESLint

#### A. Screenshot `eslint.config.mjs`

**Langkah:**
1. Buka file `eslint.config.mjs` di root proyek
2. Ambil screenshot yang menunjukkan:
   - `"next/core-web-vitals"`
   - `"next/typescript"`
   - Rules untuk TypeScript

**Contoh Screenshot:**
```javascript
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"), ✅
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn", ✅
      "@typescript-eslint/no-unused-vars": "warn", ✅
    },
  },
];
```

---

### 4. Review Kode Sampel

#### A. Screenshot File dengan Type Annotations

**File yang Direkomendasikan untuk Screenshot:**

**1. File dengan Interface/Type Definitions:**
- `src/lib/supabase.ts` - menunjukkan interface seperti `Article`, `Profile`, dll.
- `src/components/article/LikeButton.tsx` - menunjukkan `LikeButtonProps` interface

**Langkah:**
1. Buka file `src/lib/supabase.ts`
2. Scroll ke bagian interface definitions (sekitar baris 273-350)
3. Ambil screenshot yang menunjukkan:
   - Interface definitions (misalnya `interface Article`)
   - Type annotations pada function parameters
   - Return types pada functions

**Contoh Screenshot:**
```typescript
// Interface definition
export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  // ... ✅ Type annotations jelas
}

// Function with type annotations
export async function getArticle(identifier: string): Promise<Article | null> {
  // ... ✅ Return type didefinisikan
}
```

**2. File dengan React Component Props:**
- `src/components/article/LikeButton.tsx`

**Langkah:**
1. Buka file `src/components/article/LikeButton.tsx`
2. Ambil screenshot yang menunjukkan:
   - Interface untuk props (`LikeButtonProps`)
   - Type annotations pada component props
   - Type annotations pada state

**Contoh Screenshot:**
```typescript
interface LikeButtonProps {
  articleId: string; ✅
  initialLikesCount: number; ✅
  initialIsLiked?: boolean; ✅
  size?: "sm" | "md" | "lg"; ✅
  showCount?: boolean; ✅
  className?: string; ✅
}

export default function LikeButton({
  articleId,
  initialLikesCount,
  // ... ✅ Props dengan type annotations
}: LikeButtonProps) {
  // ...
}
```

#### B. Screenshot File dengan Generic Types

**File yang Direkomendasikan:**
- File yang menggunakan generic types atau utility types

**Langkah:**
1. Cari file yang menggunakan generic types (misalnya `Promise<T>`, `Array<T>`, dll.)
2. Ambil screenshot yang menunjukkan penggunaan generic types

---

### 5. Verifikasi Build Process

#### A. Screenshot Hasil Build (Type Checking)

**Langkah:**
1. Buka terminal di VS Code atau Command Prompt
2. Navigate ke folder proyek
3. Jalankan perintah:
   ```bash
   npm run build
   ```
   atau
   ```bash
   next build
   ```
4. Tunggu hingga proses build selesai
5. Ambil screenshot yang menunjukkan:
   - Build berhasil tanpa type errors
   - Output yang menunjukkan compilation berhasil
   - Tidak ada error TypeScript

**Contoh Output yang Baik:**
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
```

**Cara Screenshot Terminal:**
- Setelah build selesai, ambil screenshot terminal
- Pastikan output terlihat jelas
- Gunakan `Windows + Shift + S` atau Snipping Tool

#### B. Screenshot Type Checking (Opsional)

**Langkah:**
1. Jalankan perintah type checking:
   ```bash
   npx tsc --noEmit
   ```
2. Ambil screenshot yang menunjukkan tidak ada type errors

---

### 6. Verifikasi ESLint (Opsional)

#### A. Screenshot Hasil ESLint

**Langkah:**
1. Jalankan perintah:
   ```bash
   npm run lint
   ```
2. Ambil screenshot yang menunjukkan:
   - Tidak ada linting errors (atau hanya warnings minor)
   - ESLint berjalan dengan baik

---

## Checklist Screenshot yang Diperlukan

### Screenshot Wajib:

1. ✅ **`tsconfig.json`** - Konfigurasi TypeScript
   - Menunjukkan `"strict": true`
   - Menunjukkan path aliases
   - Menunjukkan include patterns

2. ✅ **`package.json` (bagian devDependencies)** - Dependencies TypeScript
   - Menunjukkan `typescript` package
   - Menunjukkan `@types/*` packages

3. ✅ **Struktur Direktori `src/`** - Struktur proyek
   - Menunjukkan folder dan file `.ts` / `.tsx`
   - Menunjukkan organisasi kode yang baik

4. ✅ **File Kode Sampel dengan Type Annotations** - Contoh penggunaan TypeScript
   - Menunjukkan interface/type definitions
   - Menunjukkan type annotations pada functions
   - Menunjukkan type annotations pada props

5. ✅ **Hasil Build** - Verifikasi compilation
   - Menunjukkan build berhasil
   - Menunjukkan tidak ada type errors

### Screenshot Opsional (Tambahan):

6. ⭐ **`eslint.config.mjs`** - Konfigurasi ESLint
7. ⭐ **Hasil ESLint** - Verifikasi linting
8. ⭐ **File dengan Generic Types** - Contoh advanced TypeScript

---

## Tips Screenshot yang Baik

### 1. Kualitas Screenshot:
- ✅ Gunakan resolusi yang jelas
- ✅ Pastikan teks terbaca dengan baik
- ✅ Hindari screenshot yang terlalu kecil
- ✅ Crop screenshot untuk fokus pada bagian penting

### 2. Highlighting:
- ✅ Gunakan tool seperti Snipping Tool atau Snip & Sketch
- ✅ Bisa tambahkan panah atau kotak untuk highlight bagian penting
- ✅ Bisa tambahkan teks label jika perlu

### 3. Organisasi:
- ✅ Simpan screenshot dengan nama yang jelas:
  - `nf04-tsconfig.json.png`
  - `nf04-package.json-dependencies.png`
  - `nf04-struktur-direktori.png`
  - `nf04-kode-sampel-interface.png`
  - `nf04-build-success.png`

---

## Contoh Dokumentasi Hasil

### Tabel Dokumentasi:

| No | Aspek yang Diuji | File/Area | Hasil | Screenshot |
|:---|:-----------------|:----------|:------|:-----------|
| 1 | Konfigurasi TypeScript | `tsconfig.json` | ✅ `strict: true`, path aliases terkonfigurasi | `nf04-tsconfig.png` |
| 2 | Dependencies TypeScript | `package.json` | ✅ TypeScript v5, @types packages tersedia | `nf04-dependencies.png` |
| 3 | Struktur Proyek | `src/` directory | ✅ Semua file menggunakan `.ts`/`.tsx` | `nf04-struktur.png` |
| 4 | Type Annotations | `src/lib/supabase.ts` | ✅ Interface dan type definitions lengkap | `nf04-interfaces.png` |
| 5 | Component Props Types | `src/components/article/LikeButton.tsx` | ✅ Props interface didefinisikan dengan baik | `nf04-props.png` |
| 6 | Build Process | Terminal output | ✅ Build berhasil tanpa type errors | `nf04-build.png` |

### Kesimpulan:

✅ **Kode menggunakan TypeScript**: Semua file source code menggunakan ekstensi `.ts` atau `.tsx`

✅ **Konfigurasi TypeScript**: `tsconfig.json` dikonfigurasi dengan `strict: true` untuk type checking ketat

✅ **Type Annotations**: Semua functions, components, dan data structures menggunakan type annotations yang tepat

✅ **Standar Coding**: Kode mengikuti standar coding yang konsisten dengan penggunaan ESLint

✅ **Build Success**: Proses build berhasil tanpa type errors, menunjukkan kode TypeScript valid

**Status**: ✅ **Valid** - Sistem memenuhi requirement NF-04 (Maintainability)

---

## Troubleshooting

### Jika Build Gagal:

1. **Cek Type Errors:**
   ```bash
   npx tsc --noEmit
   ```
   - Perbaiki semua type errors yang muncul

2. **Cek Missing Types:**
   - Pastikan semua `@types/*` packages terinstall
   - Install missing types jika perlu:
     ```bash
     npm install --save-dev @types/[package-name]
     ```

3. **Cek tsconfig.json:**
   - Pastikan konfigurasi benar
   - Pastikan `include` mencakup semua file yang diperlukan

### Jika Tidak Ada Type Annotations:

1. **Tambahkan Type Annotations:**
   - Tambahkan interface untuk props
   - Tambahkan return types untuk functions
   - Tambahkan type annotations untuk variables

2. **Gunakan Type Inference:**
   - TypeScript bisa infer types, tapi lebih baik explicit
   - Gunakan type annotations untuk clarity

---

## Referensi

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Next.js TypeScript Guide](https://nextjs.org/docs/app/building-your-application/configuring/typescript)
- [ESLint TypeScript Rules](https://typescript-eslint.io/rules/)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

---

**Catatan:** Dokumentasi ini digunakan untuk pengujian NF-04 (Maintainability) pada Platform PaberLand. Pastikan semua screenshot diambil dengan jelas dan menunjukkan bukti yang diperlukan.

