'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent } from '@/components/ui/dialog'

interface ProductGalleryProps {
  images: string[]
  name: string
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [active, setActive] = useState(0)
  const [zoom, setZoom] = useState(false)
  const [lens, setLens] = useState<{ x: number; y: number } | null>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  const move = (dir: number) => {
    setActive((a) => (a + dir + images.length) % images.length)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imgRef.current) return
    const rect = imgRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setLens({ x, y })
  }

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row">
      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto sm:flex-col sm:overflow-visible sm:w-20">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              'relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all sm:h-18 sm:w-18',
              active === i ? 'border-rose-600 ring-2 ring-rose-600/20' : 'border-border hover:border-rose-400'
            )}
          >
            <Image src={img} alt={`${name} ${i + 1}`} fill sizes="72px" className="object-cover" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative flex-1">
        <div
          ref={imgRef}
          className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted/20 cursor-zoom-in"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setLens(null)}
          onClick={() => setZoom(true)}
        >
          <Image
            src={images[active]}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-200"
            style={lens ? { transform: 'scale(1.8)', transformOrigin: `${lens.x}% ${lens.y}%` } : undefined}
            priority
          />
          <div className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white backdrop-blur">
            <ZoomIn className="mr-1 inline h-3 w-3" /> Zoom
          </div>
        </div>

        {/* Carousel arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => move(-1)}
              className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-md transition hover:bg-white"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => move(1)}
              className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-md transition hover:bg-white"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Dots for mobile */}
        <div className="mt-2 flex justify-center gap-1.5 sm:hidden">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn('h-1.5 rounded-full transition-all', active === i ? 'w-5 bg-rose-600' : 'w-1.5 bg-border')}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen zoom dialog */}
      <Dialog open={zoom} onOpenChange={setZoom}>
        <DialogContent className="max-w-4xl border-0 bg-black/95 p-0">
          <button
            onClick={() => setZoom(false)}
            className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative h-[80vh] w-full">
            <Image src={images[active]} alt={name} fill className="object-contain p-4" sizes="100vw" />
            {images.length > 1 && (
              <>
                <button
                  onClick={() => move(-1)}
                  className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white hover:bg-white/30"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={() => move(1)}
                  className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white hover:bg-white/30"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
