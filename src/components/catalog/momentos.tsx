'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

interface Moment {
  title: string
  subtitle: string
  emoji: string
  poolKey: string
  categoryId: string
  gradient: string
  size: 'xl' | 'lg' | 'md'
}

const MOMENTS: Moment[] = [
  {
    title: 'Una novia recibiendo flores',
    subtitle: 'El sí que se abre paso entre pétalos',
    emoji: '🌹',
    poolKey: 'emocion-flores',
    categoryId: 'flores',
    gradient: 'from-pink-700/85 via-pink-800/60 to-transparent',
    size: 'xl',
  },
  {
    title: 'Una mamá abriendo su caja',
    subtitle: 'El agradecimiento que se merece',
    emoji: '🌷',
    poolKey: 'emocion-madre',
    categoryId: 'cumpleanos',
    gradient: 'from-orange-600/85 via-rose-700/60 to-transparent',
    size: 'lg',
  },
  {
    title: 'Un cumpleaños sorpresa',
    subtitle: 'El día que recordará toda la vida',
    emoji: '🎂',
    poolKey: 'emocion-cumple',
    categoryId: 'cumpleanos',
    gradient: 'from-fuchsia-700/85 via-purple-800/60 to-transparent',
    size: 'lg',
  },
  {
    title: 'Una entrega romántica',
    subtitle: 'La noche que nunca olvidará',
    emoji: '💝',
    poolKey: 'emocion-romantica',
    categoryId: 'aniversarios',
    gradient: 'from-rose-700/85 via-pink-800/60 to-transparent',
    size: 'lg',
  },
]

interface MomentosProps {
  onSelectCategory: (id: string) => void
  imagePool: Record<string, string[]>
}

export function Momentos({ onSelectCategory, imagePool }: MomentosProps) {
  const getImg = (m: Moment, idx: number) => {
    const pool = imagePool[m.poolKey] || imagePool['flores-1'] || []
    return pool[idx % pool.length] || '/hero-cinema.png'
  }

  return (
    <section className="bg-gradient-to-b from-background via-pink-50/40 to-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/70 px-3 py-1 text-xs font-medium text-pink-700 backdrop-blur">
            <span>✨</span> No productos. Momentos.
          </div>
          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            ¿Qué momento quieres <span className="bg-gradient-to-r from-pink-600 to-fuchsia-600 bg-clip-text text-transparent">crear</span> hoy?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Imágenes reales de momentos que hemos hecho posibles. Cada uno llegó a tiempo, al corazón.
          </p>
        </motion.div>

        {/* Bento grid of emotional moments */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MOMENTS.map((m, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onClick={() => onSelectCategory(m.categoryId)}
              className={`group relative overflow-hidden rounded-3xl text-left shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl ${
                m.size === 'xl' ? 'sm:col-span-2 lg:row-span-2' : ''
              } ${m.size === 'xl' ? 'aspect-[16/10] lg:aspect-[16/13]' : 'aspect-[4/3]'}`}
            >
              <Image
                src={getImg(m, i)}
                alt={m.title}
                fill
                sizes={m.size === 'xl' ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 640px) 100vw, 33vw'}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-tr ${m.gradient}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
                <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/25 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                  <span className="text-base">{m.emoji}</span>
                  {m.subtitle}
                </span>
                <h3 className={`flex items-end justify-between gap-2 font-bold text-white drop-shadow-lg ${
                  m.size === 'xl' ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-lg sm:text-xl'
                }`}>
                  {m.title}
                  <ArrowRight className="h-5 w-5 shrink-0 translate-x-0 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                </h3>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
