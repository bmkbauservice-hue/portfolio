#!/usr/bin/env bash
# Richtet auf dem OVH-Server ein, dass mkdirdesign.com das Portfolio zeigt und sich selbst aktualisiert.
# Läuft auf dem PC (braucht nur SSH zum Server, kein sudo):
#   bash <(curl -fsSL https://raw.githubusercontent.com/bmkbauservice-hue/portfolio/main/deploy/server-einrichten.sh)
#
# Auf dem Server:
#   ~/mkdirdesign/portfolio-build  Kopie des Branches "site" (fertig gebaute Seite aus GitHub Actions)
#   ~/mkdirdesign/site             wird von nginx ausgeliefert (Inhalt wird gespiegelt, Ordner bleibt)
#   ~/mkdirdesign/update.sh        holt alle 5 Minuten per cron den neuesten Stand
set -euo pipefail
SERVER="${1:-ubuntu@100.96.156.77}"

echo "▶ Verbindung zum Server ($SERVER)"
ssh -o BatchMode=yes -o ConnectTimeout=10 "$SERVER" 'bash -s' <<'REMOTE'
set -euo pipefail
REPO="https://github.com/bmkbauservice-hue/portfolio.git"
BASE="$HOME/mkdirdesign"
BUILD="$BASE/portfolio-build"
SITE="$BASE/site"
command -v rsync >/dev/null || { echo "   rsync fehlt: sudo apt install rsync"; exit 1; }
[[ -d "$SITE" ]] || { echo "   $SITE fehlt – erst die Domain einrichten"; exit 1; }

echo "▶ 1/4 Fertige Seite von GitHub holen (Branch site)"
if ! git ls-remote --exit-code --heads "$REPO" site >/dev/null 2>&1; then
  echo "   Branch 'site' gibt es noch nicht. Erst den Pull Request mergen und warten,"
  echo "   bis unter github.com/bmkbauservice-hue/portfolio/actions alles grün ist."
  exit 1
fi
[[ -d "$BUILD/.git" ]] || git clone -q --depth 1 --branch site "$REPO" "$BUILD"
echo "   ok"

echo "▶ 2/4 Platzhalter sichern"
if [[ -f "$SITE/index.html" && ! -d "$BASE/platzhalter" ]] && grep -q "Portfolio wird gerade gebaut" "$SITE/index.html"; then
  mkdir -p "$BASE/platzhalter" && cp -a "$SITE/." "$BASE/platzhalter/"
  echo "   gesichert in $BASE/platzhalter"
else
  echo "   nichts zu tun"
fi

echo "▶ 3/4 Auto-Update einrichten (alle 5 Minuten)"
cat > "$BASE/update.sh" <<'SH'
#!/usr/bin/env bash
# Holt die neueste fertige Seite und spiegelt sie in den nginx-Ordner.
set -euo pipefail
BUILD="$HOME/mkdirdesign/portfolio-build"
SITE="$HOME/mkdirdesign/site"
git -C "$BUILD" fetch -q --depth 1 origin site
git -C "$BUILD" reset -q --hard FETCH_HEAD
rsync -a --delete --exclude '.git' "$BUILD/" "$SITE/"
SH
chmod +x "$BASE/update.sh"
( crontab -l 2>/dev/null | grep -v 'mkdirdesign/update.sh' || true
  echo "*/5 * * * * \$HOME/mkdirdesign/update.sh >/dev/null 2>&1" ) | crontab -
"$BASE/update.sh"
echo "   ok"

echo "▶ 4/4 Test"
title="$(curl -fsS --max-time 15 https://mkdirdesign.com/ | grep -o '<title>[^<]*' | head -1 | sed 's/<title>//')"
echo "   Seitentitel: ${title:-?}"
code="$(curl -s -o /dev/null -w '%{http_code} → %{redirect_url}' https://mkdirdesign.com/nfc)"
echo "   /nfc: $code"
echo
echo "  ✔ Fertig! https://mkdirdesign.com zeigt jetzt dein Portfolio."
echo "    Änderungen: auf main pushen → nach Actions + max. 5 Minuten live."
REMOTE
