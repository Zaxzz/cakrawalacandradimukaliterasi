"use client";


import { CheckCircle2, Award, Users, Compass, Eye, ShieldCheck, Target } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import FloatingGradients from "@/components/FloatingGradients";

const milestones = [
  {
    year: "2023",
    title: "Pendirian PT Cakrawala Candradimuka Literasi",
    description:
      "Perusahaan didirikan di Dukun, Jawa Tengah dengan misi awal membantu penulis independen menerbitkan karya dengan standar penerbitan yang profesional.",
    icon: Compass,
  },
  // {
  //   year: "2021",
  //   title: "Kemitraan Resmi Perpustakaan Nasional",
  //   description:
  //     "Membuka layanan pengurusan ISBN resmi secara legal dan aman, membantu penulis akademis dan institusi mendapatkan legalitas buku.",
  //   icon: Award,
  // },
  {
    year: "2024",
    title: "Ekspansi Cetak Print on Demand (POD)",
    description:
      "Menyediakan solusi cetak berbiaya rendah tanpa minimum order untuk memfasilitasi mahasiswa, guru, dan penulis pemula menerbitkan karya perdana mereka.",
    icon: Users,
  },
  {
    year: "2025",
    title: "Jaringan Distribusi Nasional",
    description:
      "Bekerja sama dengan distributor toko buku fisik nasional untuk mendistribusikan karya-karya penulis kami ke rak-rak toko buku terkemuka.",
    icon: ShieldCheck,
  },
  {
    year: "2026",
    title: "Inovasi E-Book & Distribusi Global",
    description:
      "Meluncurkan layanan penerbitan digital ke Google Play Books dan Google Books agar karya penulis Indonesia dapat dibaca di seluruh belahan dunia.",
    icon: Target,
  },
  // {
  //   year: "2026",
  //   title: "Akselerasi Komunitas & Gerakan Literasi",
  //   description:
  //     "Fokus mendampingi puluhan institusi sekolah, kampus, dan komunitas daerah lewat workshop penulisan kreatif terstruktur demi kemajuan literasi nasional.",
  //   icon: CheckCircle2,
  // },
];

export default function TentangKami() {
  return (
    <div className="min-h-screen pb-24 overflow-hidden">
      <FloatingGradients />

      {/* Hero Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <span className="text-xs font-bold text-blue-600 tracking-widest uppercase">
              Tentang Kami
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-3 mb-6">
              Membangun Peradaban Lewat Aksara
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mx-auto">
              PT Cakrawala Candradimuka Literasi merupakan perusahaan profesional yang bergerak di bidang jasa penerbitan dan pengembangan literasi. Kami hadir sebagai jembatan yang menghubungkan ide-ide brilian para penulis dengan pembaca di seluruh penjuru negeri.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Visi & Misi Section */}
      <section className="py-16 relative z-10 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Visi */}
          <ScrollReveal direction="left" className="h-full">
            <div className="p-8 md:p-12 rounded-3xl glass-panel h-full border border-slate-200/50 flex flex-col gap-6 relative overflow-hidden group shadow-sm">
              {/* GPU-accelerated radial gradient glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.06),transparent_60%)] group-hover:bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_60%)] transition-all duration-300 pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 relative z-10 shadow-sm">
                <Eye className="w-8 h-8" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Visi Kami</h3>
                <p className="text-slate-600 leading-relaxed text-base">
                  Menjadi mitra literasi terpercaya dalam menghasilkan karya berkualitas, legal, berdaya saing tinggi, dan memberikan dampak edukatif yang positif bagi perkembangan masyarakat luas.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Misi */}
          <ScrollReveal direction="right" className="h-full">
            <div className="p-8 md:p-12 rounded-3xl glass-panel h-full border border-slate-200/50 flex flex-col justify-between gap-6 relative overflow-hidden group shadow-sm">
              {/* GPU-accelerated radial gradient glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.06),transparent_60%)] group-hover:bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.12),transparent_60%)] transition-all duration-300 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center text-violet-600 border border-violet-100 mb-6 shadow-sm">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Misi Kami</h3>
                <ul className="flex flex-col gap-3.5">
                  {[
                    "Mendukung program pengembangan dan peningkatan literasi nasional secara berkelanjutan.",
                    "Membantu penulis memformulasikan dan menerbitkan naskah yang bermutu tinggi.",
                    "Menyediakan ekosistem layanan penerbitan terpadu dan profesional yang andal.",
                    "Memanfaatkan kemudahan teknologi modern untuk memperluas akses literasi bagi khalayak ramai."
                  ].map((misi, i) => (
                    <li key={i} className="flex gap-3 text-slate-600 text-sm md:text-base">
                      <CheckCircle2 className="w-5.5 h-5.5 text-violet-500 shrink-0 mt-0.5" />
                      <span>{misi}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline Perjalanan Perusahaan */}
      <section className="py-24 relative z-10 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <ScrollReveal>
            <span className="text-xs font-bold text-indigo-600 tracking-widest uppercase">
              Milestones
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-3">
              Perjalanan & Jejak Langkah Kami
            </h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">
              Menelusuri sejarah pertumbuhan PT Cakrawala Candradimuka Literasi dalam memajukan literasi tanah air.
            </p>
          </ScrollReveal>
        </div>

        {/* Timeline wrapper */}
        <div className="relative border-l border-slate-200 ml-4 md:ml-32 py-4">
          {milestones.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="mb-16 last:mb-0 relative pl-8 md:pl-12">
                {/* Year Indicator for Desktop */}
                <div className="hidden md:block absolute left-[-150px] top-1.5 w-28 text-right font-extrabold text-2xl text-blue-600 tracking-wider">
                  {item.year}
                </div>

                {/* Timeline node circle */}
                <div className="absolute left-[-17px] top-1 w-8 h-8 rounded-full bg-slate-50 border-2 border-blue-600 flex items-center justify-center text-blue-600 shadow-sm z-10">
                  <Icon className="w-3.5 h-3.5" />
                </div>

                {/* Content Card */}
                <ScrollReveal delay={idx * 0.1} direction={idx % 2 === 0 ? "right" : "left"}>
                  <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-slate-200/50 relative hover:border-slate-300/80 transition-colors shadow-sm bg-white/70">
                    {/* Mobile Year Badge */}
                    <span className="md:hidden inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-xs font-bold mb-3">
                      {item.year}
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
