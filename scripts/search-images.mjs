// Run image searches in TRUE parallel batches and save clean JSON
import { exec } from 'child_process'
import { promisify } from 'util'
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs'
import { resolve } from 'path'

const execAsync = promisify(exec)
const OUT_DIR = resolve(process.cwd(), 'public/search-results')
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

const QUERIES = [
  ['peluches-1', 'luxury giant teddy bear plush gift boutique white background professional photography'],
  ['peluches-2', 'plush bunny stuffed animal cute soft toy gift boutique'],
  ['peluches-3', 'unicorn plush stuffed rainbow colorful soft toy kids gift'],
  ['peluches-4', 'plush bear with roses bouquet teddy gift romantic'],
  ['flores-1', 'luxury red roses bouquet premium gift elegant professional photography'],
  ['flores-2', 'sunflower tulip mixed flower bouquet bright colorful elegant gift'],
  ['flores-3', 'pink white lily orchid elegant flower arrangement bouquet gift'],
  ['flores-4', 'peony hydrangea pastel flower bouquet luxury elegant gift'],
  ['desayunos-1', 'gourmet breakfast gift basket delivery morning premium professional photography'],
  ['desayunos-2', 'pancakes coffee breakfast tray morning fruit gourmet gift'],
  ['desayunos-3', 'croissant juice breakfast box morning delivery gourmet'],
  ['desayunos-4', 'waffle berries coffee breakfast gourmet gift basket'],
  ['globos-1', 'birthday balloon bouquet colorful helium premium decoration professional photography'],
  ['globos-2', 'gold number balloon helium party celebration decoration elegant'],
  ['globos-3', 'balloon arch garland pastel party decoration gift'],
  ['globos-4', 'foil balloon star heart party celebration gift'],
  ['cumpleanos-1', 'birthday cake decorated celebration candles premium professional photography'],
  ['cumpleanos-2', 'birthday cupcake tower sprinkles colorful celebration party gift'],
  ['cumpleanos-3', 'birthday gift box party supplies decoration set colorful'],
  ['cumpleanos-4', 'pinata party decoration birthday celebration colorful festive'],
  ['aniversarios-1', 'anniversary romantic gift luxury couple champagne premium professional photography'],
  ['aniversarios-2', 'romantic dinner wine roses couple anniversary elegant gift'],
  ['aniversarios-3', 'anniversary flower box red roses heart romantic luxury'],
  ['aniversarios-4', 'couple gift set spa romantic anniversary premium elegant'],
  ['personalizados-1', 'personalized custom gift box engraved name premium professional photography'],
  ['personalizados-2', 'custom photo frame mug personalized name gift custom made'],
  ['personalizados-3', 'personalized jewelry necklace engraved custom gift elegant'],
  ['personalizados-4', 'custom name gift basket personalized luxury custom made'],
  ['sorpresas-1', 'surprise mystery gift box luxury hamper basket premium professional photography'],
  ['sorpresas-2', 'luxury gift hamper basket gourmet chocolate wine elegant surprise'],
  ['sorpresas-3', 'mystery box unboxing surprise elegant gift delivery package'],
  ['sorpresas-4', 'gift tower stack premium ribbon luxury surprise elegant'],
]

async function runOne(name, query) {
  const outPath = resolve(OUT_DIR, `${name}.json`)
  if (existsSync(outPath)) {
    try {
      const existing = JSON.parse(readFileSync(outPath, 'utf8'))
      if (existing.success && existing.results && existing.results.length > 0) {
        return { name, count: existing.results.length, ok: true }
      }
    } catch {}
  }
  // Retry up to 4 times with backoff
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const { stdout } = await execAsync(
        `z-ai image-search -q ${JSON.stringify(query)} -c 20 --gl us --no-rank`,
        { cwd: process.cwd(), timeout: 200000, maxBuffer: 30 * 1024 * 1024 }
      )
      const idx = stdout.indexOf('{')
      if (idx === -1) { await new Promise(r => setTimeout(r, 2000 * attempt)); continue }
      const data = JSON.parse(stdout.slice(idx))
      if (data.success && data.results && data.results.length > 0) {
        writeFileSync(outPath, JSON.stringify(data, null, 2))
        return { name, count: data.results.length, ok: true }
      }
      await new Promise(r => setTimeout(r, 2000 * attempt))
    } catch (e) {
      await new Promise(r => setTimeout(r, 2000 * attempt))
    }
  }
  return { name, count: 0, ok: false, err: 'max retries' }
}

const BATCH = 3
const allResults = []
for (let i = 0; i < QUERIES.length; i += BATCH) {
  const batch = QUERIES.slice(i, i + BATCH)
  console.log(`\n=== Batch ${Math.floor(i / BATCH) + 1}/${Math.ceil(QUERIES.length / BATCH)} (${batch.length} in parallel) ===`)
  const t0 = Date.now()
  const batchResults = await Promise.all(batch.map(([name, query]) => runOne(name, query)))
  const dt = ((Date.now() - t0) / 1000).toFixed(1)
  for (const r of batchResults) {
    console.log(`  ${r.name}: ${r.count} imgs ${r.ok ? 'OK' : 'FAIL ' + (r.err || '')}`)
    allResults.push(r)
  }
  console.log(`  (${dt}s)`)
}

console.log('\n=== FINAL SUMMARY ===')
let total = 0
for (const r of allResults) {
  total += r.count
  console.log(`${r.name}: ${r.count}`)
}
console.log(`TOTAL: ${total} images from ${allResults.length} searches`)
