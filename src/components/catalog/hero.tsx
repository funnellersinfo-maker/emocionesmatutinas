'use client'

import { motion } from 'framer-motion'
import { ShoppingBag, Heart, ArrowRight, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { CATEGORIES } from '@/data/products'

interface HeroProps {
  onCategory: (id: string) => void
  onShop: () => void
}

export function Hero({ onCategory, onShop }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background image with dark pink overlay */}
      <div className="absolute inset-0">
        <Image
          src="/hero-banner.png"
          alt="Regalos premium Emociones Matutinas"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/80 via-pink-800/70 to-purple-900/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 via-transparent to-transparent" />
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-pink-400/20 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-fuchsia-400/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
        <div className="max-w-xl space-y-5 sm:space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Heart className="h-6 w-6 animate-float text-pink-300" fill="currentColor" />
            <div className="h-px w-8 bg-pink-300/60" />
            <span className="text-xs font-medium uppercase tracking-widest text-pink-200">
              Regalos con alma
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl"
          >
            Haz sonreír a quien más amas
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base text-pink-100/90 drop-shadow sm:text-lg"
          >
            Regalos, desayunos y sorpresas para cualquier ocasión. Entregas programadas en toda Bogotá con dedicatoria gratis.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Button
              onClick={onShop}
              size="lg"
              className="rounded-full bg-pink-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-pink-500/30 transition-all hover:scale-105 hover:bg-pink-600 hover:shadow-pink-500/50 sm:text-base"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Comprar ahora
            </Button>
            <Button
              onClick={() => onCategory('sorpresas')}
              size="lg"
              variant="outline"
              className="rounded-full border-white/30 bg-white/20 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/30 sm:text-base"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Ver sorpresas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-pink-100/80"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-bold text-white">4.9</span>
              <span className="text-xs">★ satisfacción</span>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-bold text-white">+4.000</span>
              <span className="text-xs">sorpresas<br />compartidas</span>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-bold text-white">+2.000</span>
              <span className="text-xs">clientes<br />felices</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function CategoryStrip({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <section id="mas-vendidos" className="border-b border-pink-100 bg-gradient-to-b from-pink-50/80 to-background">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-xl">🛍️</span>
          <h2 className="text-lg font-bold text-foreground sm:text-xl">Categorías</h2>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-8 sm:gap-3">
          <button
            onClick={() => onSelect('all')}
            className={`group flex flex-col items-center gap-2 rounded-2xl border p-3 transition-all ${
              active === 'all'
                ? 'border-pink-500 bg-pink-500 text-white shadow-lg shadow-pink-500/30'
                : 'border-pink-100 bg-white hover:border-pink-300 hover:bg-pink-50'
            }`}
          >
            <span className="text-2xl transition-transform group-hover:scale-110 sm:text-3xl">🛍️</span>
            <span className={`text-[11px] font-semibold sm:text-xs ${active === 'all' ? 'text-white' : 'text-foreground'}`}>
              Todos
            </span>
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`group flex flex-col items-center gap-2 rounded-2xl border p-3 transition-all ${
                active === c.id
                  ? 'border-pink-500 bg-pink-500 text-white shadow-lg shadow-pink-500/30'
                  : 'border-pink-100 bg-white hover:border-pink-300 hover:bg-pink-50'
              }`}
            >
              <span className="text-2xl transition-transform group-hover:scale-110 sm:text-3xl">{c.emoji}</span>
              <span className={`text-[11px] font-semibold sm:text-xs ${active === c.id ? 'text-white' : 'text-foreground'}`}>
                {c.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
