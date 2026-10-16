# Portfolio – Mario Kujoth

Persönliches Entwickler-Portfolio: Software Engineering, Webentwicklung und KI.
React + TypeScript, Vite, Tailwind CSS 4, Motion, Lucide.

## Start

```bash
npm install
npm run dev       # Entwicklungsserver
npm run build     # Typprüfung (tsc -b) + Produktions-Build nach dist/
npm run preview   # Produktions-Build lokal ansehen
npm run lint      # oxlint
```

## Inhalte pflegen

Alle Texte, Projekte, Skills, Stationen und Links stehen in **`src/data/portfolio.ts`**.
Komponenten enthalten keine eigenen Inhalte.

Offene Platzhalter (im Code mit `PLATZHALTER` markiert):

- `links.linkedin` – leer; LinkedIn erscheint im UI erst, wenn eine URL eingetragen ist.
- `site.url` – Domain fehlt noch; danach in `index.html` `og:url` und eine absolute `og:image`-URL ergänzen.
- `links.email` – als „zu bestätigen“ markiert.

## Themes

Drei Themes über `data-theme` auf `<html>`: **Dark** (Standard), **Light**, **Hybrid**.
Die Farb-Tokens stehen in `src/index.css`. Im Hybrid-Theme setzen Bereiche mit
`data-tone="dark" | "light"` ihren eigenen Token-Satz. Die Auswahl wird in `localStorage`
(`mk-theme`) gespeichert, das Intro merkt sich `mk-intro-seen`.

## Foto

`referenz/portrait.jpg` wurde nur zugeschnitten und skaliert:
`src/assets/portrait-circle.webp` (1:1, Hero) und `src/assets/portrait-card.webp` (4:5, Über mich).
`public/og-image.png` (1200×630) ist daraus für Social-Previews gerendert.

## Struktur

```
src/
  data/portfolio.ts          zentrale Inhalte
  theme/                     Theme-Kontext und -Provider
  components/
    layout/                  Header, Theme-Switcher, Footer, Scrollspy
    sections/                Hero, Projects, Skills, About, Contact
    projects/                Projektkarte, Detail-Dialog, previews/ (SVG/JSX-Vorschauen)
    effects/                 Sternenhimmel/Aurora, Bergsilhouette
    ui/                      Logo, Icons, Reveal, Portrait, CopyButton …
    Intro.tsx                Intro beim ersten Besuch
  index.css                  Tokens, Theme-Regeln, Effekte
referenz/                    Auftrag-Referenzen (Mockup, frühere Version, Foto)
```
