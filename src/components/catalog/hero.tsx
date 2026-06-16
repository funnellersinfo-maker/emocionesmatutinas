'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Truck, ShieldCheck, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CATEGORIES } from '@/data/products'

interface HeroProps {
  onCategory: (id: string) => void
  onShop: () => void
}

export function Hero({ onCategory, onShop }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-rose-50 via-white to-fuchsia-50">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-rose-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-20 h-80 w-80 rounded-full bg-fuchsia-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/70 px-3 py-1 text-xs font-medium text-rose-700 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              El marketplace de regalos #1 en Bogotá
            </div>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Regalos que <span className="bg-gradient-to-r from-rose-600 to-fuchsia-600 bg-clip-text text-transparent">enamoran</span> al instante
            </h1>
            <p className="mt-4 max-w-md text-base text-muted-foreground sm:text-lg">
              Peluches, flores, desayunos y sorpresas premium. Curados con amor y entregados hoy mismo en toda Bogotá.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={onShop} size="lg" className="bg-rose-600 text-white hover:bg-rose-700 shadow-lg shadow-rose-600/25">
                Explorar catálogo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button onClick={() => onCategory('sorpresas')} size="lg" variant="outline" className="border-rose-200">
                🎉 Cajas sorpresa
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-rose-600" />
                <div>
                  <div className="text-sm font-bold">Entrega hoy</div>
                  <div className="text-xs text-muted-foreground">Bogotá y alrededores</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-rose-600" />
                <div>
                  <div className="text-sm font-bold">Pago seguro</div>
                  <div className="text-xs text-muted-foreground">100% protegido</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-rose-600" />
                <div>
                  <div className="text-sm font-bold">Abierto 24/7</div>
                  <div className="text-xs text-muted-foreground">Pide cuando quieras</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Visual collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] overflow-hidden rounded-3xl bg-gradient-to-br from-rose-200 to-rose-400 shadow-xl">
                  <div className="flex h-full items-center justify-center text-6xl">🌹</div>
                </div>
                <div className="aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-amber-200 to-orange-400 shadow-xl">
                  <div className="flex h-full items-center justify-center text-6xl">🎂</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-fuchsia-200 to-pink-400 shadow-xl">
                  <div className="flex h-full items-center justify-center text-6xl">🧸</div>
                </div>
                <div className="aspect-[3/4] overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-200 to-teal-400 shadow-xl">
                  <div className="flex h-full items-center justify-center text-6xl">🎈</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function CategoryStrip({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-8 sm:gap-3">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`group flex flex-col items-center gap-2 rounded-2xl border p-3 transition-all ${
                active === c.id ? 'border-rose-600 bg-rose-50' : 'border-border bg-card hover:border-rose-300 hover:bg-rose-50/50'
              }`}
            >
              <span className="text-2xl transition-transform group-hover:scale-110 sm:text-3xl">{c.emoji}</span>
              <span className={`text-[11px] font-semibold sm:text-xs ${active === c.id ? 'text-rose-700' : 'text-foreground'}`}>
                {c.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
