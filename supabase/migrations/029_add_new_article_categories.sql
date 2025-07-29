-- Migration: Tambah kategori baru pada kolom category di tabel articles
ALTER TABLE public.articles
  DROP CONSTRAINT IF EXISTS articles_category_check,
  ADD CONSTRAINT articles_category_check
    CHECK (category IN (
      'cerpen', 'puisi', 'artikel', 'cerita-rakyat', 'novel-berseri', 'lainnya',
      'info-berita', 'cermin', 'resensi-buku', 'dongeng', 'cerbung'
    )); 