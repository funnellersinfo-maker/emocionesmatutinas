'use client'

import { useEffect, useState } from 'react'
import { ArrowUp, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/store/cart'

export function FloatingButtons() {
  const [showTop, setShowTop] = useState(false)
  const count = useCart((s) => s.count())
  const buildWhatsAppLink = useCart((s) => s.buildWhatsAppLink)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // WhatsApp opens with cart context if items exist, otherwise help message
  const waHref = buildWhatsAppLink(count > 0 ? 'cart' : 'help')

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      {/* Volver arriba */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Volver arriba"
            className="grid h-10 w-10 place-items-center rounded-full border border-pink-200/60 bg-white/60 text-pink-700 shadow-sm backdrop-blur-md transition-all hover:bg-white/80 hover:text-pink-800"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp flotante traslúcido */}
      <motion.a
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-emerald-300/50 bg-emerald-500/30 text-emerald-700 shadow-sm backdrop-blur-md transition-all hover:bg-emerald-500/50 hover:text-emerald-800"
      >
        <MessageCircle className="h-6 w-6" fill="currentColor" />
        {/* Badge con count del carrito si hay items */}
        {count > 0 && (
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-pink-500 px-1 text-[10px] font-bold text-white shadow">
            {count}
          </span>
        )}
        {/* Tooltip sutil */}
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-md backdrop-blur-md sm:group-hover:block">
          {count > 0 ? `Enviar pedido (${count})` : 'Escríbenos'}
        </span>
      </motion.a>
    </div>
  )
}
