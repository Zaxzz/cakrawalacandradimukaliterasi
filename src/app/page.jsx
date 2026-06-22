"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  ArrowRight,
  MessageSquare,
  Award,
  Users,
  Printer,
  ChevronRight,
  Star,
  Quote,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import FloatingGradients from "@/components/FloatingGradients";

// Mock statistics data
const stats = [
  { value: "500+", label: "Buku Diterbitkan", icon: BookOpen },
  { value: "350+", label: "Penulis Didampingi", icon: Users },
  { value: "50K+", label: "Buku Terdistribusi", icon: TrendingUp },
  { value: "99%", label: "Tingkat Kepuasan", icon: Award },
];

// Highlighted services preview
const highlightedServices = [
  {
    title: "Penulisan & Ghostwriting",
    description: "Pendampingan penyusunan naskah biografi, buku ilmiah, atau populer dari ide dasar hingga naskah utuh siap terbit.",
    icon: Sparkles,
    color: "from-blue-500/20 to-indigo-500/20",
  },
  {
    title: "Penyuntingan & Editing",
    description: "Koreksi bahasa, ejaan, efektivitas kalimat, serta koherensi alur cerita oleh editor profesional bersertifikasi.",
    icon: Award,
    color: "from-violet-500/20 to-purple-500/20",
  },
  {
    title: "Desain Cover & Tata Letak",
    description: "Desain visual sampul premium dan penataan layout isi halaman buku sesuai standar industri percetakan modern.",
    icon: Printer,
    color: "from-pink-500/20 to-rose-500/20",
  },
];

// Mock testimonials
const testimonials = [
  {
    quote: "Menerbitkan buku biografi saya di PT Cakrawala Candradimuka Literasi adalah keputusan terbaik. Tim editor sangat teliti dan desain covernya luar biasa indah.",
    author: "Prof. Dr. Ir. H. Ahmad Fauzi",
    role: "Guru Besar & Akademisi",
    rating: 5,
  },
  {
    quote: "Proses pengurusan ISBN resmi sangat cepat dan transparan. Buku kumpulan puisi saya juga dicetak dengan kualitas kertas premium yang sangat nyaman dibaca.",
    author: "Dian Sasmita",
    role: "Penulis Novel & Penyair",
    rating: 5,
  },
  {
    quote: "Sebagai institusi, kami sangat terbantu dengan program pendampingan literasi penulisan buku antologi bersama guru-guru. Sangat profesional!",
    author: "Budi Rahardjo, M.Pd.",
    role: "Kepala Yayasan Pendidikan",
    rating: 5,
  },
];

export default function Home() {
  return (
    <div className=" min-h-screen overflow-hidden">
      {/* Floating Gradient Blurs */}
      <FloatingGradients />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[calc(100vh-88px)] flex items-center justify-center md:py-20 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10 w-full">



          {/* Headline Animation */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]"
          >
            Mewujudkan Buku Berkualitas untuk{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-600">
              Generasi Literasi Indonesia
            </span>
          </motion.h1>

          {/* Subheadline Animation */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-600 mb-12 leading-relaxed font-normal max-w-2xl"
          >
            PT Cakrawala Candradimuka Literasi membantu penulis, akademisi, institusi, dan komunitas menerbitkan karya terbaik mereka secara profesional dari hulu ke hilir.
          </motion.p>

          {/* Buttons Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Link
              href="/katalog"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-900 border border-slate-200 font-semibold hover:bg-slate-50 transition-all duration-300 shadow-sm hover:scale-102 flex items-center justify-center gap-2 group"
            >
              <span>Lihat Katalog</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="https://wa.me/6281234567890?text=Halo%20PT%20Cakrawala%20Candradimuka%20Literasi,%20saya%20tertarik%20ingin%20berkonsultasi%20mengenai%20naskah%20buku%20saya."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border border-slate-200 text-slate-700 font-semibold hover:bg-slate-100 hover:text-slate-900 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>Konsultasi Gratis</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-20 bg-white/40 border-y border-slate-200/50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, idx) => {
              const IconComponent = stat.icon;
              return (
                <ScrollReveal
                  key={idx}
                  delay={idx * 0.1}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/85 border border-slate-200/50 shadow-sm backdrop-blur-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 mb-4 border border-blue-500/10">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-sm text-slate-500 font-medium">
                    {stat.label}
                  </span>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. HIGHLIGHTED SERVICES SECTION */}
      <section className="py-24 relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal>
            <span className="text-xs font-bold text-blue-600 tracking-widest uppercase">
              Layanan Unggulan
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-3 mb-4">
              Solusi Penerbitan Buku Terbaik
            </h2>
            <p className="text-slate-600">
              Dari tahap coretan naskah kasar hingga menjadi buku fisik dan digital yang dipasarkan luas di berbagai toko buku terkemuka.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {highlightedServices.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <ScrollReveal key={idx} delay={idx * 0.15}>
                <div className="h-full p-8 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600/20 to-violet-600/20 flex items-center justify-center text-blue-600 border border-slate-200/50 mb-6 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {srv.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {srv.description}
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center text-blue-600 text-sm font-semibold group-hover:text-blue-700 transition-colors">
                    <span>Selengkapnya</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="text-center">
          <ScrollReveal delay={0.3}>
            <Link
              href="/layanan"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm"
            >
              <span>Lihat Semua Layanan (8 Layanan)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. CLIENT TESTIMONIALS */}
      <section className="py-24 bg-slate-100/50 border-y border-slate-200/50 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <ScrollReveal>
              <span className="text-xs font-bold text-violet-600 tracking-widest uppercase">
                Testimoni
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-3 mb-4">
                Apa Kata Para Penulis Kami?
              </h2>
              <p className="text-slate-600">
                Kami telah mendampingi ratusan penulis dalam merampungkan naskah impian mereka. Berikut adalah ulasan jujur dari mereka.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.15}>
                <div className="p-8 rounded-2xl bg-white/80 border border-slate-200/50 relative flex flex-col justify-between h-full shadow-sm">
                  <Quote className="absolute top-6 right-8 w-10 h-10 text-slate-100" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed italic mb-6">
                      &quot;{test.quote}&quot;
                    </p>
                  </div>
                  <div className="relative z-10 pt-6 border-t border-slate-100">
                    <h5 className="font-bold text-slate-900 text-sm">{test.author}</h5>
                    <span className="text-xs text-slate-400">{test.role}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
