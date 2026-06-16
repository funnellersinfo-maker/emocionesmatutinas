'use client'

import { useState } from 'react'
import { Star, Check, ShoppingBag, Truck, ShieldCheck, RefreshCw, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { formatCOP, useCart } from '@/store/cart'
import type { Product } from '@/data/products'
import { ProductGallery } from './product-gallery'
import { UpsellCard } from './upsell-card'
import { ProductCard } from './product-card'

interface ProductDetailProps {
  product: Product
  related: Product[]
  onBack: () => void
  onOpen: (id: string) => void
}

const UPSELLS = [
  { id: 'tarjeta', label: 'Agrega una tarjeta personalizada', emoji: '💝', price: 8900, desc: 'Tarjeta de alta calidad con mensaje a mano' },
  { id: 'cancion', label: 'Agrega una canción personalizada', emoji: '🎵', price: 19900, desc: 'Código QR con tu canción especial' },
  { id: 'qr', label: 'Agrega experiencia QR', emoji: '📱', price: 14900, desc: 'Video o mensaje sorpresa escaneable' },
  { id: 'globos', label: 'Agrega globos', emoji: '🎈', price: 24900, desc: '3 globos de helio a elección' },
  { id: 'chocolates', label: 'Agrega chocolates', emoji: '🍫', price: 18900, desc: 'Caja de chocolates belgas Ferrero' },
]

export function ProductDetail({ product, related, onBack, onOpen }: ProductDetailProps) {
  const addItem = useCart((s) => s.addItem)
  const [qty, setQty] = useState(1)
  const [selectedUpsells, setSelectedUpsells] = useState<string[]>([])
  const [custom, setCustom] = useState({
    recipientName: '', dedication: '', color: '', deliveryDate: '', deliveryTime: '', message: '', instructions: '',
  })

  const toggleUpsell = (id: string) =>
    setSelectedUpsells((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  const upsellTotal = selectedUpsells.reduce((sum, id) => sum + (UPSELLS.find((u) => u.id === id)?.price || 0), 0)
  const total = (product.price + upsellTotal) * qty

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price + upsellTotal,
      image: product.images[0],
      quantity: qty,
      customizations: product.customizable ? custom : undefined,
      upsells: selectedUpsells,
    })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
        <button onClick={onBack} className="hover:text-rose-600">Inicio</button>
        <span>/</span>
        <span>{product.emoji} {product.categoryLabel}</span>
        <span>/</span>
        <span className="line-clamp-1 text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Gallery */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <ProductGallery images={product.images} name={product.name} />
        </motion.div>

        {/* Info */}
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{product.emoji} {product.categoryLabel}</span>
            {product.badge && <Badge className="bg-rose-600 text-white">{product.badge}</Badge>}
          </div>

          <h1 className="mt-2 text-2xl font-bold leading-tight text-foreground sm:text-3xl">
            {product.name}
          </h1>

          <div className="mt-2 flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} className={cn('h-4 w-4', s <= Math.round(product.rating) ? 'fill-amber-500 text-amber-500' : 'fill-muted text-muted')} />
              ))}
              <span className="ml-1 text-sm font-semibold">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">{product.reviewsCount} reseñas</span>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-rose-700">{formatCOP(product.price)}</span>
            <span className="text-sm text-muted-foreground">incluye envío en Bogotá</span>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.shortDescription}</p>

          {/* Trust badges */}
          <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-muted/40 p-3">
            <div className="flex flex-col items-center gap-1 text-center">
              <Truck className="h-5 w-5 text-rose-600" />
              <span className="text-[11px] font-medium">Entrega hoy</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <ShieldCheck className="h-5 w-5 text-rose-600" />
              <span className="text-[11px] font-medium">Pago seguro</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <RefreshCw className="h-5 w-5 text-rose-600" />
              <span className="text-[11px] font-medium">Garantía total</span>
            </div>
          </div>

          {/* Tabs: info / includes / reviews */}
          <Tabs defaultValue="info" className="mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Detalles</TabsTrigger>
              <TabsTrigger value="includes">Qué incluye</TabsTrigger>
              <TabsTrigger value="reviews">Reseñas</TabsTrigger>
            </TabsList>
            <TabsContent value="info" className="mt-4 space-y-3">
              <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{product.fullDescription}</p>
              <div>
                <h4 className="mb-2 text-sm font-semibold text-foreground">Características</h4>
                <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-2 text-sm font-semibold text-foreground">Beneficios</h4>
                <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ShoppingBag className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="includes" className="mt-4">
              <ul className="space-y-2">
                {product.includes.map((it, i) => (
                  <li key={i} className="flex items-center gap-2 rounded-lg border border-border bg-card p-2.5 text-sm">
                    <Check className="h-4 w-4 text-emerald-600" /> {it}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4 space-y-3">
              <div className="flex items-center gap-4 rounded-xl border border-border bg-muted/30 p-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-rose-700">{product.rating}</div>
                  <div className="mt-1 flex justify-center">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className={cn('h-3.5 w-3.5', s <= Math.round(product.rating) ? 'fill-amber-500 text-amber-500' : 'fill-muted text-muted')} />
                    ))}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{product.reviewsCount} reseñas</div>
                </div>
                <Separator orientation="vertical" className="h-16" />
                <div className="flex-1 space-y-1">
                  {[5,4,3,2,1].map((star) => {
                    const pct = star === 5 ? 78 : star === 4 ? 15 : star === 3 ? 5 : star === 2 ? 1 : 1
                    return (
                      <div key={star} className="flex items-center gap-2 text-xs">
                        <span className="w-3">{star}</span>
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                          <div className="h-full bg-amber-500" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="w-8 text-right text-muted-foreground">{pct}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>
              {product.reviews.map((r, i) => (
                <div key={i} className="rounded-xl border border-border p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-rose-100 text-xs font-semibold text-rose-700">
                        {r.author.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{r.author}</div>
                        <div className="flex">
                          {[1,2,3,4,5].map((s) => (
                            <Star key={s} className={cn('h-3 w-3', s <= r.rating ? 'fill-amber-500 text-amber-500' : 'fill-muted text-muted')} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{r.date}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>

          <Separator className="my-4" />

          {/* Upsells */}
          <div>
            <h3 className="mb-2 text-sm font-bold text-foreground">Mejora tu regalo</h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {UPSELLS.map((u) => (
                <UpsellCard key={u.id} upsell={u} selected={selectedUpsells.includes(u.id)} onToggle={() => toggleUpsell(u.id)} />
              ))}
            </div>
          </div>

          {/* Personalization */}
          {product.customizable && (
            <div className="mt-5 rounded-xl border border-rose-200 bg-rose-50/50 p-4">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-rose-800">
                <span className="text-base">✨</span> Personaliza tu regalo
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <Label htmlFor="rn" className="text-xs">Nombre del destinatario</Label>
                  <Input id="rn" value={custom.recipientName} onChange={(e) => setCustom({ ...custom, recipientName: e.target.value })} placeholder="Ej: María José" />
                </div>
                <div>
                  <Label htmlFor="color" className="text-xs">Color preferido</Label>
                  <Input id="color" value={custom.color} onChange={(e) => setCustom({ ...custom, color: e.target.value })} placeholder="Ej: Rosado" />
                </div>
                <div>
                  <Label htmlFor="dd" className="text-xs">Fecha de entrega</Label>
                  <Input id="dd" type="date" value={custom.deliveryDate} onChange={(e) => setCustom({ ...custom, deliveryDate: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="dt" className="text-xs">Hora de entrega</Label>
                  <Input id="dt" type="time" value={custom.deliveryTime} onChange={(e) => setCustom({ ...custom, deliveryTime: e.target.value })} />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="ded" className="text-xs">Dedicatoria</Label>
                  <Input id="ded" value={custom.dedication} onChange={(e) => setCustom({ ...custom, dedication: e.target.value })} placeholder="Ej: Para el amor de mi vida" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="msg" className="text-xs">Mensaje especial</Label>
                  <Textarea id="msg" value={custom.message} onChange={(e) => setCustom({ ...custom, message: e.target.value })} placeholder="Escribe tu mensaje..." rows={2} />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="ins" className="text-xs">Instrucciones adicionales</Label>
                  <Textarea id="ins" value={custom.instructions} onChange={(e) => setCustom({ ...custom, instructions: e.target.value })} placeholder="Ej: Tocar dos veces el timbre" rows={2} />
                </div>
              </div>
            </div>
          )}

          {/* Quantity + Add to cart */}
          <div className="mt-5 flex items-center gap-3">
            <div className="flex items-center rounded-lg border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-10 w-10 place-items-center hover:bg-muted">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="grid h-10 w-10 place-items-center hover:bg-muted">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button onClick={handleAdd} className="flex-1 bg-rose-600 py-6 text-base font-semibold text-white hover:bg-rose-700 shadow-lg shadow-rose-600/20">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Agregar · {formatCOP(total)}
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold text-foreground">Productos relacionados</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} onOpen={onOpen} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
