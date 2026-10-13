// ---------------- digitekniikka: kortit ----------------
const CARDS = [
  { id: 1, lecture: 1, question: "Mikä on analogisen ja digitaalisen signaalin ero?", answer: "Analoginen signaali muuttuu jatkuvasti ja voi saada mitä tahansa arvoa. Digitaalinen signaali käyttää rajallista määrää tiloja, yleensä 0 ja 1, ja on kestävämpi häiriöille." },
  { id: 2, lecture: 1, question: "Mitä Ohmin laki kertoo?", answer: "U = R · I, eli jännite on vastuksen ja virran tulo." },
  { id: 3, lecture: 1, question: "Mitä Kirchhoffin jänniteyhtälö sanoo?", answer: "Piirin silmukan jännitteiden summa on nolla: ΣU = 0." },
  { id: 4, lecture: 1, question: "Mitä SN74HC00 sisältää ja mikä on sen toimintajännite?", answer: "Neljä 2-tulotulon NAND-porttia. Toimintajännite on 2–6 V." },
  { id: 5, lecture: 2, question: "Mikä on kombinaatiopiirin ominaisuus?", answer: "Lähtö riippuu vain tämänhetkisistä tuloista, ei aiemmista tiloista." },
  { id: 6, lecture: 2, question: "Miksi NAND ja NOR ovat universaaleja portteja?", answer: "Mikä tahansa logiikkapiiri voidaan rakentaa pelkästä NAND- tai pelkästä NOR-porteista." },
  { id: 7, lecture: 2, question: "Kuinka monta riviä on kolmen tulon totuustaulussa?", answer: "2³ = 8 riviä." },
  { id: 8, lecture: 2, question: "Milloin AND-portin lähtö on 1?", answer: "Vain kun kaikki tulot ovat 1." },
  { id: 9, lecture: 3, question: "Kuka kehitti Boolen algebran ja minä vuonna?", answer: "George Boole, 1815." },
  { id: 10, lecture: 3, question: "Mikä on De Morganin laki NAND-portille?", answer: "(A·B)‾ = Ā + B̄." },
  { id: 11, lecture: 3, question: "Mikä on De Morganin laki NOR-portille?", answer: "(A+B)‾ = Ā · B̄." },
  { id: 12, lecture: 3, question: "Mitä A · Ā on?", answer: "0." },
  { id: 13, lecture: 4, question: "Muunna 1101₂ desimaaliksi.", answer: "Paikat: 8, 4, 2, 1\nNumerot: 1, 1, 0, 1\n1·8 = 8\n1·4 = 4\n0·2 = 0\n1·1 = 1\nYhteensä: 8 + 4 + 0 + 1 = 13" },
  { id: 14, lecture: 4, question: "Muunna 13₁₀ binääriksi.", answer: "1101₂. Jaa kahdella ja kirjoita jakojäännökset alhaalta ylös." },
  { id: 15, lecture: 4, question: "Muunna 1101 1010₂ heksadesimaaliksi.", answer: "Ryhmittele 4 bitin ryhmiin: 1101 | 1010\n1101₂ = 13 = D\n1010₂ = 10 = A\nTulos: DA₁₆" },
  { id: 16, lecture: 4, question: "Kuinka monta tasoa 10-bittisellä AD-muuntimella on?", answer: "2¹⁰ = 1024 tasoa." },
  { id: 17, lecture: 4, question: "Mikä on 10-bittisen AD-muuntimen askel, kun vertailujännite on 5 V?", answer: "Askel = 5 V / 1024\n5 / 1024 = 0,00488 V\nEli noin 4,9 mV" },
  { id: 18, lecture: 4, question: "Mikä on näytteenotto- ja pidätyspiirin (S/H) tehtävä?", answer: "Pitää jännitteen vakaana muunnoksen ajan." },
  { id: 19, lecture: 5, question: "Mikä on puolisummaimen S ja C?", answer: "S = A ⊕ B ja C = A · B." },
  { id: 20, lecture: 5, question: "Miten täyssummain eroaa puolisummaimesta?", answer: "Täyssummain ottaa huomioon myös edellisen bitin siirron Cin:n." },
  { id: 21, lecture: 5, question: "Mikä on täyssummaimen Cout?", answer: "Cout = A·B + Cin·(A ⊕ B)." },
  { id: 22, lecture: 5, question: "Mikä on konekieli?", answer: "Prosessorin ymmärtämät binäärikäskyt." },
  { id: 23, lecture: 5, question: "Mikä muuntaa assemblerin konekieleksi?", answer: "Assembleri." },
  { id: 24, lecture: 5, question: "Mitä eroa on kääntäjällä ja tulkilla?", answer: "Kääntäjä muuntaa koko ohjelman ennen suoritusta, tulkki suorittaa ohjelman rivi kerrallaan." },
  { id: 25, lecture: 6, question: "Mikä tekee piirin sekvenssipiiriksi?", answer: "Lähtö riippuu tulojen lisäksi tilasta, eli piiri muistaa aiemman tilansa." },
  { id: 26, lecture: 6, question: "Mikä on synkronisen piirin ominaisuus?", answer: "Kaikki tilat muuttuvat yhteisen kellosignaalin tahdissa." },
  { id: 27, lecture: 6, question: "Mikä on SR-salvan kielletty tila?", answer: "S = 1 ja R = 1." },
  { id: 28, lecture: 6, question: "Mikä on D-salvan toiminta, kun C1 on päällä?", answer: "Q seuraa D:tä." },
  { id: 29, lecture: 6, question: "Mikä ero on salvalla ja kiikulla?", answer: "Salpa reagoi tason perusteella, kiikku reunan perusteella." },
  { id: 30, lecture: 6, question: "Mitä D-kiikku tekee?", answer: "Tallentaa D-tulon kellon reunalla: Q(t+1) = D." },
  { id: 31, lecture: 6, question: "Mikä on T-kiikun toiminta?", answer: "T = 0 pitää tilan, T = 1 vaihtaa tilan kellon reunalla." },
  { id: 32, lecture: 6, question: "Mikä on JK-kiikun toiminta, kun J = K = 1?", answer: "Tila vaihtuu (toggle)." },
  { id: 33, lecture: 7, question: "Mitä siirtorekisteri tekee?", answer: "Siirtää dataa yhden kiikun kerrallaan kellon tahdissa." },
  { id: 34, lecture: 7, question: "Mitä rinnakkaisrekisteri tekee?", answer: "Tallentaa koko n-bittisen sanan yhdellä kellolla." },
  { id: 35, lecture: 7, question: "Mitä eroa on asynkronisella ja synkronisella laskurilla?", answer: "Asynkronisessa laskurissa kellot ketjutetaan edellisen kiikun lähdöstä, synkronisessa kaikki kiikut ovat samalla kellolla." },
  { id: 36, lecture: 7, question: "Mihin laskureita käytetään?", answer: "Ajastukseen, taajuuden jakoon ja muistiosoitteiden muodostamiseen." },
  { id: 37, lecture: 2, question: "Mikä on AND-portin totuustaulu?", answer: "0 0→0; 0 1→0; 1 0→0; 1 1→1" },
  { id: 38, lecture: 2, question: "Mikä on OR-portin totuustaulu?", answer: "0 0→0; 0 1→1; 1 0→1; 1 1→1" },
  { id: 39, lecture: 2, question: "Mikä on NAND-portin totuustaulu?", answer: "0 0→1; 0 1→1; 1 0→1; 1 1→0" },
  { id: 40, lecture: 2, question: "Mikä on NOR-portin totuustaulu?", answer: "0 0→1; 0 1→0; 1 0→0; 1 1→0" },
  { id: 41, lecture: 2, question: "Mikä on XOR-portin totuustaulu?", answer: "0 0→0; 0 1→1; 1 0→1; 1 1→0" },
  { id: 42, lecture: 2, question: "Mikä on XNOR-portin totuustaulu?", answer: "0 0→1; 0 1→0; 1 0→0; 1 1→1" },
  { id: 43, lecture: 2, question: "Mikä on NOT-portin totuustaulu?", answer: "0→1; 1→0" },
  { id: 44, lecture: 2, question: "Mitkä ovat eurooppalaiset symbolit AND, OR, XOR ja NOT?", answer: "AND: &, OR: ≥1, XOR: =1, NOT: 1. Negaatio merkitään lähdössä pienellä ympyrällä." },
  { id: 45, lecture: 5, question: "Mistä porteista puolisummain koostuu?", answer: "XOR (=1) antaa S:n ja AND (&) antaa C:n. Molemmat portit saavat tulot A ja B." },
  { id: 46, lecture: 5, question: "Mistä osista täyssummain koostuu?", answer: "Kahdesta puolisummaimesta (HA) ja OR-portista (≥1). OR antaa Cout:n." },
  { id: 47, lecture: 6, question: "Mitkä ovat SR-salvan tulot ja lähdöt?", answer: "Tulot S ja R, lähdöt Q ja Q̄." },
  { id: 48, lecture: 6, question: "Miten D-salvan symboli merkitään?", answer: "Tulot 1D ja C1. C1 on tasoohjaus, ei kellon kolmio." },
  { id: 49, lecture: 6, question: "Miten D-kiikun symboli merkitään?", answer: "Tulot 1D ja kellotulo, jossa on kolmio ( > ). Kolmio tarkoittaa reunaherkkyyttä." },
  { id: 50, lecture: 6, question: "Mitkä ovat T-kiikun tulot?", answer: "1T ja kellotulo > C1." },
  { id: 51, lecture: 6, question: "Mitkä ovat JK-kiikun tulot?", answer: "1J, 1K ja kellotulo > C1." },
  { id: 52, lecture: 7, question: "Miten siirtorekisteri kytketään?", answer: "D-kiikut ketjutetaan niin, että kunkin Q menee seuraavan kiikun D-tuloon. Kaikilla on yhteinen C1-kello." },
  { id: 53, lecture: 7, question: "Miten asynkroninen laskuri kytketään?", answer: "T-kiikut ketjutetaan niin, että edellisen kiikun Q ohjaa seuraavan kiikun kellotuloa. Yhteistä kelloa ei ole." },
  { id: 54, lecture: 4, question: "Muunna 1011₂ desimaaliksi.", answer: "Paikat: 8, 4, 2, 1\nNumerot: 1, 0, 1, 1\n1·8 = 8\n0·4 = 0\n1·2 = 2\n1·1 = 1\nYhteensä: 8 + 0 + 2 + 1 = 11" },
  { id: 55, lecture: 4, question: "Muunna 1F₁₆ desimaaliksi.", answer: "Paikat: 16¹, 16⁰\nNumerot: 1, F (F = 15)\n1·16 = 16\nF·1 = 15 · 1 = 15\nYhteensä: 16 + 15 = 31" },
  { id: 56, lecture: 4, question: "Mitä arvoa kirjaimet A–F tarkoittavat heksadesimaalissa?", answer: "A=10, B=11, C=12, D=13, E=14, F=15" },
  { id: 57, lecture: 4, question: "Muunna desimaaliluku 13 binääriksi.", answer: "13 / 2 = 6, jää 1\n6 / 2 = 3, jää 0\n3 / 2 = 1, jää 1\n1 / 2 = 0, jää 1\nLuetaan alhaalta ylös: 1101₂" },
  { id: 58, lecture: 4, question: "Mitkä ovat binääriluvun paikkojen arvot?", answer: "Oikealta alkaen: 2⁰ = 1, 2¹ = 2, 2² = 4, 2³ = 8 jne." }
];

// ---------------- digitekniikka: piirrokset (SVG, viewBox 500x320) ----------------
const FIGS = {
  and: `<rect x="200" y="100" width="100" height="120"/><path d="M100 130 H200 M100 190 H200 M300 160 H400"/><text x="250" y="178" font-size="44" text-anchor="middle" fill="#e8ecff" stroke="none">&amp;</text>`,
  half: `<rect x="220" y="40" width="80" height="80"/><rect x="220" y="170" width="80" height="80"/><path d="M30 60 H220 M30 60 V180 H220 M60 100 H220 M60 100 V220 H220 M300 80 H390 M300 210 H390"/><text x="260" y="90" font-size="28" text-anchor="middle" fill="#e8ecff" stroke="none">=1</text><text x="260" y="220" font-size="28" text-anchor="middle" fill="#e8ecff" stroke="none">&amp;</text><text x="6" y="68" font-size="22" fill="#e8ecff" stroke="none">A</text><text x="38" y="108" font-size="22" fill="#e8ecff" stroke="none">B</text><text x="396" y="88" font-size="22" fill="#e8ecff" stroke="none">S</text><text x="396" y="218" font-size="22" fill="#e8ecff" stroke="none">C</text>`,
  sr: `<rect x="200" y="40" width="90" height="70"/><rect x="200" y="180" width="90" height="70"/><path d="M120 65 H200 M120 235 H200 M290 75 H320 V150 H170 V205 H200 M290 215 H340 V130 H150 V95 H200 M290 75 H390 M290 215 H390"/><text x="245" y="82" font-size="22" text-anchor="middle" fill="#e8ecff" stroke="none">≥1</text><text x="245" y="222" font-size="22" text-anchor="middle" fill="#e8ecff" stroke="none">≥1</text><text x="92" y="72" font-size="22" fill="#e8ecff" stroke="none">R</text><text x="92" y="242" font-size="22" fill="#e8ecff" stroke="none">S</text><text x="396" y="82" font-size="22" fill="#e8ecff" stroke="none">Q</text><text x="396" y="222" font-size="22" fill="#e8ecff" stroke="none">Q̄</text>`,
  dff: `<rect x="180" y="60" width="140" height="160"/><path d="M100 100 H180 M100 200 H180 M320 100 H400 M320 200 H400 M180 190 L192 200 L180 210"/><text x="196" y="108" font-size="24" fill="#e8ecff" stroke="none">1D</text><text x="40" y="92" font-size="22" fill="#e8ecff" stroke="none">D</text><text x="36" y="192" font-size="22" fill="#e8ecff" stroke="none">CLK</text><text x="326" y="92" font-size="22" fill="#e8ecff" stroke="none">Q</text><text x="326" y="192" font-size="22" fill="#e8ecff" stroke="none">Q̄</text>`
};

// puolisummain uudelleen: A ja B vedetään väyliin, XOR (=1) antaa S:n ja AND (&) antaa C:n
FIGS.half = `<rect x="260" y="50" width="90" height="80"/><rect x="260" y="190" width="90" height="80"/><path d="M30 60 H190 M190 60 V215 M190 75 H260 M190 215 H260 M30 280 H150 M150 115 V280 M150 115 H260 M150 255 H260 M350 90 H420 M350 230 H420"/><circle cx="190" cy="75" r="4" fill="#e8ecff" stroke="none"/><circle cx="190" cy="215" r="4" fill="#e8ecff" stroke="none"/><circle cx="150" cy="115" r="4" fill="#e8ecff" stroke="none"/><circle cx="150" cy="255" r="4" fill="#e8ecff" stroke="none"/><text x="305" y="98" font-size="28" text-anchor="middle" fill="#e8ecff" stroke="none">=1</text><text x="305" y="238" font-size="28" text-anchor="middle" fill="#e8ecff" stroke="none">&amp;</text><text x="4" y="66" font-size="22" fill="#e8ecff" stroke="none">A</text><text x="4" y="286" font-size="22" fill="#e8ecff" stroke="none">B</text><text x="428" y="97" font-size="22" fill="#e8ecff" stroke="none">S</text><text x="428" y="237" font-size="22" fill="#e8ecff" stroke="none">C</text>`;

// IEC 60617 -mukaiset SR-salpa (NOR = ≥1 + negaatiopallo lähdössä) ja D-kiikku (C1 + >-kolmio)
FIGS.sr = `<rect x="200" y="40" width="90" height="70"/><rect x="200" y="180" width="90" height="70"/><circle cx="295" cy="75" r="5"/><circle cx="295" cy="215" r="5"/><path d="M120 65 H200 M120 235 H200 M300 75 H320 V150 H170 V205 H200 M300 215 H340 V130 H150 V95 H200 M300 75 H390 M300 215 H390"/><text x="245" y="82" font-size="22" text-anchor="middle" fill="#e8ecff" stroke="none">≥1</text><text x="245" y="222" font-size="22" text-anchor="middle" fill="#e8ecff" stroke="none">≥1</text><text x="92" y="72" font-size="22" fill="#e8ecff" stroke="none">R</text><text x="92" y="242" font-size="22" fill="#e8ecff" stroke="none">S</text><text x="396" y="82" font-size="22" fill="#e8ecff" stroke="none">Q</text><text x="396" y="222" font-size="22" fill="#e8ecff" stroke="none">Q̄</text>`;

FIGS.dff = `<rect x="180" y="60" width="140" height="160"/><path d="M100 100 H180 M100 200 H180 M320 100 H400 M320 200 H400 M180 190 L192 200 L180 210"/><text x="186" y="108" font-size="22" fill="#e8ecff" stroke="none">1D</text><text x="198" y="208" font-size="20" fill="#e8ecff" stroke="none">C1</text><text x="40" y="92" font-size="22" fill="#e8ecff" stroke="none">D</text><text x="326" y="92" font-size="22" fill="#e8ecff" stroke="none">Q</text><text x="326" y="192" font-size="22" fill="#e8ecff" stroke="none">Q̄</text>`;

