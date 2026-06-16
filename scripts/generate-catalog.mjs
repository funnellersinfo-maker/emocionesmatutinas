// Generates src/data/products.ts with 160 products + real images from search results
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs'
import { resolve } from 'path'

const SR_DIR = resolve(process.cwd(), 'public/search-results')

// Load all search result images grouped by category
function loadImages() {
  const groups = {}
  if (!existsSync(SR_DIR)) return groups
  for (const f of readdirSync(SR_DIR)) {
    if (!f.endsWith('.json')) continue
    const cat = f.replace(/-\d+\.json$/, '')
    try {
      const d = JSON.parse(readFileSync(resolve(SR_DIR, f), 'utf8'))
      if (d.results && Array.isArray(d.results)) {
        if (!groups[cat]) groups[cat] = []
        for (const r of d.results) {
          if (r.original_url) groups[cat].push(r.original_url)
        }
      }
    } catch {}
  }
  return groups
}

// ---- PRODUCT DEFINITIONS: 160 unique products (8 cats x 20) ----
const slugify = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const PRODUCTS_DEF = []

// ============ PELUCHES (20) ============
const peluches = [
  ['Oso Gigante Cariño Premium', 189900, 'Más vendido', true],
  ['Conejito Dulce Sueño', 89900, 'Nuevo', false],
  ['Unicornio Arcoíris Mágico', 119900, 'Favorito', true],
  ['Osito Amor Eterno con Rosas', 159900, 'Más vendido', false],
  ['Peluche Perro Bulldog Francés', 99900, '', false],
  ['Gatito Abrazos Tiernos XL', 129900, 'Nuevo', false],
  ['Panda Gigante Bamboo', 149900, '', false],
  ['Peluche Elefante Grayson', 94900, '', false],
  ['Oso Polar Nieve Suave', 109900, '', false],
  ['Conejo Rosado Corazón', 79900, 'Favorito', false],
  ['Jirafa Melman Tall', 139900, '', false],
  ['Peluche León Rey Dorado', 119900, '', false],
  ['Osito Bebé Recién Nacido', 69900, 'Nuevo', false],
  ['Koala Eucalipto Abrazo', 89900, '', false],
  ['Zorro Rojo Travis', 94900, '', false],
  ['Peluche Mapache Bandit', 84900, '', false],
  ['Caballo Felpudo Noble', 134900, '', false],
  ['Dinosaurio T-Rex Suave', 104900, 'Favorito', true],
  ['Cerdito Barriguita Feliz', 74900, '', false],
  ['Peluche Pingüino Polaris', 99900, 'Nuevo', false],
]
for (const [name, price, badge, customizable] of peluches) {
  PRODUCTS_DEF.push({
    name, price, badge, customizable,
    cat: 'peluches', catLabel: 'Peluches', emoji: '🧸',
    short: `Peluche premium ${name.toLowerCase()} con relleno suave hipoalergénico y tela de alta densidad.`,
    includes: ['Peluche de felpa premium', 'Tarjeta dedicatoria', 'Bolsa de regalo', 'Cinta decorativa'],
    tags: ['felpa', 'suave', 'regalo', 'romántico', 'tierno'],
  })
}

// ============ FLORES (20) ============
const flores = [
  ['Bouquet Amor Infinito Premium', 189900, 'Más vendido', false],
  ['Ramo Margaritas Verano', 119900, '', false],
  ['Girasoles Sol Radiante', 139900, 'Favorito', false],
  ['Tulipanes Holanda Elegante', 169900, 'Nuevo', false],
  ['Bouquet Peonías Rosadas', 199900, 'Premium', true],
  ['Ramo Lirios Blancos Pureza', 149900, '', false],
  ['Orquídeas Phalaenopsis Luxe', 229900, 'Premium', false],
  ['Bouquet Rosas y Ferrero', 209900, 'Más vendido', false],
  ['Girasoles y Chocolates', 159900, '', false],
  ['Ramo Mixto Jardín Primavera', 129900, 'Favorito', false],
  ['Claveles Rojos Pasión', 99900, '', false],
  ['Bouquet Hortensias Pastel', 179900, 'Nuevo', true],
  ['Ramo Lavanda Provenza', 109900, '', false],
  ['Crisantemos Otoño Dorado', 114900, '', false],
  ['Bouquet Rosas Blancas Eternas', 164900, 'Premium', false],
  ['Ramo Astromelias Andinas', 94900, '', false],
  ['Bouquet Anturios Rojos', 154900, '', false],
  ['Gerberas Coloridas Alegría', 104900, 'Favorito', false],
  ['Bouquet Rosas Arcoíris', 174900, 'Nuevo', true],
  ['Ramo Eucalipto y Rosas', 144900, '', false],
]
for (const [name, price, badge, customizable] of flores) {
  PRODUCTS_DEF.push({
    name, price, badge, customizable,
    cat: 'flores', catLabel: 'Flores', emoji: '🌹',
    short: `Ramo de flores frescas ${name.toLowerCase()} con arreglo floral profesional y empaque de lujo.`,
    includes: ['Arreglo floral fresco', 'Papel kraft de lujo', 'Cinta de raso', 'Tarjeta dedicatoria', 'Conservante floral'],
    tags: ['fresco', 'flores', 'romántico', 'elegante', 'regalo'],
  })
}

// ============ DESAYUNOS (20) ============
const desayunos = [
  ['Desayuno Sorpresa Bogotá Premium', 149900, 'Más vendido', true],
  ['Canasta Continental París', 129900, '', false],
  ['Desayuno Américano Clásico', 99900, 'Favorito', false],
  ['Box Pancakes & Berries', 119900, 'Nuevo', false],
  ['Desayuno Ejecutivo Empresarial', 179900, 'Premium', true],
  ['Canasta Croissant & Café', 109900, '', false],
  ['Desayuno Fitness Energy', 114900, '', false],
  ['Box Waffles Belgas Royal', 134900, '', false],
  ['Desayuno Cumpleaños Mañanero', 159900, 'Favorito', true],
  ['Canasta Té Británico', 124900, '', false],
  ['Desayuno Mini Suite Hotel', 194900, 'Premium', false],
  ['Box Granola & Yogurt Saludable', 89900, 'Nuevo', false],
  ['Desayuno Huevos Benedict', 139900, '', false],
  ['Canasta Frutas Tropicales', 104900, '', false],
  ['Desayuno Bagel & Salmón', 144900, '', false],
  ['Box Avena & Miel Power', 84900, '', false],
  ['Desayuno Romántico Pareja', 169900, 'Más vendido', true],
  ['Canasta Mimosa & Brunch', 154900, '', false],
  ['Desayuno Infantil Aventurero', 94900, 'Favorito', false],
  ['Box Tostadas Francesas Royal', 124900, 'Nuevo', false],
]
for (const [name, price, badge, customizable] of desayunos) {
  PRODUCTS_DEF.push({
    name, price, badge, customizable,
    cat: 'desayunos', catLabel: 'Desayunos', emoji: '🎂',
    short: `Desayuno especial ${name.toLowerCase()} con entrega a domicilio en Bogotá y presentación gourmet.`,
    includes: ['Jugo natural', 'Café premium', 'Pan artesanal', 'Fruta fresca', 'Tarjeta dedicatoria'],
    tags: ['domicilio', 'mañana', 'gourmet', 'bogotá', 'entrega'],
  })
}

// ============ GLOBOS (20) ============
const globos = [
  ['Arco Globos Pastel Celebra', 159900, 'Más vendido', false],
  ['Bouquet Globos Helio Cumple', 89900, 'Favorito', false],
  ['Globos Número Dorado 30cm', 49900, '', true],
  ['Columna Globos Elegante', 199900, 'Premium', false],
  ['Bouquet Globos y Chocolates', 119900, 'Más vendido', false],
  ['Globos Foil Corazón Rojo', 79900, '', false],
  ['Arco Iris Globos Infantil', 134900, 'Nuevo', false],
  ['Globos Bobo Premium', 69900, '', false],
  ['Bouquet Globos Estrella', 94900, 'Favorito', false],
  ['Globos Personalizados Nombre', 89900, 'Nuevo', true],
  ['Backdrop Globos Bodas', 249900, 'Premium', false],
  ['Globos Foil Unicornio', 84900, '', false],
  ['Bouquet Globos Rosé Gold', 109900, 'Favorito', false],
  ['Globos Letras LED Fiesta', 124900, '', true],
  ['Arco Globos Sorpresa', 144900, 'Más vendido', false],
  ['Globos Acabado Metálico', 74900, '', false],
  ['Bouquet Globos XXL', 164900, 'Premium', false],
  ['Globos Burbuja Transparente', 94900, 'Nuevo', false],
  ['Arco Globos Graduación', 189900, '', false],
  ['Globos Foil Número Neón', 59900, '', true],
]
for (const [name, price, badge, customizable] of globos) {
  PRODUCTS_DEF.push({
    name, price, badge, customizable,
    cat: 'globos', catLabel: 'Globos', emoji: '🎈',
    short: `Decoración con globos ${name.toLowerCase()} de látex y foil de alta calidad con helio incluido.`,
    includes: ['Globos látex premium', 'Globos foil', 'Helio incluido', 'Cinta y lazo', 'Soporte decorativo'],
    tags: ['helio', 'decoración', 'fiesta', 'cumpleaños', 'celebración'],
  })
}

// ============ CUMPLEAÑOS (20) ============
const cumpleanos = [
  ['Torta Cumple Premium Chocolate', 129900, 'Más vendido', true],
  ['Box Cumpleaños Sorpresa Total', 189900, 'Premium', true],
  ['Kit Fiesta Cumple Completo', 159900, 'Favorito', false],
  ['Cupcake Tower Cumple Color', 109900, '', false],
  ['Torta Tres Leches Especial', 119900, '', true],
  ['Box Regalo Cumple Mujeres', 149900, 'Más vendido', false],
  ['Box Regalo Cumple Hombres', 149900, '', false],
  ['Piñada Cumple Tradicional', 89900, '', false],
  ['Torta Red Velvet Cumple', 134900, 'Nuevo', true],
  ['Box Cupcakes Variados', 99900, 'Favorito', false],
  ['Kit Decoración Cumple Tema', 174900, '', false],
  ['Torta Frutas Frescas Cumple', 144900, '', true],
  ['Box Chocolates Cumple', 114900, '', false],
  ['Kit Globos y Torta Combo', 199900, 'Premium', false],
  ['Torta Vainilla Clásica Cumple', 109900, '', true],
  ['Box Peluche y Torta', 169900, 'Más vendido', false],
  ['Kit Velas Cumple Especiales', 59900, '', false],
  ['Torta Zanahoria Cumple Artesanal', 124900, 'Nuevo', true],
  ['Box Flores y Torta Cumple', 184900, '', false],
  ['Kit Fiesta Infantil Cumple', 139900, 'Favorito', false],
]
for (const [name, price, badge, customizable] of cumpleanos) {
  PRODUCTS_DEF.push({
    name, price, badge, customizable,
    cat: 'cumpleanos', catLabel: 'Cumpleaños', emoji: '🎁',
    short: `Celebra con ${name.toLowerCase()}, incluye todo lo necesario para una fiesta inolvidable.`,
    includes: ['Producto principal', 'Velas de cumpleaños', 'Tarjeta dedicatoria', 'Decoración', 'Bolsa de regalo'],
    tags: ['cumpleaños', 'fiesta', 'celebración', 'torta', 'regalo'],
  })
}

// ============ ANIVERSARIOS (20) ============
const aniversarios = [
  ['Cena Romántica para Dos', 249900, 'Premium', true],
  ['Box Aniversario Amor Eterno', 189900, 'Más vendido', false],
  ['Vino y Rosas Aniversario', 174900, 'Favorito', false],
  ['Spa en Casa Pareja Deluxe', 199900, 'Premium', true],
  ['Cena Vela y Champagne', 219900, 'Más vendido', false],
  ['Box Pareja Recién Casados', 164900, '', false],
  ['Flores y Vino Aniversario', 159900, '', false],
  ['Box Romance Chocolate y Vino', 144900, 'Favorito', false],
  ['Noche de Cine en Casa Pareja', 134900, '', false],
  ['Cena Privada Chef en Casa', 299900, 'Premium', true],
  ['Box Aniversario Bodas Plata', 229900, '', false],
  ['Rosas y Peluche Aniversario', 169900, 'Más vendido', false],
  ['Box Pareja Café Mañanero', 119900, 'Nuevo', false],
  ['Anillo Promesa y Flores', 259900, 'Premium', true],
  ['Box Picnic Romántico Parque', 154900, '', false],
  ['Cena Mediterránea Pareja', 234900, '', false],
  ['Box Aniversario Larga Distancia', 139900, 'Nuevo', false],
  ['Velas Aromáticas y Vino', 124900, '', false],
  ['Box Bodas Oro Premium', 279900, 'Premium', true],
  ['Foto Canvas y Flores Aniversario', 189900, '', false],
]
for (const [name, price, badge, customizable] of aniversarios) {
  PRODUCTS_DEF.push({
    name, price, badge, customizable,
    cat: 'aniversarios', catLabel: 'Aniversarios', emoji: '💝',
    short: `Celebra su aniversario con ${name.toLowerCase()}, una experiencia pensada para parejas.`,
    includes: ['Experiencia principal', 'Detalle romántico', 'Tarjeta dedicatoria', 'Empaque de lujo', 'Velas decorativas'],
    tags: ['aniversario', 'pareja', 'romántico', 'amor', 'experiencia'],
  })
}

// ============ PERSONALIZADOS (20) ============
const personalizados = [
  ['Caja Personalizada Nombre Dorado', 119900, 'Más vendido', true],
  ['Taza Personalizada Foto Pareja', 69900, 'Favorito', true],
  ['Marco Fotos Personalizado', 84900, '', true],
  ['Llavero Grabado Nombre', 49900, 'Nuevo', true],
  ['Caja Madera Grabado Láser', 134900, 'Premium', true],
  ['Taza Mágica Revela Foto', 79900, '', true],
  ['Cojín Personalizado Foto', 94900, 'Favorito', true],
  ['Bolso Tote Personalizado', 104900, '', true],
  ['Cuadro Canvas Impresión', 149900, 'Premium', true],
  ['Caja Luz Nombre LED', 114900, 'Más vendido', true],
  ['Álbum Fotos Personalizado', 124900, '', true],
  ['Pulsera Grabado Nombre', 74900, 'Nuevo', true],
  ['Rompecabezas Foto Personalizado', 89900, '', true],
  ['Cartel LED Nombre Personalizado', 159900, 'Premium', true],
  ['Taza Cerámica Diseño Único', 64900, '', true],
  ['Agenda Personalizada 2025', 94900, '', true],
  ['Caja Regalo Personalizada Grande', 179900, 'Más vendido', true],
  ['Carta Stellar Mapa Estelar', 109900, 'Nuevo', true],
  ['Bolsa Tela Estampada Foto', 69900, '', true],
  ['Cuadro Acrílico Foto Premium', 169900, 'Premium', true],
]
for (const [name, price, badge, customizable] of personalizados) {
  PRODUCTS_DEF.push({
    name, price, badge, customizable,
    cat: 'personalizados', catLabel: 'Personalizados', emoji: '✨',
    short: `Producto personalizado ${name.toLowerCase()} con grabado e impresión de alta calidad.`,
    includes: ['Producto personalizado', 'Diseño a medida', 'Prueba digital', 'Caja de regalo', 'Tarjeta dedicatoria'],
    tags: ['personalizado', 'nombre', 'foto', 'único', 'grabado'],
  })
}

// ============ SORPRESAS (20) ============
const sorpresas = [
  ['Caja Misterio Deluxe', 159900, 'Más vendido', true],
  ['Sorpresa Mañanera Bogotá', 139900, 'Favorito', true],
  ['Hamper Gourmet Sorpresa', 189900, 'Premium', false],
  ['Box Sorpresa Motivacional', 114900, 'Nuevo', false],
  ['Torre Regalos Premium 5 Niveles', 209900, 'Premium', false],
  ['Caja Sorpresa Cumpleaños', 149900, 'Más vendido', true],
  ['Box Wellness Sorpresa', 134900, '', false],
  ['Sorpresa Pareja Romántica', 169900, 'Favorito', false],
  ['Hamper Chocolate Deluxe', 124900, '', false],
  ['Box Sorpresa Infantil', 99900, 'Nuevo', false],
  ['Caja Misterio Lujo Oro', 229900, 'Premium', true],
  ['Sorpresa Espresso Mañanero', 104900, '', false],
  ['Box Spa Sorpresa Relajante', 144900, '', false],
  ['Torre Sabores Gourmet', 174900, 'Más vendido', false],
  ['Caja Sorpresa Gracias', 119900, '', false],
  ['Box Sorpresa Mamá', 154900, 'Favorito', true],
  ['Hamper Vino y Quesos', 194900, 'Premium', false],
  ['Sorppresa Oficina Ejecutiva', 164900, '', false],
  ['Caja Misterio Tech', 179900, 'Nuevo', false],
  ['Box Sorpresa Amistad', 109900, '', false],
]
for (const [name, price, badge, customizable] of sorpresas) {
  PRODUCTS_DEF.push({
    name, price, badge, customizable,
    cat: 'sorpresas', catLabel: 'Sorpresas', emoji: '🎉',
    short: `Sorpresa única ${name.toLowerCase()} con curaduría de productos premium y empaque de lujo.`,
    includes: ['Curaduría de productos', 'Empaque de lujo', 'Tarjeta sorpresa', 'Cinta decorativa', 'Detalle especial'],
    tags: ['sorpresa', 'misterio', 'curado', 'lujo', 'regalo'],
  })
}

// ---- Build full products with images ----
const images = loadImages()

const sampleReviews = [
  { author: 'Laura G.', rating: 5, date: '2025-09-12', text: 'Llegó a tiempo y súper bien presentado. Mi novia quedó encantada, definitivo volveré a comprar.' },
  { author: 'Andrés M.', rating: 5, date: '2025-08-30', text: 'La calidad es excelente, se nota que es premium. La entrega fue puntual en Bogotá.' },
  { author: 'Valentina R.', rating: 4, date: '2025-10-02', text: 'Muy bonito, tal como en las fotos. Solo sugeriría más opciones de personalización.' },
  { author: 'Camilo P.', rating: 5, date: '2025-09-21', text: 'Increíble el detalle y el empaque. Lo pedí sorpresa y fue un éxito total.' },
  { author: 'Diana S.', rating: 5, date: '2025-08-15', text: 'Súper recomendado, la relación calidad-precio es muy buena y la atención impecable.' },
  { author: 'Felipe T.', rating: 4, date: '2025-10-08', text: 'Buen producto, llegó un poco tarde pero la calidad compensa. Volvería a pedir.' },
  { author: 'Mariana L.', rating: 5, date: '2025-09-05', text: 'Perfecto para regalar. Los materiales se sienten de primera y el diseño es hermoso.' },
  { author: 'Sebastián O.', rating: 5, date: '2025-08-22', text: 'Una experiencia de compra muy profesional. El producto superó mis expectativas.' },
]

const featuresPool = ['Material premium importado', 'Empaque reciclable de lujo', 'Hecho a mano en Colombia', 'Sellos de calidad internacional', 'Tecnología de impresión HD', 'Acabado mate elegante', 'Resistente y duradero', 'Certificado libre de tóxicos']
const benefitsPool = ['Sorpresa garantizada', 'Emoción al instante', 'Recuerdo inolvidable', 'Ideal para cualquier ocasión', 'Diseño único en su clase', 'Genera sonrisas inmediatas', 'Conecta con quien amas', 'Eleva cualquier celebración']

// Fallback: if a category has no images, borrow from a related category
const CATEGORY_FALLBACK = {
  flores: ['aniversarios', 'cumpleanos', 'sorpresas'],
  globos: ['cumpleanos', 'sorpresas', 'aniversarios'],
  aniversarios: ['flores', 'cumpleanos', 'sorpresas'],
  sorpresas: ['cumpleanos', 'aniversarios', 'desayunos'],
}

function buildFull(p, idx) {
  const slug = slugify(p.name)
  let catImages = images[p.cat] || []
  // Fallback to related categories if this one is empty
  if (catImages.length === 0) {
    for (const fb of CATEGORY_FALLBACK[p.cat] || []) {
      if ((images[fb] || []).length > 0) {
        catImages = images[fb]
        break
      }
    }
  }
  // Assign 5 images per product: main (unique) + 4 from pool, rotating
  const start = (idx * 5) % Math.max(1, catImages.length)
  const productImages = []
  for (let i = 0; i < 5; i++) {
    const url = catImages[(start + i) % catImages.length]
    if (url && !productImages.includes(url)) productImages.push(url)
  }
  // pad with pool if not enough
  let pi = 0
  while (productImages.length < 4 && catImages.length > 0) {
    const url = catImages[pi % catImages.length]
    if (!productImages.includes(url)) productImages.push(url)
    pi++
    if (pi > catImages.length * 2) break
  }
  // fallback placeholder if no images yet
  if (productImages.length === 0) {
    productImages.push(`https://placehold.co/800x800/fce7f3/e11d48?text=${encodeURIComponent(p.emoji + '+' + p.catLabel)}`)
  }

  const rating = Number((4.5 + (idx % 5) * 0.1).toFixed(1))
  const reviewsCount = 80 + ((idx * 37) % 320)
  const numReviews = 3 + (idx % 4)
  const reviews = []
  for (let i = 0; i < numReviews; i++) {
    const r = sampleReviews[(idx * 3 + i) % sampleReviews.length]
    reviews.push({ ...r })
  }

  const features = []
  for (let i = 0; i < 4; i++) features.push(featuresPool[(idx + i) % featuresPool.length])
  const benefits = []
  for (let i = 0; i < 4; i++) benefits.push(benefitsPool[(idx + i * 2) % benefitsPool.length])

  const fullDesc = `${p.name} es una creación exclusiva de Emociones Matutinas, diseñada para regalar momentos inolvidables. ${p.short} Cada detalle ha sido cuidadosamente seleccionado por nuestro equipo curatorial en Bogotá, garantizando una experiencia de unboxing que deslumbra desde el primer instante.\n\nElaborado con materiales premium y presentado en un empaque de lujo, este producto combina estética, calidad y emoción en una sola pieza. Perfecto para celebrar ocasiones especiales, sorprender a quien amas o simplemente decir "pienso en ti" con elegancia.\n\nNuestro compromiso es entregar más que un producto: entregamos una experiencia sensorial completa que conecta con los sentimientos y crea recuerdos duraderos. La entrega a domicilio en Bogotá y áreas metropolitanas es puntual y confiable.`

  return {
    id: slug,
    name: p.name,
    category: p.cat,
    categoryLabel: p.catLabel,
    emoji: p.emoji,
    price: p.price,
    shortDescription: p.short,
    fullDescription: fullDesc,
    includes: p.includes,
    rating,
    reviewsCount,
    reviews,
    tags: p.tags,
    badge: p.badge,
    customizable: p.customizable,
    features,
    benefits,
    images: productImages,
  }
}

const allProducts = PRODUCTS_DEF.map((p, i) => buildFull(p, i))

// Stats
const byCat = {}
for (const p of allProducts) byCat[p.category] = (byCat[p.category] || 0) + 1

const output = `// AUTO-GENERATED by scripts/generate-catalog.mjs
// ${allProducts.length} products across 8 categories
// DO NOT EDIT manually — run: node scripts/generate-catalog.mjs

export interface ProductReview {
  author: string
  rating: number
  date: string
  text: string
}

export interface Product {
  id: string
  name: string
  category: string
  categoryLabel: string
  emoji: string
  price: number
  shortDescription: string
  fullDescription: string
  includes: string[]
  rating: number
  reviewsCount: number
  reviews: ProductReview[]
  tags: string[]
  badge: string
  customizable: boolean
  features: string[]
  benefits: string[]
  images: string[]
}

export const CATEGORIES = [
  { id: 'peluches', label: 'Peluches', emoji: '🧸', description: 'Abrazos suaves que duran para siempre' },
  { id: 'flores', label: 'Flores', emoji: '🌹', description: 'Arreglos frescos que enamoran al instante' },
  { id: 'desayunos', label: 'Desayunos', emoji: '🎂', description: 'Despierta con amor y sabor gourmet' },
  { id: 'globos', label: 'Globos', emoji: '🎈', description: 'Color y alegría para toda celebración' },
  { id: 'cumpleanos', label: 'Cumpleaños', emoji: '🎁', description: 'Todo para un cumple inolvidable' },
  { id: 'aniversarios', label: 'Aniversarios', emoji: '💝', description: 'Celebra el amor con experiencias únicas' },
  { id: 'personalizados', label: 'Personalizados', emoji: '✨', description: 'Detalles únicos hechos solo para ti' },
  { id: 'sorpresas', label: 'Sorpresas', emoji: '🎉', description: 'Misterio y emoción en cada caja' },
] as const

export const PRODUCTS: Product[] = ${JSON.stringify(allProducts, null, 2)}

export const PRODUCT_STATS = ${JSON.stringify(byCat, null, 2)}
`

const outPath = resolve(process.cwd(), 'src/data/products.ts')
writeFileSync(outPath, output)

console.log(`\nGenerated ${allProducts.length} products`)
console.log('By category:', byCat)
console.log(`Total images assigned: ${allProducts.reduce((a, p) => a + p.images.length, 0)}`)
console.log(`Written to: ${outPath}`)
