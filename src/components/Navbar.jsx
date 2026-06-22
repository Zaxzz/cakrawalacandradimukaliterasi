"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageSquare } from "lucide-react";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/tentang-kami", label: "Tentang Kami" },
  { href: "/katalog", label: "Katalog" },
  { href: "/layanan", label: "Layanan" },
  { href: "/kontak", label: "Kontak" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on page transition
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(false), 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 py-4 bg-white/80 border-b border-slate-200/50 backdrop-blur-lg shadow-sm shadow-slate-100/50"
        style={{
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-blue-500/5 group-hover:scale-105 transition-transform bg-white flex items-center justify-center border border-slate-100">
              <Image 
                src="/CCL_header.png" 
                alt="CCL Logo" 
                width={40}
                height={40}
                className="w-full h-full object-contain" 
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-slate-900 leading-none">
                Cakrawala
              </span>
              <span className="text-[10px] tracking-widest text-slate-500 font-medium uppercase mt-1">
                Candradimuka Literasi
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors hover:text-slate-900 ${
                    isActive ? "text-slate-900 font-semibold" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavTab"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 bg-blue-50/80 rounded-full z-[-1] border border-blue-100/50"
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Consultation Button */}
          <div className="hidden md:block">
            <Link
              href="https://wa.me/6281234567890?text=Halo%20PT%20Cakrawala%20Candradimuka%20Literasi,%20saya%20ingin%20konsultasi%20mengenai%20penerbitan%20buku."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-semibold text-sm transition-all duration-300 shadow-sm hover:scale-102"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Konsultasi Gratis</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-0 bottom-0 z-40 bg-white/95 backdrop-blur-lg pt-24 pb-8 px-8 flex flex-col justify-between md:hidden border-b border-slate-200"
          >
            <div className="flex flex-col gap-4 mt-8">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`text-2xl font-bold block py-2 ${
                        isActive
                          ? "bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12 flex flex-col gap-4"
            >
              <Link
                href="https://wa.me/6281234567890?text=Halo%20PT%20Cakrawala%20Candradimuka%20Literasi,%20saya%20ingin%20konsultasi%20mengenai%20penerbitan%20buku."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-semibold text-base transition-transform active:scale-98 shadow-sm"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Konsultasi Gratis</span>
              </Link>
              <p className="text-center text-xs text-slate-400">
                PT Cakrawala Candradimuka Literasi &copy; 2026
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
