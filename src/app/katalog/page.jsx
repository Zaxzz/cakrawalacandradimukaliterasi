"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Search, Book, ArrowRight, User, BookOpen, AlertTriangle } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import FloatingGradients from "@/components/FloatingGradients";

// Extract categories
const categories = ["Semua", "Fiksi", "Pendidikan", "Budaya", "Akademis", "Bisnis"];

export default function Katalog() {
  const [booksData, setBooksData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // Fetch books from API on mount
  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch("/api/katalog");
        if (res.ok) {
          const data = await res.json();
          setBooksData(data.books || []);
          setIsFallback(data.isFallback || false);
        } else {
          setIsFallback(true);
        }
      } catch (err) {
        console.error("Gagal memuat katalog buku:", err);
        setIsFallback(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBooks();
  }, []);

  // Filtering logic
  const filteredBooks = useMemo(() => {
    return booksData.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (book.isbn && book.isbn.includes(searchQuery));

      const matchesCategory =
        selectedCategory === "Semua" || book.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [booksData, searchQuery, selectedCategory]);

  return (
    <div className=" min-h-screen pb-24 overflow-hidden">
      <FloatingGradients />

      {/* Header section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <span className="text-xs font-bold text-blue-600 tracking-widest uppercase">
              Katalog Penerbitan
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-3 mb-6">
              Jelajahi Karya-Karya Terbaik Kami
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
              Temukan buku-buku bermutu hasil kolaborasi PT Cakrawala Candradimuka Literasi bersama penulis-penulis berbakat di Indonesia.
            </p>

            {/* Fallback Banner Alert */}
            {isFallback && (
              <div className="mt-8 p-3 px-5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs sm:text-sm font-medium inline-flex items-center gap-2 mx-auto shadow-sm">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Mode Offline: Database tidak terhubung. Menampilkan katalog default.</span>
              </div>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* Filters & Search section */}
      <section className="px-6 relative z-10 max-w-7xl mx-auto mb-16">
        <ScrollReveal delay={0.1}>
          <div className="p-6 rounded-2xl glass-panel border border-slate-200/50 flex flex-col md:flex-row gap-6 items-center justify-between shadow-sm">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari judul buku, penulis, atau ISBN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all text-sm"
              />
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-sm"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Grid Buku */}
      <section className="px-6 relative z-10 max-w-7xl mx-auto">
        {isLoading ? (
          // Beautiful Skeleton Loader
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="flex flex-col h-full bg-white rounded-2xl border border-slate-200/50 overflow-hidden shadow-sm animate-pulse"
              >
                <div className="aspect-[3/4] w-full bg-slate-200" />
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="h-4 bg-slate-100 rounded w-1/4 mb-3" />
                    <div className="h-6 bg-slate-100 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-slate-100 rounded w-1/2" />
                  </div>
                  <div className="h-4 bg-slate-100 rounded w-1/3 mt-6" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.map((book, idx) => (
              <ScrollReveal key={book.slug} delay={(idx % 3) * 0.1} amount="some">
                <Link
                  href={`/katalog/${book.slug}`}
                  className="group flex flex-col h-full bg-white rounded-2xl border border-slate-200/50 overflow-hidden hover:border-slate-300/80 transition-all hover:-translate-y-1 duration-300 shadow-sm"
                >
                  {/* Dynamic Gradient or Image Cover */}
                  <div
                    className="aspect-[3/4] w-full p-8 relative flex flex-col justify-between select-none overflow-hidden"
                    style={{ 
                      backgroundImage: book.coverImage ? `url(${book.coverImage})` : book.coverBg,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {/* Shadow overlay and binding effect */}
                    <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-gradient-to-r from-black/25 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-70" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-black/20" />

                    {/* Logo/Publisher Badge inside cover */}
                    <div className="relative z-10 flex items-center justify-between text-white/70">
                      <span className="text-[10px] uppercase tracking-widest font-bold">
                        Cakrawala Publisher
                      </span>
                      <BookOpen className="w-4 h-4" />
                    </div>

                    {/* Title & Author on Cover */}
                    <div className="relative z-10 mt-auto">
                      <h3 className="font-extrabold text-xl leading-snug tracking-tight text-white mb-2 line-clamp-3">
                        {book.title}
                      </h3>
                      <p className="text-white/80 text-xs font-semibold uppercase tracking-wider line-clamp-1">
                        {book.author}
                      </p>
                    </div>

                    {/* Glossy shine highlight on hover */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                  </div>

                  {/* Metadata block below cover */}
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <span className="inline-block px-2.5 py-1 rounded bg-slate-100 border border-slate-200/60 text-slate-500 text-[10px] font-bold tracking-wider uppercase mb-3">
                        {book.category}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 mb-2 line-clamp-1">
                        {book.title}
                      </h4>
                      <p className="text-slate-500 text-xs mb-4 flex items-center gap-1.5 line-clamp-1">
                        <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{book.author}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-blue-600 font-bold group-hover:text-blue-700">
                      <span>Detail Selengkapnya</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <ScrollReveal>
            <div className="text-center py-20 rounded-3xl border border-dashed border-slate-200/60 bg-white/70 shadow-sm max-w-xl mx-auto">
              <Book className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Buku Tidak Ditemukan
              </h3>
              <p className="text-slate-500 text-sm px-6">
                Tidak ada buku yang cocok dengan pencarian &quot;{searchQuery}&quot; atau filter kategori &quot;{selectedCategory}&quot;. Silakan coba kata kunci lain.
              </p>
            </div>
          </ScrollReveal>
        )}
      </section>
    </div>
  );
}

