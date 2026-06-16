'use client'

import { X, Trash2, Plus, Minus, ShoppingBag, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { formatCOP, useCart } from '@/store/cart'

export function CartDrawer() {
  const { items, isOpen, setOpen, removeItem, updateQuantity, total, count } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col border-l-rose-100 sm:max-w-md">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="flex items-center gap-2 text-lg font-bold">
            <ShoppingBag className="h-5 w-5 text-rose-600" />
            Tu carrito
            <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-700">
              {count()}
            </span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-muted">
              <ShoppingBag className="h-9 w-9 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Tu carrito está vacío</p>
              <p className="mt-1 text-sm text-muted-foreground">Agrega productos y volverán aquí</p>
            </div>
            <Button onClick={() => setOpen(false)} className="mt-2 bg-rose-600 text-white hover:bg-rose-700">
              Explorar catálogo
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {items.map((it) => (
                <div key={it.id} className="flex gap-3 rounded-xl border border-border bg-card p-3">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image src={it.image} alt={it.name} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <h4 className="line-clamp-2 text-sm font-semibold text-foreground">{it.name}</h4>
                    {it.upsells && it.upsells.length > 0 && (
                      <p className="mt-0.5 text-xs text-emerald-700">+{it.upsells.length} complementos</p>
                    )}
                    {it.customizations?.recipientName && (
                      <p className="mt-0.5 text-xs text-muted-foreground">Para: {it.customizations.recipientName}</p>
                    )}
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-md border border-border">
                        <button onClick={() => updateQuantity(it.id, it.quantity - 1)} className="grid h-7 w-7 place-items-center hover:bg-muted">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold">{it.quantity}</span>
                        <button onClick={() => updateQuantity(it.id, it.quantity + 1)} className="grid h-7 w-7 place-items-center hover:bg-muted">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-rose-700">{formatCOP(it.price * it.quantity)}</span>
                    </div>
                  </div>
                  <button onClick={() => removeItem(it.id)} className="self-start text-muted-foreground hover:text-rose-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-border p-4">
              <div className="mb-2 flex items-center gap-2 rounded-lg bg-emerald-50 p-2 text-xs text-emerald-700">
                <Truck className="h-4 w-4" />
                <span>Envío GRATIS · Entrega hoy en Bogotá</span>
              </div>
              <Separator className="mb-3" />
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-lg font-bold text-foreground">{formatCOP(total())}</span>
              </div>
              <Button className="w-full bg-rose-600 py-6 text-base font-semibold text-white hover:bg-rose-700">
                Finalizar compra · {formatCOP(total())}
              </Button>
              <button onClick={() => setOpen(false)} className="mt-2 w-full text-center text-sm text-muted-foreground hover:text-rose-600">
                Seguir comprando
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
