// Sequential (1-at-a-time) image search for reliability
import { exec } from 'child_process'
import { promisify } from 'util'
import { writeFileSync, mkdirSync, existsSync, readFileSync, appendFileSync } from 'fs'
import { resolve } from 'path'

const execAsync = promisify(exec)
const OUT_DIR = resolve(process.cwd(), 'public/search-results')
const LOG = resolve(process.cwd(), 'scripts/search-log.txt')
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

const log = (m) => { const line = `[${new Date().toISOString().slice(11,19)}] ${m}`; console.log(line); appendFileSync(LOG, line + '\n') }

const QUERIES = [
  ['peluches-2', 'plush bunny stuffed animal cute soft toy gift boutique'],
  ['peluches-4', 'plush bear with roses bouquet teddy gift romantic'],
  ['flores-1', 'luxury red roses bouquet premium gift elegant professional photography'],
  ['flores-2', 'sunflower tulip mixed flower bouquet bright colorful elegant gift'],
  ['flores-3', 'pink white lily orchid elegant flower arrangement bouquet gift'],
  ['flores-4', 'peony hydrangea pastel flower bouquet luxury elegant gift'],
  ['desayunos-3', 'croissant juice breakfast box morning delivery gourmet'],
  ['desayunos-4', 'waffle berries coffee breakfast gourmet gift basket'],
  ['globos-1', 'birthday balloon bouquet colorful helium premium decoration professional photography'],
  ['globos-2', 'gold number balloon helium party celebration decoration elegant'],
  ['globos-3', 'balloon arch garland pastel party decoration gift'],
  ['globos-4', 'foil balloon star heart party celebration gift'],
  ['cumpleanos-2', 'birthday cupcake tower sprinkles colorful celebration party gift'],
  ['cumpleanos-4', 'pinata party decoration birthday celebration colorful festive'],
  ['aniversarios-1', 'anniversary romantic gift luxury couple champagne premium professional photography'],
  ['aniversarios-2', 'romantic dinner wine roses couple anniversary elegant gift'],
  ['aniversarios-3', 'anniversary flower box red roses heart romantic luxury'],
  ['aniversarios-4', 'couple gift set spa romantic anniversary premium elegant'],
  ['personalizados-1', 'personalized custom gift box engraved name premium professional photography'],
  ['personalizados-2', 'custom photo frame mug personalized name gift custom made'],
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
        return { name, count: existing.results.length, ok: true, skip: true }
      }
    } catch {}
  }
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const { stdout } = await execAsync(
        `z-ai image-search -q ${JSON.stringify(query)} -c 20 --gl us --no-rank`,
        { cwd: process.cwd(), timeout: 180000, maxBuffer: 30 * 1024 * 1024 }
      )
      const idx = stdout.indexOf('{')
      if (idx === -1) { await new Promise(r => setTimeout(r, 3000 * attempt)); continue }
      const data = JSON.parse(stdout.slice(idx))
      if (data.success && data.results && data.results.length > 0) {
        writeFileSync(outPath, JSON.stringify(data, null, 2))
        return { name, count: data.results.length, ok: true }
      }
      log(`  ${name}: attempt ${attempt} no results, retrying...`)
      await new Promise(r => setTimeout(r, 3000 * attempt))
    } catch (e) {
      log(`  ${name}: attempt ${attempt} error: ${e.message.slice(0, 80)}`)
      await new Promise(r => setTimeout(r, 3000 * attempt))
    }
  }
  return { name, count: 0, ok: false, err: 'max retries' }
}

let total = 0
let okCount = 0
for (const [name, query] of QUERIES) {
  log(`Searching: ${name} (${query.slice(0, 40)}...)`)
  const r = await runOne(name, query)
  if (r.ok) { total += r.count; okCount++ }
  log(`  -> ${r.name}: ${r.count} imgs ${r.ok ? 'OK' : 'FAIL ' + (r.err || '')} ${r.skip ? '(skipped)' : ''}`)
}

log(`\n=== DONE: ${okCount}/${QUERIES.length} searches OK, ${total} total images ===`)
