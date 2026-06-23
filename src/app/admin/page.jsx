"use client";

import React, { useState, useEffect } from "react";
import {
  Book, Plus, Edit, Trash2, Tag, Calendar, Hash, FileText,
  ArrowLeft, Search, CheckCircle, XCircle, AlertTriangle,
  BookOpen, Layers, BarChart3, X, ChevronRight, RefreshCw,
  Lock, LogOut, Maximize
} from "lucide-react";
import Link from "next/link";
import FloatingGradients from "@/components/FloatingGradients";

const categories = ["Fiksi", "Pendidikan", "Budaya", "Akademis", "Bisnis"];

const coverBgPresets = [
  { name: "Deep Blue", value: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1d4ed8 100%)" },
  { name: "Crimson Red", value: "linear-gradient(135deg, #881337 0%, #f43f5e 50%, #be123c 100%)" },
  { name: "Emerald Green", value: "linear-gradient(135deg, #064e3b 0%, #10b981 50%, #047857 100%)" },
  { name: "Charcoal Dark", value: "linear-gradient(135deg, #111827 0%, #4b5563 50%, #1f2937 100%)" },
  { name: "Rustic Orange", value: "linear-gradient(135deg, #7c2d12 0%, #f97316 50%, #c2410c 100%)" },
  { name: "Royal Purple", value: "linear-gradient(135deg, #311042 0%, #8b5cf6 50%, #6d28d9 100%)" }
];

export default function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null); // For edit/delete

  // Toast notifications
  const [toast, setToast] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    author: "",
    isbn: "",
    year: new Date().getFullYear(),
    pages: 100,
    size: "14.8 x 21 cm",
    category: "Pendidikan",
    synopsis: "",
    coverBg: coverBgPresets[0].value,
    coverTextColor: "text-white",
    coverImage: null,
    features: ["Bestseller", "Pilihan Editor"],
    previewGallery: ["Bab 1: Pendahuluan", "Bab 2: Pembahasan"]
  });

  // Dynamic tags/chapter inputs
  const [newFeature, setNewFeature] = useState("");
  const [newChapter, setNewChapter] = useState("");

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  // Check auth session on mount
  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (token === "authenticated") {
      setIsAuthenticated(true);
    }
    setCheckingAuth(false);
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/katalog");
      if (res.ok) {
        const data = await res.json();
        setBooks(data.books || []);
        setIsFallback(data.isFallback || false);
        if (data.isFallback) {
          showToast("Berjalan dalam mode baca-saja (Database Offline)", "warning");
        }
      } else {
        setIsFallback(true);
        showToast("Gagal memuat dari API. Menggunakan fallback data statis.", "warning");
      }
    } catch (err) {
      console.error(err);
      setIsFallback(true);
      showToast("Kesalahan jaringan. Menampilkan katalog lokal.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Fetch books only when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchBooks();
    }
  }, [isAuthenticated]);

  // Handle Login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        sessionStorage.setItem("admin_token", "authenticated");
        setIsAuthenticated(true);
        if (data.isFallback) {
          showToast("Login Berhasil (Mode Offline/Fallback aktif)!", "warning");
        } else {
          showToast("Login Berhasil! Selamat datang di Panel Admin.", "success");
        }
      } else {
        setLoginError(data.error || "Username atau password salah.");
        showToast(data.error || "Kredensial login salah.", "error");
      }
    } catch (err) {
      console.error(err);
      setLoginError("Terjadi kesalahan koneksi ke server.");
      showToast("Gagal terhubung ke server login.", "error");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    setLoginError("");
    showToast("Anda telah berhasil logout.", "success");
  };

  // Handle title change & auto-slugify
  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

    setFormData((prev) => ({
      ...prev,
      title,
      slug
    }));
  };

  // Handle Cover Image upload with compression validation under 1MB
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validation: check if file is an image
    if (!file.type.startsWith("image/")) {
      showToast("Format file salah! Harus berupa gambar.", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Resize down to a max width/height of 1200px to ensure it compresses well
        const MAX_DIM = 1200;
        if (width > MAX_DIM || height > MAX_DIM) {
          if (width > height) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          } else {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Adjust compression quality dynamically
        let quality = 0.85;
        let dataUrl = canvas.toDataURL("image/jpeg", quality);

        // check size in bytes: Base64 length * 0.75 is approx binary size
        while (dataUrl.length * 0.75 > 1024 * 1024 && quality > 0.1) {
          quality -= 0.05;
          dataUrl = canvas.toDataURL("image/jpeg", quality);
        }

        const sizeInMB = (dataUrl.length * 0.75 / (1024 * 1024));

        if (sizeInMB > 1.0) {
          showToast("Gambar terlalu besar! Gagal dikompresi di bawah 1MB.", "error");
        } else {
          setFormData((prev) => ({
            ...prev,
            coverImage: dataUrl
          }));
          showToast(`Gambar berhasil diunggah & dikompresi (${sizeInMB.toFixed(2)} MB)`, "success");
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Feature tag operations
  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  // Chapter preview operations
  const addChapter = () => {
    if (newChapter.trim() && !formData.previewGallery.includes(newChapter.trim())) {
      setFormData(prev => ({
        ...prev,
        previewGallery: [...prev.previewGallery, newChapter.trim()]
      }));
      setNewChapter("");
    }
  };

  const removeChapter = (index) => {
    setFormData(prev => ({
      ...prev,
      previewGallery: prev.previewGallery.filter((_, i) => i !== index)
    }));
  };

  // Open form for Create
  const handleCreateOpen = () => {
    if (isFallback) {
      showToast("Operasi ditolak. Database MySQL sedang offline.", "error");
      return;
    }
    setSelectedBook(null);
    setFormData({
      title: "",
      slug: "",
      author: "",
      isbn: "",
      year: new Date().getFullYear(),
      pages: 150,
      size: "14.8 x 21 cm",
      category: "Pendidikan",
      synopsis: "",
      coverBg: coverBgPresets[0].value,
      coverTextColor: "text-white",
      coverImage: null,
      features: ["Pilihan Utama"],
      previewGallery: ["Bab 1: Pendahuluan"]
    });
    setIsFormOpen(true);
  };

  // Open form for Edit
  const handleEditOpen = (book) => {
    if (isFallback) {
      showToast("Operasi ditolak. Database MySQL sedang offline.", "error");
      return;
    }
    setSelectedBook(book);
    setFormData({
      id: book.id,
      title: book.title,
      slug: book.slug,
      author: book.author,
      isbn: book.isbn,
      year: book.year,
      pages: book.pages,
      size: book.size || "14.8 x 21 cm",
      category: book.category,
      synopsis: book.synopsis,
      coverBg: book.coverBg,
      coverTextColor: book.coverTextColor,
      coverImage: book.coverImage,
      features: Array.isArray(book.features) ? book.features : [],
      previewGallery: Array.isArray(book.previewGallery) ? book.previewGallery : []
    });
    setIsFormOpen(true);
  };

  // Open confirmation for Delete
  const handleDeleteOpen = (book) => {
    if (isFallback) {
      showToast("Operasi ditolak. Database MySQL sedang offline.", "error");
      return;
    }
    setSelectedBook(book);
    setIsDeleteOpen(true);
  };

  // Submit Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFallback) {
      showToast("Tidak dapat menyimpan data saat database sedang offline.", "error");
      return;
    }

    // Front-end validations
    const { title, slug, author, isbn, year, pages, size, category, synopsis, coverImage } = formData;

    if (!title.trim() || !slug.trim() || !author.trim() || !isbn.trim() || !size.trim() || !category || !synopsis.trim()) {
      showToast("Semua kolom bertanda bintang (*) wajib diisi!", "error");
      return;
    }

    // Slug validation
    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(slug.trim())) {
      showToast("Format slug tidak valid! Hanya boleh berisi huruf kecil, angka, dan tanda hubung (-).", "error");
      return;
    }

    // Year validation
    const yearNum = parseInt(year);
    if (isNaN(yearNum) || yearNum < 1800 || yearNum > 2100) {
      showToast("Tahun terbit tidak valid! (Harus antara 1800 - 2100)", "error");
      return;
    }

    // Pages validation
    const pagesNum = parseInt(pages);
    if (isNaN(pagesNum) || pagesNum <= 0) {
      showToast("Jumlah halaman harus lebih besar dari 0!", "error");
      return;
    }

    // Size check
    if (coverImage && coverImage.length * 0.75 > 1024 * 1024) {
      showToast("Gambar cover melebihi batas ukuran 1MB!", "error");
      return;
    }

    const isEdit = !!selectedBook;
    const url = "/api/katalog";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      if (res.ok) {
        showToast(result.message || (isEdit ? "Buku berhasil diperbarui!" : "Buku baru berhasil ditambahkan!"), "success");
        setIsFormOpen(false);
        fetchBooks();
      } else {
        showToast(result.error || "Gagal melakukan penyimpanan data", "error");
      }
    } catch (err) {
      showToast("Terjadi kesalahan koneksi saat mengirim data.", "error");
    }
  };

  // Execute deletion
  const handleDeleteConfirm = async () => {
    if (isFallback) return;
    try {
      const res = await fetch(`/api/katalog?id=${selectedBook.id}`, {
        method: "DELETE"
      });
      const result = await res.json();
      if (res.ok) {
        showToast("Buku berhasil dihapus dari katalog database!", "success");
        setIsDeleteOpen(false);
        fetchBooks();
      } else {
        showToast(result.error || "Gagal menghapus buku", "error");
      }
    } catch (err) {
      showToast("Gagal melakukan request penghapusan", "error");
    }
  };

  // Check loading auth
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
        <FloatingGradients />
        <RefreshCw className="w-8 h-8 text-blue-500 animate-spin relative z-10" />
      </div>
    );
  }

  // Render Login View if not Authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50  overflow-hidden">
        <FloatingGradients />

        {/* Form Container Card */}
        <div className="max-w-md w-full glass-panel border border-slate-200/60 rounded-3xl p-8 shadow-2xl relative z-10 animate-scale-in">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-blue-500/20 mb-4">
              <BookOpen className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 leading-tight">Portal Admin</h2>
            <p className="text-xs text-slate-500 mt-2 font-medium uppercase tracking-wider">PT Cakrawala Candradimuka Literasi</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {loginError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2 animate-pulse">
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all text-sm"
                placeholder="Masukkan username (admin)"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all text-sm"
                placeholder="Masukkan password (cakrawala123)"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/10 hover:scale-102 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Masuk Ke Panel</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Back Button */}
          <div className="text-center mt-6 pt-6 border-t border-slate-100">
            <Link href="/" className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-wider">
              <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Stats calculation
  const filteredBooks = books.filter(b =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (b.isbn && b.isbn.includes(searchQuery))
  );

  const totalBooks = books.length;
  const categoriesCount = [...new Set(books.map(b => b.category))].length;
  const latestRelease = books.length > 0 ? Math.max(...books.map(b => b.year)) : "-";

  // Render Dashboard View if Authenticated
  return (
    <div className="min-h-screen pb-24 overflow-hidden bg-slate-50">
      <FloatingGradients />

      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed top-6 right-6 z-[200] animate-bounce-short">
          <div className={`flex items-center gap-3 px-5 py-4 rounded-xl border shadow-xl text-sm font-semibold backdrop-blur-md ${toast.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-800"
              : toast.type === "warning"
                ? "bg-amber-500/10 border-amber-500/20 text-amber-800"
                : "bg-rose-500/10 border-rose-500/20 text-rose-800"
            }`}>
            {toast.type === "success" && <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />}
            {toast.type === "warning" && <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />}
            {toast.type === "error" && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Admin Toolbar Header */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-6 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider mb-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Kembali Ke Beranda
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Admin</h1>
            <p className="text-sm text-slate-500 mt-1">Mengelola Katalog Buku PT Cakrawala Candradimuka Literasi</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchBooks}
              className="p-3 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 shadow-sm transition-all flex items-center justify-center cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-blue-600" : ""}`} />
            </button>
            <button
              onClick={handleCreateOpen}
              disabled={isFallback}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm shadow-md transition-all ${isFallback
                  ? "bg-slate-200 text-slate-400 border border-slate-300/40 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20 hover:scale-102 cursor-pointer"
                }`}
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Buku Baru</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-rose-200 bg-white hover:bg-rose-50 text-rose-600 hover:text-rose-700 font-bold text-sm transition-all hover:scale-102 cursor-pointer shadow-sm shadow-slate-100"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Database Warning Alert */}
        {isFallback && (
          <div className="mt-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium flex flex-col sm:flex-row sm:items-center gap-3 shadow-sm max-w-7xl">
            <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />
            <div>
              <span className="font-bold">Mode Baca Saja (Read-Only) Aktif!</span> Database MySQL lokal Anda terdeteksi offline. Data di halaman ini diambil dari file katalog statis. Operasi penambahan, penyuntingan, dan penghapusan buku dikunci sementara.
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 gap-8">

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-slate-200/50 rounded-2xl shadow-sm flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <Book className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Total Katalog</span>
              <span className="text-2xl font-black text-slate-900 mt-0.5 block">{totalBooks} Judul</span>
            </div>
          </div>
          <div className="p-6 bg-white border border-slate-200/50 rounded-2xl shadow-sm flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Total Kategori</span>
              <span className="text-2xl font-black text-slate-900 mt-0.5 block">{categoriesCount} Kategori</span>
            </div>
          </div>
          <div className="p-6 bg-white border border-slate-200/50 rounded-2xl shadow-sm flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 shrink-0">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Tahun Terbit Terbaru</span>
              <span className="text-2xl font-black text-slate-900 mt-0.5 block">{latestRelease}</span>
            </div>
          </div>
        </section>

        {/* Database List / Table Section */}
        <section className="bg-white border border-slate-200/50 rounded-2xl shadow-sm overflow-hidden">
          {/* Table Header Filter */}
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">Daftar Buku Terbitan</h3>
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari judul, penulis, isbn..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-xs text-slate-900"
              />
            </div>
          </div>

          {/* Table Element */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
                <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
                <span className="text-sm font-semibold text-slate-500">Menghubungkan ke database MySQL...</span>
              </div>
            ) : filteredBooks.length > 0 ? (
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 text-[10px] font-bold tracking-wider uppercase">
                    <th className="py-4 px-6 w-[280px]">Buku / Cover</th>
                    <th className="py-4 px-6">Informasi</th>
                    <th className="py-4 px-6 w-[120px]">Kategori</th>
                    <th className="py-4 px-6 w-[120px]">Spesifikasi</th>
                    <th className="py-4 px-6 w-[160px] text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBooks.map((book) => (
                    <tr key={book.slug} className="hover:bg-slate-50/50 transition-colors">
                      {/* Book Preview Card */}
                      <td className="py-4 px-6">
                        <div className="flex gap-4 items-center">
                          {/* Mini Cover */}
                          <div
                            className="w-16 aspect-[3/4] rounded-lg p-2.5 relative flex flex-col justify-between overflow-hidden shadow-md border border-slate-200/10 shrink-0"
                            style={{
                              backgroundImage: book.coverImage ? `url(${book.coverImage})` : book.coverBg,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center'
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-80" />
                            <BookOpen className="w-2.5 h-2.5 text-white/50 relative z-10" />
                            <div className="relative z-10">
                              <span className="text-[6px] font-extrabold text-white line-clamp-2 leading-tight mb-0.5">{book.title}</span>
                              <span className="text-[4px] font-bold text-white/80 uppercase line-clamp-1">{book.author}</span>
                            </div>
                          </div>

                          <div>
                            <span className="font-extrabold text-slate-900 text-sm line-clamp-2">{book.title}</span>
                            <span className="text-xs text-slate-500 block mt-0.5">Oleh: {book.author}</span>
                          </div>
                        </div>
                      </td>

                      {/* Specs */}
                      <td className="py-4 px-6 align-middle">
                        <div className="flex flex-col gap-1 text-xs">
                          <span className="text-slate-600 flex items-center gap-1.5">
                            <Hash className="w-3.5 h-3.5 text-slate-400 shrink-0" /> <span className="font-mono">{book.isbn || "-"}</span>
                          </span>
                          <span className="text-slate-400 block max-w-sm line-clamp-1 italic">
                            &quot;{book.synopsis}&quot;
                          </span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6 align-middle">
                        <span className="inline-block px-2.5 py-1 rounded bg-slate-100 border border-slate-200/60 text-slate-600 text-[10px] font-bold tracking-wider uppercase">
                          {book.category}
                        </span>
                      </td>

                      {/* Detailed Stats */}
                      <td className="py-4 px-6 align-middle">
                        <div className="flex flex-col gap-1 text-[11px] text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400 shrink-0" /> Terbit: {book.year}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3 text-slate-400 shrink-0" /> Hal: {book.pages}
                          </span>
                          <span className="flex items-center gap-1">
                            <Maximize className="w-3 h-3 text-slate-400 shrink-0" /> Ukuran: {book.size || "14.8 x 21 cm"}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 align-middle text-right">
                        <div className="flex items-center justify-end gap-2.5">
                          <button
                            onClick={() => handleEditOpen(book)}
                            disabled={isFallback}
                            className={`p-2 rounded-lg border transition-all ${isFallback
                                ? "border-slate-100 text-slate-300 cursor-not-allowed"
                                : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 cursor-pointer"
                              }`}
                            title="Edit Buku"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteOpen(book)}
                            disabled={isFallback}
                            className={`p-2 rounded-lg border transition-all ${isFallback
                                ? "border-slate-100 text-slate-300 cursor-not-allowed"
                                : "border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 cursor-pointer"
                              }`}
                            title="Hapus Buku"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-20 text-center max-w-sm mx-auto">
                <Book className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h4 className="font-bold text-slate-900 mb-1">Katalog Buku Kosong</h4>
                <p className="text-xs text-slate-500 px-4">Tidak ada buku yang terdaftar atau cocok dengan pencarian Anda. Tambahkan buku pertama dengan tombol di atas.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Modal CRUD Form (Create & Update) */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold text-slate-900">
                {selectedBook ? "Sunting Data Buku" : "Tambah Buku Baru ke Katalog"}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">

              {/* Cover Live Preview & Custom BG */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/50 flex flex-col md:flex-row gap-6 items-center">
                {/* Visual Cover Preview */}
                <div
                  className="w-28 aspect-[3/4] rounded-xl p-4 relative flex flex-col justify-between overflow-hidden shadow-lg border border-slate-200/10 select-none shrink-0"
                  style={{
                    backgroundImage: formData.coverImage ? `url(${formData.coverImage})` : formData.coverBg,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-85" />
                  <span className="text-[8px] font-extrabold uppercase tracking-widest text-white/70 relative z-10">Cakrawala</span>
                  <div className="relative z-10">
                    <span className="text-[10px] font-extrabold text-white line-clamp-3 leading-snug mb-1">{formData.title || "Judul Buku"}</span>
                    <span className="text-[7px] font-bold text-white/80 uppercase line-clamp-1">{formData.author || "Nama Penulis"}</span>
                  </div>
                </div>

                <div className="w-full space-y-3">
                  <span className="text-xs text-slate-500 font-bold block">Pilih Desain Sampul (Cover Preset)</span>

                  {/* Preset Gradients Grid */}
                  <div className="flex flex-wrap gap-2">
                    {coverBgPresets.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => setFormData(p => ({ ...p, coverBg: preset.value }))}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold tracking-wider text-white shadow-sm border transition-all ${formData.coverBg === preset.value
                            ? "border-blue-600 scale-105 ring-2 ring-blue-500/20"
                            : "border-transparent opacity-75 hover:opacity-100"
                          }`}
                        style={{ background: preset.value }}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>

                  {/* Manual Cover BG Input */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Custom CSS Gradient / Color</label>
                      <input
                        type="text"
                        value={formData.coverBg}
                        onChange={(e) => setFormData(p => ({ ...p, coverBg: e.target.value }))}
                        className="w-full px-3.5 py-1.5 border border-slate-200 rounded-lg text-xs font-mono text-slate-800"
                        placeholder="e.g. linear-gradient(135deg, #000 0%, #fff 100%)"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Upload Cover File (Maks 1MB)</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full px-3 py-1 border border-slate-200 rounded-lg text-[10px] text-slate-800 bg-white"
                      />
                      {formData.coverImage && (
                        <button
                          type="button"
                          onClick={() => setFormData(p => ({ ...p, coverImage: null }))}
                          className="text-[9px] text-red-500 font-bold hover:underline mt-1 block"
                        >
                          Hapus Gambar (Gunakan Gradient)
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Title */}
                <div className="sm:col-span-2">
                  <label className="text-[11px] text-slate-500 font-semibold tracking-wide block mb-1.5">Judul Buku *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleTitleChange}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-slate-900"
                    placeholder="Masukkan judul lengkap naskah"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="text-[11px] text-slate-500 font-semibold tracking-wide block mb-1.5">Slug URL (Auto-Generated) *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData(p => ({ ...p, slug: e.target.value }))}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-slate-800 font-mono"
                    placeholder="judul-buku-url"
                  />
                </div>

                {/* Author */}
                <div>
                  <label className="text-[11px] text-slate-500 font-semibold tracking-wide block mb-1.5">Nama Penulis *</label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData(p => ({ ...p, author: e.target.value }))}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-slate-900"
                    placeholder="Dr. John Doe / Tim Penulis"
                  />
                </div>

                {/* ISBN */}
                <div>
                  <label className="text-[11px] text-slate-500 font-semibold tracking-wide block mb-1.5">Nomor ISBN *</label>
                  <input
                    type="text"
                    required
                    value={formData.isbn}
                    onChange={(e) => setFormData(p => ({ ...p, isbn: e.target.value }))}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-slate-900"
                    placeholder="978-602-xxxxx-x-x"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="text-[11px] text-slate-500 font-semibold tracking-wide block mb-1.5">Kategori *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))}
                    className="w-full px-3.5 py-2.5 border border-slate-200 bg-white rounded-xl focus:outline-none focus:border-blue-500 text-sm text-slate-900"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Year */}
                <div>
                  <label className="text-[11px] text-slate-500 font-semibold tracking-wide block mb-1.5">Tahun Terbit *</label>
                  <input
                    type="number"
                    required
                    value={formData.year}
                    onChange={(e) => setFormData(p => ({ ...p, year: parseInt(e.target.value) || 2026 }))}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-slate-900"
                  />
                </div>

                {/* Pages */}
                <div>
                  <label className="text-[11px] text-slate-500 font-semibold tracking-wide block mb-1.5">Jumlah Halaman *</label>
                  <input
                    type="number"
                    required
                    value={formData.pages}
                    onChange={(e) => setFormData(p => ({ ...p, pages: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-slate-900"
                  />
                </div>

                {/* Size */}
                <div>
                  <label className="text-[11px] text-slate-500 font-semibold tracking-wide block mb-1.5">Ukuran Buku *</label>
                  <input
                    type="text"
                    required
                    value={formData.size}
                    onChange={(e) => setFormData(p => ({ ...p, size: e.target.value }))}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-slate-900"
                    placeholder="e.g. 14.8 x 21 cm"
                  />
                </div>

                {/* Synopsis */}
                <div className="sm:col-span-2">
                  <label className="text-[11px] text-slate-500 font-semibold tracking-wide block mb-1.5">Sinopsis Buku *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.synopsis}
                    onChange={(e) => setFormData(p => ({ ...p, synopsis: e.target.value }))}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-sm text-slate-900 resize-none leading-relaxed"
                    placeholder="Tuliskan rangkuman isi naskah secara mendalam dan menarik"
                  />
                </div>

                {/* Dynamic Features List */}
                <div>
                  <label className="text-[11px] text-slate-500 font-semibold tracking-wide block mb-1.5">
                    Fitur & Tag Promosi ({formData.features.length})
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="e.g. Pilihan Utama"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={addFeature}
                      className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold"
                    >
                      Tambah
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1.5 border border-dashed border-slate-200 rounded-lg bg-slate-50/50">
                    {formData.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-semibold"
                      >
                        {feature}
                        <button
                          type="button"
                          onClick={() => removeFeature(idx)}
                          className="hover:text-red-500 shrink-0 font-black"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                    {formData.features.length === 0 && (
                      <span className="text-[10px] text-slate-400 italic">Belum ada tag</span>
                    )}
                  </div>
                </div>

                {/* Dynamic Chapters Preview List */}
                <div>
                  <label className="text-[11px] text-slate-500 font-semibold tracking-wide block mb-1.5">
                    Pratinjau Bab / Daftar Isi ({formData.previewGallery.length})
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="e.g. Bab 1: Sejarah..."
                      value={newChapter}
                      onChange={(e) => setNewChapter(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addChapter())}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={addChapter}
                      className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold"
                    >
                      Tambah
                    </button>
                  </div>
                  <div className="flex flex-col gap-1 max-h-24 overflow-y-auto p-1.5 border border-dashed border-slate-200 rounded-lg bg-slate-50/50">
                    {formData.previewGallery.map((chapter, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between px-2.5 py-1 rounded bg-slate-100 border border-slate-200/50 text-slate-700 text-[10px]"
                      >
                        <span className="line-clamp-1">{chapter}</span>
                        <button
                          type="button"
                          onClick={() => removeChapter(idx)}
                          className="text-red-500 hover:text-red-700 ml-2 font-bold"
                        >
                          Hapus
                        </button>
                      </div>
                    ))}
                    {formData.previewGallery.length === 0 && (
                      <span className="text-[10px] text-slate-400 italic">Belum ada bab</span>
                    )}
                  </div>
                </div>

              </div>

              {/* Modal Footer Actions */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white z-10 mt-6">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-semibold transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/10 hover:scale-102 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  Simpan Data Katalog
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Modal Delete Confirmation */}
      {isDeleteOpen && selectedBook && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Hapus Buku Dari Katalog?</h3>
            </div>

            <p className="text-sm text-slate-500 leading-relaxed">
              Apakah Anda yakin ingin menghapus buku <strong className="text-slate-800">&quot;{selectedBook.title}&quot;</strong> secara permanen? Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-4.5 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-all"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all hover:scale-102 cursor-pointer shadow-md shadow-red-500/10"
              >
                Hapus Buku
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
