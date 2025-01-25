#!/bin/bash

# Katalog der bildene ligger
DIR="/Users/fmr/Jottacloud/FMR_DOCS/202501_Audi_fail/docs"
counter=0

# Sjekk at katalogen eksisterer
if [ ! -d "$DIR" ]; then
  echo "Katalogen $DIR finnes ikke. Avslutter."
  exit 1
fi

# Installer ImageMagick hvis det ikke er installert
if ! command -v magick &> /dev/null; then
  echo "ImageMagick er ikke installert. Installerer med Homebrew..."
  brew install imagemagick
fi

# Lag "thumbs"-katalog hvis den ikke eksisterer
THUMB_DIR="$DIR/thumbs"
mkdir -p "$THUMB_DIR"

# Iterer gjennom alle bildene i katalogen
for img in "$DIR"/*.{jpg,jpeg,gif}; do
  # Hopp over hvis ingen bilder matcher
  [ -e "$img" ] || continue

  # Filnavn uten sti
  filename=$(basename "$img")

  # Sjekk om thumbnail allerede finnes
  thumb_file="$THUMB_DIR/$filename"
  if [ -f "$thumb_file" ]; then
    # echo "Thumbnail finnes allerede for $filename. Hopper over."
    continue
  fi

  # Lag thumbnail
  echo "Lager thumbnail for $filename..."
  counter=$((counter+1))
  magick "$img" -resize 40x40^ -gravity center -extent 40x40 "$thumb_file"
done

for img in "$DIR"/*.png; do
  # Hopp over hvis ingen bilder matcher
  [ -e "$img" ] || continue

  # Filnavn uten sti
  filename=$(basename "$img")

  # Sjekk om thumbnail allerede finnes
  thumb_file="$THUMB_DIR/$filename"
  if [ -f "$thumb_file" ]; then
    # echo "Thumbnail finnes allerede for $filename. Hopper over."
    continue
  fi

  # Lag thumbnail
  echo "Lager thumbnail for $filename..."
  counter=$((counter+1))
  magick "$img" -resize 60x40^ -gravity center -extent 60x40 "$thumb_file"
done

echo "Ferdig! $counter thumbnails er lagret i $THUMB_DIR."
