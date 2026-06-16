'use client'

const ITEMS = [
  '⭐ 4.9 de satisfacción',
  '💝 +4.000 sorpresas compartidas',
  '🚚 Entregas programadas en Bogotá',
  '⏰ Pedidos hasta las 7pm — entrega el mismo día',
  '✨ Nuevos productos cada semana',
  '🇨🇴 Hecho con amor en Colombia',
  '📍 Cobertura toda Bogotá',
  '😊 Más de 2.000 clientes felices',
  '💌 Dedicatoria gratis en cada pedido',
  '⚡ Envío express disponible',
]

export function Marquee() {
  // Duplicate for seamless loop
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div className="marquee-pause relative overflow-hidden border-b border-pink-300/60 bg-gradient-to-r from-pink-500 via-pink-600 to-pink-500 py-2 text-white">
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-2 text-xs font-medium sm:text-sm">
            <span>{item}</span>
            <span className="text-pink-200">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
