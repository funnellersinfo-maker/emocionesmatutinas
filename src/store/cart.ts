'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
    }),
    { name: 'emociones-cart' }
  )
)

export const formatCOP = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)
