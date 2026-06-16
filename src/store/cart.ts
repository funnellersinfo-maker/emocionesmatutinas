'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const WHATSAPP_NUMBER = '573202761748'

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  customizations?: {
    recipientName?: string
    dedication?: string
    color?: string
    deliveryDate?: string
    deliveryTime?: string
    message?: string
    instructions?: string
  }
  upsells?: string[]
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'id' | 'quantity'> & { quantity?: number }) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  setOpen: (open: boolean) => void
  total: () => number
  count: () => number
  buildWhatsAppLink: (context?: 'cart' | 'help') => string
}

const UPSELL_LABELS: Record<string, string> = {
  tarjeta: 'Tarjeta personalizada',
  cancion: 'Canción personalizada',
  qr: 'Experiencia QR',
  globos: 'Globos',
  chocolates: 'Chocolates',
}

function buildOrderMessage(items: CartItem[], total: number): string {
  const lines: string[] = []
  lines.push('💝 *Emociones Matutinas — Pedido*')
  lines.push('')
  lines.push('Hola! Quiero hacer el siguiente pedido:')
  lines.push('')
  lines.push('🛍️ *Resumen del pedido:*')
  items.forEach((it, i) => {
    lines.push('')
    lines.push(`${i + 1}. *${it.name}*`)
    lines.push(`   Cantidad: ${it.quantity} × ${formatCOP(it.price)} = *${formatCOP(it.price * it.quantity)}*`)
    if (it.upsells && it.upsells.length > 0) {
      lines.push(`   ✨ Complementos: ${it.upsells.map((u) => UPSELL_LABELS[u] || u).join(', ')}`)
    }
    if (it.customizations) {
      const c = it.customizations
      const parts: string[] = []
      if (c.recipientName) parts.push(`Para: ${c.recipientName}`)
      if (c.dedication) parts.push(`Dedicatoria: ${c.dedication}`)
      if (c.color) parts.push(`Color: ${c.color}`)
      if (c.deliveryDate) parts.push(`Fecha: ${c.deliveryDate}`)
      if (c.deliveryTime) parts.push(`Hora: ${c.deliveryTime}`)
      if (c.message) parts.push(`Mensaje: ${c.message}`)
      if (c.instructions) parts.push(`Instrucciones: ${c.instructions}`)
      if (parts.length > 0) {
        lines.push(`   🎨 Personalización:`)
        parts.forEach((p) => lines.push(`      • ${p}`))
      }
    }
  })
  lines.push('')
  lines.push(`💰 *Total: ${formatCOP(total)}*`)
  lines.push('')
  lines.push('📍 Entrega en Bogotá')
  lines.push('')
  lines.push('Gracias 💝')
  return lines.join('\n')
}

function buildHelpMessage(): string {
  return '💝 *Emociones Matutinas*\n\nHola! Tengo una consulta sobre sus regalos y sorpresas en Bogotá.'
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) => {
        const id = `${item.productId}-${Date.now()}`
        set((state) => {
          // If same product + same customizations, merge quantity
          const existingIdx = state.items.findIndex(
            (it) => it.productId === item.productId &&
              JSON.stringify(it.customizations) === JSON.stringify(item.customizations)
          )
          if (existingIdx >= 0) {
            const newItems = [...state.items]
            newItems[existingIdx].quantity += item.quantity || 1
            return { items: newItems, isOpen: true }
          }
          return { items: [...state.items, { ...item, id, quantity: item.quantity || 1 }], isOpen: true }
        })
      },
      removeItem: (id) => set((state) => ({ items: state.items.filter((it) => it.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((it) =>
            it.id === id ? { ...it, quantity: Math.max(1, quantity) } : it
          ),
        })),
      clearCart: () => set({ items: [] }),
      setOpen: (open) => set({ isOpen: open }),
      total: () => get().items.reduce((sum, it) => sum + it.price * it.quantity, 0),
      count: () => get().items.reduce((sum, it) => sum + it.quantity, 0),
      buildWhatsAppLink: (context = 'help') => {
        const items = get().items
        const msg = context === 'cart' && items.length > 0
          ? buildOrderMessage(items, get().total())
          : buildHelpMessage()
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
      },
    }),
    { name: 'emociones-cart' }
  )
)

export const formatCOP = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)
