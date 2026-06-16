'use client'

import { motion } from 'framer-motion'
import { MousePointerClick, Palette, CalendarClock, Sparkles, ArrowRight } from 'lucide-react'

interface Step {
  num: string
  icon: typeof MousePointerClick
  title: string
  desc: string
  color: string
}

const STEPS: Step[] = [
  { num: '01', icon: MousePointerClick, title: 'Eliges', desc: 'Navega 160+ experiencias emocionales y elige la que enamora.', color: 'text-pink-500' },
  { num: '02', icon: Palette, title: 'Personalizas', desc: 'Nombre, dedicatoria, color, fecha y hora. Todo a tu gusto.', color: 'text-fuchsia-500' },
  { num: '03', icon: CalendarClock, title: 'Programas', desc: 'Elige cuándo y dónde. Entregamos hoy en toda Bogotá.', color: 'text-violet-500' },
  { num: '04', icon: Sparkles, title: 'Sorprendes', desc: 'Nosotros hacemos la magia. Tú recibes las gracias.', color: 'text-rose-500' },
]

interface AsiFuncionaProps {
  onShop: () => void
}

export function AsiFunciona({ onShop }: AsiFuncionaProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-pink-50/40 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/70 px-3 py-1 text-xs font-medium text-pink-700 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            Experiencia premium
          </div>
          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Así funciona la <span className="bg-gradient-to-r from-pink-600 to-fuchsia-600 bg-clip-text text-transparent">magia</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Personaliza fecha, hora, mensaje y sorpresa en minutos. Sin complicaciones, sin sorpresas desagradables.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connector line (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-12 hidden h-0.5 bg-gradient-to-r from-transparent via-pink-200 to-transparent lg:block" />

          {STEPS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative"
            >
              <div className="relative z-10 flex h-full flex-col items-center rounded-3xl border border-pink-100 bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/10">
                <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-pink-50 to-fuchsia-50">
                  <s.icon className={`h-7 w-7 ${s.color}`} />
                  <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-pink-500 text-[10px] font-bold text-white">
                    {s.num}
                  </span>
                </div>
                <h3 className="mt-3 text-base font-bold text-foreground">{s.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <button
            onClick={onShop}
            className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/30 transition-all hover:scale-105 hover:bg-pink-600"
          >
            Empezar ahora
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
