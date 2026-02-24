'use client'

import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import ProductCard from '@/components/product-card'
import { Product } from '@/app/page'
import { MessageCircle, MapPin, Mail, Phone, Instagram, ArrowRight } from 'lucide-react'

interface LandingProps {
  onViewMenu: () => void
  onViewProduct: (product: Product) => void
}

const FEATURED_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Organic Coffee Beans',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop',
    description: 'Biji kopi organik dari petani lokal',
    category: 'Coffee',
  },
  {
    id: '2',
    name: 'Handmade Honey',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=300&fit=crop',
    description: 'Madu murni dari peternak lebah lokal',
    category: 'Honey',
  },
  {
    id: '3',
    name: 'Artisanal Bread',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
    description: 'Roti segar dipanggang dengan biji-bijian utuh',
    category: 'Bakery',
  },
]

const TEAM_MEMBERS = [
  {
    name: 'Ahmad Farhaan',
    role: 'Founder & CEO',
    desc: 'Pendiri Tridaya dan visioner di balik ide bisnis ini',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
  },
  {
    name: 'Siti Nurhaliza',
    role: 'Co-Founder & CMO',
    desc: 'Ahli strategi pemasaran dan branding',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face',
  },
  {
    name: 'Budi Santoso',
    role: 'Product Manager',
    desc: 'Mengkurasi produk-produk terbaik dari pengrajin lokal',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
  },
  {
    name: 'Dewi Lestari',
    role: 'Creative Director',
    desc: 'Menciptakan pengalaman visual yang menawan',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
  },
]

export default function Landing({
  onViewMenu,
  onViewProduct,
}: LandingProps) {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY
        const bg = heroRef.current.querySelector('.parallax-bg') as HTMLElement
        if (bg) {
          bg.style.transform = `translateY(${scrollY * 0.4}px)`
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="min-h-screen">
      {/* ====== HERO / JUMBOTRON with Parallax ====== */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Parallax background layer */}
        <div className="parallax-bg absolute inset-0 w-full h-[130%] -top-[15%]">
          {/* Gradient base */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e] via-[#16213e] to-[#0f3460]" />
          {/* Decorative pattern overlay */}
          <div className="absolute inset-0 opacity-[0.08]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
          {/* Radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(139,111,71,0.3)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(212,165,116,0.2)_0%,transparent_50%)]" />
          {/* Floating orbs */}
          <div className="absolute top-20 left-[10%] w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-[15%] w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/80 text-sm font-medium">Selamat Datang di Mushrooms</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              Produk Artisanal dari{' '}
              <span className="bg-gradient-to-r from-[#d4a574] to-[#f0c27f] bg-clip-text text-transparent">
                Komunitas Kami
              </span>
            </h1>

            <p className="text-xl text-white/70 font-body mb-10 max-w-2xl leading-relaxed">
              Temukan kerajinan tangan dan produk organik yang dibuat dengan cinta oleh pengrajin lokal. Setiap produk menceritakan kisah tradisi dan kualitas.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={onViewMenu}
                className="bg-gradient-to-r from-primary to-secondary text-white px-10 py-7 text-lg font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105"
              >
                Lihat Menu
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="px-10 py-7 text-lg font-semibold border-white/30 text-black hover:bg-white/10 rounded-xl backdrop-blur-sm"
                onClick={() => {
                  document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,64 C360,120 720,0 1080,64 C1260,96 1380,80 1440,64 L1440,120 L0,120 Z" fill="var(--background)" />
          </svg>
        </div>
      </section>

      {/* ====== FEATURES SECTION ====== */}
      <section className="py-16 bg-card border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2h2v2h20v2H22v2.5L20 20.5z' fill='%23000' fill-opacity='.5' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                100% Organik
              </h3>
              <p className="text-muted-foreground font-body">
                Semua produk kami bersumber dari petani organik bersertifikat
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                Dukung Lokal
              </h3>
              <p className="text-muted-foreground font-body">
                Kami mendukung petani dan pengrajin lokal di komunitas kami
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                Buatan Tangan
              </h3>
              <p className="text-muted-foreground font-body">
                Setiap produk dibuat dengan ketelitian dan perhatian pada detail
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== FEATURED PRODUCTS ====== */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-body text-muted-foreground uppercase tracking-widest mb-3">
              Belanja
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Produk Unggulan
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetail={onViewProduct}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={onViewMenu}
              variant="outline"
              className="px-8 py-6 text-lg border-primary text-primary hover:bg-primary hover:text-white rounded-xl"
            >
              Lihat Semua Produk
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* ====== ABOUT / COMPANY SECTION ====== */}
      <section id="about-section" className="py-20 bg-gradient-to-b from-card to-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='40' cy='40' r='3' fill='%23000'/%3E%3C/svg%3E")`,
        }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <p className="text-sm font-body text-muted-foreground uppercase tracking-widest mb-3">Tentang Kami</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Kisah Mushrooms
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-6">
                Berawal dari Sebuah Ide 💡
              </h3>
              <p className="text-muted-foreground font-body mb-4 leading-relaxed">
                Mushrooms lahir dari visi sederhana namun kuat: menghubungkan pengrajin lokal berbakat dengan konsumen yang menghargai kualitas dan keaslian. Didirikan pada tahun 2024, kami memulai perjalanan untuk membawa produk-produk terbaik dari desa ke meja Anda.
              </p>
              <p className="text-muted-foreground font-body mb-4 leading-relaxed">
                Ide ini bermula ketika pendiri kami, Ahmad Farhaan, mengunjungi berbagai desa dan melihat betapa banyaknya produk berkualitas tinggi yang tidak mendapatkan akses ke pasar yang lebih luas. Bersama timnya, ia membangun platform ini sebagai jembatan antara tradisi dan teknologi.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed">
                Setiap produk yang kami jual memiliki cerita — cerita tentang tangan-tangan terampil, resep turun-temurun, dan semangat untuk melestarikan warisan budaya Indonesia.
              </p>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50">
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop"
                  alt="Tim Mushrooms"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-serif text-lg font-semibold">Tim Kami Bekerja Bersama</p>
                  <p className="text-white/70 text-sm">Bersatu untuk mendukung pengrajin lokal</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-2xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/20 rounded-2xl -z-10" />
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/10">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-3">Visi Kami</h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                Menjadi platform e-commerce terdepan yang memberdayakan pengrajin lokal Indonesia dan memperkenalkan produk-produk artisanal berkualitas tinggi ke seluruh dunia.
              </p>
            </div>
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-8 border border-accent/10">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-3">Misi Kami</h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                Memberikan akses pasar yang adil bagi pengrajin lokal, menjaga kualitas dan keaslian setiap produk, serta menciptakan dampak ekonomi positif bagi komunitas desa di Indonesia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== TEAM SECTION ====== */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-body text-muted-foreground uppercase tracking-widest mb-3">Tim Kami</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Orang-Orang di Balik Mushrooms
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="group text-center"
              >
                {/* Photo frame */}
                <div className="relative mx-auto w-48 h-48 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl rotate-3 group-hover:rotate-6 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-secondary to-accent rounded-2xl -rotate-3 group-hover:-rotate-6 transition-transform opacity-60" />
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-serif font-bold text-foreground">{member.name}</h3>
                <p className="text-primary font-semibold text-sm mb-2">{member.role}</p>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className="bg-gradient-to-b from-[#1a0a2e] to-[#0d0620] text-white relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Main footer */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-16">
            {/* Brand */}
            <div className="md:col-span-1">
              <h2 className="text-2xl font-serif font-bold mb-4 bg-gradient-to-r from-[#d4a574] to-[#f0c27f] bg-clip-text text-transparent">
                Mushrooms
              </h2>
              <p className="text-white/60 font-body text-sm leading-relaxed mb-6">
                Produk artisanal berkualitas dari pengrajin lokal Indonesia. Setiap pembelian mendukung komunitas desa.
              </p>
              <div className="flex gap-3">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href={`https://wa.me/6289606883082`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-green-500/70 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest mb-6 text-white/80">Navigasi</h3>
              <ul className="space-y-3">
                <li><button onClick={onViewMenu} className="text-white/60 hover:text-white transition-colors font-body text-sm">Semua Produk</button></li>
                <li><button onClick={() => document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })} className="text-white/60 hover:text-white transition-colors font-body text-sm">Tentang Kami</button></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest mb-6 text-white/80">Kontak</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-white/60 text-sm font-body">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  +62 896-0688-3082
                </li>
                <li className="flex items-center gap-3 text-white/60 text-sm font-body">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  hello@villagemarket.id
                </li>
                <li className="flex items-start gap-3 text-white/60 text-sm font-body">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  Indonesia
                </li>
              </ul>
            </div>

            {/* WhatsApp CTA */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest mb-6 text-white/80">Butuh Bantuan?</h3>
              <p className="text-white/60 font-body text-sm mb-4 leading-relaxed">
                Hubungi kami via WhatsApp untuk pertanyaan, pesanan kustom, atau kolaborasi.
              </p>
              <a
                href="https://wa.me/6289606883082"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Chat WhatsApp
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm font-body">
              © 2024 Mushrooms. All rights reserved.
            </p>
            <p className="text-white/40 text-sm font-body">
              Made with ❤️ by Tridaya Team
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
