'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ShoppingBag, Heart, ArrowRight, Sparkles, Quote, Calendar, Palette, MapPin, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CATEGORIES } from '@/data/products'

interface HeroProps {
  onCategory: (id: string) => void
  onShop: () => void
}

export function Hero({ onCategory, onShop }: HeroProps) {
  return (
    <section className="relative min-h-[88vh] overflow-hidden">
      {/* Background image with dark pink overlay */}
      <div className="absolute inset-0">
        <Image
          src="/hero-cinema.png"
          alt="Regalo premium de Emociones Matutinas emocionando en Bogotá"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-pink-950/90 via-pink-900/75 to-purple-950/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-950/80 via-transparent to-pink-950/40" />
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-pink-400/20 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-fuchsia-400/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl items-center px-4 py-16 sm:px-6 lg:py-20">
        <div className="max-w-3xl space-y-6 sm:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Heart className="h-6 w-6 animate-float text-pink-300" fill="currentColor" />
            <div className="h-px w-8 bg-pink-300/60" />
            <span className="text-xs font-medium uppercase tracking-widest text-pink-200 sm:text-sm">
              La tienda de regalos más deseada de Bogotá
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-extrabold leading-[1.02] text-white drop-shadow-2xl sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            No regales cosas.
            <br />
            <span className="bg-gradient-to-r from-pink-300 via-rose-300 to-orange-300 bg-clip-text text-transparent">
              Regala un recuerdo que nunca olvidará.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl text-base text-pink-100/90 drop-shadow sm:text-lg lg:text-xl"
          >
            La sorpresa perfecta existe. Y está a solo un clic. Peluches, flores, desayunos y experiencias que llegan al corazón, entregadas hoy en toda Bogotá con dedicatoria gratis.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Button
              onClick={onShop}
              size="lg"
              className="rounded-full bg-pink-500 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-pink-500/40 transition-all hover:scale-105 hover:bg-pink-600 sm:text-base"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Crear momento inolvidable
            </Button>
            <Button
              onClick={() => onCategory('sorpresas')}
              size="lg"
              variant="outline"
              className="rounded-full border-white/30 bg-white/15 px-8 py-4 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/25 sm:text-base"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Ver cajas sorpresa
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          {/* Professionalism signals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid max-w-2xl grid-cols-2 gap-2.5 pt-4 sm:grid-cols-4"
          >
            {[
              { icon: Calendar, label: 'Entrega programada' },
              { icon: Palette, label: 'Personalización' },
              { icon: Truck, label: 'Seguimiento' },
              { icon: MapPin, label: 'Toda Bogotá' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 backdrop-blur">
                <s.icon className="h-4 w-4 shrink-0 text-pink-300" />
                <span className="text-[11px] font-medium text-pink-100 sm:text-xs">{s.label}</span>
              </div>
            ))}
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
          <h2 className="text-lg font-bold text-foreground sm:text-xl">Explora por categoría</h2>
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
