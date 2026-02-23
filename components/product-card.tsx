import { Product } from '@/app/page'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
  onViewDetail: (product: Product) => void
  onAddToCart?: (product: Product) => void
}

export default function ProductCard({
  product,
  onViewDetail,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div
      className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary transition-colors group cursor-pointer"
      onClick={() => onViewDetail(product)}
    >
      <div className="relative w-full h-48 bg-muted overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide font-body">
          {product.category}
        </p>
        <h3 className="text-lg font-serif font-semibold text-foreground mt-1 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-serif font-bold text-primary">
            Rp{product.price.toLocaleString('id-ID')}
          </span>

          {onAddToCart && (
            <Button
              onClick={(e) => {
                e.stopPropagation()
                onAddToCart(product)
              }}
              className="bg-accent hover:bg-accent/90 text-white"
              size="sm"
            >
              Add
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
