'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star, Quote, MapPin } from 'lucide-react'

interface Testimonial {
  name: string
  city: string
  text: string
  emoji: string
  image: string
  date: string
}

const TESTIMONIALS: Omit<Testimonial, 'image'>[] = [
  { name: 'Camila G.', city: 'Chapinero', emoji: '🌹', date: 'hace 3 días', text: 'Llegó exactamente a la hora que pedí. Mi novia lloró de felicidad. Nunca había visto una entrega tan perfecta.' },
  { name: 'Andrés M.', city: 'Usaquén', emoji: '🧸', date: 'hace 1 semana', text: 'El peluche es gigante y hermoso. Mi hija no lo suelta. La personalización fue impecable.' },
  { name: 'Valentina R.', city: 'Suba', emoji: '🎂', date: 'hace 2 días', text: 'El desayuno sorpresa superó mis expectativas. Fresco, bonito y delicioso. Repetiré seguro.' },
  { name: 'Felipe T.', city: 'Teusaquillo', emoji: '💝', date: 'hace 5 días', text: 'Celebramos 5 años de matrimonio. La cena romántica fue mágica. Gracias por hacer todo fácil.' },
  { name: 'Diana S.', city: 'Engativá', emoji: '🎉', date: 'hace 4 días', text: 'La caja misterio fue un éxito. Mi esposo no paraba de agradecer. Calidad premium de verdad.' },
  { name: 'Sebastián O.', city: 'Fontibón', emoji: '🎈', date: 'hace 6 días', text: 'Pedí a las 11am y llegó a las 3pm. Cumpleaños de mi mamá salvado. Profesionales de verdad.' },
]

interface TestimoniosProps {
  imagePool: Record<string, string[]>
}

export function Testimonios({ imagePool }: TestimoniosProps) {
  const pool = [...(imagePool['testimonios-1'] || []), ...(imagePool['testimonios-2'] || [])]
  const getImg = (i: number) => pool[i % pool.length] || '/hero-cinema.png'

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-950 via-pink-950 to-purple-950 py-12 text-white sm:py-16">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-pink-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-pink-200 backdrop-blur">
            <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
            4.9/5 · +4.000 sorpresas entregadas
          </div>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Miles de historias <span className="bg-gradient-to-r from-pink-300 to-orange-300 bg-clip-text text-transparent">felices</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-pink-200/80 sm:text-base">
            Personas reales. Reacciones reales. Esto es lo que pasa cuando un detalle llega a tiempo.
          </p>
        </motion.div>

        {/* Photo grid of happy people */}
        <div className="mb-10 grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative aspect-square overflow-hidden rounded-2xl border-2 border-white/20"
            >
              <Image
                src={getImg(i)}
                alt={`Cliente feliz ${i + 1}`}
                fill
                sizes="(max-width: 640px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-950/80 to-transparent" />
              <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center gap-0.5">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="h-2.5 w-2.5 fill-amber-300 text-amber-300" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-md transition-all hover:border-pink-400/40 hover:bg-white/15"
            >
              <div className="flex items-start justify-between">
                <Quote className="h-7 w-7 text-pink-300" />
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-pink-50">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-500 text-sm font-bold text-white">
                  {t.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 text-sm font-bold text-white">
                    {t.name}
                    <span className="text-base">{t.emoji}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-pink-200/70">
                    <MapPin className="h-3 w-3" />
                    {t.city}
                    <span>·</span>
                    <span>{t.date}</span>
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
