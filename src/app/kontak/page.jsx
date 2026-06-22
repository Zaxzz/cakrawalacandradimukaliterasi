"use client";

import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import FloatingGradients from "@/components/FloatingGradients";

export default function Kontak() {
  return (
    <div className="min-h-screen pb-24 overflow-hidden">
      <FloatingGradients />

      {/* Header Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <span className="text-xs font-bold text-blue-600 tracking-widest uppercase">
              Hubungi Kami
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mt-3 mb-6">
              Informasi Kontak
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
              Kami siap membantu segala urusan penerbitan, penulisan, dan penyuntingan buku Anda.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Centered Contact Info Card */}
      <section className="px-6 relative z-10 max-w-4xl mx-auto mb-20">
        <ScrollReveal>
          <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-slate-200/50 bg-white/70 shadow-md">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Detail Kontak Kami</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Alamat Kantor */}
              <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-slate-200 transition-all duration-300">
                <MapPin className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-slate-900 mb-1.5">Alamat Kantor</h5>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Kajangkoso, Mangunsoko,<br />
                    Dukun, Jawa Tengah,<br />
                    Indonesia
                  </p>
                </div>
              </div>

              {/* WhatsApp Penerbitan */}
              <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-slate-200 transition-all duration-300">
                <Phone className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                <div>
                  <h5 className="font-bold text-slate-900 mb-1.5">WhatsApp Penerbitan</h5>
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 text-sm hover:text-slate-900 transition-colors font-medium"
                  >
                    +62 812-3456-7890
                  </a>
                </div>
              </div>

              {/* Surel / Email */}
              <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-slate-200 transition-all duration-300">
                <Mail className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                <div>
                  <h5 className="font-bold text-slate-900 mb-1.5">Surel / Email</h5>
                  <a
                    href="mailto:info@cakrawalapublisher.com"
                    className="text-slate-500 text-sm hover:text-slate-900 transition-colors font-medium"
                  >
                    info@cakrawalapublisher.com
                  </a>
                </div>
              </div>

              {/* Jam Operasional */}
              <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-slate-200 transition-all duration-300">
                <Clock className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                <div>
                  <h5 className="font-bold text-slate-900 mb-1.5">Jam Operasional</h5>
                  <p className="text-slate-500 text-sm">
                    Senin - Jumat | 09:00 - 17:00 WIB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Large Bottom CTA Banner */}
      <section className="py-20 border-t border-slate-200/50 relative z-10 px-6 text-center max-w-4xl mx-auto">
        <ScrollReveal>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/50 uppercase mb-6">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Punya Pertanyaan Lain?</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Siap Menerbitkan Buku Anda?
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto mb-8 text-sm sm:text-base leading-relaxed">
            Tidak usah bingung melangkah. Anda juga dapat langsung berkonsultasi secara interaktif melalui chat WhatsApp bersama representasi kami.
          </p>
          <a
            href="https://wa.me/6281234567890?text=Halo%20PT%20Cakrawala%20Candradimuka%20Literasi,%20saya%20ingin%20bertanya%20mengenai..."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-semibold transition-all shadow-sm hover:shadow-md hover:scale-102"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Chat Hubungi Via WhatsApp</span>
          </a>
        </ScrollReveal>
      </section>
    </div>
  );
}
