'use client'

import { motion } from 'framer-motion'
import { Music, QrCode, Video, Mail, ArrowRight, Sparkles, Crown, Infinity as InfinityIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatCOP } from '@/store/cart'

interface Exp {
  id: string
  title: string
  desc: string
  longDesc: string
  price: number
  emoji: string
  Icon: typeof Music
  gradient: string
  tag: string
  features: string[]
}

const EXPERIENCIAS: Exp[] = [
  {
    id: 'cancion',
    title: 'Canción Personalizada',
    desc: 'Una canción original compuesta solo para ti con tu mensaje, tu historia y tu dedicatoria.',
    longDesc: 'Compositor profesional crea letra y melodía únicas basadas en tu historia.',
    price: 149900,
    emoji: '🎵',
    Icon: Music,
    gradient: 'from-pink-500 via-rose-500 to-fuchsia-600',
    tag: 'Más pedida',
    features: ['Letra original', 'Melodía única', 'Voz profesional', 'Entrega en 48h'],
  },
  {
    id: 'qr',
    title: 'Experiencia QR',
    desc: 'Página web personalizada que se abre al escanear el código QR del regalo físico.',
    longDesc: 'Landing con fotos, videos, mensajes y música que tu ser querido descubre al escanear.',
    price: 89900,
    emoji: '📱',
    Icon: QrCode,
    gradient: 'from-violet-500 via-purple-500 to-indigo-600',
    tag: 'Innovadora',
    features: ['Landing personalizada', 'Galería de fotos', 'Música de fondo', 'QR físico incluido'],
  },
  {
    id: 'video',
    title: 'Video Sorpresa',
    desc: 'Video editado profesionalmente con fotos, clips y mensajes de tus seres queridos.',
    longDesc: 'Editor profesional monta un video emotivo con transitions, música y mensajes.',
    price: 129900,
    emoji: '🎬',
    Icon: Video,
    gradient: 'from-fuchsia-500 via-pink-500 to-rose-600',
    tag: 'Emocional',
    features: ['Edición profesional', 'Hasta 30 fotos', 'Música incluida', 'HD 1080p'],
  },
  {
    id: 'carta',
    title: 'Carta Interactiva',
    desc: 'Carta digital animada con música personalizada que se abre con un clic.',
    longDesc: 'Carta web animada con tu mensaje, música y animaciones sorpresa.',
    price: 79900,
    emoji: '💌',
    Icon: Mail,
    gradient: 'from-rose-500 via-orange-400 to-amber-500',
    tag: 'Tierna',
    features: ['Animaciones suaves', 'Música personalizada', 'Tu mensaje', 'Link permanente'],
  },
]

interface ExperienciasProps {
  onAdd: (exp: Exp) => void
}

export function Experiencias({ onAdd }: ExperienciasProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-950 via-purple-950 to-pink-950 py-12 text-white sm:py-16">
      {/* Decorative */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Premium header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-400/30 bg-gradient-to-r from-pink-500/20 to-fuchsia-500/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-pink-200 backdrop-blur">
            <Crown className="h-3.5 w-3.5" />
            Categoría Premium · Exclusivo
          </div>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Experiencias digitales que <span className="bg-gradient-to-r from-pink-300 via-rose-300 to-orange-300 bg-clip-text text-transparent">conquistan a distancia</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-pink-200/80 sm:text-base">
            La mayoría de tiendas de regalos no tienen esto. Detalles únicos que llegan al corazón en segundos — desde cualquier lugar del mundo.
          </p>

          {/* Premium badges */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-pink-100 backdrop-blur">
              <Sparkles className="h-3 w-3 text-pink-300" />
              100% personalizable
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-pink-100 backdrop-blur">
              <InfinityIcon className="h-3 w-3 text-pink-300" />
              Lo guardará para siempre
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-pink-100 backdrop-blur">
              <Crown className="h-3 w-3 text-pink-300" />
              No existe en otras tiendas
            </span>
          </div>
        </motion.div>

        {/* Premium cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {EXPERIENCIAS.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 backdrop-blur-md transition-all hover:-translate-y-1.5 hover:border-pink-400/40 hover:bg-white/10"
            >
              {/* Top gradient banner */}
              <div className={`relative h-32 bg-gradient-to-br ${exp.gradient} p-5`}>
                <div className="pointer-events-none absolute -right-3 -top-3 text-8xl opacity-20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  {exp.emoji}
                </div>
                <div className="relative flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/25 backdrop-blur">
                    <exp.Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="rounded-full bg-white/25 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur">
                    {exp.tag}
                  </span>
                </div>
              </div>

              <div className="flex flex-col p-5">
                <h3 className="text-lg font-bold text-white">{exp.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-pink-100/70">{exp.desc}</p>

                {/* Features */}
                <ul className="mt-3 space-y-1.5">
                  {exp.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-1.5 text-xs text-pink-100/80">
                      <span className="grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full bg-pink-500/30 text-[8px] text-pink-200">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-wide text-pink-300/70">Desde</div>
                    <span className="text-lg font-bold text-white">{formatCOP(exp.price)}</span>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => onAdd(exp)}
                    className="rounded-full bg-pink-500 text-white hover:bg-pink-600"
                  >
                    Agregar
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Premium footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-center text-xs text-pink-200/60"
        >
          ✨ Experiencias únicas que no encontrarás en ninguna otra tienda de regalos de Bogotá
        </motion.div>
      </div>
    </section>
  )
}
