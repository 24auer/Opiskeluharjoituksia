// ---------------- lisätehtävät: NAND/AND-kytkennät ja totuustaulu ----------------
// Piirrokset IEC 60617 -merkinnöillä: suorakulmio, jonka sisällä merkki (& / ≥1 / 1),
// negaatio lähdössä pienenä pallona. Kaikki kuvat ovat 500x320 ja ne lisätään FIGS-objektiin.

const _lbl = (x, y, t) => `<text x="${x}" y="${y}" font-size="22" fill="#e8ecff" stroke="none">${t}</text>`;
const _gate = (x, y, w, h, label) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}"/><text x="${x + w / 2}" y="${y + h / 2 + 8}" font-size="22" text-anchor="middle" fill="#e8ecff" stroke="none">${label}</text>`;
// AND (&) ja NAND (& + pallo lähdössä); tulot (x, y+15) ja (x, y+35), lähtö (x+60, y+25) tai (x+70, y+25) NAND:lla
const _AND = (x, y) => _gate(x, y, 60, 50, "&");
const _NAND = (x, y) => _gate(x, y, 60, 50, "&") + `<circle cx="${x + 65}" cy="${y + 25}" r="5"/>`;
// NOT (1 + pallo lähdössä); tulo (x, y+15), lähtö (x+50, y+15)
const _NOT = (x, y) => _gate(x, y, 40, 30, "1") + `<circle cx="${x + 45}" cy="${y + 15}" r="5"/>`;
// OR (≥1); tulot (x, y+20) ja (x, y+80), lähtö (x+60, y+50)
const _OR = (x, y) => _gate(x, y, 60, 100, "≥1");

// 5 NAND-porttia: F = (AB)' + C'D
//   n1 = NAND(A,B) = (AB)'      n2 = NAND(C,C) = C'      n3 = NAND(C',D) = (C'D)'
//   n4 = NAND(n1,n1) = AB       F  = NAND(n4, n3) = (AB)' + C'D
FIGS.nand5 = [
  _lbl(4, 62, "A"), `<path d="M30 55 H120"/>`,
  _lbl(4, 88, "B"), `<path d="M30 75 H120"/>`,
  _lbl(4, 182, "C"), `<path d="M30 165 V185 M30 165 H120 M30 185 H120"/>`,
  _lbl(4, 256, "D"), `<path d="M30 240 H215 V225 H240"/>`,
  _NAND(120, 40),   // n1
  _NAND(120, 150),  // n2 = C'
  _NAND(240, 190),  // n3
  _NAND(240, 40),   // n4 = AB
  _NAND(370, 120),  // F
  `<path d="M190 65 H215 M215 55 V75 M215 55 H240 M215 75 H240"/>`,  // n1 -> n4 (molemmat tulot)
  `<path d="M190 175 H215 V205 H240"/>`,                              // n2 -> n3
  `<path d="M310 65 H340 V135 H370"/>`,                               // n4 -> F
  `<path d="M310 215 H340 V155 H370"/>`,                              // n3 -> F
  `<path d="M440 145 H470"/>`, _lbl(476, 152, "F"),
  `<text x="300" y="24" font-size="18" fill="#e8ecff" stroke="none">5 × NAND</text>`
].join("");

// AND, NOT ja OR: F = (AB)' + C'D (2 AND, 2 NOT, 1 OR)
FIGS.and8 = [
  _lbl(4, 62, "A"), `<path d="M30 55 H120"/>`,
  _lbl(4, 82, "B"), `<path d="M30 75 H120"/>`,
  _lbl(4, 182, "C"), `<path d="M30 175 H120"/>`,
  _lbl(4, 236, "D"), `<path d="M30 215 H200 V195 H220"/>`,
  _AND(120, 40),
  _NOT(210, 50),
  _NOT(120, 160),
  _AND(220, 160),
  _OR(330, 85),
  `<path d="M180 65 H210"/>`,
  `<path d="M170 175 H220"/>`,
  `<path d="M260 65 H300 V105 H330"/>`,
  `<path d="M280 185 H300 V165 H330"/>`,
  `<path d="M390 135 H430"/>`, _lbl(436, 142, "F"),
  `<text x="300" y="24" font-size="18" fill="#e8ecff" stroke="none">2 AND · 2 NOT · 1 OR</text>`
].join("");

// AND, NOT ja OR: F = AB' + C'D (2 AND, 2 NOT, 1 OR)
FIGS.abc = [
  _lbl(4, 62, "A"), `<path d="M30 55 H240"/>`,
  _lbl(4, 100, "B"), `<path d="M30 95 H120"/>`,
  _lbl(4, 182, "C"), `<path d="M30 175 H120"/>`,
  _lbl(4, 236, "D"), `<path d="M30 215 H220 V195 H240"/>`,
  _NOT(120, 80),          // B'
  _AND(240, 40),          // A·B'
  _NOT(120, 160),         // C'
  _AND(240, 160),         // C'·D
  _OR(350, 85),
  `<path d="M170 95 H200 V75 H240"/>`,
  `<path d="M170 175 H240"/>`,
  `<path d="M300 65 H325 V105 H350"/>`,
  `<path d="M300 185 H325 V165 H350"/>`,
  `<path d="M410 135 H440"/>`, _lbl(446, 142, "F"),
  `<text x="300" y="24" font-size="18" fill="#e8ecff" stroke="none">F = AB' + C'D</text>`
].join("");

// totuustaulu F = AB' + C'D, rivit ABCD = 0000 … 1111
FIGS.tt = (() => {
  const cols = [[60, "A"], [130, "B"], [200, "C"], [270, "D"], [370, "F"]];
  let out = cols.map(([x, t]) => `<text x="${x}" y="30" font-size="18" text-anchor="middle" fill="#e8ecff" stroke="none">${t}</text>`).join("");
  out += `<path d="M30 40 H470"/>`;
  for (let n = 0; n < 16; n++) {
    const a = (n >> 3) & 1, b = (n >> 2) & 1, c = (n >> 1) & 1, d = n & 1;
    const f = (a & (1 - b)) | ((1 - c) & d);
    const y = 62 + n * 16;
    [a, b, c, d, f].forEach((v, i) => {
      out += `<text x="${cols[i][0]}" y="${y}" font-size="15" text-anchor="middle" fill="${i === 4 ? "#facc15" : "#e8ecff"}" stroke="none">${v}</text>`;
    });
  }
  return out;
})();

// lisätehtävät digitekniikkaan (kortteina, kuten muut kortit)
DIG.push(
  { id: 301, label: "P6", cat: "DT · Piirrä kytkentä", type: "flash",
    q: "Laadi kytkentä lausekkeesta F = (AB)' + C'D käyttäen vain NAND-portteja. Kuinka monta NAND-porttia jää jäljelle, kun varastossa on 10?",
    answer: "5 NAND-porttia jää jäljelle. Käytetty 5: n1 = NAND(A,B) = (AB)', n2 = NAND(C,C) = C', n3 = NAND(n2,D) = (C'D)', n4 = NAND(n1,n1) = AB, F = NAND(n4,n3).",
    fig: "nand5" },
  { id: 302, label: "P7", cat: "DT · Piirrä kytkentä", type: "flash",
    q: "Sama lauseke F = (AB)' + C'D, mutta käytössä on AND-, NOT- ja OR-portit (10 AND, 5 NOT, 12 OR). Montako AND-porttia jää jäljelle?",
    answer: "8 AND-porttia jää jäljelle. Käytetty 2 AND (AB ja C'D), 2 NOT ((AB)' ja C') ja 1 OR.",
    fig: "and8" },
  { id: 303, label: "P8", cat: "DT · Piirrä kytkentä", type: "flash",
    q: "Laadi totuustaulu lausekkeelle F = AB' + C'D (kaikki 16 riviä).",
    answer: "F = 1 riveillä ABCD = 0001, 0101, 1000, 1001, 1010, 1011 ja 1101. Muilla riveillä F = 0.",
    fig: "tt" },
  { id: 304, label: "P9", cat: "DT · Piirrä kytkentä", type: "flash",
    q: "Piirrä F = AB' + C'D kytkentäkaaviona AND-, NOT- ja OR-porteilla IEC-symbolein (eurooppalainen merkintä).",
    answer: "Kaksi NOT-porttia tekee B' ja C'. Kaksi AND-porttia tekee AB' ja C'D. OR-portti yhdistää ne F:ksi.",
    fig: "abc" }
);
