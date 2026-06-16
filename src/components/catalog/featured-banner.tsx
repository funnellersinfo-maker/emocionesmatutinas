'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Flame, TrendingUp, Eye, Clock, Zap, Star, Crown, ArrowRight } from 'lucide-react'
import type { Product } from '@/data/products'
import { formatCOP } from '@/store/cart'

interface FeaturedBannerProps {
  product: Product
  variant: 'destacada' | 'mas-regalado'
  onOpen: (id: string) => void
}

export function FeaturedBanner({ product, variant, onOpen }: FeaturedBannerProps) {
  if (variant === 'destacada') {
    return <HeroExperienciaDestacada product={product} onOpen={onOpen} />
  }
  return <MasRegaladoBanner product={product} onOpen={onOpen} />
}

// ─── HERO PREMIUM GIGANTE: "La noche que nunca olvidará" ───
function HeroExperienciaDestacada({ product, onOpen }: { product: Product; onOpen: (id: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="col-span-2 sm:col-span-3 lg:col-span-4"
    >
      <button
        onClick={() => onOpen(product.id)}
        className="group relative block w-full overflow-hidden rounded-[2rem] text-left shadow-2xl shadow-pink-500/20 transition-all hover:shadow-pink-500/40"
      >
        {/* Background image full-bleed */}
        <div className="relative aspect-[16/12] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 100vw"
            className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
          />
          {/* Multi-layer gradient for cinematic feel */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-950/95 via-pink-950/70 to-pink-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-pink-950/90 via-transparent to-transparent" />
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute right-1/4 top-0 h-48 w-48 rounded-full bg-fuchsia-500/20 blur-3xl" />
        </div>

        {/* Floating premium badge (top-left) */}
        <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg sm:left-8 sm:top-8">
          <Crown className="h-4 w-4" />
          Experiencia destacada
        </div>

        {/* Floating rating (top-right) */}
        <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md sm:right-8 sm:top-8">
          <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
          {product.rating}
          <span className="text-white/60">({product.reviewsCount})</span>
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 lg:p-12">
          <div className="max-w-2xl space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-pink-200">
              <span className="text-lg">{product.emoji}</span>
              {product.categoryLabel}
              <span className="text-pink-300">·</span>
              <span>Premium</span>
            </div>

            <h3 className="text-3xl font-extrabold leading-[1.05] text-white drop-shadow-lg sm:text-4xl lg:text-5xl xl:text-6xl">
              {product.name}
            </h3>

            <p className="max-w-xl text-sm text-pink-100/90 drop-shadow sm:text-base lg:text-lg">
              {product.shortDescription}
            </p>

            {/* Urgency + stats row */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                <Zap className="h-3.5 w-3.5 text-amber-300" />
                Entrega hoy disponible
              </span>
              <span className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                <Eye className="h-3.5 w-3.5 text-pink-300" />
                {47 + (product.name.length % 30)} lo vieron hoy
              </span>
              <span className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                <Clock className="h-3.5 w-3.5 text-rose-300" />
                Agenda antes de 2pm
              </span>
              <span className="flex items-center gap-1 rounded-full bg-pink-500/30 px-3 py-1.5 text-xs font-medium text-pink-100 backdrop-blur">
                <Flame className="h-3.5 w-3.5" />
                Más vendido esta semana
              </span>
            </div>

            {/* Price + CTA */}
            <div className="flex flex-wrap items-end justify-between gap-4 pt-3 sm:pt-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-pink-300/80">Desde</div>
                <div className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                  {formatCOP(product.price)}
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-pink-700 shadow-xl transition-all group-hover:scale-105 group-hover:bg-pink-50 sm:text-base">
                Reservar experiencia
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  )
}

// ─── Banner "Más regalado este mes" (más compacto, pero atractivo) ───
function MasRegaladoBanner({ product, onOpen }: { product: Product; onOpen: (id: string) => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={() => onOpen(product.id)}
      className="group relative col-span-2 flex flex-col overflow-hidden rounded-3xl border-2 border-emerald-300/40 bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-transparent p-0 text-left shadow-xl shadow-emerald-500/20 transition-all hover:-translate-y-1 hover:shadow-2xl sm:col-span-3 sm:flex-row lg:col-span-4"
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
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent" />
        {/* Floating badge */}
        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-foreground shadow-lg backdrop-blur">
          <TrendingUp className="h-4 w-4 text-emerald-600" />
          Más regalado este mes
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between gap-4 p-5 sm:p-6">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-emerald-700">
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
            <div className="text-2xl font-bold text-emerald-600 sm:text-3xl">{formatCOP(product.price)}</div>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/30 transition-all group-hover:scale-105 group-hover:bg-emerald-700">
            Ver experiencia
          </div>
        </div>
      </div>
    </motion.button>
  )
}
