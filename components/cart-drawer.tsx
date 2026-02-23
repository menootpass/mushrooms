'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Trash2, Plus, Minus, X, CreditCard, MessageCircle } from 'lucide-react'
import { CartItem } from '@/app/page'
import Image from 'next/image'
import { toast } from 'sonner'

declare global {
  interface Window {
    snap?: {
      pay: (token: string, options?: {
        onSuccess?: (result: unknown) => void
        onPending?: (result: unknown) => void
        onError?: (result: unknown) => void
        onClose?: () => void
      }) => void
    }
  }
}

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
}: CartDrawerProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) {
      toast.error('Keranjang kosong!')
      return
    }

    const itemsList = items
      .map((item) => `${item.name} (x${item.quantity})`)
      .join('%0A')
    const totalPrice = `Total: Rp${total.toLocaleString('id-ID')}`

    const message = encodeURIComponent(
      `Hi! I'd like to order:%0A${itemsList}%0A%0A${totalPrice}`
    )

    window.open(`https://wa.me/6289606883082?text=${message}`, '_blank')
    toast.success('Membuka WhatsApp untuk menyelesaikan pesanan!')
    onClose()
  }

  const handleMidtransCheckout = async () => {
    if (items.length === 0) {
      toast.error('Keranjang kosong!')
      return
    }

    setIsProcessing(true)

    try {
      const response = await fetch('/api/midtrans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          total,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Gagal membuat transaksi')
      }

      if (window.snap) {
        window.snap.pay(data.token, {
          onSuccess: () => {
            toast.success('Pembayaran berhasil! 🎉')
            onClose()
          },
          onPending: () => {
            toast.info('Menunggu pembayaran...')
          },
          onError: () => {
            toast.error('Pembayaran gagal. Silakan coba lagi.')
          },
          onClose: () => {
            toast.info('Popup pembayaran ditutup')
          },
        })
      } else {
        toast.error('Midtrans belum dimuat. Silakan refresh halaman.')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      toast.error('Gagal memproses pembayaran. Silakan coba lagi.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 h-full w-full sm:w-96 bg-card z-50 shadow-2xl flex flex-col transition-transform"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
          <h2 className="text-2xl font-serif font-bold text-primary">
            🛒 Keranjang
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-6xl mb-4">🛍️</p>
              <p className="text-muted-foreground text-lg">
                Keranjang masih kosong
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                Yuk mulai belanja!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 border border-border rounded-lg p-3 hover:border-primary/30 transition-colors"
                >
                  <div className="relative w-20 h-20 flex-shrink-0 bg-muted rounded overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">
                        {item.name}
                      </h3>
                      <p className="text-primary font-serif font-semibold">
                        Rp{item.price.toLocaleString('id-ID')}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-6 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:bg-red-50"
                    onClick={() => onRemove(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4 bg-gradient-to-t from-primary/5 to-transparent">
            <div className="flex justify-between items-center">
              <span className="text-lg font-serif text-primary">Total:</span>
              <span className="text-2xl font-serif font-bold text-primary">
                Rp{total.toLocaleString('id-ID')}
              </span>
            </div>
            <Button
              onClick={handleMidtransCheckout}
              disabled={isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-base"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              {isProcessing ? 'Memproses...' : 'Bayar dengan Midtrans'}
            </Button>
            <Button
              onClick={handleWhatsAppCheckout}
              variant="outline"
              className="w-full border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-semibold py-6 text-base"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Checkout via WhatsApp
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
