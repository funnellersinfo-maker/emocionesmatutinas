'use client'

import { Search, ShoppingCart, Menu, Heart, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/store/cart'
import { CATEGORIES } from '@/data/products'
import { cn } from '@/lib/utils'

interface HeaderProps {
  activeCategory: string
  onCategory: (id: string) => void
  onHome: () => void
  search: string
  onSearch: (s: string) => void
  onMobileMenu: () => void
}

export function Header({ activeCategory, onCategory, onHome, search, onSearch, onMobileMenu }: HeaderProps) {
  const count = useCart((s) => s.count())
  const setOpen = useCart((s) => s.setOpen)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      {/* Top bar */}
      <div className="border-b border-border/60 bg-rose-700 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-1.5 text-xs sm:px-6">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Entregamos hoy en toda Bogotá ·</span>
            <span className="font-semibold">Envío gratis desde $99.900</span>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <span>💬 320 123 4567</span>
            <span>·</span>
            <span>⭐ 4.9/5 (3.200+ reseñas)</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        <button onClick={onMobileMenu} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-muted lg:hidden" aria-label="Menú">
          <Menu className="h-5 w-5" />
        </button>

        <button onClick={onHome} className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-rose-600 to-fuchsia-600 text-lg shadow-md shadow-rose-600/30">
            🎁
          </span>
          <div className="text-left leading-none">
            <div className="text-base font-extrabold tracking-tight text-foreground sm:text-lg">
              Emociones<span className="text-rose-600">Matutinas</span>
            </div>
            <div className="hidden text-[10px] text-muted-foreground sm:block">Regalos que enamoran · Bogotá</div>
          </div>
        </button>

        {/* Search */}
        <div className="relative ml-auto hidden max-w-md flex-1 md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Buscar regalos, flores, peluches..."
            className="h-10 border-border bg-muted/40 pl-9"
          />
        </div>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <Button variant="ghost" size="icon" className="hidden sm:grid" aria-label="Favoritos">
            <Heart className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Carrito"
            onClick={() => setOpen(true)}
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <Badge className="absolute -right-1 -top-1 h-5 min-w-5 justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white">
                {count}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="px-4 pb-3 md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Buscar regalos..."
            className="h-10 border-border bg-muted/40 pl-9"
          />
        </div>
      </div>

      {/* Categories nav */}
      <nav className="border-t border-border/60 bg-background">
        <div className="mx-auto hidden max-w-7xl items-center gap-1 px-6 lg:flex">
          <button
            onClick={onHome}
            className={cn(
              'flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-sm font-medium transition-colors',
              activeCategory === 'all' ? 'border-rose-600 text-rose-600' : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            🏠 Todos
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => onCategory(c.id)}
              className={cn(
                'flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-sm font-medium transition-colors',
                activeCategory === c.id ? 'border-rose-600 text-rose-600' : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              <span>{c.emoji}</span>
              {c.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  )
}
