'use client'

import { Truck, ShieldCheck, RefreshCw, Headphones, Instagram, Facebook, MessageCircle, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-rose-950 text-rose-100">
      {/* Trust strip */}
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:px-6 md:grid-cols-4">
          {[
            { icon: Truck, title: 'Envío gratis', desc: 'En Bogotá desde $99.900' },
            { icon: ShieldCheck, title: 'Pago seguro', desc: 'Transacciones 100% protegidas' },
            { icon: RefreshCw, title: 'Garantía total', desc: 'Si no te encanta, lo cambiamos' },
            { icon: Headphones, title: 'Soporte 24/7', desc: 'Estamos para ti siempre' },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10">
                <f.icon className="h-5 w-5 text-rose-300" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">{f.title}</div>
                <div className="text-xs text-rose-300/80">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-rose-500 to-fuchsia-500 text-lg">🎁</span>
              <div className="text-base font-extrabold text-white">
                Emociones<span className="text-rose-400">Matutinas</span>
              </div>
            </div>
            <p className="mt-3 text-sm text-rose-300/80">
              El marketplace de regalos premium de Bogotá. Sorpresas que enamoran, entregadas con amor.
            </p>
            <div className="mt-4 flex gap-2">
              {[Instagram, Facebook, MessageCircle, Mail].map((Icon, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 transition hover:bg-white/20">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold text-white">Categorías</h4>
            <ul className="space-y-2 text-sm text-rose-300/80">
              <li><a href="#" className="hover:text-white">🧸 Peluches</a></li>
              <li><a href="#" className="hover:text-white">🌹 Flores</a></li>
              <li><a href="#" className="hover:text-white">🎂 Desayunos</a></li>
              <li><a href="#" className="hover:text-white">🎈 Globos</a></li>
              <li><a href="#" className="hover:text-white">🎁 Cumpleaños</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold text-white">Ayuda</h4>
            <ul className="space-y-2 text-sm text-rose-300/80">
              <li><a href="#" className="hover:text-white">¿Cómo comprar?</a></li>
              <li><a href="#" className="hover:text-white">Tiempos de entrega</a></li>
              <li><a href="#" className="hover:text-white">Devoluciones</a></li>
              <li><a href="#" className="hover:text-white">Términos y condiciones</a></li>
              <li><a href="#" className="hover:text-white">Política de privacidad</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold text-white">Contacto</h4>
            <ul className="space-y-2 text-sm text-rose-300/80">
              <li>📍 Bogotá, Colombia</li>
              <li>💬 WhatsApp: 320 123 4567</li>
              <li>✉️ hola@emocionesmatutinas.co</li>
              <li>🕐 Lun-Dom: 7am - 10pm</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-rose-300/60">
          © 2025 Emociones Matutinas · Hecho con 💝 en Bogotá · Rappi de los regalos
        </div>
      </div>
    </footer>
  )
}
