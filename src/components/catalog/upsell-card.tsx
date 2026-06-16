'use client'

import { Check, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatCOP } from '@/store/cart'

interface Upsell {
  id: string
  label: string
  emoji: string
  price: number
  desc: string
}

export function UpsellCard({ upsell, selected, onToggle }: { upsell: Upsell; selected: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'flex items-center gap-3 rounded-xl border-2 p-3 text-left transition-all',
        selected ? 'border-rose-600 bg-rose-50' : 'border-border bg-card hover:border-rose-300'
      )}
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-muted text-xl">
        {upsell.emoji}
      </span>
      <div className="min-w-0 flex-1">
        <div className="line-clamp-1 text-xs font-semibold text-foreground">{upsell.label}</div>
        <div className="text-xs text-rose-700">{formatCOP(upsell.price)}</div>
      </div>
      <span className={cn('grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition-all',
        selected ? 'border-rose-600 bg-rose-600 text-white' : 'border-border text-muted-foreground')}>
        {selected ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
      </span>
    </button>
  )
}
