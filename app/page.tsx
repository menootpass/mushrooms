'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import CartDrawer from '@/components/cart-drawer'
import Landing from '@/components/pages/landing'
import Menu from '@/components/pages/menu'
import ProductDetail from '@/components/pages/product-detail'
import FireworksBg from '@/components/fireworks-bg'
import { Toaster } from 'sonner'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  category: string
}

type PageType = 'landing' | 'menu' | 'product-detail'

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing')
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cartOpen, setCartOpen] = useState(false)

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity,
          image: product.image,
        },
      ]
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    )
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      )
    }
  }

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product)
    setCurrentPage('product-detail')
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <Landing
            onViewMenu={() => setCurrentPage('menu')}
            onViewProduct={handleViewProduct}
          />
        )
      case 'menu':
        return (
          <Menu onViewProduct={handleViewProduct} />
        )
      case 'product-detail':
        return (
          <ProductDetail
            product={selectedProduct}
            onAddToCart={addToCart}
            onBack={() => setCurrentPage('menu')}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        cartCount={cartItems.length}
        onCartClick={() => setCartOpen(true)}
      />
      {renderPage()}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
      <FireworksBg />
      <Toaster />
    </div>
  )
}
