'use client'

import { Truck, ShieldCheck, RefreshCw, Headphones, Instagram, Facebook, MessageCircle, Mail, MapPin, Clock, Phone } from 'lucide-react'
import { CATEGORIES } from '@/data/products'

interface FooterProps {
  onCategory: (id: string) => void
}

export function Footer({ onCategory }: FooterProps) {
  return (
    <footer className="mt-auto bg-gradient-to-br from-pink-950 via-pink-950 to-purple-950 text-pink-100">
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
                <f.icon className="h-5 w-5 text-pink-300" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">{f.title}</div>
                <div className="text-xs text-pink-300/80">{f.desc}</div>
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
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-500 text-lg">💝</span>
              <div className="text-base font-extrabold text-white">
                Emociones<span className="text-pink-400">Matutinas</span>
              </div>
            </div>
            <p className="mt-3 text-sm text-pink-300/80">
              Hacemos felices a quienes más amas. Regalos, desayunos y sorpresas para cualquier ocasión en Bogotá.
            </p>
            <div className="mt-4 flex gap-2">
              {[Instagram, Facebook, MessageCircle, Mail].map((Icon, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 transition hover:bg-pink-500">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold text-white">Categorías</h4>
            <ul className="space-y-2 text-sm text-pink-300/80">
              {CATEGORIES.slice(0, 5).map((c) => (
                <li key={c.id}>
                  <button onClick={() => onCategory(c.id)} className="transition hover:text-white">
                    {c.emoji} {c.label}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={() => onCategory(CATEGORIES[5].id)} className="transition hover:text-white">
                  {CATEGORIES[5].emoji} {CATEGORIES[5].label}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold text-white">Información</h4>
            <ul className="space-y-2 text-sm text-pink-300/80">
              <li><a href="#" className="transition hover:text-white">Sobre nosotros</a></li>
              <li><a href="#" className="transition hover:text-white">Política de envío</a></li>
              <li><a href="#" className="transition hover:text-white">Preguntas frecuentes</a></li>
              <li><a href="#" className="transition hover:text-white">Términos y condiciones</a></li>
              <li><a href="#" className="transition hover:text-white">Política de privacidad</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold text-white">Contacto</h4>
            <ul className="space-y-2.5 text-sm text-pink-300/80">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-pink-400" />
                <span>Bogotá, Colombia</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-pink-400" />
                <a href="https://wa.me/573202761748" className="hover:text-white">WhatsApp: +57 320 276 1748</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-pink-400" />
                <span>hola@emocionesmatutinas.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-pink-400" />
                <span>Lun-Sáb: 7am - 8pm</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-pink-300/60">
          © 2025 Emociones Matutinas. Todos los derechos reservados. Hecho con 💝 en Bogotá
        </div>
      </div>
    </footer>
  )
}
