'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Flame, TrendingUp, Eye, Clock, Zap } from 'lucide-react'
import type { Product } from '@/data/products'
import { formatCOP } from '@/store/cart'

interface FeaturedBannerProps {
  product: Product
  variant: 'destacada' | 'mas-regalado'
  onOpen: (id: string) => void
}

export function FeaturedBanner({ product, variant, onOpen }: FeaturedBannerProps) {
  const isDestacada = variant === 'destacada'
  const config = isDestacada
    ? {
        label: 'Experiencia destacada',
        icon: Flame,
        iconColor: 'text-orange-400',
        bg: 'from-pink-500/20 via-fuchsia-500/10 to-transparent',
        border: 'border-pink-300/40',
        glow: 'shadow-pink-500/20',
      }
    : {
        label: 'Más regalado este mes',
        icon: TrendingUp,
        iconColor: 'text-emerald-400',
        bg: 'from-emerald-500/15 via-teal-500/10 to-transparent',
        border: 'border-emerald-300/40',
        glow: 'shadow-emerald-500/20',
      }

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={() => onOpen(product.id)}
      className={`group relative col-span-2 flex flex-col overflow-hidden rounded-3xl border-2 bg-gradient-to-br ${config.bg} ${config.border} p-0 text-left shadow-xl ${config.glow} transition-all hover:-translate-y-1 hover:shadow-2xl sm:col-span-3 sm:flex-row lg:col-span-4`}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-auto sm:w-1/2">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-950/40 to-transparent" />
        {/* Floating badge */}
        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-foreground shadow-lg backdrop-blur">
          <config.icon className={`h-4 w-4 ${config.iconColor}`} />
          {config.label}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between gap-4 p-5 sm:p-6">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-pink-600">
            <span>{product.emoji}</span>
            <span>{product.categoryLabel}</span>
          </div>
          <h3 className="text-xl font-bold leading-tight text-foreground sm:text-2xl lg:text-3xl">
            {product.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground sm:text-base">
            {product.shortDescription}
          </p>

          {/* Urgency signals */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-medium">
            <span className="flex items-center gap-1 rounded-full bg-orange-100 px-2 py-1 text-orange-700">
              <Zap className="h-3 w-3" />
              Entrega hoy disponible
            </span>
            <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-emerald-700">
              <Eye className="h-3 w-3" />
              {12 + (product.name.length % 20)} lo vieron hoy
            </span>
            <span className="flex items-center gap-1 rounded-full bg-pink-100 px-2 py-1 text-pink-700">
              <Clock className="h-3 w-3" />
              Agenda antes de 2pm
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Desde</div>
            <div className="text-2xl font-bold text-pink-600 sm:text-3xl">{formatCOP(product.price)}</div>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-pink-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pink-500/30 transition-all group-hover:scale-105 group-hover:bg-pink-600">
            Ver experiencia
          </div>
        </div>
      </div>
    </motion.button>
  )
}
