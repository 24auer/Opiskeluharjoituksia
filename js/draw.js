// ---------------- lausekepiirtäjä (SOP: summa tuloista) ----------------
const EXPR_PRESETS = ["F = AB' + C'D", "F = A + BC", "F = A'B' + AB", "F = AB + A'C + BC"];

// "F = AB' + C'D" -> [[{v:"A",neg:false},{v:"B",neg:true}], [{v:"C",neg:true},{v:"D",neg:false}]]
function parseSOP(str) {
  const rhs = (str.includes("=") ? str.split("=").slice(1).join("=") : str).replace(/\s+/g, "");
  const parsed = [];
  for (const t of rhs.split("+")) {
    const lits = [];
    const re = /([A-Za-z])(['’]|\u0305)?/g;
    let m;
    while ((m = re.exec(t))) lits.push({ v: m[1], neg: !!m[2] });
    if (lits.length) parsed.push(lits);
  }
  return parsed;
}

function exprSvg(str) {
  const terms = parseSOP(str);
  if (!terms.length) return `<p class="meta">Lauseketta ei tunnistettu. Esimerkki: F = AB' + C'D</p>`;

  const vars = [...new Set(terms.flat().map(l => l.v))].sort();
  const T = terms.length;
  const busX = k => 90 + k * 70;          // yksi pystyväylä per muuttuja
  const andX = busX(vars.length - 1) + 80; // AND-porttien vasen reuna
  const orX = andX + 140;                  // OR-portin vasen reuna
  const W = orX + 170;
  const H = Math.max(260, T * 100 + 60);
  const h = 70;                            // AND-portin korkeus
  const parts = [];
  const taps = {};
  const centers = [];

  // AND-portit: jokainen tulo omalle rivilleen
  terms.forEach((lits, i) => {
    const y0 = 50 + i * 100;
    const n = lits.length;
    centers.push(y0 + h / 2);
    parts.push(`<rect x="${andX}" y="${y0}" width="60" height="${h}"/>`);
    parts.push(`<text x="${andX + 30}" y="${y0 + h / 2 + 8}" font-size="22" text-anchor="middle" fill="#e8ecff" stroke="none">&amp;</text>`);

    lits.forEach((l, k) => {
      const y = y0 + (k + 1) * h / (n + 1);
      const bx = busX(vars.indexOf(l.v));
      (taps[l.v] ||= []).push(y);
      parts.push(`<circle cx="${bx}" cy="${y}" r="3" fill="#e8ecff" stroke="none"/>`);
      if (l.neg) {
        // NOT-portti: kolmio + pallo, sitten AND-porttiin
        // IEC NOT: suorakulmio, jossa 1, ja negaatiopallo lähdössä
        parts.push(`<path d="M${bx} ${y} H${bx + 18} M${bx + 52} ${y} H${andX}"/>`);
        parts.push(`<rect x="${bx + 18}" y="${y - 10}" width="26" height="20"/>`);
        parts.push(`<text x="${bx + 31}" y="${y + 5}" font-size="14" text-anchor="middle" fill="#e8ecff" stroke="none">1</text>`);
        parts.push(`<circle cx="${bx + 48}" cy="${y}" r="4"/>`);
      } else {
        parts.push(`<path d="M${bx} ${y} H${andX}"/>`);
      }
    });
  });

  // muuttujien väylät ja sisäänmenot
  vars.forEach((v, k) => {
    const ys = taps[v];
    const top = Math.min(...ys), bot = Math.max(...ys), bx = busX(k);
    parts.push(`<path d="M${bx} ${top} V${bot} M30 ${top} H${bx}"/>`);
    parts.push(`<text x="6" y="${top + 7}" font-size="22" fill="#e8ecff" stroke="none">${v}</text>`);
  });

  // OR-portti: summa tuloista
  const center = (centers[0] + centers[T - 1]) / 2;
  const hOR = Math.max(70, T * 70);
  const yOR0 = center - hOR / 2;
  terms.forEach((_, i) => {
    const yIn = yOR0 + (i + 1) * hOR / (T + 1);
    const xr = andX + 80 + i * 10;
    parts.push(`<path d="M${andX + 60} ${centers[i]} H${xr} V${yIn} H${orX}"/>`);
  });
  parts.push(`<rect x="${orX}" y="${yOR0}" width="60" height="${hOR}"/>`);
  parts.push(`<text x="${orX + 30}" y="${center + 8}" font-size="22" text-anchor="middle" fill="#e8ecff" stroke="none">≥1</text>`);
  parts.push(`<path d="M${orX + 60} ${center} H${orX + 150}"/>`);
  parts.push(`<text x="${orX + 156}" y="${center + 8}" font-size="22" fill="#e8ecff" stroke="none">F</text>`);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><g stroke="#e8ecff" stroke-width="3" fill="none">${parts.join("")}</g></svg>`;
}

function figSvg(name) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 320" width="500" height="320"><g stroke="#e8ecff" stroke-width="4" fill="none">${FIGS[name]}</g></svg>`;
}

// kortin malli-kuva, jos sellainen on

// ---------------- piirtotarkistus (suuntaa-antava) ----------------
// Jaetaan piirtoalue ruudukkoon. Malli- ja käyttäjäpiirros verrataan:
// kattavuus = mallin ruuduista ne, joiden lähellä (1 ruudun säde) on käyttäjän viivoja,
// tarkkuus = käyttäjän ruuduista ne, joiden lähellä on mallia.
const CELL = 8;
function inkCells(ctx, W, H) {
  const data = ctx.getImageData(0, 0, W, H).data;
  const cols = Math.ceil(W / CELL), rows = Math.ceil(H / CELL);
  const set = new Set();
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (data[(y * W + x) * 4 + 3] > 60) set.add(Math.floor(y / CELL) * cols + Math.floor(x / CELL));
  }
  return { set, cols, rows };
}
function hasNear(cells, idx) {
  const c = idx % cells.cols, r = Math.floor(idx / cells.cols);
  for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
    const nc = c + dc, nr = r + dr;
    if (nc < 0 || nr < 0 || nc >= cells.cols || nr >= cells.rows) continue;
    if (cells.set.has(nr * cells.cols + nc)) return true;
  }
  return false;
}
async function compareDrawing(cv, figName) {
  const W = cv.width, H = cv.height;
  const user = inkCells(cv.getContext("2d"), W, H);
  if (user.set.size === 0) return { empty: true };
  const refCanvas = document.createElement("canvas");
  refCanvas.width = W; refCanvas.height = H;
  const rctx = refCanvas.getContext("2d");
  const img = new Image();
  await new Promise((res, rej) => {
    img.onload = res; img.onerror = rej;
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(figSvg(figName));
  });
  rctx.drawImage(img, 0, 0, W, H);
  const ref = inkCells(rctx, W, H);
  let refHit = 0; ref.set.forEach(i => { if (hasNear(user, i)) refHit++; });
  let userHit = 0; user.set.forEach(i => { if (hasNear(ref, i)) userHit++; });
  const recall = refHit / ref.set.size, precision = userHit / user.set.size;
  return { ok: recall >= 0.5 && precision >= 0.4 };
}

