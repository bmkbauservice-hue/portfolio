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

Noch offen:

- `links.email` – als „zu bestätigen“ markiert.

## Veröffentlichung

Jeder Push auf `main` baut und veröffentlicht die Seite über GitHub Actions
(`.github/workflows/deploy.yml`) unter https://bmkbauservice-hue.github.io/portfolio/.
Der Vite-`base` ist `/portfolio/`. Bei eigener Domain `base`, `site.url` sowie
`canonical`/`og:url`/`og:image` in `index.html` anpassen.

## Themes

Drei Themes über `data-theme` auf `<html>`: **Dark** (Standard), **Light**, **Hybrid**.
Die Farb-Tokens stehen in `src/index.css`. Im Hybrid-Theme setzen Bereiche mit
`data-tone="dark" | "light"` ihren eigenen Token-Satz. Die Auswahl wird in `localStorage`
(`mk-theme`) gespeichert. Das Intro erscheint einmal pro Besuch und merkt sich das in
`sessionStorage` (`mk-intro-seen`, gilt je Tab bis zum Schließen).

## Foto

Das Originalfoto (lokal, nicht im Repo) wurde nur zugeschnitten und skaliert:
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
referenz/                    nur lokal (in .gitignore): Mockup, frühere Version, Originalfotos
```
