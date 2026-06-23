"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-100 border-t border-slate-200/80 pt-20 pb-10 relative overflow-hidden">
      {/* Footer background glow overlay */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[200px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="group self-start">
              <Image
                src="/CCL_footer.png"
                alt="PT Cakrawala Candradimuka Literasi Logo"
                width={198}
                height={40}
                className="h-10 w-auto object-contain transition-transform group-hover:scale-102"
              />
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
              Mewujudkan buku berkualitas untuk generasi literasi Indonesia. Kami melayani jasa penerbitan, penulisan, penyuntingan, pencetakan, dan distribusi naskah secara profesional.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { name: "Instagram", href: "https://www.instagram.com/cakrawalacandradimuka.literasi/" }
              ].map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-500 hover:text-slate-900 px-3 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-white transition-all"
                >
                  {social.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-slate-900 tracking-wider uppercase">
              Navigasi
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { name: "Beranda", href: "/" },
                { name: "Tentang Kami", href: "/tentang-kami" },
                { name: "Katalog Buku", href: "/katalog" },
                { name: "Layanan Penerbitan", href: "/layanan" },
                { name: "Kontak & Alamat", href: "/kontak" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-slate-600 hover:text-slate-900 text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-slate-900 tracking-wider uppercase">
              Layanan Utama
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                "Penulisan Buku",
                "Editing & Proofreading",
                "Desain Cover Premium",
                "Layout & Typesetting",
                "Pengurusan ISBN",
                "Cetak POD & Masal",
                "Distribusi Toko Buku",
              ].map((srv) => (
                <li key={srv}>
                  <Link
                    href="/layanan"
                    className="text-slate-600 hover:text-slate-900 text-sm transition-colors"
                  >
                    {srv}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-slate-900 tracking-wider uppercase">
              Kantor Pusat
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex gap-3 text-slate-600 text-sm">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Kajangkoso, Mangunsoko, Dukun, Jawa Tengah, Indonesia
                </span>
              </li>
              <li className="flex gap-3 text-slate-600 text-sm">
                <Phone className="w-4 h-4 text-blue-500 shrink-0 mt-1" />
                <Link href="https://wa.me/6285888071724" target="_blank" className="hover:text-slate-900 transition-colors">
                  +62 858-8807-1724
                </Link>
              </li>
              <li className="flex gap-3 text-slate-600 text-sm">
                <Mail className="w-4 h-4 text-blue-500 shrink-0 mt-1" />
                <Link href="mailto:cakrawalacandradimukaliterasi@gmail.com" className="hover:text-slate-900 transition-colors">
                  cakrawalacandradimukaliterasi@gmail.com
                </Link>
              </li>
              <li className="flex gap-3 text-slate-600 text-sm">
                <Clock className="w-4 h-4 text-blue-500 shrink-0 mt-1" />
                <span>Senin - Jumat | 09:00 - 17:00 WIB</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            &copy; {currentYear} PT Cakrawala Candradimuka Literasi. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-slate-400 hover:text-slate-700 transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="#" className="text-xs text-slate-400 hover:text-slate-700 transition-colors">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
