import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import MouseTrail from "@/components/MouseTrail";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "PT Cakrawala Candradimuka Literasi | Penerbit & Cetak Buku Profesional",
    template: "%s | PT Cakrawala Candradimuka Literasi",
  },
  description:
    "PT Cakrawala Candradimuka Literasi membantu penulis, akademisi, institusi, dan komunitas menerbitkan karya terbaik mereka secara profesional. Jasa penulisan, editing, cover, layout, ISBN, cetak, dan distribusi.",
  keywords: [
    "penerbitan buku",
    "cetak buku",
    "jasa penulis",
    "editing naskah",
    "desain cover buku",
    "layout buku",
    "isbn resmi",
    "distribusi buku",
    "Cakrawala Candradimuka Literasi",
  ],
  authors: [{ name: "PT Cakrawala Candradimuka Literasi" }],
  openGraph: {
    title: "PT Cakrawala Candradimuka Literasi",
    description: "Mewujudkan Buku Berkualitas untuk Generasi Literasi Indonesia secara Profesional.",
    url: "https://cakrawalapublisher.com",
    siteName: "Cakrawala Candradimuka Literasi",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-slate-50`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-500/20 selection:text-blue-900">
        <SmoothScroll>
          <MouseTrail />
          <Navbar />
          <main className="flex-1 flex flex-col pt-[72px] md:pt-[88px]">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
