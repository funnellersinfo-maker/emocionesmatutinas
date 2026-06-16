'use client'

import { motion } from 'framer-motion'
import { ChevronRight, Flame, Heart, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PRODUCTS, type Product } from '@/data/products'
import { ProductCard } from './product-card'

interface FeaturedSectionProps {
  title: string
  subtitle: string
  icon: typeof Flame
  iconColor: string
  products: Product[]
  onOpen: (id: string) => void
  onSeeAll: () => void
}

function FeaturedSection({ title, subtitle, icon: Icon, iconColor, products, onOpen, onSeeAll }: FeaturedSectionProps) {
  if (products.length === 0) return null
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-5 flex items-end justify-between gap-3"
      >
        <div>
          <div className="flex items-center gap-2">
            <Icon className={`h-6 w-6 ${iconColor}`} />
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{title}</h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onSeeAll} className="shrink-0 text-pink-600 hover:bg-pink-50 hover:text-pink-700">
          Ver todos
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {products.slice(0, 4).map((p, i) => (
          <ProductCard key={p.id} product={p} onOpen={onOpen} index={i} />
        ))}
      </div>
    </section>
  )
}

interface CommercialSectionsProps {
  onOpen: (id: string) => void
  onSeeAll: () => void
}

export function CommercialSections({ onOpen, onSeeAll }: CommercialSectionsProps) {
  const masVendidos = PRODUCTS.filter((p) => p.badge === 'Más vendido').slice(0, 8)
  const regalosEnamoran = PRODUCTS.filter((p) => p.badge === 'Favorito' || p.badge === 'Premium').slice(0, 8)
  const novedades = PRODUCTS.filter((p) => p.badge === 'Nuevo').slice(0, 8)

  return (
    <>
      <FeaturedSection
        title="Más vendidos"
        subtitle="Los regalos que más enamoran en Bogotá esta semana"
        icon={Flame}
        iconColor="text-orange-500"
        products={masVendidos}
        onOpen={onOpen}
        onSeeAll={onSeeAll}
      />

      <FeaturedSection
        title="Regalos que enamoran"
        subtitle="Favoritos de nuestros clientes para momentos especiales"
        icon={Heart}
        iconColor="text-pink-500"
        products={regalosEnamoran}
        onOpen={onOpen}
        onSeeAll={onSeeAll}
      />

      <FeaturedSection
        title="Novedades"
        subtitle="Recién llegados para sorprender con algo diferente"
        icon={TrendingUp}
        iconColor="text-emerald-500"
        products={novedades}
        onOpen={onOpen}
        onSeeAll={onSeeAll}
      />
    </>
  )
}
