const FIGMAP = { 8: "and", 37: "and", 44: "and", 19: "half", 45: "half", 27: "sr", 47: "sr", 49: "dff" };

const DRAWS = [
  { id: 200, label: "P1", cat: "DT · Piirrä kytkentä", type: "draw", q: "Piirrä AND-portin symboli eurooppalaisella merkinnällä: kaksi tuloa vasemmalla, yksi lähtö oikealla.", fig: "and" },
  { id: 201, label: "P2", cat: "DT · Piirrä kytkentä", type: "draw", q: "Piirrä puolisummaimen piiri: tulot A ja B, lähdöt S ja C. S tulee XOR-portilta ja C AND-portilta.", fig: "half" },
  { id: 202, label: "P3", cat: "DT · Piirrä kytkentä", type: "draw", q: "Piirrä SR-salpa kahdesta NOR-portista ristiin kytkettynä. Tulot R ja S, lähdöt Q ja Q̄.", fig: "sr" },
  { id: 203, label: "P4", cat: "DT · Piirrä kytkentä", type: "draw", q: "Piirrä D-kiikun lohkokaavio: tulot D ja kello (kolmio), lähdöt Q ja Q̄.", fig: "dff" },
  { id: 204, label: "P5", cat: "DT · Piirrä kytkentä", type: "expr", q: "Kirjoita lauseke ja katso sen piirros. Negaatiot tehdään NOT-porteilla, tulot AND-porteilla ja summa OR-portilla.", expr: "F = AB' + C'D" }
];

const DIG_CATS = ["DT · Luento 1", "DT · Luento 2", "DT · Luento 3", "DT · Luento 4", "DT · Luento 5", "DT · Luento 6", "DT · Luento 7", "DT · Piirrä kytkentä"];

const DIG = [
  ...CARDS.map(c => ({ id: 100 + c.id, label: "D" + c.id, cat: "DT · Luento " + c.lecture, type: "flash", q: c.question, answer: c.answer, fig: FIGMAP[c.id] })),
  ...DRAWS
];

