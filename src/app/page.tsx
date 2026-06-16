'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { PRODUCTS, CATEGORIES } from '@/data/products'
import { Header } from '@/components/catalog/header'
import { Hero, CategoryStrip } from '@/components/catalog/hero'
import { Experiencias } from '@/components/catalog/experiencias'
import { ProductGrid } from '@/components/catalog/product-grid'
import { ProductDetail } from '@/components/catalog/product-detail'
import { CartDrawer } from '@/components/catalog/cart-drawer'
import { Footer } from '@/components/catalog/footer'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useCart } from '@/store/cart'
import { toast } from 'sonner'

function CatalogContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const productSlug = searchParams.get('producto')
  const categoryParam = searchParams.get('categoria')

  const activeCategory = categoryParam || 'all'
  const [search, setSearch] = useState('')

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [productSlug])

  const openProduct = useCallback((id: string) => {
    router.push(`?producto=${id}`, { scroll: false })
  }, [router])

  const goHome = useCallback(() => {
    router.push('/', { scroll: false })
  }, [router])

  const selectCategory = useCallback((id: string) => {
    if (id === 'all') {
      router.push('?', { scroll: false })
    } else {
      router.push(`?categoria=${id}`, { scroll: false })
    }
    setTimeout(() => {
      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }, [router])

  const [mobileMenu, setMobileMenu] = useState(false)
  const addItem = useCart((s) => s.addItem)

  const handleAddExp = useCallback((exp: { id: string; title: string; price: number; emoji: string }) => {
    addItem({
      productId: `exp-${exp.id}`,
      name: `${exp.emoji} ${exp.title}`,
      price: exp.price,
      image: '/hero-banner.png',
    })
    toast.success(`${exp.title} agregada al carrito`)
  }, [addItem])

  const product = productSlug ? PRODUCTS.find((p) => p.id === productSlug) : null
  const related = product
    ? PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
    : []

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header
        activeCategory={activeCategory}
        onCategory={selectCategory}
        onHome={goHome}
        search={search}
        onSearch={setSearch}
        onMobileMenu={() => setMobileMenu(true)}
      />

      <main className="flex-1">
        {product ? (
          <ProductDetail
            product={product}
            related={related}
            onBack={goHome}
            onOpen={openProduct}
          />
        ) : (
          <>
            <Hero onCategory={selectCategory} onShop={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })} />
            <CategoryStrip active={activeCategory} onSelect={selectCategory} />
            <ProductGrid
              products={PRODUCTS}
              onOpen={openProduct}
              activeCategory={activeCategory}
              onCategory={selectCategory}
              search={search}
            />
            <Experiencias onAdd={handleAddExp} />
          </>
        )}
      </main>

      <Footer onCategory={selectCategory} />
      <CartDrawer />

      {/* Mobile menu */}
      <Sheet open={mobileMenu} onOpenChange={setMobileMenu}>
        <SheetContent side="left" className="w-[280px]">
          <SheetHeader>
            <SheetTitle>Categorías</SheetTitle>
          </SheetHeader>
          <div className="p-4">
            <button
              onClick={() => { selectCategory('all'); setMobileMenu(false) }}
              className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium hover:bg-pink-50"
            >
              🛍️ Todos los productos
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => { selectCategory(c.id); setMobileMenu(false) }}
                className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium hover:bg-pink-50"
              >
                {c.emoji} {c.label}
              </button>
            ))}
            <div className="mt-4 rounded-xl bg-pink-50 p-3 text-xs text-pink-700">
              💝 ¿Necesitas ayuda? Escríbenos por WhatsApp: +57 320 276 1748
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-500 border-t-transparent" /></div>}>
      <CatalogContent />
    </Suspense>
  )
}
