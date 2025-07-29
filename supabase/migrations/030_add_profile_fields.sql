-- Migration: Tambah kolom member_id, prestasi, alamat ke tabel profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS member_id TEXT,
  ADD COLUMN IF NOT EXISTS prestasi TEXT,
  ADD COLUMN IF NOT EXISTS alamat TEXT; 