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

# ---------- Optimalisering av store originalbilder ----------
# Filer > 500 KB krympes til maks 2000 px lang side og JPEG-kvalitet 78.
# Hvis resultatet ikke er mindre, beholdes original (sikkerhetsnett).
# Skjer bare på bilder rett i docs/, ikke i thumbs/.
OPT_SIZE_LIMIT=$((500 * 1024))    # 500 KB
OPT_MAX_EDGE=2000
OPT_QUALITY=78
optimized=0
shopt -s nullglob nocaseglob
for img in "$DIR"/*.{jpg,jpeg,png}; do
  filesize=$(stat -f%z "$img")
  [ "$filesize" -le "$OPT_SIZE_LIMIT" ] && continue

  filename=$(basename "$img")
  tmp="/tmp/_opt_$$_$filename"
  magick "$img" -auto-orient -resize "${OPT_MAX_EDGE}x${OPT_MAX_EDGE}>" -quality "$OPT_QUALITY" "$tmp" 2>/dev/null || continue

  if [ -f "$tmp" ]; then
    new_size=$(stat -f%z "$tmp")
    # Krev minst 20% reduksjon - ellers behold original (unngår kvalitetstap
    # ved gjentatte kjøringer på allerede optimaliserte filer)
    threshold=$((filesize * 80 / 100))
    if [ "$new_size" -lt "$threshold" ]; then
      mv "$tmp" "$img"
      optimized=$((optimized+1))
      echo "  optimalisert: $filename  ($((filesize/1024)) KB → $((new_size/1024)) KB)"
      rm -f "$THUMB_DIR/$filename"
    else
      rm -f "$tmp"
    fi
  fi
done

# Videoer > 10 MB reencodes hvis ffmpeg finnes
VID_SIZE_LIMIT=$((10 * 1024 * 1024))
VID_MAX_WIDTH=1280
if [ $HAS_FFMPEG -eq 1 ]; then
  for vid in "$DIR"/*.{mp4,mov}; do
    filesize=$(stat -f%z "$vid")
    [ "$filesize" -le "$VID_SIZE_LIMIT" ] && continue

    filename=$(basename "$vid")
    tmp="/tmp/_optvid_$$_$filename"
    ffmpeg -y -i "$vid" -vf "scale='min($VID_MAX_WIDTH,iw)':-2" -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 96k "$tmp" > /dev/null 2>&1 || continue

    if [ -f "$tmp" ]; then
      new_size=$(stat -f%z "$tmp")
      threshold=$((filesize * 80 / 100))
      if [ "$new_size" -lt "$threshold" ]; then
        mv "$tmp" "$vid"
        optimized=$((optimized+1))
        echo "  optimalisert (video): $filename  ($((filesize/1024/1024)) MB → $((new_size/1024/1024)) MB)"
        rm -f "$THUMB_DIR/${filename%.*}.png"
      else
        rm -f "$tmp"
      fi
    fi
  done
fi
shopt -u nullglob nocaseglob
[ $optimized -gt 0 ] && echo "  ($optimized filer optimalisert)"

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
