'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { formatCOP, useCart } from '@/store/cart'
import type { Product } from '@/data/products'

interface ProductCardProps {
  product: Product
  onOpen: (id: string) => void
  index?: number
}

const badgeStyles: Record<string, string> = {
  'Más vendido': 'bg-rose-600 text-white hover:bg-rose-600',
  'Premium': 'bg-amber-600 text-white hover:bg-amber-600',
  'Nuevo': 'bg-emerald-600 text-white hover:bg-emerald-600',
  'Favorito': 'bg-fuchsia-600 text-white hover:bg-fuchsia-600',
}

export function ProductCard({ product, onOpen, index = 0 }: ProductCardProps) {
  const addItem = useCart((s) => s.addItem)
  const [liked, setLiked] = useState(false)
  const [imgIdx, setImgIdx] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const badge = product.badge && badgeStyles[product.badge]

  const quickAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.4) }}
      className="h-full"
    >
      <Card
        className="group relative overflow-hidden border-border/60 bg-card transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/10 hover:-translate-y-1 cursor-pointer h-full flex flex-col"
        onClick={() => onOpen(product.id)}
        onMouseEnter={() => product.images.length > 1 && setImgIdx(1)}
        onMouseLeave={() => setImgIdx(0)}
      >
        {/* Image area */}
        <div className="relative aspect-square overflow-hidden bg-muted/30">
          {!loaded && <div className="absolute inset-0 animate-pulse bg-muted" />}
          <Image
            src={product.images[imgIdx] || product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={cn(
              'object-cover transition-all duration-500 group-hover:scale-105',
              loaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={() => setLoaded(true)}
          />

          {/* Badge */}
          {badge && (
            <Badge className={cn('absolute left-3 top-3 z-10 shadow-sm', badge)}>
              {product.badge}
            </Badge>
          )}

          {/* Like button */}
          <button
            onClick={(e) => { e.stopPropagation(); setLiked(!liked) }}
            className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/80 backdrop-blur transition-colors hover:bg-white"
            aria-label="Me gusta"
          >
            <Heart className={cn('h-4 w-4 transition-all', liked ? 'fill-rose-600 text-rose-600' : 'text-foreground/60')} />
          </button>

          {/* Quick add - appears on hover (desktop) */}
          <div className="absolute inset-x-3 bottom-3 z-10 hidden translate-y-2 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:flex">
            <Button
              size="sm"
              onClick={quickAdd}
              className="flex-1 bg-rose-600 text-white hover:bg-rose-700 shadow-lg"
            >
              <ShoppingCart className="mr-1.5 h-4 w-4" />
              Agregar
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={(e) => { e.stopPropagation(); onOpen(product.id) }}
              className="bg-white/90 text-foreground hover:bg-white shadow-lg"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-3 sm:p-4">
          <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
            <span>{product.emoji}</span>
            <span>{product.categoryLabel}</span>
          </div>
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-foreground sm:text-[15px]">
            {product.name}
          </h3>

          <div className="mt-1.5 flex items-center gap-1.5">
            <div className="flex items-center">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span className="ml-0.5 text-xs font-medium text-foreground">{product.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">({product.reviewsCount})</span>
          </div>

          <div className="mt-auto pt-3">
            <div className="text-base font-bold text-rose-700 sm:text-lg">
              {formatCOP(product.price)}
            </div>
            <Button
              size="sm"
              onClick={quickAdd}
              className="mt-2 w-full bg-rose-600 text-white hover:bg-rose-700 sm:hidden"
            >
              <ShoppingCart className="mr-1.5 h-4 w-4" />
              Agregar
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
