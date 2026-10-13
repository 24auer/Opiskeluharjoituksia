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

// ---------------- yksittäiset porttisymbolit ja kiikut (IEC 60617) ----------------
// kaksi tuloa, yksi lähtö: laatikko 190..290 x 100..220, tulot A ja B, lähtö F
const _sym2 = (label, bubble) => {
  const x = 190, y = 100, w = 100, h = 120, yA = 135, yB = 185, yO = 160;
  return _gate(x, y, w, h, label) +
    `<path d="M90 ${yA} H${x} M90 ${yB} H${x} M${x + w + (bubble ? 10 : 0)} ${yO} H400"/>` +
    (bubble ? `<circle cx="${x + w + 5}" cy="${yO}" r="5"/>` : "") +
    _lbl(58, yA + 8, "A") + _lbl(58, yB + 8, "B") + _lbl(408, yO + 8, "F");
};
// yksi tulo, yksi lähtö: NOT ja puskuri
const _sym1 = (label, bubble) => {
  const x = 190, y = 120, w = 90, h = 80, yI = 160;
  return _gate(x, y, w, h, label) +
    `<path d="M90 ${yI} H${x} M${x + w + (bubble ? 10 : 0)} ${yI} H400"/>` +
    (bubble ? `<circle cx="${x + w + 5}" cy="${yI}" r="5"/>` : "") +
    _lbl(58, yI + 8, "A") + _lbl(408, yI + 8, "F");
};
FIGS.or = _sym2("≥1", false);
FIGS.nor = _sym2("≥1", true);
FIGS.xor = _sym2("=1", false);
FIGS.xnor = _sym2("=1", true);
FIGS.nand = _sym2("&", true);
FIGS.not = _sym1("1", true);
FIGS.buf = _sym1("1", false);

// JK-kiikku: tulot 1J, C1 (kello, kolmio) ja 1K; lähdöt Q ja Q̄
FIGS.jk = `<rect x="180" y="60" width="140" height="160"/><path d="M100 100 H180 M100 150 H180 M100 200 H180 M180 143 L192 150 L180 157 M320 100 H400 M330 200 H400"/><circle cx="325" cy="200" r="5"/>` +
  _lbl(186, 108, "1J") + _lbl(186, 208, "1K") + _lbl(198, 158, "C1") + _lbl(326, 92, "Q") + _lbl(340, 190, "Q̄") +
  _lbl(56, 106, "J") + _lbl(56, 156, "C") + _lbl(56, 206, "K");

// T-kiikku: tulo 1T, kello C1 ja lähdöt Q ja Q̄
FIGS.tff = `<rect x="180" y="70" width="140" height="140"/><path d="M100 110 H180 M100 170 H180 M180 163 L192 170 L180 177 M320 110 H400 M330 170 H400"/><circle cx="325" cy="170" r="5"/>` +
  _lbl(186, 118, "1T") + _lbl(198, 178, "C1") + _lbl(326, 102, "Q") + _lbl(340, 160, "Q̄") +
  _lbl(56, 116, "T") + _lbl(56, 176, "C");

DIG.push(
  { id: 305, label: "P10", cat: "DT · Piirrä kytkentä", type: "draw", q: "Piirrä OR-portin symboli eurooppalaisella merkinnällä (≥1): kaksi tuloa A ja B vasemmalla, lähtö F oikealla.", fig: "or" },
  { id: 306, label: "P11", cat: "DT · Piirrä kytkentä", type: "draw", q: "Piirrä NOT-portin symboli (1 ja negaatiopallo lähdössä): tulo A vasemmalla, lähtö F oikealla.", fig: "not" },
  { id: 307, label: "P12", cat: "DT · Piirrä kytkentä", type: "draw", q: "Piirrä NAND-portin symboli (& ja negaatiopallo lähdössä): tulot A ja B, lähtö F.", fig: "nand" },
  { id: 308, label: "P13", cat: "DT · Piirrä kytkentä", type: "draw", q: "Piirrä NOR-portin symboli (≥1 ja negaatiopallo lähdössä): tulot A ja B, lähtö F.", fig: "nor" },
  { id: 309, label: "P14", cat: "DT · Piirrä kytkentä", type: "draw", q: "Piirrä XOR-portin symboli (=1): tulot A ja B, lähtö F.", fig: "xor" },
  { id: 310, label: "P15", cat: "DT · Piirrä kytkentä", type: "draw", q: "Piirrä XNOR-portin symboli (=1 ja negaatiopallo lähdössä): tulot A ja B, lähtö F.", fig: "xnor" },
  { id: 311, label: "P16", cat: "DT · Piirrä kytkentä", type: "flash", q: "Mikä on puskuri (buffer) ja miten se piirretään IEC-merkinnällä?", answer: "Puskuri vahvistaa signaalia eikä muuta loogista arvoa: lähtö = tulo. Merkintä on 1 ilman negaatiopalloa.", fig: "buf" },
  { id: 312, label: "P17", cat: "DT · Piirrä kytkentä", type: "draw", q: "Piirrä JK-kiikun symboli IEC-merkinnällä: tulot 1J, 1K ja kello C1 (kolmio), lähdöt Q ja Q̄.", fig: "jk" },
  { id: 313, label: "P18", cat: "DT · Piirrä kytkentä", type: "draw", q: "Piirrä T-kiikun symboli IEC-merkinnällä: tulo 1T, kello C1, lähdöt Q ja Q̄.", fig: "tff" }
);

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

// ---------------- totuustaulut kytkentöihin ja porttisymboleihin ----------------
// Yleinen totuustaulukuvan piirtäjä: sarakkeet tuloille ja lähdöille, rivit annetaan valmiina.
const _bits = n => Array.from({ length: 1 << n }, (_, k) => Array.from({ length: n }, (_, j) => (k >> (n - 1 - j)) & 1));
const _ttFig = (inHeads, outHeads, rows) => {
  const heads = [...inHeads, ...outHeads];
  const n = heads.length;
  const colW = Math.min(90, Math.floor(460 / n));
  const x0 = (500 - colW * n) / 2 + colW / 2;
  const rowH = rows.length <= 4 ? 40 : 16;
  const fs = rows.length <= 4 ? 22 : 15;
  let s = heads.map((h, i) => `<text x="${x0 + i * colW}" y="28" font-size="18" text-anchor="middle" fill="#e8ecff" stroke="none">${h}</text>`).join("");
  s += `<path d="M${x0 - colW / 2} 38 H${x0 + (n - 1) * colW + colW / 2}"/>`;
  rows.forEach((row, r) => {
    const y = 38 + (r + 1) * rowH - 8;
    row.forEach((v, i) => {
      const isOut = i >= inHeads.length;
      s += `<text x="${x0 + i * colW}" y="${y}" font-size="${fs}" text-anchor="middle" fill="${isOut ? "#facc15" : "#e8ecff"}" stroke="none">${v}</text>`;
    });
  });
  return s;
};

FIGS.ttAND  = _ttFig(["A", "B"], ["Y"], _bits(2).map(([a, b]) => [a, b, a & b]));
FIGS.ttOR   = _ttFig(["A", "B"], ["Y"], _bits(2).map(([a, b]) => [a, b, a | b]));
FIGS.ttNAND = _ttFig(["A", "B"], ["Y"], _bits(2).map(([a, b]) => [a, b, 1 - (a & b)]));
FIGS.ttNOR  = _ttFig(["A", "B"], ["Y"], _bits(2).map(([a, b]) => [a, b, 1 - (a | b)]));
FIGS.ttXOR  = _ttFig(["A", "B"], ["Y"], _bits(2).map(([a, b]) => [a, b, a ^ b]));
FIGS.ttXNOR = _ttFig(["A", "B"], ["Y"], _bits(2).map(([a, b]) => [a, b, 1 - (a ^ b)]));
FIGS.ttNOT  = _ttFig(["A"], ["Y"], [[0, 1], [1, 0]]);
FIGS.ttBUF  = _ttFig(["A"], ["Y"], [[0, 0], [1, 1]]);
// (AB)' + C'D
FIGS.ttF1 = _ttFig(["A", "B", "C", "D"], ["F"], _bits(4).map(([a, b, c, d]) => [a, b, c, d, (1 - (a & b)) | ((1 - c) & d)]));
// JK- ja T-kiikun ominaistaulut (Q(t+1))
FIGS.ttJK = _ttFig(["J", "K"], ["Q(t+1)"], [[0, 0, "Q(t)"], [0, 1, "0"], [1, 0, "1"], [1, 1, "Q̄(t)"]]);
FIGS.ttT  = _ttFig(["T"], ["Q(t+1)"], [[0, "Q(t)"], [1, "Q̄(t)"]]);

// liitä totuustaulu kortteihin id:n perusteella
const _TT = { 301: "ttF1", 302: "ttF1", 304: "tt", 305: "ttOR", 306: "ttNOT", 307: "ttNAND", 308: "ttNOR", 309: "ttXOR", 310: "ttXNOR", 311: "ttBUF", 312: "ttJK", 313: "ttT" };
DIG.forEach(d => { if (_TT[d.id]) d.tt = _TT[d.id]; });
