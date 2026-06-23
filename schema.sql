-- ============================================================
-- SQL SCRIPT UNTUK DATABASE & SEEDER KATALOG CAKRAWALA
-- Jalankan query ini di MySQL (misalnya lewat phpMyAdmin atau CLI)
-- ============================================================

-- 1. Buat Database jika belum ada
CREATE DATABASE IF NOT EXISTS cakrawala_literasi;
USE cakrawala_literasi;

-- 2. Buat Tabel Admin Users untuk Login Dinamis
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL, -- Anda bisa mengganti password ini langsung di database
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert Akun Admin Default (Password default: 12345)
INSERT INTO admin_users (username, password) VALUES 
('admin', '12345')
ON DUPLICATE KEY UPDATE username=VALUES(username);

-- 3. Buat Tabel Katalog Buku
CREATE TABLE IF NOT EXISTS katalog (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(191) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  isbn VARCHAR(50) NOT NULL,
  year INT NOT NULL,
  pages INT NOT NULL,
  category VARCHAR(100) NOT NULL,
  synopsis TEXT NOT NULL,
  coverBg VARCHAR(255) NOT NULL DEFAULT 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1d4ed8 100%)',
  coverTextColor VARCHAR(50) NOT NULL DEFAULT 'text-white',
  coverImage LONGTEXT NULL,      -- Kolom baru untuk menyimpan file cover gambar (Base64)
  features TEXT NOT NULL,         -- Disimpan sebagai stringified JSON array
  previewGallery TEXT NOT NULL,   -- Disimpan sebagai stringified JSON array
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Masukkan Data Seed Katalog Awal (6 Buku Awal)
INSERT INTO katalog (slug, title, author, isbn, year, pages, category, synopsis, coverBg, coverTextColor, coverImage, features, previewGallery) VALUES
(
  'cakrawala-pemikiran-bangsa', 
  'Cakrawala Pemikiran Bangsa', 
  'Dr. Hermawan Kartajaya & Tim Akademisi', 
  '978-602-1234-56-7', 
  2025, 
  312, 
  'Pendidikan', 
  'Sebuah mahakarya ilmiah yang membedah arah pendidikan dan literasi Indonesia menuju era emas. Buku ini menawarkan perspektif multidimensi mengenai penguatan karakter, integrasi teknologi dalam pembelajaran, serta revitalisasi budaya membaca dari tingkat keluarga hingga perguruan tinggi. Sangat direkomendasikan bagi akademisi, praktisi pendidikan, dan pembuat kebijakan.', 
  'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1d4ed8 100%)', 
  'text-white',
  NULL,
  '["Bestseller Akademik", "Rekomendasi Kemendikbud"]', 
  '["Bab 1: Fondasi Literasi Abad 21", "Bab 2: Digitalisasi Sekolah", "Bab 3: Kurikulum Masa Depan"]'
),
(
  'meniti-badai-di-ujung-dukun', 
  'Meniti Badai di Ujung Dukun', 
  'Seno Gede Mulya', 
  '978-602-9876-54-3', 
  2024, 
  420, 
  'Fiksi', 
  'Sebuah novel epik berlatar belakang lereng Gunung Merapi, tepatnya di kawasan Dukun, Jawa Tengah. Kisah perjuangan seorang guru muda yang berdedikasi membangkitkan asa anak-anak korban bencana alam melalui kekuatan dongeng dan buku. Dipenuhi dengan kehangatan lokal, konflik batin, dan keindahan lanskap alam yang digambarkan secara puitis dan mendalam.', 
  'linear-gradient(135deg, #881337 0%, #f43f5e 50%, #be123c 100%)', 
  'text-white',
  NULL,
  '["Pemenang Penghargaan Sastra", "Pilihan Editor"]', 
  '["Bagian I: Debu Merapi", "Bagian II: Rumah Bambu", "Bagian III: Aksara Pertama"]'
),
(
  'jejak-literasi-lereng-merapi', 
  'Jejak Literasi Lereng Merapi', 
  'Komunitas Penulis Kajangkoso', 
  '978-602-5555-11-2', 
  2026, 
  256, 
  'Budaya', 
  'Kumpulan esai naratif dan dokumentasi antropologis mengenai bagaimana masyarakat lereng Merapi melestarikan tradisi lisan di tengah modernisasi. Buku ini merangkum kearifan lokal, sejarah desa Mangunsoko, kisah spiritualitas gunung, dan bagaimana literasi berbasis komunitas mampu meningkatkan ketangguhan warga terhadap bencana.', 
  'linear-gradient(135deg, #064e3b 0%, #10b981 50%, #047857 100%)', 
  'text-white',
  NULL,
  '["Kearifan Lokal", "Edisi Terbatas"]', 
  '["Bab 1: Kidung Gunung", "Bab 2: Perpustakaan Rakyat", "Bab 3: Tradisi Mangunsoko"]'
),
(
  'metodologi-penelitian-kontemporer', 
  'Metodologi Penelitian Kontemporer', 
  'Prof. Dr. Ir. Budi Santoso, M.Sc.', 
  '978-623-2222-88-9', 
  2025, 
  380, 
  'Akademis', 
  'Buku referensi lengkap yang menyajikan pendekatan mutakhir dalam penelitian kuantitatif, kualitatif, dan metode campuran (mixed-methods). Dilengkapi dengan studi kasus praktis di bidang sosial-humaniora dan teknik, panduan penggunaan software analisis data terbaru, serta etika penelitian akademis era kecerdasan buatan.', 
  'linear-gradient(135deg, #111827 0%, #4b5563 50%, #1f2937 100%)', 
  'text-white',
  NULL,
  '["Buku Ajar Utama", "Disertai Template Riset"]', 
  '["Bab 1: Paradigma Baru Riset", "Bab 2: Analisis Tematik", "Bab 3: AI untuk Peneliti"]'
),
(
  'puisi-dari-lembah-kajangkoso', 
  'Puisi dari Lembah Kajangkoso', 
  'Cakrawala Poetica', 
  '978-623-1111-00-5', 
  2025, 
  180, 
  'Fiksi', 
  'Antologi puisi yang menyuarakan kesunyian lembah, gemuruh awan panas, gemericik aliran sungai Senowo, dan keteguhan cinta. Setiap bait dirangkai dengan diksi pilihan yang sangat menyentuh hati, menggambarkan harmoni antara manusia, pencipta, dan alam raya di sekitar lereng Gunung Merapi.', 
  'linear-gradient(135deg, #7c2d12 0%, #f97316 50%, #c2410c 100%)', 
  'text-white',
  NULL,
  '["Antologi Pilihan", "Ilustrasi Estetik"]', 
  '["Sajak Fajar Senowo", "Senandung Kabut Dukun", "Mata Air Kehidupan"]'
),
(
  'strategi-pemasaran-digital-umkm', 
  'Strategi Pemasaran Digital untuk UMKM', 
  'Rian Anggara, MBA', 
  '978-623-8888-33-1', 
  2026, 
  220, 
  'Bisnis', 
  'Panduan taktis bagi pelaku usaha mikro, kecil, dan menengah untuk merambah pasar digital. Buku ini membahas langkah-langkah praktis melakukan branding, mengoptimalkan media sosial, berjualan di marketplace, hingga menggunakan iklan digital bertarif hemat untuk melejitkan omzet penjualan produk lokal ke kancah nasional.', 
  'linear-gradient(135deg, #311042 0%, #8b5cf6 50%, #6d28d9 100%)', 
  'text-white',
  NULL,
  '["Panduan Praktis", "Lengkap Studi Kasus"]', 
  '["Bab 1: Menemukan Identitas Brand", "Bab 2: Copywriting Penjualan", "Bab 3: Iklan Murah Efektif"]'
)
ON DUPLICATE KEY UPDATE slug=VALUES(slug);
