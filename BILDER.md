# Legge til bilder til feilsiden

## Filnavn

```
YYYYMMDD_[kategori_]beskrivelse.jpg
```

- `YYYYMMDD` = datoen feilen skjedde (må matche `date`-feltet på en oppføring i `data.js`)
- `kategori` (valgfri) = én av: `lading | mmi | hud | app | klima | nokkel | diverse`
- `beskrivelse` = fri tekst, små bokstaver, understrek som skille

### Eksempler

| Filnavn                              | Knyttes til                              |
|--------------------------------------|------------------------------------------|
| `20260830_lading_kabel_fast.jpg`     | Alle **lading**-feil på 2026-08-30       |
| `20260830_kabel.jpg`                 | **Alle** feil på 2026-08-30              |
| `20260614_nokkel_dor.jpg`            | Alle **nokkel**-feil på 2026-06-14       |
| `20260327_hud.png`                   | Alle **hud**-feil på 2026-03-27          |
| `20260830_mmi_reset.mp4`             | Alle **mmi**-feil på 2026-08-30 (video)  |

### Flere bilder for samme dato + kategori?

Bare gi hver fil et unikt suffiks — matcheren ser kun på `YYYYMMDD_kategori`
og ignorerer resten. Alle disse knyttes f.eks. til hud-feil på 2026-03-27:

```
20260327_hud.png
20260327_hud_2.png
20260327_hud_reset.jpg
20260327_hud_svart_skjerm.jpg
```

## Steg

1. Eksporter bildet fra Lightroom med filnavn som over
2. Legg fila i `docs/`
3. Kjør `./thumb.sh` fra prosjektroten
4. `git add . && git commit -m "add bilder" && git push`

GitHub Actions publiserer, og bildene dukker opp under matchende feil + i galleriet.

Videoer (`.mp4`/`.mov`) håndteres på samme måte — `thumb.sh` bruker `ffmpeg` til å generere et thumbnail-frame automatisk.
