'use client'

import { motion } from 'framer-motion'
import { Music, QrCode, Video, Mail, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { formatCOP } from '@/store/cart'

interface Exp {
  id: string
  title: string
  desc: string
  price: number
  emoji: string
  Icon: typeof Music
  gradient: string
  image: string
}

const EXPERIENCIAS: Exp[] = [
  {
    id: 'cancion',
    title: 'Canción Personalizada',
    desc: 'Una canción original creada solo para ti con tu mensaje y dedicatoria.',
    price: 149900,
    emoji: '🎵',
    Icon: Music,
    gradient: 'from-pink-500 to-rose-500',
    image: '/search-results/experiencias-1.json',
  },
  {
    id: 'qr',
    title: 'Experiencia QR',
    desc: 'Página web personalizada con código QR para tu ser querido.',
    price: 89900,
    emoji: '📱',
    Icon: QrCode,
    gradient: 'from-violet-500 to-purple-500',
    image: '/search-results/experiencias-2.json',
  },
  {
    id: 'video',
    title: 'Video Sorpresa',
    desc: 'Video editado con fotos y mensajes de tus seres queridos.',
    price: 129900,
    emoji: '🎬',
    Icon: Video,
    gradient: 'from-fuchsia-500 to-pink-500',
    image: '/search-results/experiencias-2.json',
  },
  {
    id: 'carta',
    title: 'Carta Interactiva',
    desc: 'Carta digital con animaciones y música personalizada.',
    price: 79900,
    emoji: '💌',
    Icon: Mail,
    gradient: 'from-rose-500 to-orange-400',
    image: '/search-results/experiencias-1.json',
  },
]

interface ExperienciasProps {
  onAdd: (exp: Exp) => void
}

export function Experiencias({ onAdd }: ExperienciasProps) {
  return (
    <section className="relative overflow-hidden border-y border-pink-100 bg-gradient-to-b from-background via-pink-50/40 to-background">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-pink-200/30 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/70 px-3 py-1 text-xs font-medium text-pink-700 backdrop-blur">
            <span>✨</span> Experiencias Digitales
          </div>
          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
            Sorpresas digitales que conquistan <span className="bg-gradient-to-r from-pink-600 to-fuchsia-600 bg-clip-text text-transparent">corazones a distancia</span>
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Detalles únicos que llegan al corazón en segundos. Perfectos para sorprender desde cualquier lugar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {EXPERIENCIAS.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="group relative h-full overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/10">
                {/* Top gradient banner */}
                <div className={`relative h-28 bg-gradient-to-br ${exp.gradient} p-5`}>
                  <div className="pointer-events-none absolute right-2 top-2 text-7xl opacity-20 transition-transform group-hover:scale-110">
                    {exp.emoji}
                  </div>
                  <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-white/20 backdrop-blur">
                    <exp.Icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                <div className="flex flex-col p-5">
                  <h3 className="text-lg font-bold text-foreground">{exp.title}</h3>
                  <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">{exp.desc}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-pink-600">{formatCOP(exp.price)}</span>
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
