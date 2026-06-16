'use client'

import { X, Trash2, Plus, Minus, ShoppingBag, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { formatCOP, useCart } from '@/store/cart'

export function CartDrawer() {
  const { items, isOpen, setOpen, removeItem, updateQuantity, total, count, buildWhatsAppLink, clearCart } = useCart()

  const checkout = () => {
    const href = buildWhatsAppLink('cart')
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col border-l-pink-100 sm:max-w-md">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="flex items-center gap-2 text-lg font-bold">
            <ShoppingBag className="h-5 w-5 text-pink-600" />
            Tu carrito
            <span className="rounded-full bg-pink-100 px-2 py-0.5 text-xs font-semibold text-pink-700">
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
            <Button onClick={() => setOpen(false)} className="mt-2 bg-pink-600 text-white hover:bg-pink-700">
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
                      <span className="text-sm font-bold text-pink-700">{formatCOP(it.price * it.quantity)}</span>
                    </div>
                  </div>
                  <button onClick={() => removeItem(it.id)} className="self-start text-muted-foreground hover:text-pink-600">
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
              <Button onClick={checkout} className="w-full bg-emerald-600 py-6 text-base font-semibold text-white hover:bg-emerald-700">
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                Finalizar pedido · {formatCOP(total())}
              </Button>
              <p className="mt-1.5 text-center text-[11px] text-muted-foreground">
                Te lleva a WhatsApp con tu pedido listo para enviar
              </p>
              <button onClick={() => setOpen(false)} className="mt-2 w-full text-center text-sm text-muted-foreground hover:text-pink-600">
                Seguir comprando
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
