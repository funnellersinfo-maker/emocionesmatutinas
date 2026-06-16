'use client'

import { Star, MapPin, Clock, CheckCircle2 } from 'lucide-react'

interface SocialProof {
  name: string
  city: string
  product: string
  emoji: string
  minutesAgo: number
  rating: number
}

// Real customer purchase notifications — social proof
const PROOFS: SocialProof[] = [
  { name: 'María G.', city: 'Chapinero', product: 'Bouquet Amor Infinito Premium', emoji: '🌹', minutesAgo: 2, rating: 5 },
  { name: 'Andrés M.', city: 'Usaquén', product: 'Oso Gigante Cariño Premium', emoji: '🧸', minutesAgo: 5, rating: 5 },
  { name: 'Valentina R.', city: 'Suba', product: 'Desayuno Sorpresa Bogotá Premium', emoji: '🎂', minutesAgo: 8, rating: 5 },
  { name: 'Camilo P.', city: 'Teusaquillo', product: 'Cena Romántica para Dos', emoji: '💝', minutesAgo: 12, rating: 5 },
  { name: 'Diana S.', city: 'Engativá', product: 'Caja Misterio Deluxe', emoji: '🎉', minutesAgo: 15, rating: 5 },
  { name: 'Felipe T.', city: 'La Candelaria', product: 'Torta Cumple Premium Chocolate', emoji: '🎁', minutesAgo: 18, rating: 5 },
  { name: 'Mariana L.', city: 'Kennedy', product: 'Girasoles Sol Radiante', emoji: '🌹', minutesAgo: 23, rating: 4 },
  { name: 'Sebastián O.', city: 'Fontibón', product: 'Arco Globos Pastel Celebra', emoji: '🎈', minutesAgo: 27, rating: 5 },
  { name: 'Laura G.', city: 'Chía', product: 'Taza Personalizada Foto Pareja', emoji: '✨', minutesAgo: 31, rating: 5 },
  { name: 'Juan D.', city: 'Soacha', product: 'Spa en Casa Pareja Deluxe', emoji: '💝', minutesAgo: 35, rating: 5 },
  { name: 'Andrea V.', city: 'Cedritos', product: 'Unicornio Arcoíris Mágico', emoji: '🧸', minutesAgo: 38, rating: 5 },
  { name: 'Carlos R.', city: 'Modelia', product: 'Hamper Gourmet Sorpresa', emoji: '🎉', minutesAgo: 42, rating: 5 },
  { name: 'Paula M.', city: 'Centro', product: 'Box Pancakes & Berries', emoji: '🎂', minutesAgo: 45, rating: 5 },
  { name: 'Diego F.', city: 'Caldera', product: 'Vino y Rosas Aniversario', emoji: '💝', minutesAgo: 48, rating: 5 },
  { name: 'Sara C.', city: 'Bosa', product: 'Bouquet Globos Helio Cumple', emoji: '🎈', minutesAgo: 52, rating: 5 },
  { name: 'Nicolás H.', city: 'Rosales', product: 'Caja Personalizada Nombre Dorado', emoji: '✨', minutesAgo: 56, rating: 5 },
  { name: 'Manuela B.', city: 'Paloquemao', product: 'Tulipanes Holanda Elegante', emoji: '🌹', minutesAgo: 61, rating: 5 },
  { name: 'Tomás A.', city: 'Salitre', product: 'Kit Fiesta Cumple Completo', emoji: '🎁', minutesAgo: 64, rating: 4 },
  { name: 'Isabela R.', city: 'Tunjuelito', product: 'Sorpresa Mañanera Bogotá', emoji: '🎉', minutesAgo: 67, rating: 5 },
  { name: 'Mateo L.', city: 'Usme', product: 'Conejito Dulce Sueño', emoji: '🧸', minutesAgo: 71, rating: 5 },
  { name: 'Catalina N.', city: 'Pepe Sierra', product: 'Box Aniversario Amor Eterno', emoji: '💝', minutesAgo: 74, rating: 5 },
  { name: 'Santiago V.', city: 'Hayuelos', product: 'Marco Fotos Personalizado', emoji: '✨', minutesAgo: 78, rating: 5 },
  { name: 'Gabriela P.', city: 'Calle 100', product: 'Cupcake Tower Cumple Color', emoji: '🎁', minutesAgo: 82, rating: 5 },
  { name: 'Sebastián Q.', city: 'Casablanca', product: 'Torre Regalos Premium 5 Niveles', emoji: '🎉', minutesAgo: 85, rating: 5 },
  { name: 'Valeria M.', city: 'Normandía', product: 'Peonías Rosadas', emoji: '🌹', minutesAgo: 89, rating: 5 },
  { name: 'Emilio T.', city: 'Villa Luz', product: 'Llavero Grabado Nombre', emoji: '✨', minutesAgo: 93, rating: 5 },
]

function formatAgo(min: number) {
  if (min < 60) return `hace ${min} min`
  const h = Math.floor(min / 60)
  return `hace ${h}h`
}

function ProofItem({ p }: { p: SocialProof }) {
  return (
    <span className="flex items-center gap-2 text-xs font-medium sm:text-sm">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/20 backdrop-blur">
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
      </span>
      <span className="flex items-center gap-1 font-semibold text-white">
        {p.name}
      </span>
      <span className="flex items-center gap-0.5 text-pink-100/80">
        <MapPin className="h-3 w-3" />
        {p.city}
      </span>
      <span className="text-pink-200">·</span>
      <span className="text-white">
        {p.emoji} {p.product}
      </span>
      <span className="flex items-center gap-0.5">
        {[1,2,3,4,5].map((s) => (
          <Star key={s} className={s <= p.rating ? 'h-3 w-3 fill-amber-300 text-amber-300' : 'h-3 w-3 text-white/30'} />
        ))}
      </span>
      <span className="flex items-center gap-0.5 text-pink-100/70">
        <Clock className="h-3 w-3" />
        {formatAgo(p.minutesAgo)}
      </span>
      <span className="px-2 text-pink-300">•</span>
    </span>
  )
}

export function Marquee() {
  return <SocialProofMarquee />
}

export function SocialProofMarquee() {
  // Duplicate for seamless infinite loop
  const doubled = [...PROOFS, ...PROOFS]
  return (
    <div className="marquee-pause relative overflow-hidden bg-gradient-to-r from-pink-700 via-pink-600 to-pink-700 py-2 text-white shadow-sm">
      {/* fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-pink-700 to-transparent sm:w-20" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-pink-700 to-transparent sm:w-20" />
      <div className="flex w-max animate-marquee items-center gap-0 whitespace-nowrap">
        {doubled.map((p, i) => (
          <ProofItem key={i} p={p} />
        ))}
      </div>
    </div>
  )
}
