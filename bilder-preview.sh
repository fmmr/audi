#!/bin/bash
#
# Preview: hvordan bilder i en staging-mappe vil koble seg til feil-databasen.
# Kjør FØR du flytter til docs/ - så ser du hva som mismatcher.
#
# Bruk:
#   ./bilder-preview.sh ~/Desktop/nye_bilder
#
# Filnavnkonvensjon: YYYYMMDD_[kategori_]beskrivelse.jpg
# Se BILDER.md for detaljer.
#

STAGING="${1:-$HOME/Desktop/nye_bilder}"
PROJECT="/Users/fmr/Jottacloud/FMR_DOCS/202501_Audi_fail"

if [ ! -d "$STAGING" ]; then
  echo "Mappe finnes ikke: $STAGING"
  echo "Bruk: $0 <mappe>"
  exit 1
fi

cd "$PROJECT" || exit 1

# Bruk node til å gjøre matchingen (samme logikk som data.js autoDiscover)
node -e "
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync('docs/data.js','utf8').replace(/^const /gm,'var ');
eval(src);

const STAGING = '$STAGING';
const files = fs.readdirSync(STAGING).filter(f => /\.(jpg|jpeg|png|mp4|mov)$/i.test(f));

// Grupper faults per dato - inkluderer alle datoer i en range (feks 2026-06-21..2026-06-30)
const faultsByDate = {};
const dayMs = 86400000;
FAULTS.forEach(f => {
  const [startStr, endStr] = (f.date||'').split('..');
  if (!startStr || startStr === 'div') return;
  const start = new Date(startStr);
  const end = endStr ? new Date(endStr) : start;
  for (let t = start.getTime(); t <= end.getTime(); t += dayMs) {
    const d = new Date(t);
    const key = d.getUTCFullYear().toString() +
                String(d.getUTCMonth()+1).padStart(2,'0') +
                String(d.getUTCDate()).padStart(2,'0');
    if (!faultsByDate[key]) faultsByDate[key] = [];
    faultsByDate[key].push(f);
  }
});

const catSlugs = Object.keys(CATEGORIES);
const results = { matched: [], noDate: [], noFault: [], badCat: [] };

files.forEach(name => {
  const m = name.match(/^(\d{8})/);
  if (!m) { results.noDate.push(name); return; }
  const dateKey = m[1];
  const faults = faultsByDate[dateKey];
  if (!faults) { results.noFault.push({name, date: dateKey}); return; }

  // Sjekk om filnavn har kategori-slug etter datoen
  const rest = name.slice(9).toLowerCase();
  const firstPart = rest.split(/[_.]/)[0];
  const catFilter = catSlugs.includes(firstPart) ? firstPart : null;
  let matched = faults;
  if (catFilter) matched = faults.filter(f => f.category === catFilter);

  if (matched.length === 0) {
    results.badCat.push({name, date: dateKey, cat: catFilter, available: [...new Set(faults.map(f=>f.category))]});
  } else {
    results.matched.push({name, date: dateKey, faults: matched});
  }
});

const bar = (s) => console.log('\n' + '='.repeat(60) + '\n' + s + '\n' + '='.repeat(60));

bar('MATCHER (' + results.matched.length + ')');
results.matched.forEach(r => {
  const d = r.date.slice(0,4) + '-' + r.date.slice(4,6) + '-' + r.date.slice(6,8);
  console.log('  ' + r.name);
  r.faults.forEach(f => {
    console.log('    -> [' + f.category + '] ' + d + ' ' + f.title.slice(0,55));
  });
});

if (results.noDate.length) {
  bar('FILNAVN UTEN DATO (' + results.noDate.length + ') - trenger YYYYMMDD-prefiks');
  results.noDate.forEach(n => console.log('  ' + n));
}

if (results.noFault.length) {
  bar('DATOER UTEN MATCHENDE FEIL (' + results.noFault.length + ')');
  const byDate = {};
  results.noFault.forEach(r => { (byDate[r.date] = byDate[r.date]||[]).push(r.name); });
  Object.keys(byDate).sort().forEach(d => {
    console.log('  ' + d.slice(0,4)+'-'+d.slice(4,6)+'-'+d.slice(6,8) + ':');
    byDate[d].forEach(n => console.log('    ' + n));
  });
  console.log('\n  Løsning: enten legg til en FAULT-oppføring i data.js for datoen,');
  console.log('  eller endre filnavnet til nærmeste feildato.');
}

if (results.badCat.length) {
  bar('KATEGORI I FILNAVN MATCHER IKKE FEILENE (' + results.badCat.length + ')');
  results.badCat.forEach(r => {
    console.log('  ' + r.name);
    console.log('    filnavn sier: ' + r.cat + ' | den datoen har kun: ' + r.available.join(', '));
  });
}

bar('OPPSUMMERING');
console.log('  Vil matche:     ' + results.matched.length);
console.log('  Uten dato:      ' + results.noDate.length);
console.log('  Ingen feil:     ' + results.noFault.length + ' (må legge til FAULT eller endre navn)');
console.log('  Feil kategori:  ' + results.badCat.length);
console.log('  Totalt filer:   ' + files.length);
"
