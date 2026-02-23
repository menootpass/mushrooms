'use client'

import { useState } from 'react'
import ProductCard from '@/components/product-card'
import { Product } from '@/app/page'
import { Button } from '@/components/ui/button'

interface MenuProps {
  onViewProduct: (product: Product) => void
}

const ALL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Organic Coffee Beans',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b3f7?w=400&h=300&fit=crop',
    description: 'Biji kopi organik dari petani lokal',
    category: 'Coffee',
  },
  {
    id: '2',
    name: 'Handmade Honey',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1587049352917-46ea752939d0?w=400&h=300&fit=crop',
    description: 'Madu murni dari peternak lebah lokal',
    category: 'Honey',
  },
  {
    id: '3',
    name: 'Artisanal Bread',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1586985289688-cacf33b6dbb8?w=400&h=300&fit=crop',
    description: 'Roti segar dipanggang dengan biji-bijian utuh',
    category: 'Bakery',
  },
  {
    id: '4',
    name: 'Homemade Jam',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1589985643862-18cd4ae13d38?w=400&h=300&fit=crop',
    description: 'Selai buah dari buah beri segar',
    category: 'Preserves',
  },
  {
    id: '5',
    name: 'Herbal Tea Mix',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1597318134299-a7d38f70db25?w=400&h=300&fit=crop',
    description: 'Campuran herbal kering untuk kesehatan',
    category: 'Tea',
  },
  {
    id: '6',
    name: 'Wooden Spoons Set',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=300&fit=crop',
    description: 'Peralatan dapur kayu buatan tangan',
    category: 'Kitchenware',
  },
  {
    id: '7',
    name: 'Organic Olive Oil',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop',
    description: 'Minyak zaitun extra virgin dari kebun warisan',
    category: 'Oils',
  },
  {
    id: '8',
    name: 'Handwoven Basket',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400&h=300&fit=crop',
    description: 'Keranjang anyaman tradisional',
    category: 'Home Decor',
  },
  {
    id: '9',
    name: 'Spice Blend Collection',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1596040571923-8bc5bb6c3ba9?w=400&h=300&fit=crop',
    description: 'Koleksi rempah-rempah organik pilihan',
    category: 'Spices',
  },
]

const CATEGORIES = [
  'All',
  'Coffee',
  'Honey',
  'Bakery',
  'Preserves',
  'Tea',
  'Kitchenware',
  'Oils',
  'Home Decor',
  'Spices',
]

export default function Menu({ onViewProduct }: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProducts =
    selectedCategory === 'All'
      ? ALL_PRODUCTS
      : ALL_PRODUCTS.filter((p) => p.category === selectedCategory)

  return (
    <main className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <p className="text-sm font-body text-muted-foreground uppercase tracking-widest mb-2">
            Jelajahi
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Produk Kami
          </h1>
          <p className="text-lg text-muted-foreground font-body max-w-2xl">
            Telusuri koleksi pilihan produk artisanal dan organik dari pengrajin lokal.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mt-4 rounded-full" />
        </div>

        {/* Category Filter */}
        <div className="mb-12 overflow-x-auto pb-2">
          <div className="flex gap-2 flex-nowrap">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={
                  selectedCategory === category ? 'default' : 'outline'
                }
                className={`flex-shrink-0 rounded-xl ${selectedCategory === category
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'border-primary text-primary hover:bg-primary hover:text-white'
                  }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetail={onViewProduct}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-6xl mb-4">🔍</p>
            <p className="text-muted-foreground text-lg">
              Tidak ada produk dalam kategori ini
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
