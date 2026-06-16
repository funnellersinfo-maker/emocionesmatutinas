// Auto-generated image pools for Momentos and Testimonios sections
// Run: node scripts/generate-image-pools.mjs
import { readFileSync, existsSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const SR_DIR = resolve(process.cwd(), 'public/search-results')
const pools = {}

const POOL_FILES = [
  'momentos-cumple', 'momentos-aniversario', 'momentos-pedida', 'momentos-madre',
  'flores-1', 'testimonios-1', 'testimonios-2', 'flores-2',
]

for (const key of POOL_FILES) {
  const p = resolve(SR_DIR, `${key}.json`)
  if (existsSync(p)) {
    try {
      const d = JSON.parse(readFileSync(p, 'utf8'))
      if (d.results) pools[key] = d.results.map((r) => r.original_url)
    } catch (e) {}
  }
}

const out = `// AUTO-GENERATED image pools for Momentos and Testimonios
export const IMAGE_POOLS: Record<string, string[]> = ${JSON.stringify(pools, null, 2)}
`
writeFileSync(resolve(process.cwd(), 'src/data/image-pools.ts'), out)
console.log('Generated image-pools.ts with', Object.keys(pools).length, 'pools')
