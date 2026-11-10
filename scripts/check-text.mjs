// Fails the build if built pages break the text rules: keyboard characters only,
// no email address and no phone number.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = 'dist';
const banned = ['–', '—', '“', '”', '‘', '’', '·', '→', '…'];
const email = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}/;
const phone = /\+\d{2}[\s\d]{8,}|\b0\d{2}[ ]\d{3}[ ]\d{2}[ ]\d{2}\b/;

const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(html|txt|xml)$/.test(name)) files.push(p);
  }
};
walk(root);

const problems = [];
for (const f of files) {
  // Ignore scripts, styles and SVG markup; check what readers see.
  const text = readFileSync(f, 'utf8')
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '');
  for (const ch of banned) if (text.includes(ch)) problems.push(`${f}: banned character U+${ch.codePointAt(0).toString(16).toUpperCase()}`);
  const visible = text.replace(/<[^>]+>/g, ' ');
  const m = visible.match(email);
  if (m) problems.push(`${f}: email-like text "${m[0]}"`);
  const ph = visible.match(phone);
  if (ph) problems.push(`${f}: phone-like text "${ph[0]}"`);
}

if (problems.length) {
  console.error('Text check failed:\n' + problems.join('\n'));
  process.exit(1);
}
console.log(`Text check passed (${files.length} files).`);
