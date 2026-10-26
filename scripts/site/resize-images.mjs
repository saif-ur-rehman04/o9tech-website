// Makes the smaller image copies that img() in ui.mjs offers through srcset:
//   name-640.webp for tall phone screenshots (drawn at about 110 to 300px wide)
//   name-192.webp for 512px app icons (drawn at 44 to 92px)
// Run after adding new images, then rebuild:
//   node scripts/site/resize-images.mjs && node scripts/site/build.mjs --check
// Needs cwebp (brew install webp). Existing copies are skipped.
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { execFileSync } from 'node:child_process';
import { ROOT, imgSize } from './ui.mjs';

const walk = (dir) => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? walk(p) : [p];
});

let made = 0;
for (const file of walk(join(ROOT, 'assets/img/work'))) {
  if (!file.endsWith('.webp') || /-(192|640)\.webp$/.test(file)) continue;
  const rel = relative(ROOT, file);
  const { w, h } = imgSize(rel);
  const target = h > w * 1.3 && w > 800 ? 640 : w === h && w >= 384 ? 192 : 0;
  if (!target) continue;
  const out = file.replace(/\.webp$/, `-${target}.webp`);
  if (existsSync(out)) continue;
  execFileSync('cwebp', ['-quiet', '-q', '80', '-m', '6', '-resize', String(target), '0', file, '-o', out]);
  made++;
}
console.log(`Made ${made} smaller image copies.`);
