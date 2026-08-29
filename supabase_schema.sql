-- ==============================================================================
-- MOUNTAIN GALLERY - SUPABASE CLOUD DATABASE SCHEMA
-- Jalankan script SQL ini di Supabase SQL Editor (https://supabase.com/dashboard)
-- ==============================================================================

-- 1. Tabel Utama: Destinasi Gunung
CREATE TABLE IF NOT EXISTS public.mountains (
    id TEXT PRIMARY KEY,                       -- e.g. 'gunung-cikuray'
    slug TEXT NOT NULL,                        -- e.g. 'cikuray'
    nama TEXT NOT NULL,                        -- e.g. 'Gunung Cikuray'
    lokasi TEXT NOT NULL,                      -- e.g. 'Garut, Jawa Barat'
    region TEXT NOT NULL,                      -- e.g. 'Jawa Barat'
    mdpl INTEGER NOT NULL,                     -- e.g. 2821
    mdpl_text TEXT NOT NULL,                   -- e.g. '2.821 Mdpl'
    lat DOUBLE PRECISION NOT NULL,             -- e.g. -7.3226
    lng DOUBLE PRECISION NOT NULL,             -- e.g. 107.8599
    cover TEXT,                                -- e.g. 'galeri/gunung-cikuray/img/mt-cikuray.jpeg'
    cover_fallback TEXT,
    atribusi TEXT,
    deskripsi TEXT NOT NULL,
    deskripsi_tambahan TEXT,
    tingkat_kesulitan TEXT DEFAULT 'Menengah', -- e.g. 'Mudah', 'Menengah', 'Menantang'
    estimasi_waktu TEXT,                       -- e.g. '6 - 8 Jam'
    suhu_puncak TEXT,                          -- e.g. '8°C - 14°C'
    tags TEXT[] DEFAULT ARRAY['Indonesia'],
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tabel Rute & Jalur Pendakian
CREATE TABLE IF NOT EXISTS public.mountain_routes (
    id BIGSERIAL PRIMARY KEY,
    mountain_id TEXT NOT NULL REFERENCES public.mountains(id) ON DELETE CASCADE,
    nama TEXT NOT NULL,                        -- e.g. 'Jalur Pemancar (Dayeuhmamat)'
    waktu TEXT NOT NULL,                       -- e.g. '6 - 7 Jam'
    status TEXT NOT NULL,                      -- e.g. 'Jalur Terpopuler'
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Tabel Galeri Media (Foto & Video)
CREATE TABLE IF NOT EXISTS public.mountain_media (
    id BIGSERIAL PRIMARY KEY,
    mountain_id TEXT NOT NULL REFERENCES public.mountains(id) ON DELETE CASCADE,
    type TEXT DEFAULT 'image',                 -- 'image' atau 'video'
    src TEXT NOT NULL,                         -- URL foto / video di Cloudflare R2 / Supabase Storage
    title TEXT NOT NULL,                       -- e.g. 'Sunrise Puncak Cikuray'
    category TEXT DEFAULT 'image',
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index untuk performa query cepat
CREATE INDEX IF NOT EXISTS idx_routes_mountain_id ON public.mountain_routes(mountain_id);
CREATE INDEX IF NOT EXISTS idx_media_mountain_id ON public.mountain_media(mountain_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Mengizinkan publik membaca data dan mengizinkan pengelolaan data
-- ==============================================================================

ALTER TABLE public.mountains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mountain_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mountain_media ENABLE ROW LEVEL SECURITY;

-- Policy Baca (Public Read) - Siapa pun bisa melihat data di peta dan galeri
DROP POLICY IF EXISTS "Public Read Mountains" ON public.mountains;
CREATE POLICY "Public Read Mountains" ON public.mountains FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Routes" ON public.mountain_routes;
CREATE POLICY "Public Read Routes" ON public.mountain_routes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Media" ON public.mountain_media;
CREATE POLICY "Public Read Media" ON public.mountain_media FOR SELECT USING (true);

-- Policy Tulis/Ubah/Hapus (Full Access for App)
DROP POLICY IF EXISTS "App Manage Mountains" ON public.mountains;
CREATE POLICY "App Manage Mountains" ON public.mountains FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "App Manage Routes" ON public.mountain_routes;
CREATE POLICY "App Manage Routes" ON public.mountain_routes FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "App Manage Media" ON public.mountain_media;
CREATE POLICY "App Manage Media" ON public.mountain_media FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- STORAGE BUCKET (Untuk Upload Foto & Media di Supabase Storage / R2)
-- ==============================================================================

-- Buat bucket penyimpanan publik jika belum ada
INSERT INTO storage.buckets (id, name, public)
VALUES ('mountain-photos', 'mountain-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Policy agar foto di storage bisa dilihat publik
DROP POLICY IF EXISTS "Public View Photos" ON storage.objects;
CREATE POLICY "Public View Photos" ON storage.objects FOR SELECT USING (bucket_id = 'mountain-photos');

DROP POLICY IF EXISTS "Public Upload Photos" ON storage.objects;
CREATE POLICY "Public Upload Photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'mountain-photos');

DROP POLICY IF EXISTS "Public Delete Photos" ON storage.objects;
CREATE POLICY "Public Delete Photos" ON storage.objects FOR DELETE USING (bucket_id = 'mountain-photos');
