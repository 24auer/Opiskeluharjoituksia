// ---------------- matematiikka ----------------
const MATH_CATS = ["MA · Murtolukusäännöt", "MA · Potenssilaskusäännöt", "MA · Polynomit", "MA · Pascalin kolmio", "MA · Yhtälöt", "MA · 1. ja 2. asteen yhtälöt", "MA · Murtolukuyhtälöt", "MA · Juuriyhtälöt", "MA · Yhtälöparit", "MA · Funktiot ja niiden yhtälöt", "MA · Kuvaaja", "MA · Suoran yhtälö", "MA · Käänteisfunktio", "MA · Yhdistetty funktio", "MA · Eksponenttifunktio", "MA · Logaritmifunktio", "MA · Eksponenttiyhtälöt", "MA · Logaritmiyhtälöt", "MA · Trigonometriset funktiot", "MA · Trigonometria", "MA · Trigonometriset yhtälöt"];

const S = (t, e) => ({ t, e });
const M = (n, cat, q, steps, ans) => ({ id: 300 + n, label: "M" + n, cat, type: "math", q, steps, ans });

const MATH = [
M(1, MATH_CATS[0], "Laske 2/3 + 5/6", [
  S("Etsi yhteinen nimittäjä: 3 ja 6 → 6.", "Yhteisen nimittäjän täytyy olla jaollinen sekä 3:lla että 6:lla. Pienin tällainen luku on 6."),
  S("Laventa ensimmäinen murtoluku: 2/3 = (2·2)/(3·2) = 4/6.", "Kerro osoittaja ja nimittäjä samalla luvulla (tässä 2), jolloin murtoluvun arvo ei muutu."),
  S("Laske osoittajat yhteen: 4/6 + 5/6 = 9/6.", "Kun nimittäjät ovat samat, lasketaan osoittajat yhteen ja nimittäjä säilyy."),
  S("Supista: 9/6 = 3/2.", "Jaa osoittaja ja nimittäjä suurimmalla yhteisellä tekijällä, joka on 3.")
], "3/2 eli 1 ½"),
M(2, MATH_CATS[0], "Laske (3/4) · (8/9)", [
  S("Kerro osoittajat keskenään ja nimittäjät keskenään: (3·8)/(4·9) = 24/36.", "Murtolukujen kertolaskussa osoittajat kerrotaan keskenään ja nimittäjät keskenään."),
  S("Supista: 24/36 = 2/3.", "Yhteinen tekijä 12 jakaa sekä osoittajan että nimittäjän. Vaihtoehtoisesti voi supistaa ennen kertomista: 3 ja 9 → 1 ja 3, 4 ja 8 → 1 ja 2, jolloin tulos on 2/3.")
], "2/3"),
M(3, MATH_CATS[1], "Laske 2³ · 2⁵ ja (x²)³ / x⁴", [
  S("Kanta on sama (2), joten eksponentit lasketaan yhteen: 2³ · 2⁵ = 2⁸.", "Potenssien kertolaskussa kannat ovat samat, eksponentit lisätään."),
  S("Laske: 2⁸ = 256.", "2⁸ = 2·2·2·2·2·2·2·2 = 256."),
  S("Potenssin potenssi: (x²)³ = x^(2·3) = x⁶.", "Potenssin potenssissa eksponentit kerrotaan keskenään."),
  S("Jaa samat kannat: x⁶ / x⁴ = x^(6−4) = x².", "Jakolaskussa eksponentit vähennetään. Oletus x ≠ 0, koska nollalla ei voi jakaa.")
], "2⁸ = 256 ja x²"),
M(4, MATH_CATS[2], "Kerro auki (x + 2)(x − 3) ja jaa tekijöihin x³ − 8", [
  S("Kerro jokainen termi jokaisella: x·x + x·(−3) + 2·x + 2·(−3).", "Tämä on sulkeiden purkamista: jokainen termi kerrotaan jokaisella toisen sulkeen termillä."),
  S("= x² − 3x + 2x − 6.", "Termit on kirjoitettu auki."),
  S("Yhdistä samanmuotoiset: −3x + 2x = −x, joten tulos on x² − x − 6.", "Vain x:n ensimmäisen asteen termit voi yhdistää keskenään."),
  S("Tunnista kuutioerotus: a³ − b³ = (a − b)(a² + ab + b²), kun a = x ja b = 2.", "Kaava on kuutioerotuksen tulokaava. b³ = 2³ = 8."),
  S("Sijoita: x³ − 8 = (x − 2)(x² + 2x + 4).", "Tarkista kertomalla auki: (x − 2)(x² + 2x + 4) = x³ − 8.")
], "x² − x − 6 ja (x − 2)(x² + 2x + 4)"),
M(5, MATH_CATS[3], "Mikä on kertoimen x²y² arvo binomissa (x + y)⁴?", [
  S("Kirjoita Pascalin kolmion rivit 0–4: 1 / 1 1 / 1 2 1 / 1 3 3 1 / 1 4 6 4 1.", "Jokainen luku on kahden yläpuolella olevan luvun summa, ja reunoilla on aina 1."),
  S("Binomikaava: (x + y)⁴ = 1x⁴ + 4x³y + 6x²y² + 4xy³ + 1y⁴.", "Potenssin (x + y)ⁿ kertoimet ovat Pascalin kolmion rivillä n."),
  S("x²y²-termin kerroin on rivin 4 kolmas luku, eli 6.", "Rivin 4 luvut on laskettu vaiheessa 1, ja ne ovat 1, 4, 6, 4, 1.")
], "6"),
M(6, MATH_CATS[3], "Laske Pascalin kolmion rivin 5 luvujen summa", [
  S("Rivi 5 saadaan rivistä 4: 1, 1+4 = 5, 4+6 = 10, 6+4 = 10, 4+1 = 5, 1.", "Jokainen luku on kahden yläpuolella olevan luvun summa."),
  S("Summa: 1 + 5 + 10 + 10 + 5 + 1 = 32.", "Lasketaan kaikki rivin luvut yhteen."),
  S("Tarkista: 32 = 2⁵.", "Pascalin kolmion rivin n summa on aina 2ⁿ. Rivi 5 vastaa n = 5, joten summa on 2⁵ = 32.")
], "32"),
M(7, MATH_CATS[4], "Ratkaise 2(x − 3) = x + 5", [
  S("Kerro sulkeet auki: 2x − 6 = x + 5.", "Jakelulaki: 2 kerrotaan molemmilla sulkeen termeillä."),
  S("Siirrä x-termit vasemmalle ja vakiot oikealle: 2x − x = 5 + 6.", "Yhtälön molemmilta puolilta voi vähentää saman luvun tai lausekkeen."),
  S("Yhdistä: x = 11.", "Tämä on ratkaisu."),
  S("Tarkista: VS = 2(11 − 3) = 16, OS = 11 + 5 = 16 ✓.", "Sijoita ratkaisu alkuperäiseen yhtälöön ja varmista, että puolet ovat yhtä suuret.")
], "x = 11"),
M(8, MATH_CATS[4], "Ratkaise x/2 + 1 = 4", [
  S("Vähennä 1 molemmilta puolilta: x/2 = 3.", "Yhtälön säilyttämiseksi sama operaatio tehdään molemmille puolille."),
  S("Kerro molemmat puolet 2:lla: x = 6.", "Kerrotaan, jotta x jää yksin."),
  S("Tarkista: 6/2 + 1 = 3 + 1 = 4 ✓.", "Sijoitus alkuperäiseen yhtälöön.")
], "x = 6"),
M(9, MATH_CATS[5], "Ratkaise x² − 5x + 6 = 0", [
  S("Etsi kaksi lukua, joiden tulo on 6 ja summa −5: −2 ja −3.", "Tulo 6 ja summa −5 sopivat lukuihin −2 ja −3 (−2 · −3 = 6, −2 + −3 = −5)."),
  S("Tekijöihin jako: (x − 2)(x − 3) = 0.", "Muodossa x² + bx + c = (x − p)(x − q), jossa p + q = −b ja pq = c."),
  S("Nollatulosääntö: x − 2 = 0 tai x − 3 = 0, joten x = 2 tai x = 3.", "Tulo on nolla, jos jokin tekijä on nolla."),
  S("Tarkista: 2² − 5·2 + 6 = 0 ✓ ja 3² − 5·3 + 6 = 0 ✓.", "Sijoita molemmat juuret alkuperäiseen yhtälöön.")
], "x = 2 tai x = 3"),
M(10, MATH_CATS[5], "Ratkaise 2x² − 8 = 0", [
  S("Jaa 2:lla: x² − 4 = 0.", "Jakamalla kaikki termit samalla luvulla yhtälö säilyy."),
  S("Siirrä vakio: x² = 4.", "Siirretään vakiotermi oikealle puolelle."),
  S("Juuri: x = ±2.", "Sekä 2 että −2 neliöitynä antavat 4."),
  S("Tarkista: 2·2² − 8 = 0 ✓ ja 2·(−2)² − 8 = 0 ✓.", "Sijoitus alkuperäiseen yhtälöön.")
], "x = 2 tai x = −2"),
M(11, MATH_CATS[6], "Ratkaise 3/(x − 1) = 2", [
  S("Määrittelyehto: x ≠ 1.", "Nimittäjä ei saa olla nolla, joten x = 1 on rajattu pois."),
  S("Kerro molemmat puolet (x − 1):llä: 3 = 2(x − 1).", "Kerrotaan yhtälö nimittäjällä, jotta murtoluku häviää."),
  S("Ratkaise: 3 = 2x − 2, joten 2x = 5 ja x = 5/2.", "Siirretään termit ja jaetaan kertoimella 2."),
  S("Tarkista: 3 / (5/2 − 1) = 3 / (3/2) = 2 ✓.", "Sijoitus alkuperäiseen yhtälöön.")
], "x = 5/2"),
M(12, MATH_CATS[6], "Ratkaise 1/x + 1/(x + 1) = 1/2", [
  S("Määrittelyehdot: x ≠ 0 ja x ≠ −1.", "Kumpikaan nimittäjä ei saa olla nolla."),
  S("Kerro yhtälö yhteisellä nimittäjällä 2x(x + 1): 2(x + 1) + 2x = x(x + 1).", "Yhteinen nimittäjä 2x(x + 1) supistaa kaikki murtoluvut pois."),
  S("Kerro auki ja järjestä: 4x + 2 = x² + x, joten x² − 3x − 2 = 0.", "Vasemmalla 2x + 2 + 2x = 4x + 2 ja oikealla x² + x."),
  S("Ratkaisukaava: x = (3 ± √(9 + 8)) / 2 = (3 ± √17) / 2.", "Kaava x = (−b ± √(b² − 4ac)) / 2a, kun a = 1, b = −3, c = −2."),
  S("Tarkista ratkaisut: x ≈ 3,56 ja x ≈ −0,56. Kumpikaan ei ole 0 tai −1, joten molemmat kelpaavat.", "Määrittelyehdot tarkistetaan lopuksi.")
], "x = (3 ± √17) / 2"),
M(13, MATH_CATS[7], "Ratkaise √(x + 4) = x − 2", [
  S("Määrittelyehdot: x + 4 ≥ 0 ja x − 2 ≥ 0, eli x ≥ 2.", "Neliöjuuren sisällä ja sen arvona on oltava ei-negatiivinen luku."),
  S("Korota molemmat puolet neliöön: x + 4 = (x − 2)² = x² − 4x + 4.", "Neliöön korottaminen voi tuoda mukaan ylimääräisiä ratkaisuja, joten tarkistus on pakollinen."),
  S("Järjestä: x² − 5x = 0, eli x(x − 5) = 0.", "Siirretään kaikki termit vasemmalle."),
  S("Ratkaisut: x = 0 tai x = 5.", "Tulo on nolla, jos jokin tekijä on nolla."),
  S("Tarkista: x = 0 ei kelpaa, koska √4 = 2 ja x − 2 = −2. x = 5 kelpaa: √9 = 3 ja 5 − 2 = 3 ✓.", "Juuriyhtälöissä ylimääräinen ratkaisu on tavallinen, joten se on tarkistettava.")
], "x = 5"),
M(14, MATH_CATS[7], "Ratkaise √(2x + 1) = 3", [
  S("Korota neliöön: 2x + 1 = 9.", "Neliöjuuri poistuu, kun molemmat puolet korotetaan neliöön."),
  S("Ratkaise: 2x = 8, joten x = 4.", "Vähennetään 1 ja jaetaan 2:lla."),
  S("Tarkista: √(2·4 + 1) = √9 = 3 ✓.", "Sijoitus alkuperäiseen yhtälöön.")
], "x = 4"),
M(15, MATH_CATS[8], "Ratkaise yhtälöpari x + y = 7 ja x − y = 1", [
  S("Laske yhtälöt yhteen: 2x = 8.", "Y-termit kumoutuvat, kun yhtälöt lasketaan yhteen."),
  S("Ratkaise x: x = 4.", "Jaetaan 2:lla."),
  S("Sijoita x = 4 ensimmäiseen yhtälöön: 4 + y = 7, joten y = 3.", "Yhtälöparin toinen muuttuja saadaan sijoittamalla."),
  S("Tarkista: 4 − 3 = 1 ✓.", "Ratkaisu toteuttaa molemmat yhtälöt.")
], "x = 4, y = 3"),
M(16, MATH_CATS[8], "Ratkaise yhtälöpari 2x + 3y = 12 ja x − y = 1", [
  S("Ratkaise toisesta yhtälöstä: x = y + 1.", "Helpoin muuttuja ratkaistaan ensin."),
  S("Sijoita ensimmäiseen yhtälöön: 2(y + 1) + 3y = 12.", "Korvataan x lausekkeella y + 1."),
  S("Kerro auki ja ratkaise: 2y + 2 + 3y = 12, joten 5y = 10 ja y = 2.", "Yhdistetään y-termit ja ratkaistaan y."),
  S("Lasketaan x: x = 2 + 1 = 3.", "Sijoitetaan y takaisin yhtälöön x = y + 1."),
  S("Tarkista: 2·3 + 3·2 = 12 ✓ ja 3 − 2 = 1 ✓.", "Molemmat yhtälöt toteutuvat.")
], "x = 3, y = 2"),
M(17, MATH_CATS[9], "Funktio f(x) = 2x² − 3. Laske f(−2) ja ratkaise f(x) = 15", [
  S("Laske f(−2): 2·(−2)² − 3 = 2·4 − 3 = 5.", "Sijoitetaan −2 muuttujan paikalle. Neliöön korotus tehdään ennen kertomista."),
  S("Aseta f(x) = 15: 2x² − 3 = 15.", "Funktion arvo tiedetään, joten haetaan x."),
  S("Ratkaise: 2x² = 18, joten x² = 9 ja x = ±3.", "Neliöjuurella on kaksi ratkaisua."),
  S("Tarkista: f(3) = 2·9 − 3 = 15 ✓ ja f(−3) = 15 ✓.", "Molemmat arvot antavat saman funktion arvon.")
], "f(−2) = 5 ja x = ±3"),
M(18, MATH_CATS[9], "Määritä funktion g(x) = √(x − 2) määrittelyjoukko", [
  S("Neliöjuuren sisällä ei voi olla negatiivinen luku: x − 2 ≥ 0.", "Reaalinen neliöjuuri vaatii ei-negatiivisen argumentin."),
  S("Ratkaise: x ≥ 2.", "Siirretään −2 oikealle puolelle."),
  S("Määrittelyjoukko: [2, ∞).", "Mikä tahansa x ≥ 2 kelpaa, ja sen tulos on reaalinen.")
], "[2, ∞)"),
M(19, MATH_CATS[10], "Määritä paraabelin y = x² − 4x + 3 nollakohdat, kärki ja y-akselin leikkaus", [
  S("Nollakohdat: x² − 4x + 3 = 0, joten (x − 1)(x − 3) = 0 ja x = 1 tai x = 3.", "Nollakohdat ovat x-akselin leikkauspisteet, joissa y = 0."),
  S("Kärjen x-koordinaatti: x = −b / (2a) = 4 / 2 = 2.", "Paraabelin symmetria-akseli on x = −b/(2a)."),
  S("Kärjen y-koordinaatti: y(2) = 4 − 8 + 3 = −1, joten kärki on (2, −1).", "Sijoitetaan symmetria-akseli funktioon."),
  S("Y-akselin leikkaus: x = 0, joten y = 3.", "Kun x = 0, funktio saa arvon c = 3."),
  S("Paraabeli aukeaa ylöspäin, koska a = 1 > 0.", "Kertoimen a merkki kertoo aukeamissuunnan.")
], "Kärki (2, −1), nollakohdat 1 ja 3, y-akselin leikkaus (0, 3)"),
M(20, MATH_CATS[10], "Piirrä suora y = −2x + 4 ja määritä sen leikkauspisteet akseleilla", [
  S("Y-akselin leikkaus: x = 0, joten y = 4.", "Vakiotermi on y-akselin leikkauspiste."),
  S("X-akselin leikkaus: y = 0, joten −2x + 4 = 0 ja x = 2.", "X-akselilla y = 0."),
  S("Kulmakerroin −2 < 0, joten suora laskee oikealle mentäessä.", "Negatiivinen kulmakerroin tarkoittaa laskevaa suoraa.")
], "Leikkaukset (0, 4) ja (2, 0)"),
M(21, MATH_CATS[11], "Määritä suora, jonka kulmakerroin on 2 ja joka kulkee pisteen (1, 5) kautta", [
  S("Pistekulmakerroin-muoto: y − y₁ = k(x − x₁).", "Kun kulmakerroin ja yksi piste tunnetaan, suoran yhtälö on tämä."),
  S("Sijoita: y − 5 = 2(x − 1).", "k = 2, (x₁, y₁) = (1, 5)."),
  S("Ratkaise y: y − 5 = 2x − 2, joten y = 2x + 3.", "Kerrotaan auki ja siirretään 5 oikealle."),
  S("Tarkista: pisteessä (1, 5): 2·1 + 3 = 5 ✓.", "Piste toteuttaa yhtälön.")
], "y = 2x + 3"),
M(22, MATH_CATS[11], "Määritä suora pisteiden (0, 2) ja (4, −2) kautta", [
  S("Kulmakerroin: k = (y₂ − y₁) / (x₂ − x₁) = (−2 − 2) / (4 − 0) = −4/4 = −1.", "Kahden pisteen välinen kulmakerroin."),
  S("Y-akselin leikkaus: piste (0, 2), joten b = 2.", "Suoran yhtälö on y = kx + b."),
  S("Yhtälö: y = −x + 2.", "Yhdistetään k ja b."),
  S("Tarkista pisteellä (4, −2): −4 + 2 = −2 ✓.", "Toinen piste toteuttaa yhtälön.")
], "y = −x + 2"),
M(23, MATH_CATS[12], "Määritä f(x) = 2x + 3 käänteisfunktio", [
  S("Kirjoita y = 2x + 3.", "Käänteisfunktio saadaan vaihtamalla x ja y ja ratkaisemalla y."),
  S("Ratkaise x: x = (y − 3) / 2.", "Vähennä 3 ja jaa 2:lla."),
  S("Vaihda muuttujat: f⁻¹(x) = (x − 3) / 2.", "Käänteisfunktion muuttuja on x."),
  S("Tarkista: f(f⁻¹(x)) = 2 · (x − 3)/2 + 3 = x ✓.", "Funktion ja käänteisfunktion yhdistelmä antaa x:n.")
], "f⁻¹(x) = (x − 3) / 2"),
M(24, MATH_CATS[12], "Määritä f(x) = x³ − 1 käänteisfunktio", [
  S("Kirjoita y = x³ − 1.", "Lähtökohtana on sama kuin muissa käänteisfunktioissa."),
  S("Ratkaise x: x³ = y + 1, joten x = ∛(y + 1).", "Kuutiojuuri poistaa kuution."),
  S("Vaihda muuttujat: f⁻¹(x) = ∛(x + 1).", "Muuttuja on nyt x."),
  S("Tarkista: f(∛(x + 1)) = (x + 1) − 1 = x ✓.", "Kuutiojuuri ja kuutio kumoavat toisensa.")
], "f⁻¹(x) = ∛(x + 1)"),
M(25, MATH_CATS[13], "Olkoon f(x) = x + 2 ja g(x) = x². Määritä f∘g ja g∘f ja laske ne kohdassa x = 3", [
  S("Laske f(g(x)) = f(x²) = x² + 2.", "Yhdistetty funktio f∘g: ensin g, sitten f."),
  S("Laske g(f(x)) = g(x + 2) = (x + 2)² = x² + 4x + 4.", "Yhdistetty funktio g∘f: ensin f, sitten g."),
  S("Arvot kohdassa x = 3: (f∘g)(3) = 9 + 2 = 11 ja (g∘f)(3) = 25.", "Sijoitetaan x = 3 kummankin lausekkeen. Huomaa, että järjestys vaikuttaa tulokseen."),
  S("Tarkista: (g∘f)(3) = g(f(3)) = g(5) = 25 ✓.", "Lasketaan välivaiheittain.")
], "f∘g = x² + 2 ja g∘f = x² + 4x + 4; arvot 11 ja 25"),
M(26, MATH_CATS[13], "Olkoon f(x) = 2x ja g(x) = x − 1. Määritä f(g(x))", [
  S("Sijoita g(x) funktioon f: f(g(x)) = f(x − 1).", "Yhdistetty funktio: sisäfunktion arvo syötetään ulkofunktioon."),
  S("Laske f(x − 1) = 2(x − 1) = 2x − 2.", "Kerrotaan sulkeet auki."),
  S("Tarkista x = 4: g(4) = 3, f(3) = 6 ja 2·4 − 2 = 6 ✓.", "Sijoitus kokeeksi.")
], "f(g(x)) = 2x − 2"),
M(27, MATH_CATS[14], "Laske f(x) = 2ˣ kohdissa x = 0, x = 3 ja x = −2. Mikä on arvoalue?", [
  S("f(0) = 2⁰ = 1.", "Mikä tahansa nollasta eroava luku, korotettuna nollanteen potenssiin, on 1."),
  S("f(3) = 2³ = 8.", "Kolmas potenssi kaksi."),
  S("f(−2) = 2⁻² = 1/4.", "Negatiivinen eksponentti tarkoittaa käänteislukua."),
  S("Arvoalue: (0, ∞), koska 2ˣ on aina positiivinen ja lähestyy nollaa, kun x pienenee.", "Eksponenttifunktion kanta 2 > 1, joten funktio on kasvava ja sen kuvaaja on x-akselin yläpuolella.")
], "f(0) = 1, f(3) = 8, f(−2) = 1/4; arvoalue (0, ∞)"),
M(28, MATH_CATS[14], "Laske f(x) = 3 · 2ˣ arvo, kun x = 2", [
  S("Sijoita x = 2: f(2) = 3 · 2².", "Sijoitetaan muuttujan paikalle 2."),
  S("Laske potenssi: 2² = 4.", "Potenssi lasketaan ennen kertomista."),
  S("Kerro: 3 · 4 = 12.", "Lopullinen arvo."),
  S("Tarkista: 2² = 4 ja 3·4 = 12 ✓.", "Välivaiheet tarkistettu.")
], "f(2) = 12"),
M(29, MATH_CATS[15], "Laske log₃ 81", [
  S("Kysymys: mihin potenssiin 3 pitää korottaa, että saadaan 81?", "Logaritmi on potenssin eksponentti: log_a b = c tarkoittaa a^c = b."),
  S("3⁴ = 81.", "Kolme nelonen on 3 · 3 · 3 · 3 = 81."),
  S("Joten log₃81 = 4.", "Eksponentti on vastaus."),
  S("Tarkista: 3⁴ = 81 ✓.", "Potenssimuoto vahvistaa tuloksen.")
], "4"),
M(30, MATH_CATS[15], "Määritä f(x) = log(x − 1) määrittelyjoukko", [
  S("Logaritmin argumentin on oltava positiivinen: x − 1 > 0.", "Logaritmia ei ole määritelty nollalle eikä negatiiviselle luvulle."),
  S("Ratkaise: x > 1.", "Lisätään 1 molemmille puolille."),
  S("Määrittelyjoukko: (1, ∞).", "Kaikki x, joille x > 1, kelpaavat.")
], "(1, ∞)"),
M(31, MATH_CATS[16], "Ratkaise 2^(x+1) = 16", [
  S("Kirjoita 16 kakkosen potenssina: 16 = 2⁴.", "2⁴ = 2·2·2·2 = 16."),
  S("Yhtälö on 2^(x+1) = 2⁴. Kannat ovat samat, joten eksponentit ovat yhtä suuret.", "Kun kannat ovat samat ja kanta ei ole 1, eksponentit on oltava samat."),
  S("x + 1 = 4, joten x = 3.", "Ratkaistaan eksponentti."),
  S("Tarkista: 2^(3+1) = 2⁴ = 16 ✓.", "Sijoitus alkuperäiseen yhtälöön.")
], "x = 3"),
M(32, MATH_CATS[16], "Ratkaise 9ˣ = 27", [
  S("Kirjoita molemmat kolmen potenssina: 9 = 3² ja 27 = 3³.", "Yhteinen kanta helpottaa ratkaisua."),
  S("Yhtälö: (3²)ˣ = 3³, eli 3^(2x) = 3³.", "Potenssin potenssi: (aᵐ)ⁿ = a^(mn)."),
  S("Eksponentit ovat yhtä suuret: 2x = 3, joten x = 3/2.", "Kannat ovat samat, joten eksponentit vertaillaan."),
  S("Tarkista: 9^(3/2) = (√9)³ = 3³ = 27 ✓.", "Juuri ja potenssi lasketaan ensin.")
], "x = 3/2"),
M(33, MATH_CATS[17], "Ratkaise log₂ x = 5", [
  S("Muunna potenssimuotoon: x = 2⁵.", "Logaritmi on potenssin eksponentti: log₂x = 5 tarkoittaa 2⁵ = x."),
  S("Laske: x = 32.", "2⁵ = 2·2·2·2·2 = 32."),
  S("Tarkista: log₂ 32 = 5 ✓.", "Sijoitus alkuperäiseen yhtälöön.")
], "x = 32"),
M(34, MATH_CATS[17], "Ratkaise log x + log(x − 3) = 1 (kantaluku 10)", [
  S("Määrittelyehdot: x > 0 ja x − 3 > 0, eli x > 3.", "Kumpikin logaritmin argumentti on oltava positiivinen."),
  S("Yhdistä logaritmit: log(x(x − 3)) = 1, joten x(x − 3) = 10.", "Logaritmien summa on tulon logaritmi. Kantaluku 10: log 10 = 1."),
  S("Järjestä: x² − 3x − 10 = 0, joten (x − 5)(x + 2) = 0.", "Tekijöihin jako: 5 · (−2) = −10 ja 5 + (−2) = 3."),
  S("Ratkaisut: x = 5 tai x = −2. Vain x = 5 kelpaa, koska x > 3.", "Ratkaisu −2 ei täytä määrittelyehtoa."),
  S("Tarkista: log 5 + log 2 = log 10 = 1 ✓.", "Sijoitus alkuperäiseen yhtälöön.")
], "x = 5"),
M(35, MATH_CATS[18], "Laske sin(π/2), cos(π) ja tan(π/4)", [
  S("sin(π/2) = sin 90° = 1.", "Yksikköympyrän pisteen y-koordinaatti pisteessä 90° on 1."),
  S("cos(π) = cos 180° = −1.", "Yksikköympyrän pisteen x-koordinaatti pisteessä 180° on −1."),
  S("tan(π/4) = sin 45° / cos 45° = (√2/2) / (√2/2) = 1.", "Tangentti on sini jaettuna kosinilla.")
], "sin(π/2) = 1, cos(π) = −1, tan(π/4) = 1"),
M(36, MATH_CATS[18], "Mikä on funktion y = sin(2x) jakso?", [
  S("Perusfunktion sin x jakso on 2π.", "Sini toistaa arvonsa, kun kulma kasvaa 2π."),
  S("Kerroin 2 tiivistää jakson: jakso = 2π / 2 = π.", "Jos x kerrotaan kertoimella, jakso kutistuu kertoimen verran."),
  S("Tarkista: sin(2(x + π)) = sin(2x + 2π) = sin(2x) ✓.", "Jakso π toteuttaa ehdon.")
], "π"),
M(37, MATH_CATS[19], "Suorakulmaisen kolmion kateetti a = 3 ja hypotenuusa c = 5. Laske b ja sin A", [
  S("Pythagoraan lause: a² + b² = c².", "Suorakulmaisessa kolmiossa hypotenuusan neliö on kateettien neliöiden summa."),
  S("9 + b² = 25, joten b² = 16 ja b = 4.", "Ratkaistaan b neliöjuuren avulla."),
  S("sin A = a / c = 3 / 5.", "Sini on vastakkaisen kateetin ja hypotenuusan suhde."),
  S("Tarkista: 3² + 4² = 9 + 16 = 25 = 5² ✓.", "Kolmen, neljän ja viiden kolmikko.")
], "b = 4 ja sin A = 3/5"),
M(38, MATH_CATS[19], "Kolmiossa a = 7, A = 30° ja B = 45°. Laske b sinilauseella", [
  S("Sinilause: a / sin A = b / sin B.", "Kolmion sivut ovat verrannollisia vastakkaisten kulmien siniin."),
  S("Ratkaise b: b = a · sin B / sin A = 7 · (√2/2) / (1/2).", "Sijoitetaan sin 45° = √2/2 ja sin 30° = 1/2."),
  S("Laske: 7 · (√2/2) · 2 = 7√2 ≈ 9,90.", "Jakaminen puolella tarkoittaa kertomista käänteisluvulla."),
  S("Tarkista järkevyys: suurempi kulma B = 45° vastaa suurempaa sivua, joten b > a = 7 ✓.", "Kulman ja sivun suuruusjärjestys säilyy.")
], "b = 7√2 ≈ 9,90"),
M(39, MATH_CATS[20], "Ratkaise sin x = 1/2, kun 0 ≤ x < 2π", [
  S("Perusratkaisu: x = arcsin(1/2) = π/6.", "Sinin arvo 1/2 saadaan kulmalla 30° eli π/6."),
  S("Sini on positiivinen myös toisella neljänneksellä: x = π − π/6 = 5π/6.", "Sini on sama kulmilla x ja π − x."),
  S("Yleinen ratkaisu: x = π/6 + 2πk tai x = 5π/6 + 2πk, k ∈ ℤ.", "Sini toistuu 2π:n välein."),
  S("Tarkista: sin(π/6) = 1/2 ✓ ja sin(5π/6) = 1/2 ✓.", "Molemmat ratkaisut välillä [0, 2π).")
], "x = π/6 tai x = 5π/6"),
M(40, MATH_CATS[20], "Ratkaise cos(2x) = 0, kun 0 ≤ x < 2π", [
  S("Kosinin nollakohdat: u = π/2 + kπ.", "Kosini on nolla kulmilla π/2 ja sen monikerroilla, joiden välillä on π."),
  S("Sijoita u = 2x: 2x = π/2 + kπ, joten x = π/4 + kπ/2.", "Jaetaan 2:lla."),
  S("Välillä [0, 2π): x = π/4, 3π/4, 5π/4, 7π/4 (k = 0, 1, 2, 3).", "Kokeillaan k:n arvoja, kunnes x ylittää 2π."),
  S("Tarkista: cos(2 · π/4) = cos(π/2) = 0 ✓.", "Yksi ratkaisu tarkistettu.")
], "x = π/4, 3π/4, 5π/4, 7π/4"),
M(41, MATH_CATS[20], "Ratkaise tan x = 1, kun 0 ≤ x < 2π", [
  S("Perusratkaisu: x = arctan(1) = π/4.", "Tangentti on 1 kulmalla 45°."),
  S("Tangentti on jaksollinen jaksolla π, joten toinen ratkaisu on x = π/4 + π = 5π/4.", "Tangentin jakso on π, toisin kuin sinin ja kosinin 2π."),
  S("Tarkista: tan(5π/4) = tan(π/4) = 1 ✓.", "Tangentin arvot toistuvat jaksolla π.")
], "x = π/4 tai x = 5π/4"),
M(42, MATH_CATS[20], "Ratkaise 2 sin²x − sin x = 0, kun 0 ≤ x < 2π", [
  S("Ota yhteinen tekijä: sin x (2 sin x − 1) = 0.", "Termissä on yhteinen tekijä sin x."),
  S("Nollatulosääntö: sin x = 0 tai 2 sin x − 1 = 0.", "Tulo on nolla, jos jokin tekijä on nolla."),
  S("Ratkaise: sin x = 0 antaa x = 0 ja x = π. Toisesta sin x = 1/2 antaa x = π/6 ja x = 5π/6.", "Sinin nollakohdat ja arvot 1/2 välillä [0, 2π)."),
  S("Tarkista x = π/6: 2·(1/2)² − 1/2 = 2·(1/4) − 1/2 = 0 ✓.", "Yksi ratkaisu sijoitettu alkuperäiseen yhtälöön.")
], "x = 0, π/6, 5π/6 tai π")
];

