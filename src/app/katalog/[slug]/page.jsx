"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Calendar, Hash, Tag, FileText, MessageSquare, ChevronRight, AlertTriangle, Maximize } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import FloatingGradients from "@/components/FloatingGradients";

export default function DetailBuku({ params }) {
  // Unwrap params using React.use (Next.js 15/16 standard)
  const { slug } = React.use(params);

  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);

  // Fetch book details from API
  useEffect(() => {
    async function fetchBookDetail() {
      try {
        const res = await fetch(`/api/katalog?slug=${slug}`);
        if (res.ok) {
          const data = await res.json();
          setBook(data.book || null);
          setIsFallback(data.isFallback || false);
        } else {
          setBook(null);
        }
      } catch (err) {
        console.error("Gagal mengambil detail buku:", err);
        setBook(null);
      } finally {
        setIsLoading(false);
      }
    }

    if (slug) {
      fetchBookDetail();
    }
  }, [slug]);

  // Loading state
  if (isLoading) {
    return (
      <div className="relative min-h-screen pb-24 overflow-hidden">
        <FloatingGradients />
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-6 relative z-10">
          <div className="h-4 bg-slate-200 rounded w-32 animate-pulse" />
        </div>
        <section className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 flex justify-center">
              <div className="aspect-[3/4] w-full max-w-md rounded-2xl bg-slate-200 animate-pulse shadow-sm" />
            </div>
            <div className="lg:col-span-7">
              <div className="h-6 bg-slate-200 rounded w-20 mb-4 animate-pulse" />
              <div className="h-10 bg-slate-200 rounded w-3/4 mb-3 animate-pulse" />
              <div className="h-6 bg-slate-200 rounded w-1/2 mb-8 animate-pulse" />
              <div className="h-24 bg-slate-200 rounded w-full mb-8 animate-pulse" />
              <div className="h-12 bg-slate-200 rounded w-1/3 animate-pulse" />
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="relative min-h-[calc(100vh-250px)] flex flex-col items-center justify-center p-6 text-center">
        <FloatingGradients />
        <ScrollReveal className="z-10 max-w-md">
          <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-slate-900 mb-3">Buku Tidak Ditemukan</h1>
          <p className="text-slate-500 mb-8">
            Maaf, buku yang Anda cari tidak terdaftar dalam katalog kami atau telah dihapus.
          </p>
          <Link
            href="/katalog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Katalog</span>
          </Link>
        </ScrollReveal>
      </div>
    );
  }

  // Pre-filled WhatsApp message URL
  const waMessage = encodeURIComponent(
    `Halo PT Cakrawala Candradimuka Literasi, saya tertarik dengan informasi buku:\n\n` +
    `Judul: ${book.title}\n` +
    `Penulis: ${book.author}\n` +
    `ISBN: ${book.isbn}\n\n` +
    `Saya ingin berkonsultasi mengenai pemesanan / informasi lebih lanjut.`
  );
  const waUrl = `https://wa.me/6285888071724?text=${waMessage}`;

  return (
    <div className=" min-h-screen pb-24 overflow-hidden">
      <FloatingGradients />

      {/* Back navigation bar */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-6 relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <ScrollReveal>
          <Link
            href="/katalog"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Katalog</span>
          </Link>
        </ScrollReveal>

        {isFallback && (
          <ScrollReveal>
            <div className="p-2 px-4 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Offline Mode: Menampilkan data lokal cadangan</span>
            </div>
          </ScrollReveal>
        )}
      </div>

      {/* Detail grid content */}
      <section className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Big programmatic cover */}
          <div className="lg:col-span-5 flex justify-center">
            <ScrollReveal direction="left" className="w-full max-w-md">
              <div
                className="aspect-[3/4] w-full rounded-2xl p-10 relative flex flex-col justify-between select-none overflow-hidden shadow-xl shadow-slate-300/50 border border-slate-200/20"
                style={{ 
                  backgroundImage: book.coverImage ? `url(${book.coverImage})` : book.coverBg,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Book spine simulation overlay */}
                <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-black/30 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-70" />
                
                {/* Branding inside cover */}
                <div className="relative z-10 flex items-center justify-between text-white/70">
                  <span className="text-xs uppercase tracking-widest font-extrabold">
                    Cakrawala Publisher
                  </span>
                  <BookOpen className="w-5 h-5" />
                </div>

                {/* Title & Author on Cover */}
                <div className="relative z-10 mt-auto">
                  <h2 className="font-extrabold text-2xl sm:text-3xl leading-snug tracking-tight text-white mb-3 shadow-sm">
                    {book.title}
                  </h2>
                  <p className="text-white/90 text-sm font-bold uppercase tracking-widest leading-relaxed">
                    {book.author}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Book details */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right">
              {/* Category Badge & Title */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-50 text-blue-600 border border-blue-200/50 text-xs font-bold uppercase tracking-wider mb-4">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{book.category}</span>
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2 leading-tight">
                  {book.title}
                </h1>
                <p className="text-slate-600 text-lg font-medium">
                  Karya {book.author}
                </p>
              </div>

              {/* Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 p-5 rounded-2xl bg-white border border-slate-200/50 backdrop-blur-sm mb-8 shadow-sm">
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Hash className="w-3.5 h-3.5" /> ISBN
                  </span>
                  <span className="text-sm font-semibold text-slate-700">{book.isbn}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Terbit
                  </span>
                  <span className="text-sm font-semibold text-slate-700">{book.year}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" /> Halaman
                  </span>
                  <span className="text-sm font-semibold text-slate-700">{book.pages} Halaman</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Maximize className="w-3.5 h-3.5" /> Ukuran
                  </span>
                  <span className="text-sm font-semibold text-slate-700">{book.size || "14.8 x 21 cm"}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> Kategori
                  </span>
                  <span className="text-sm font-semibold text-slate-700">{book.category}</span>
                </div>
              </div>

              {/* Synopsis Section */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Sinopsis Buku</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {book.synopsis}
                </p>
              </div>

              {/* Preview Chapters Section */}
              {book.previewGallery && book.previewGallery.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Pratinjau Bab (Preview)</h3>
                  <div className="flex flex-col gap-2">
                    {book.previewGallery.map((preview, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200/60 text-slate-700 text-sm font-medium hover:bg-slate-50 hover:text-slate-900 transition-all cursor-default shadow-sm"
                      >
                        <span>{preview}</span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Call-to-action details */}
              <div className="pt-6 border-t border-slate-200/50">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-semibold text-base transition-all duration-300 shadow-sm hover:scale-102 w-full sm:w-auto"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Hubungi Kami Mengenai Buku Ini</span>
                </a>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>
    </div>
  );
}

