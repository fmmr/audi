#!/bin/bash
#
# Genererer thumbnails og manifest.js for feildokumentasjonssiden.
#
# Konvensjon: nye bilder skal navngis
#     YYYYMMDD_[kategori_]beskrivelse.jpg
# Kategorier: lading, mmi, hud, app, klima, nokkel, diverse
#
# Videoer (.mp4/.mov) får automatisk et thumbnail-uttrekk hvis ffmpeg er
# installert. Ellers vises de med et generisk video-ikon på siten.
#

set -e

DIR="/Users/fmr/Jottacloud/FMR_DOCS/202501_Audi_fail/docs"
THUMB_DIR="$DIR/thumbs"
MANIFEST="$DIR/manifest.js"

# Størrelser
IMG_SIZE="300x300"   # gallery-tiles trenger dette for å ikke bli grumsete
IMG_QUALITY=82

counter=0

# ---------- Sjekker ----------
if [ ! -d "$DIR" ]; then
  echo "Katalogen $DIR finnes ikke. Avslutter."
  exit 1
fi

if ! command -v magick &> /dev/null; then
  echo "ImageMagick (magick) er ikke installert. Installerer med Homebrew..."
  brew install imagemagick
fi

HAS_FFMPEG=0
if command -v ffmpeg &> /dev/null; then
  HAS_FFMPEG=1
else
  echo "  (Merk: ffmpeg ikke funnet — video-thumbnails hoppes over."
  echo "         Kjør 'brew install ffmpeg' for automatisk video-preview.)"
fi

mkdir -p "$THUMB_DIR"

# ---------- Bilder (jpg/jpeg/png/gif) ----------
shopt -s nullglob nocaseglob
for img in "$DIR"/*.{jpg,jpeg,png,gif}; do
  filename=$(basename "$img")
  thumb_file="$THUMB_DIR/$filename"

  if [ -f "$thumb_file" ] && [ "$thumb_file" -nt "$img" ]; then
    continue
  fi

  echo "  bilde: $filename"
  counter=$((counter+1))
  magick "$img" -auto-orient -resize "${IMG_SIZE}^" -gravity center -extent "$IMG_SIZE" -quality "$IMG_QUALITY" "$thumb_file"
done

# ---------- Videoer (mp4/mov) ----------
if [ $HAS_FFMPEG -eq 1 ]; then
  for vid in "$DIR"/*.{mp4,mov}; do
    filename=$(basename "$vid")
    stem="${filename%.*}"
    thumb_file="$THUMB_DIR/${stem}.png"

    if [ -f "$thumb_file" ] && [ "$thumb_file" -nt "$vid" ]; then
      continue
    fi

    echo "  video: $filename → ${stem}.png"
    counter=$((counter+1))
    # Hent frame ved 1s (eller starten hvis kortere), skalér som bilde-thumb
    ffmpeg -y -ss 00:00:01 -i "$vid" -vframes 1 -q:v 2 "/tmp/_thumb_$$.jpg" > /dev/null 2>&1 \
      || ffmpeg -y -i "$vid" -vframes 1 -q:v 2 "/tmp/_thumb_$$.jpg" > /dev/null 2>&1
    if [ -f "/tmp/_thumb_$$.jpg" ]; then
      magick "/tmp/_thumb_$$.jpg" -auto-orient -resize "${IMG_SIZE}^" -gravity center -extent "$IMG_SIZE" -quality "$IMG_QUALITY" "$thumb_file"
      rm -f "/tmp/_thumb_$$.jpg"
    fi
  done
fi

# ---------- manifest.js ----------
echo "  skriver manifest.js..."
{
  echo "// Auto-generert av thumb.sh - IKKE rediger manuelt."
  echo "// Kjør ./thumb.sh på nytt hvis du legger til/fjerner bilder."
  echo "const IMAGE_MANIFEST = ["
  ( cd "$DIR" && find . -maxdepth 1 -type f \
      \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \
         -o -iname '*.gif' -o -iname '*.mp4' -o -iname '*.mov' \) \
    | sed 's|^\./||' \
    | sort \
    | awk '{printf "    %c%s%c,\n", 34, $0, 34}'
  )
  echo "];"
} > "$MANIFEST"

shopt -u nullglob nocaseglob
echo "Ferdig! $counter nye thumbnails, manifest.js oppdatert ($(wc -l < "$MANIFEST") linjer)."
