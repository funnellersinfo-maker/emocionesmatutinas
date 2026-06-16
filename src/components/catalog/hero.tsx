'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ShoppingBag, Heart, ArrowRight, Sparkles, Star, Quote, Calendar, Palette, MapPin, Truck, Package } from 'lucide-react'
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
          alt="Regalos premium Emociones Matutinas en Bogotá"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-pink-950/85 via-pink-900/75 to-purple-950/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-950/70 via-transparent to-transparent" />
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-pink-400/20 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-fuchsia-400/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
        <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* Left: emotional copy */}
          <div className="max-w-2xl space-y-5 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <Heart className="h-6 w-6 animate-float text-pink-300" fill="currentColor" />
              <div className="h-px w-8 bg-pink-300/60" />
              <span className="text-xs font-medium uppercase tracking-widest text-pink-200">
                Regalos con alma · Bogotá
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-extrabold leading-[1.05] text-white drop-shadow-lg sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              No regales cosas.
              <br />
              <span className="bg-gradient-to-r from-pink-300 via-rose-300 to-orange-300 bg-clip-text text-transparent">
                Regala emociones.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base text-pink-100/90 drop-shadow sm:text-lg lg:text-xl"
            >
              Convierte un día normal en un recuerdo inolvidable. Peluches, flores, desayunos y sorpresas que llegan al corazón. Entregas programadas hoy en toda Bogotá.
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
                className="rounded-full bg-pink-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-pink-500/30 transition-all hover:scale-105 hover:bg-pink-600 hover:shadow-pink-500/50 sm:text-base"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Crear momento inolvidable
              </Button>
              <Button
                onClick={() => onCategory('sorpresas')}
                size="lg"
                variant="outline"
                className="rounded-full border-white/30 bg-white/20 px-8 py-4 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/30 sm:text-base"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Ver cajas sorpresa
              </Button>
            </motion.div>

            {/* Professionalism signals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-4"
            >
              {[
                { icon: Calendar, label: 'Entrega programada' },
                { icon: Palette, label: 'Personalización' },
                { icon: Truck, label: 'Seguimiento' },
                { icon: MapPin, label: 'Toda Bogotá' },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-1 rounded-xl bg-white/10 px-2 py-2 text-center backdrop-blur">
                  <s.icon className="h-4 w-4 text-pink-300" />
                  <span className="text-[10px] font-medium text-pink-100 sm:text-xs">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: testimonial card + stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="space-y-4">
              {/* Testimonial card */}
              <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                <Quote className="h-8 w-8 text-pink-300" />
                <p className="mt-3 text-lg italic leading-relaxed text-white">
                  &ldquo;Llegó exactamente a la hora que pedí. Mi novia lloró de felicidad. Nunca había visto una entrega tan perfecta.&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-500 text-sm font-bold text-white">
                    CG
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Camila G.</div>
                    <div className="flex items-center gap-1 text-xs text-pink-200">
                      <MapPin className="h-3 w-3" />
                      Chapinero, Bogotá
                      <span className="mx-1">·</span>
                      <span className="text-pink-300">Cliente verificada</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 text-center backdrop-blur">
                  <div className="text-2xl font-extrabold text-white">+4.000</div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-wide text-pink-200">Sorpresas entregadas</div>
                </div>
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 text-center backdrop-blur">
                  <div className="text-2xl font-extrabold text-white">+2.000</div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-wide text-pink-200">Clientes felices</div>
                </div>
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 text-center backdrop-blur">
                  <div className="text-2xl font-extrabold text-white">9 años</div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-wide text-pink-200">Creando momentos</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile stats (below hero text) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 grid grid-cols-3 gap-3 lg:hidden"
        >
          <div className="rounded-2xl border border-white/20 bg-white/10 p-3 text-center backdrop-blur">
            <div className="text-xl font-extrabold text-white">+4.000</div>
            <div className="text-[9px] uppercase tracking-wide text-pink-200">Sorpresas</div>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 p-3 text-center backdrop-blur">
            <div className="text-xl font-extrabold text-white">+2.000</div>
            <div className="text-[9px] uppercase tracking-wide text-pink-200">Clientes</div>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/10 p-3 text-center backdrop-blur">
            <div className="text-xl font-extrabold text-white">9 años</div>
            <div className="text-[9px] uppercase tracking-wide text-pink-200">Creando</div>
          </div>
        </motion.div>
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
