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
  ['El abrazo que no puedes dar en persona', 189900, 'Más vendido', true],
  ['Su primer gran amor de felpa', 89900, 'Nuevo', false],
  ['El unicornio que soñó toda la vida', 119900, 'Favorito', true],
  ['Te amo en rosas y abrazos', 159900, 'Más vendido', false],
  ['El guardián silencioso de su mesa', 99900, '', false],
  ['El gatito que siempre pidió y nunca llegó', 129900, 'Nuevo', false],
  ['El compañero de todas sus aventuras', 149900, '', false],
  ['El elefante que nunca olvida tu amor', 94900, '', false],
  ['El abrazo cálido en el invierno bogotano', 109900, '', false],
  ['El primer te quiero hecho peluche', 79900, 'Favorito', false],
  ['Para tocar el cielo de su habitación', 139900, '', false],
  ['El rey que protege su corazón', 119900, '', false],
  ['Su primer regalo de bienvenida al mundo', 69900, 'Nuevo', false],
  ['Un pedacito de Australia para abrazar', 89900, '', false],
  ['El astuto que robó su sonrisa', 94900, '', false],
  ['El travieso que la hace reír cada día', 84900, '', false],
  ['El corcel de sus sueños de niña', 134900, '', false],
  ['El dinosaurio más tierno del jurásico', 104900, 'Favorito', true],
  ['La felicidad con patitas', 74900, '', false],
  ['El pingüino del polo que la enamoró', 99900, 'Nuevo', false],
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
  ['El amor que no cabe en palabras', 189900, 'Más vendido', false],
  ['El verano eterno en su mesa', 119900, '', false],
  ['El sol que la hace sonreír cada mañana', 139900, 'Favorito', false],
  ['La elegancia que enamora a primera vista', 169900, 'Nuevo', false],
  ['El lujo que ella siempre mereció', 199900, 'Premium', true],
  ['La pureza hecha pétalos blancos', 149900, '', false],
  ['La reina que corona su nueva casa', 229900, 'Premium', false],
  ['Amor con chocolate, la combinación perfecta', 209900, 'Más vendido', false],
  ['La sonrisa que despierta con el desayuno', 159900, '', false],
  ['El jardín que siempre soñó tener', 129900, 'Favorito', false],
  ['La pasión que no se puede callar', 99900, '', false],
  ['El pastel de colores de su corazón', 179900, 'Nuevo', true],
  ['La calma de Provenza en su ventana', 109900, '', false],
  ['El oro que trae el otoño a su vida', 114900, '', false],
  ['El te amo que nunca se marchita', 164900, 'Premium', false],
  ['Los Andes florecidos en su mesa', 94900, '', false],
  ['El corazón que late rojo intenso', 154900, '', false],
  ['La alegría multicolor de quererte', 104900, 'Favorito', false],
  ['El arcoíris de tu amor en pétalos', 174900, 'Nuevo', true],
  ['El frescor que enamora al abrir la puerta', 144900, '', false],
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
  ['El despertar mágico que recordará toda la vida', 149900, 'Más vendido', true],
  ['Una mañana en París sin salir de Bogotá', 129900, '', false],
  ['El amanecer americano servido en su cama', 99900, 'Favorito', false],
  ['El domingo perfecto empieza aquí', 119900, 'Nuevo', false],
  ['La mañana que conquistará su día', 179900, 'Premium', true],
  ['La pausa dulce que se merece', 109900, '', false],
  ['La energía para conquistar el mundo', 114900, '', false],
  ['El lujo belga en pijama', 134900, '', false],
  ['El cumpleaños que arranca con sorpresa', 159900, 'Favorito', true],
  ['El té de las cinco en Londres', 124900, '', false],
  ['La suite de hotel en su propia casa', 194900, 'Premium', false],
  ['El comienzo saludable que se prometió', 89900, 'Nuevo', false],
  ['Los huevos del chef servidos en su cama', 139900, '', false],
  ['El trópico colombiano en su mesa', 104900, '', false],
  ['El domingo neoyorquino en Bogotá', 144900, '', false],
  ['El poder que da la avena de la abuela', 84900, '', false],
  ['El desayuno para enamorarla de nuevo', 169900, 'Más vendido', true],
  ['El brunch del fin de semana sin salir', 154900, '', false],
  ['La aventura matutina de los pequeños', 94900, 'Favorito', false],
  ['Las tostadas de la abuela en casa', 124900, 'Nuevo', false],
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
  ['La fiesta empieza antes de abrir la puerta', 159900, 'Más vendido', false],
  ['La sorpresa que flota sobre su mesa', 89900, 'Favorito', false],
  ['El número que hace oficial la celebración', 49900, '', true],
  ['La entrada triunfal a su día especial', 199900, 'Premium', false],
  ['La dulce sorpresa que flota y enamora', 119900, 'Más vendido', false],
  ['El corazón que vuela hasta su techo', 79900, '', false],
  ['El arcoíris que pinta su fiesta', 134900, 'Nuevo', false],
  ['La sorpresa bobo que arranca la risa', 69900, '', false],
  ['La estrella que guía su celebración', 94900, 'Favorito', false],
  ['Su nombre flotando en el cielo', 89900, 'Nuevo', true],
  ['El fondo de bodas que siempre soñó', 249900, 'Premium', false],
  ['El unicornio mágico de su fiesta', 84900, '', false],
  ['El rosé gold que eleva la elegancia', 109900, 'Favorito', false],
  ['Las letras que iluminan la fiesta', 124900, '', true],
  ['La sorpresa total que cubre el techo', 144900, 'Más vendido', false],
  ['El brillo metálico que deslumbra', 74900, '', false],
  ['El gigante del cielo que impacta', 164900, 'Premium', false],
  ['La burbuja mágica que atrapa la mirada', 94900, 'Nuevo', false],
  ['La graduación que flota en colores', 189900, '', false],
  ['El neón que enciende el festejo', 59900, '', true],
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
  ['El cumpleaños legendario que recordará siempre', 129900, 'Más vendido', true],
  ['El cumpleaños que lo tiene absolutamente todo', 189900, 'Premium', true],
  ['La fiesta completa antes de tocar el timbre', 159900, 'Favorito', false],
  ['La torre de color que deslumbra la mesa', 109900, '', false],
  ['El tres leches que enamora en cada bocado', 119900, '', true],
  ['El regalo que toda mujer quiere abrir', 149900, 'Más vendido', false],
  ['El regalo que ningún hombre espera', 149900, '', false],
  ['La piñada que revive la infancia', 89900, '', false],
  ['El red velvet que enamora en rojo', 134900, 'Nuevo', true],
  ['Los cupcakes que pintan la fiesta', 99900, 'Favorito', false],
  ['La decoración temática que sorprende', 174900, '', false],
  ['Las frutas frescas que endulzan el año nuevo', 144900, '', true],
  ['El chocolate que conquista el cumpleaños', 114900, '', false],
  ['El combo globos y torta que lo tiene todo', 199900, 'Premium', false],
  ['La vainilla clásica de los cumpleaños felices', 109900, '', true],
  ['Peluche y torta: el dúo que enamora', 169900, 'Más vendido', false],
  ['Las velas que cumplen los deseos', 59900, '', false],
  ['La zanahoria artesanal del cumpleaños especial', 124900, 'Nuevo', true],
  ['Flores y torta: el regalo completo', 184900, '', false],
  ['La fiesta infantil que recordará toda la vida', 139900, 'Favorito', false],
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
  ['La noche que nunca olvidará', 249900, 'Premium', true],
  ['El amor eterno celebrado en una caja', 189900, 'Más vendido', false],
  ['El brindis que sella otro año juntos', 174900, 'Favorito', false],
  ['El spa en casa para los dos', 199900, 'Premium', true],
  ['La cena con champagne que enciende la noche', 219900, 'Más vendido', false],
  ['Recién casados: la primera celebración', 164900, '', false],
  ['Flores y vino: el clásico que enamora', 159900, '', false],
  ['El romance que sabe a chocolate y vino', 144900, 'Favorito', false],
  ['La noche de cine abrazados en casa', 134900, '', false],
  ['El chef privado cocina solo para ustedes', 299900, 'Premium', true],
  ['Bodas de plata: la celebración de la vida', 229900, '', false],
  ['Rosas y peluche: el dúo del amor', 169900, 'Más vendido', false],
  ['El café mañanero de los enamorados', 119900, 'Nuevo', false],
  ['El sí más esperado con anillo y flores', 259900, 'Premium', true],
  ['El picnic romántico en el parque', 154900, '', false],
  ['La cena mediterránea para dos', 234900, '', false],
  ['El aniversario a distancia que los acerca', 139900, 'Nuevo', false],
  ['Velas aromáticas y vino: la noche perfecta', 124900, '', false],
  ['Bodas de oro: medio siglo de amor', 279900, 'Premium', true],
  ['El canvas del amor con flores', 189900, '', false],
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
  ['Su nombre grabado en oro para siempre', 119900, 'Más vendido', true],
  ['La taza de los dos con su mejor foto', 69900, 'Favorito', true],
  ['El marco que guarda el recuerdo favorito', 84900, '', true],
  ['El llavero que lleva tu nombre a todos lados', 49900, 'Nuevo', true],
  ['La madera grabada con tu propia historia', 134900, 'Premium', true],
  ['La magia que revela tu foto con el calor', 79900, '', true],
  ['El cojín que abraza con tu foto', 94900, 'Favorito', true],
  ['El bolso único con tu diseño exclusivo', 104900, '', true],
  ['El cuadro canvas de tu mejor momento', 149900, 'Premium', true],
  ['La luz de tu nombre brillando en la noche', 114900, 'Más vendido', true],
  ['El álbum de su vida en papel premium', 124900, '', true],
  ['La pulsera que lleva su nombre en la piel', 74900, 'Nuevo', true],
  ['El rompecabezas del amor que arman juntos', 89900, '', true],
  ['El cartel LED con su nombre en luz', 159900, 'Premium', true],
  ['La cerámica única con tu diseño a mano', 64900, '', true],
  ['La agenda 2025 con su nombre en la portada', 94900, '', true],
  ['La caja grande que guarda toda su historia', 179900, 'Más vendido', true],
  ['El mapa estelar de la noche que se conocieron', 109900, 'Nuevo', true],
  ['La bolsa estampada con su mejor sonrisa', 69900, '', true],
  ['El acrílico premium de su mejor foto', 169900, 'Premium', true],
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
  ['La caja misterio que no querrá dejar de abrir', 159900, 'Más vendido', true],
  ['La sorpresa mañanera que despierta sonrisas', 139900, 'Favorito', true],
  ['El hamper gourmet para el paladar exigente', 189900, 'Premium', false],
  ['La motivación del día en una sola caja', 114900, 'Nuevo', false],
  ['La torre de 5 pisos que deslumbra al abrir', 209900, 'Premium', false],
  ['El cumpleaños sorpresa que nadie olvida', 149900, 'Más vendido', true],
  ['El wellness que relaja cuerpo y alma', 134900, '', false],
  ['La pareja sorprendida sin ninguna razón', 169900, 'Favorito', false],
  ['El chocolate deluxe que enamora al primer bocado', 124900, '', false],
  ['La sorpresa infantil que arranca risas', 99900, 'Nuevo', false],
  ['El lujo oro que impresiona al destapar', 229900, 'Premium', true],
  ['El espresso mañanero que despierta el alma', 104900, '', false],
  ['El spa sorpresa que relaja sin salir de casa', 144900, '', false],
  ['La torre de sabores que conquista el paladar', 174900, 'Más vendido', false],
  ['El gracias que se queda grabado para siempre', 119900, '', false],
  ['La sorpresa de mamá que la hace emocionar', 154900, 'Favorito', true],
  ['El vino y quesos para la noche perfecta', 194900, 'Premium', false],
  ['La oficina ejecutiva sorprendida al mediodía', 164900, '', false],
  ['El misterio tech que enamora al instante', 179900, 'Nuevo', false],
  ['La amistad celebrada en una caja', 109900, '', false],
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
