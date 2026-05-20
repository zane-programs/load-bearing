#!/usr/bin/env node
// Tiny SSG: re-injects CLAUDESLOP.md into the <script type="text/markdown" id="slop">
// block inside index.html. Run with `node build.mjs`.

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const mdPath   = join(here, 'CLAUDESLOP.md');
const htmlPath = join(here, 'index.html');

const md   = readFileSync(mdPath,   'utf8').trim();
const html = readFileSync(htmlPath, 'utf8');

const marker = /(<script type="text\/markdown" id="slop">)([\s\S]*?)(<\/script>)/;
if (!marker.test(html)) {
  console.error('Could not find <script type="text/markdown" id="slop"> in index.html');
  process.exit(1);
}

const updated = html.replace(marker, `$1\n${md}\n$3`);
writeFileSync(htmlPath, updated);
console.log(`Injected ${md.length} chars of slop into index.html`);
