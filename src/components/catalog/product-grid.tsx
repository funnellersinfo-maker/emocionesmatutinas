'use client'

import { useMemo, useState } from 'react'
import { SlidersHorizontal, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { ProductCard } from './product-card'
import type { Product } from '@/data/products'
import { CATEGORIES } from '@/data/products'
import { cn } from '@/lib/utils'

interface ProductGridProps {
  products: Product[]
  onOpen: (id: string) => void
  activeCategory: string
  onCategory: (id: string) => void
  search: string
}

const SORTS = [
  { id: 'relevance', label: 'Relevancia' },
  { id: 'price-asc', label: 'Precio: menor a mayor' },
  { id: 'price-desc', label: 'Precio: mayor a menor' },
  { id: 'rating', label: 'Mejor calificados' },
  { id: 'reviews', label: 'Más reseñados' },
]

const PRICE_RANGES = [
  { id: 'all', label: 'Todos los precios', min: 0, max: Infinity },
  { id: '0-100', label: 'Menos de $100.000', min: 0, max: 100000 },
  { id: '100-150', label: '$100.000 - $150.000', min: 100000, max: 150000 },
  { id: '150-200', label: '$150.000 - $200.000', min: 150000, max: 200000 },
  { id: '200+', label: 'Más de $200.000', min: 200000, max: Infinity },
]

export function ProductGrid({ products, onOpen, activeCategory, onCategory, search }: ProductGridProps) {
  const [sort, setSort] = useState('relevance')
  const [priceRange, setPriceRange] = useState('all')
  const [onlyBadges, setOnlyBadges] = useState(false)
  const [onlyCustom, setOnlyCustom] = useState(false)
  const [minRating, setMinRating] = useState(0)
  const [filterOpen, setFilterOpen] = useState(false)
  const [visible, setVisible] = useState(12)

  const filtered = useMemo(() => {
    let r = [...products]
    if (activeCategory !== 'all') r = r.filter((p) => p.category === activeCategory)
    if (search.trim()) {
      const q = search.toLowerCase()
      r = r.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q)) ||
        p.categoryLabel.toLowerCase().includes(q)
      )
    }
    const pr = PRICE_RANGES.find((p) => p.id === priceRange)!
    r = r.filter((p) => p.price >= pr.min && p.price <= pr.max)
    if (onlyBadges) r = r.filter((p) => p.badge !== '')
    if (onlyCustom) r = r.filter((p) => p.customizable)
    if (minRating > 0) r = r.filter((p) => p.rating >= minRating)

    switch (sort) {
      case 'price-asc': r.sort((a, b) => a.price - b.price); break
      case 'price-desc': r.sort((a, b) => b.price - a.price); break
      case 'rating': r.sort((a, b) => b.rating - a.rating); break
      case 'reviews': r.sort((a, b) => b.reviewsCount - a.reviewsCount); break
    }
    return r
  }, [products, activeCategory, search, priceRange, onlyBadges, onlyCustom, minRating, sort])

  const shown = filtered.slice(0, visible)
  const cat = CATEGORIES.find((c) => c.id === activeCategory)

  const FiltersContent = (
    <div className="space-y-5">
      <div>
        <h4 className="mb-2 text-sm font-semibold">Categoría</h4>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onCategory('all')}
            className={cn('rounded-full border px-3 py-1 text-xs', activeCategory === 'all' ? 'border-rose-600 bg-rose-600 text-white' : 'border-border')}
          >
            Todas
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => onCategory(c.id)}
              className={cn('rounded-full border px-3 py-1 text-xs', activeCategory === c.id ? 'border-rose-600 bg-rose-600 text-white' : 'border-border')}
            >
              {c.emoji} {c.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold">Precio</h4>
        <div className="space-y-1.5">
          {PRICE_RANGES.map((p) => (
            <button
              key={p.id}
              onClick={() => setPriceRange(p.id)}
              className={cn('block w-full rounded-lg border px-3 py-1.5 text-left text-xs', priceRange === p.id ? 'border-rose-600 bg-rose-50 text-rose-700' : 'border-border')}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-semibold">Calificación mínima</h4>
        <div className="flex gap-1.5">
          {[0, 4.5, 4.7, 4.9].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={cn('flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs', minRating === r ? 'border-rose-600 bg-rose-50 text-rose-700' : 'border-border')}
            >
              {r === 0 ? 'Todas' : (<><Star className="h-3 w-3 fill-amber-500 text-amber-500" />{r}+</>)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={onlyBadges} onChange={(e) => setOnlyBadges(e.target.checked)} className="accent-rose-600" />
          Solo productos destacados
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={onlyCustom} onChange={(e) => setOnlyCustom(e.target.checked)} className="accent-rose-600" />
          Solo personalizables
        </label>
      </div>
    </div>
  )

  return (
    <section id="catalogo" className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            {activeCategory === 'all' ? 'Catálogo premium' : cat ? `${cat.emoji} ${cat.label}` : 'Resultados'}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? 'producto' : 'productos'} {search && `para "${search}"`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setFilterOpen(true)} className="lg:hidden">
            <SlidersHorizontal className="mr-1.5 h-4 w-4" /> Filtros
          </Button>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="h-9 w-[180px] sm:w-[220px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORTS.map((s) => (
                <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        {/* Sidebar filters - desktop */}
        <aside className="hidden lg:block">
          <div className="sticky top-36 rounded-xl border border-border bg-card p-4">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold">
              <SlidersHorizontal className="h-4 w-4" /> Filtros
            </h3>
            {FiltersContent}
          </div>
        </aside>

        {/* Grid */}
        <div>
          {shown.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-20 text-center">
              <div className="text-5xl">🔍</div>
              <p className="font-semibold text-foreground">No encontramos productos</p>
              <p className="text-sm text-muted-foreground">Prueba con otros filtros o términos de búsqueda</p>
              <Button variant="outline" onClick={() => { onCategory('all'); setPriceRange('all'); setOnlyBadges(false); setOnlyCustom(false); setMinRating(0) }}>
                Limpiar filtros
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
                {shown.map((p, i) => (
                  <ProductCard key={p.id} product={p} onOpen={onOpen} index={i} />
                ))}
              </div>
              {visible < filtered.length && (
                <div className="mt-8 flex justify-center">
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setVisible((v) => v + 12)}
                    className="border-rose-200 px-8"
                  >
                    Ver más productos ({filtered.length - visible})
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile filters sheet */}
      <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
        <SheetContent side="left" className="w-[300px] sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Filtros</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto p-4">{FiltersContent}</div>
          <div className="border-t p-4">
            <Button className="w-full bg-rose-600 text-white hover:bg-rose-700" onClick={() => setFilterOpen(false)}>
              Ver {filtered.length} productos
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}
