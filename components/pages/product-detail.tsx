'use client'

import { useState } from 'react'
import { Product } from '@/app/page'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus, Minus } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

interface ProductDetailProps {
  product: Product | null
  onAddToCart: (product: Product, quantity: number) => void
  onBack: () => void
}

export default function ProductDetail({
  product,
  onAddToCart,
  onBack,
}: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return null
  }

  const handleAddToCart = () => {
    onAddToCart(product, quantity)
    toast.success(`Added ${quantity} × ${product.name} to cart!`)
    setQuantity(1)
  }

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  return (
    <main className="min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-primary hover:text-primary/80 font-body font-semibold mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Menu
        </button>

        {/* Product Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-square bg-muted rounded-lg overflow-hidden border border-border">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <p className="text-sm font-body text-muted-foreground uppercase tracking-wide mb-2">
              {product.category}
            </p>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              {product.name}
            </h1>

            <div className="mb-8">
              <span className="text-5xl font-serif font-bold text-primary">
                Rp{product.price.toLocaleString('id-ID')}
              </span>
            </div>

            <p className="text-lg text-muted-foreground font-body mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Features (placeholder for more details) */}
            <div className="space-y-3 mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="font-body text-foreground">
                  Sourced from certified organic suppliers
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="font-body text-foreground">
                  Handcrafted with attention to detail
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="font-body text-foreground">
                  Supports local artisans
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <p className="text-sm font-body font-semibold text-foreground mb-4">
                Quantity
              </p>
              <div className="flex items-center gap-4 bg-muted rounded-lg p-2 w-fit">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDecrement}
                  className="h-8 w-8 hover:bg-background"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-lg font-semibold w-8 text-center">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleIncrement}
                  className="h-8 w-8 hover:bg-background"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                className="w-full bg-accent hover:bg-accent/90 text-white py-6 text-lg font-semibold"
              >
                Add to Cart
              </Button>
              <Button
                onClick={onBack}
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-white py-6 text-lg"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
