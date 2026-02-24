import { ShoppingBag, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NavbarProps {
  cartCount: number
  onCartClick: () => void
}

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  const handleWhatsapp = () => {
    const message = encodeURIComponent('Hello! I\'d like to know more about your products.')
    window.open(`https://wa.me/6289606883082?text=${message}`, '_blank')
  }

  return (
    <nav className="sticky top-0 z-40 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-serif font-bold text-primary">
              Mushrooms
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleWhatsapp}
              className="text-accent hover:bg-accent hover:text-white"
              title="Contact us on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onCartClick}
              className="relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
