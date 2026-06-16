'use client'

import { Search, ShoppingCart, Menu, Heart, Phone, Star } from 'lucide-react'
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
    <header className="sticky top-0 z-40 border-b border-pink-100 bg-background/85 backdrop-blur-md">
      {/* Main header */}
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        <button onClick={onMobileMenu} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-pink-50 lg:hidden" aria-label="Menú">
          <Menu className="h-5 w-5" />
        </button>

        <button onClick={onHome} className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-500 text-lg shadow-md shadow-pink-500/30">
            💝
          </span>
          <div className="text-left leading-none">
            <div className="text-base font-extrabold tracking-tight text-foreground sm:text-lg">
              Emociones<span className="text-pink-600">Matutinas</span>
            </div>
            <div className="hidden items-center gap-1 text-[10px] text-muted-foreground sm:flex">
              <Star className="h-2.5 w-2.5 fill-amber-500 text-amber-500" />
              <span>Regalos con alma · Bogotá</span>
            </div>
          </div>
        </button>

        {/* Search */}
        <div className="relative ml-auto hidden max-w-md flex-1 md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-pink-400" />
          <Input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Buscar regalos, flores, peluches..."
            className="h-10 border-pink-200 bg-pink-50/50 pl-9 focus:border-pink-400 focus:ring-pink-400/30"
          />
        </div>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <a
            href="https://wa.me/573202761748"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full border border-pink-200 px-3 py-1.5 text-xs font-medium text-pink-700 transition hover:bg-pink-50 sm:flex"
          >
            <Phone className="h-3.5 w-3.5" />
            WhatsApp
          </a>
          <Button variant="ghost" size="icon" className="hidden text-pink-600 hover:bg-pink-50 hover:text-pink-700 sm:grid" aria-label="Favoritos">
            <Heart className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative text-pink-600 hover:bg-pink-50 hover:text-pink-700"
            aria-label="Carrito"
            onClick={() => setOpen(true)}
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <Badge className="absolute -right-1 -top-1 h-5 min-w-5 justify-center rounded-full bg-pink-500 px-1 text-[10px] font-bold text-white">
                {count}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="px-4 pb-3 md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-pink-400" />
          <Input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Buscar regalos..."
            className="h-10 border-pink-200 bg-pink-50/50 pl-9 focus:border-pink-400 focus:ring-pink-400/30"
          />
        </div>
      </div>

      {/* Categories nav */}
      <nav className="border-t border-pink-100 bg-background">
        <div className="mx-auto hidden max-w-7xl items-center gap-1 overflow-x-auto px-6 lg:flex scrollbar-pink">
          <button
            onClick={onHome}
            className={cn(
              'flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2.5 text-sm font-medium transition-colors',
              activeCategory === 'all' ? 'border-pink-500 text-pink-600' : 'border-transparent text-muted-foreground hover:text-pink-600'
            )}
          >
            🛍️ Todos
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => onCategory(c.id)}
              className={cn(
                'flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2.5 text-sm font-medium transition-colors',
                activeCategory === c.id ? 'border-pink-500 text-pink-600' : 'border-transparent text-muted-foreground hover:text-pink-600'
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
