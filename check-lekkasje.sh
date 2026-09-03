#!/bin/bash
#
# Sjekker om registreringsnummer eller epost-adresser har lekket
# inn i prosjektets tekstfiler.
#
# Bruk:
#   ./check-lekkasje.sh          # kun rapport
#   ./check-lekkasje.sh --fix    # rapport + automatisk erstatning
#

set -e
cd "$(dirname "$0")"

FIX=0
if [ "${1:-}" = "--fix" ]; then
    FIX=1
fi

python3 <<PY
import re, sys, os
from pathlib import Path

FIX = ${FIX}

# ---------- Mappings (alle patterns er lowercase, matches case-insensitive) ----------
# Regnr
PLATE_MAP = [
    (r'\beh85053\b',  'EH8XXXX'),
    (r'\beh850xx\b',  'EH8XXXX'),
]

# E-post: fullstendige "Navn <adresse>" → bare Navn
NAMED_EMAIL_MAP = [
    (r'"?fredrik r[øo]dland"?\s*<(?:fredrik@rodland\.no|fmrodland@gmail\.com)>', 'Fredrik'),
    (r'"?bil"?\s*<bil@rodland\.no>', 'Fredrik'),
    (r'"?mona\s*(?:marstrander\s*)?r[øo]dland"?\s*<(?:mona(?:marstrander)?@rodland\.no|monamrodland@gmail\.com)>', 'Mona'),
    (r'"?mona\s*rodland"?\s*<monamrodland@gmail\.com>', 'Mona'),
]

# E-post: løse adresser → navn/generisk
BARE_EMAIL_MAP = [
    (r'<?\bfredrik@rodland\.no\b>?',            'fredrik'),
    (r'<?\bfmrodland@gmail\.com\b>?',           'fredrik'),
    (r'<?\bbil@rodland\.no\b>?',                'fredrik'),
    (r'<?\bmona@rodland\.no\b>?',               'mona'),
    (r'<?\bmonamrodland@gmail\.com\b>?',        'mona'),
    (r'<?\btrym\.hoel@moller\.no\b>?',          'Trym Hoel'),
    (r'<?\bchristian\.james\.nigg@moller\.no\b>?', 'Christian Nigg'),
    (r'<?\blars-henrik\.solberg@moller\.no\b>?', 'Lars-Henrik Solberg'),
    (r'<?\bmagnus\.emil\.stang@moller\.no\b>?', 'Magnus Emil Stang'),
    (r'<?\brichard\.krogh-nielsen@moller\.no\b>?', 'Richard Krogh-Nielsen'),
    (r'<?\bchristian\.skjerven@moller\.no\b>?', 'Christian Skjerven'),
    (r'<?\bhenrik\.aarnaes@moller\.no\b>?',     'Henrik Aarnæs'),
    (r'<?\bverkstedbestilling\.\d+@moller\.no\b>?', '[Møller verkstedbestilling]'),
    (r'<?\bdigitalsupport\.[a-z]*@audi\.de\b>?', '[Audi Digital Support]'),
    # Fallback: alle andre @moller.no eller @audi.de
    (r'<?\b[a-z][a-z0-9._-]*@(?:moller\.no|audi\.de)\b>?', '[Møller/Audi]'),
]

# Siste fallback: enhver annen epostadresse - bruk lokalt navn som erstatning
# (feks 'hytte@hydro.com' → 'hytte'). Fanges kun hvis ikke fanget over.
GENERIC_EMAIL_PATTERN = r'<?\b([a-z][a-z0-9._+-]*)@[a-z0-9.-]+\.[a-z]{2,}\b>?'

# Navn på Møller-ansatte og andre bilfolk vi ikke ønsker å henge ut.
# Alle → 'Møller' (case-insensitive). Lengste patterns først slik at
# 'Trym Eirik Hoel' matches før 'Trym Hoel' etc.
NAME_MAP = [
    (r'\btrym\s+eirik\s+hoel\b',        'Møller'),
    (r'\btrym\s+hoel\b',                'Møller'),
    (r'\bchristian\s+james\s+nigg\b',   'Møller'),
    (r'\bchristian\s+nigg\b',           'Møller'),
    (r'\blars-henrik\s+solberg\b',      'Møller'),
    (r'\bmagnus\s+emil\s+stang\b',      'Møller'),
    (r'\bmagnus\.emil\.stang\b',        'Møller'),
    (r'\brichard\s+krogh-nielsen\b',    'Møller'),
    (r'\bricard\s+krogh-nielsen\b',     'Møller'),
    (r'\bchristian\s+skjerven\b',       'Møller'),
    (r'\bhenrik\s+aarn[æa]es\b',        'Møller'),
    (r'\bsilje\s+marie\s+fotland\s+breifjell\b', 'Møller'),
    (r'\bemilie\s+hagesveen\s+samkopf\b', 'Møller'),
    (r'\bingunn\s+hammerseth\b',        'Møller'),
    (r'\bmilosz\s+skalmierski\b',       'Møller'),
    (r'\bjonas\s+berthelsen\b',         'Møller'),
    (r'\bsondre\s+n[æa]es\s+rui\b',     'Møller'),
    (r'\bvetle\s+lisland\b',            'Møller'),
    (r'\bveton\s+habibi\b',             'Møller'),
    (r'\breidar\s+valde\b',             'Møller'),
    (r'\bfabian\s+rosenberg\b',         'Møller'),
    (r'\bthor\s+jostein\s+rogn[åa]s\b', 'Møller'),
    (r'\bjan\s+roger\s+kristiansen\b',  'Møller'),
    (r'\bpeik\s+bergersen\b',           'Møller'),
    (r'\bespen\s+haarseth\b',           'Møller'),
    (r'\bsvein\s+morten\s+bergh\b',     'Møller'),
    (r'\bper\s+nandrup\b',              'Møller'),
    (r'\bj[øo]rgen\s+snarli\b',         'Møller'),
    (r'\bespen\s+kristiansen\b',        'Møller'),
]

# ---------- Finn filer ----------
EXTS = {'.html', '.css', '.js', '.txt', '.md', '.sh'}
SKIP_DIRS = {'.git', 'thumbs', 'node_modules'}
SKIP_FILES = {'check-lekkasje.sh'}  # inneholder egne pattern-eksempler

files = []
for root, dirs, filenames in os.walk('.'):
    dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
    for fn in filenames:
        if fn in SKIP_FILES:
            continue
        if Path(fn).suffix.lower() in EXTS:
            files.append(Path(root) / fn)

# ---------- Skann + evt fiks ----------
plate_hits = 0
email_hits = 0
name_hits = 0
plate_files = set()
email_files = set()
name_files = set()
changes_per_file = {}

for fp in files:
    try:
        text = fp.read_text(encoding='utf-8')
    except Exception:
        continue

    new = text
    file_changes = []

    # NB: vi oppdaterer alltid working-copy etter hvert match (også i report-modus)
    # for aa hindre at senere patterns dobbeltteller samme treff.
    # Kun WRITE til disk avhenger av FIX.

    # Plate (case-insensitive)
    for pat, repl in PLATE_MAP:
        matches = re.findall(pat, new, flags=re.I)
        if matches:
            plate_hits += len(matches)
            plate_files.add(fp)
            file_changes.append(f"    {len(matches)}x  regnr → {repl}")
            new = re.sub(pat, repl, new, flags=re.I)

    # Named emails first (mer spesifikt)
    for pat, repl in NAMED_EMAIL_MAP + BARE_EMAIL_MAP:
        matches = re.findall(pat, new, flags=re.I)
        if matches:
            email_hits += len(matches)
            email_files.add(fp)
            file_changes.append(f"    {len(matches)}x  epost → {repl}")
            new = re.sub(pat, repl, new, flags=re.I)

    # Generisk fallback: alle andre epostadresser → bare det lokale navnet
    matches = re.findall(GENERIC_EMAIL_PATTERN, new, flags=re.I)
    if matches:
        email_hits += len(matches)
        email_files.add(fp)
        for m in matches:
            file_changes.append(f"    1x  ukjent epost → {m.lower()}")
        new = re.sub(GENERIC_EMAIL_PATTERN, lambda mo: mo.group(1).lower(), new, flags=re.I)

    # Navn på Møller-ansatte
    for pat, repl in NAME_MAP:
        matches = re.findall(pat, new, flags=re.I)
        if matches:
            name_hits += len(matches)
            name_files.add(fp)
            file_changes.append(f"    {len(matches)}x  navn → {repl}")
            new = re.sub(pat, repl, new, flags=re.I)

    if file_changes:
        changes_per_file[fp] = file_changes
        if FIX and new != text:
            fp.write_text(new, encoding='utf-8')

# ---------- Rapport ----------
print("=" * 60)
print(f"Scannet {len(files)} filer")
print(f"  Regnr-treff:   {plate_hits} i {len(plate_files)} filer")
print(f"  Epost-treff:   {email_hits} i {len(email_files)} filer")
print(f"  Navn-treff:    {name_hits} i {len(name_files)} filer")
print("=" * 60)

if changes_per_file:
    for fp in sorted(changes_per_file.keys()):
        print(f"\n{fp}")
        for c in changes_per_file[fp]:
            print(c)
    print()
    if FIX:
        print("✓ Alle treff fikset.")
    else:
        print("Kjør med --fix for å utføre erstatninger.")
else:
    print("\n✓ Ingen lekkasjer funnet!")
PY
