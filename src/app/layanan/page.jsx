"use client";

import {
  PenTool,
  FileCheck,
  Palette,
  BookOpen,
  Award,
  Printer,
  TrendingUp,
  Users,
  CheckCircle,
  MessageSquare,
  ArrowRight,
  Clock,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import FloatingGradients from "@/components/FloatingGradients";
import { servicesData } from "@/data/layanan";
import Link from "next/link";

// Dynamic Lucide icon mapper
const getIcon = (iconName) => {
  switch (iconName) {
    case "PenTool":
      return PenTool;
    case "FileCheck":
      return FileCheck;
    case "Palette":
      return Palette;
    case "BookOpen":
      return BookOpen;
    case "Award":
      return Award;
    case "Printer":
      return Printer;
    case "TrendingUp":
      return TrendingUp;
    case "Users":
      return Users;
    default:
      return BookOpen;
  }
};

const publishingSteps = [
  {
    step: "01",
    title: "Konsultasi & Pengiriman Naskah",
    description: "Konsultasikan naskah mentah Anda, outline naskah, atau draf awal bersama tim perwakilan redaksi kami.",
  },
  {
    step: "02",
    title: "Editing & Desain Visual",
    description: "Proses revisi tata bahasa naskah dilanjutkan dengan pembuatan desain cover premium & tata letak interior halaman.",
  },
  {
    step: "03",
    title: "Registrasi ISBN Resmi",
    description: "Pengurusan barcode dan pendaftaran legalitas naskah ke Perpustakaan Nasional RI agar tercatat secara legal.",
  },
  {
    step: "04",
    title: "Cetak & Distribusi Pasar",
    description: "Naskah dicetak rapi dan didistribusikan ke marketplace, toko buku online, atau jejaring toko buku nasional.",
  },
];

export default function Layanan() {
  return (
    <div className=" min-h-screen pb-24 overflow-hidden">
      <FloatingGradients />

      {/* Header section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <span className="text-xs font-bold text-blue-600 tracking-widest uppercase">
              Layanan Terpadu
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-3 mb-6">
              Layanan Penerbitan Buku Profesional
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
              Solusi satu atap bagi kebutuhan literasi Anda. Kami mendampingi naskah Anda dari tahap konsepsi ide dasar hingga masuk ke pasar pembaca.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-6 relative z-10 max-w-7xl mx-auto mb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((srv, idx) => {
            const IconComponent = getIcon(srv.iconName);
            return (
              <ScrollReveal key={srv.id} delay={idx * 0.08} amount="some">
                <div className="h-full p-8 rounded-2xl glass-panel border border-slate-200/50 hover:border-slate-300/85 flex flex-col justify-between group transition-all duration-300 shadow-sm">
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-50 to-violet-50 flex items-center justify-center text-blue-600 border border-slate-200/50 shadow-sm">
                        <IconComponent className="w-5.5 h-5.5" />
                      </div>
                      <span className="flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{srv.duration}</span>
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                      {srv.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                      {srv.description}
                    </p>

                    {/* Benefits list */}
                    <ul className="flex flex-col gap-2.5">
                      {srv.benefits.map((benefit, i) => (
                        <li key={i} className="flex gap-2 text-slate-600 text-xs leading-relaxed">
                          <CheckCircle className="w-4.5 h-4.5 text-blue-500 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dynamic CTA trigger link */}
                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <Link
                      href={`https://wa.me/6281234567890?text=Halo%20PT%20Cakrawala%20Candradimuka%20Literasi,%20saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(
                        srv.title
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:text-slate-900 text-slate-700 text-xs font-semibold tracking-wide transition-all uppercase shadow-sm"
                    >
                      <MessageSquare className="w-4 h-4 text-blue-500" />
                      <span>Hubungi Redaksi</span>
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Alur Kerja Section */}
      <section className="py-24 bg-slate-100/50 border-t border-slate-200/50 relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <ScrollReveal>
              <span className="text-xs font-bold text-violet-600 tracking-widest uppercase">
                Alur Proses
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-3">
                Bagaimana Kami Membantu Buku Anda?
              </h2>
              <p className="text-slate-600 mt-4">
                Sistem kerja kolaboratif yang terarah dan transparan untuk memastikan kenyamanan penulis.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {publishingSteps.map((step, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.15}>
                <div className="relative p-8 rounded-2xl bg-white border border-slate-200/50 h-full flex flex-col justify-between shadow-sm">
                  <div>
                    <span className="text-4xl font-extrabold text-slate-200 block mb-6 font-mono leading-none">
                      {step.step}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
                      {step.title}
                    </h4>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  {/* Decorative direction connector indicator on desktop */}
                  {idx < 3 && (
                    <div className="hidden md:block absolute top-[45px] right-[-24px] z-20 w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
