const ALL = [...Q, ...DIG, ...MATH];

// ---------------- tila ----------------
let cat = "Kaikki";
const openSet = {}; // muistaa, mitkä pudotusvalikot ovat auki
let idx = 0;
const state = {}; // id -> {answer, checked, result}

const $ = s => document.querySelector(s);
const esc = s => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

function visible() { return cat === "Kaikki" ? ALL : ALL.filter(q => q.cat === cat); }

function renderSidebar() {
  const groups = [
    { key: "prog", title: "Ohjelmointi", items: CATS, label: c => c },
    { key: "dig", title: "Digitekniikka", items: DIG_CATS, label: c => c.replace(/^DT · /, "") },
    { key: "math", title: "Matematiikka", items: MATH_CATS, label: c => c.replace(/^MA · /, "") }
  ];
  const isOpen = g => openSet[g.key] ?? g.items.includes(cat);
  $("#cats").innerHTML = `<button class="cat ${cat === "Kaikki" ? "active" : ""}" data-cat="Kaikki">Kaikki</button>` +
    groups.map(g => `<details data-key="${g.key}" ${isOpen(g) ? "open" : ""}><summary>${g.title}</summary>` +
      g.items.map(c => `<button class="cat sub ${c === cat ? "active" : ""}" data-cat="${c}">${g.label(c)}</button>`).join("") +
      `</details>`).join("");
  document.querySelectorAll("details").forEach(d => d.ontoggle = () => { openSet[d.dataset.key] = d.open; });
  document.querySelectorAll("#cats button").forEach(b => b.onclick = () => {
    cat = b.dataset.cat; idx = 0; render();
  });
  const list = visible();
  $("#qlist").innerHTML = list.map((q,i) => {
    const s = state[q.id];
    const cls = (i===idx?"current ":"") + (s && s.done ? "done" : "");
    return `<button class="${cls}" data-i="${i}">${q.label ?? q.id}</button>`;
  }).join("");
  document.querySelectorAll("#qlist button").forEach(b => b.onclick = () => { idx = +b.dataset.i; render(); });
  const done = Object.values(state).filter(s => s.done).length;
  $("#progress").textContent = `${done}/${ALL.length}`;
  $("#progfill").style.width = (ALL.length ? Math.round(done / ALL.length * 100) : 0) + "%";
  applySearch();
}

function renderCard() {
  const list = visible();
  const q = list[idx];
  if (!q) { $("#card").innerHTML = "<p>Ei tehtäviä.</p>"; return; }
  const s = state[q.id] || (state[q.id] = {answer:null, done:false, result:null});
  let body = "";

  if (q.type === "single" || q.type === "multi") {
    const inputType = q.type === "single" ? "radio" : "checkbox";
    body = q.opts.map((o,i) => {
      const chosen = Array.isArray(s.answer) ? s.answer.includes(i) : s.answer === i;
      let cls = "";
      if (s.done) {
        if (q.ans.includes(i)) cls = "correct";
        else if (chosen) cls = "wrong";
      }
      return `<label class="opt ${cls}"><input type="${inputType}" name="q${q.id}" value="${i}" ${chosen?"checked":""} ${s.done?"disabled":""}> <span>${esc(o)}</span></label>`;
    }).join("");
    body += `<div class="btns"><button class="primary" id="check" ${s.done?"disabled":""}>Tarkista</button>
             <button class="ghost" id="reset">Tyhjennä</button></div>`;
  }

  if (q.type === "drag") {
    const filled = s.answer || [];
    const parts = q.tpl.split(/(\{\d+\})/).map(p => {
      const m = p.match(/^\{(\d+)\}$/);
      if (!m) return esc(p);
      const i = +m[1];
      const word = filled[i];
      let cls = "blank";
      if (s.done && word !== undefined) cls += word === q.ans[i] ? " ok" : " bad";
      return `<span class="${cls}" data-blank="${i}">${word ? esc(word) : "&nbsp;&nbsp;&nbsp;&nbsp;"}</span>`;
    }).join("");
    const used = filled.filter(x => x !== undefined);
    body = `<pre class="code">${parts}</pre>
      <p class="meta">Valitse sana ja napsauta aukkoa. Napsauta täytettyä aukkoa palauttaaksesi sanan.</p>
      <div class="bank">${q.bank.map(w => {
        const isUsed = used.includes(w);
        return `<span class="chip ${isUsed?'used':''}" data-word="${esc(w)}">${esc(w)}</span>`;
      }).join("")}</div>
      <div class="btns"><button class="primary" id="check" ${s.done?"disabled":""}>Tarkista</button>
      <button class="ghost" id="reset">Tyhjennä</button></div>`;
  }

  if (q.type === "code") {
    const code = s.answer !== null ? s.answer : q.starter;
    body = `<textarea class="editor" id="editor" spellcheck="false">${esc(code)}</textarea>
      <div class="btns">
        <button class="primary" id="runcheck">Tarkista koodi</button>
        <button class="ghost" id="showsol">Näytä malliratkaisu</button>
        <button class="ghost" id="reset">Palauta lähtökoodi</button>
      </div>
      <div id="codefb"></div>
      <div id="solbox" class="hidden"><pre class="code">${esc(q.solution)}</pre></div>`;
  }

  if (q.type === "flash") {
    const fig = q.fig ? `<div class="fig">${figSvg(q.fig)}</div>` : "";
    body = !s.revealed
      ? `<div class="btns"><button class="primary" id="reveal">Näytä vastaus</button></div>`
      : `<div class="feedback info answer">${esc(q.answer)}</div>${fig}
         ${s.done ? `<p class="meta">Merkitty valmiiksi.</p>`
           : `<div class="btns"><button class="primary" id="know">Osasin</button><button class="ghost" id="dontknow">En osannut</button></div>`}`;
  }

  if (q.type === "draw") {
    body = `<div class="drawwrap"><canvas id="pad" width="500" height="320"></canvas></div>
      <div class="btns"><button class="primary" id="chk">Tarkista piirros</button>
      <button class="ghost" id="clr">Tyhjennä</button>
      <button class="ghost" id="showfig">Näytä malli</button></div>
      <div id="drawfb"></div>
      <div id="figbox" class="fig hidden">${figSvg(q.fig)}</div>
      <p class="meta">Piirrä hiirellä tai sormella. Tarkistus on suuntaa-antava: se katsoo, onko piirros lähellä mallia. Voit aina verrata itse.</p>`;
  }

  if (q.type === "math") {
    body = `<p class="meta">Klikkaa vaiheita avataksesi ne yksi kerrallaan.</p>` +
      q.steps.map((st, i) => `<details class="spoil"><summary>Vaihe ${i + 1}</summary><div class="steptxt">${esc(st.t)}</div>` +
      (st.e ? `<details class="explain"><summary>Selitä</summary><div>${esc(st.e)}</div></details>` : "") + `</details>`).join("") +
      `<details class="spoil ans"><summary>Vastaus</summary><div class="feedback ok"><strong>Vastaus:</strong> ${esc(q.ans)}</div></details>
       <div class="btns">${s.done ? `<p class="meta">Merkitty tehdyksi.</p>` : `<button class="primary" id="mdone">Merkitse tehdyksi</button>`}</div>`;
  }

  if (q.type === "expr") {
    body = `<div class="exprrow"><input id="expr" class="exprin" value="${esc(q.expr)}" spellcheck="false"><button class="primary" id="draw">Piirrä</button></div>
      <div class="presets">${EXPR_PRESETS.map(p => `<button class="ghost preset" data-p="${esc(p)}">${esc(p)}</button>`).join("")}</div>
      <div id="exprout" class="fig"></div>
      <p class="meta">NOT-portit tekevät negaatiot, AND-portit tulot ja OR-portti summan. Heittomerkki ' tarkoittaa negaatiota.</p>`;
  }

  const fb = s.done && (q.type === "single" || q.type === "multi" || q.type === "drag") ? feedbackFor(q, s) : "";

  $("#card").innerHTML = `
    <div class="meta"><span class="badge">${q.cat}</span><span>Tehtävä ${q.label ?? q.id}</span></div>
    ${q.type === "code" ? `<h1 class="q">${esc(q.q)}</h1>` : (q.type === "drag" ? "" : `<h1 class="q">${esc(q.q)}</h1>`)}
    ${body}
    <div id="fb">${fb}</div>`;

  bindCard(q, s);
  $("#prev").disabled = idx === 0;
  $("#next").disabled = idx === list.length - 1;
  renderSidebar();
}

function feedbackFor(q, s) {
  let ok;
  if (q.type === "drag") ok = q.ans.every((a,i) => s.answer && s.answer[i] === a);
  else {
    const sel = Array.isArray(s.answer) ? [...s.answer].sort() : (s.answer === null ? [] : [s.answer]);
    const want = [...q.ans].sort();
    ok = JSON.stringify(sel) === JSON.stringify(want);
  }
  let correctText;
  if (q.type === "drag") correctText = q.ans.join(", ");
  else correctText = q.ans.map(i => q.opts[i]).join(" | ");
  return `<div class="feedback ${ok?'ok':'bad'}">
    <strong>${ok ? "Oikein!" : "Väärin."}</strong>${ok ? "" : ` Oikea vastaus: <code>${esc(correctText)}</code>`}
    <div style="margin-top:6px">${esc(q.why)}</div></div>`;
}

function bindCard(q, s) {
  if (q.type === "single" || q.type === "multi") {
    document.querySelectorAll(`input[name="q${q.id}"]`).forEach(inp => inp.onchange = () => {
      if (q.type === "single") s.answer = +inp.value;
      else {
        const vals = [...document.querySelectorAll(`input[name="q${q.id}"]:checked`)].map(x => +x.value);
        s.answer = vals;
      }
    });
    $("#check") && ($("#check").onclick = () => {
      if (s.answer === null || (Array.isArray(s.answer) && s.answer.length === 0)) return;
      s.done = true; markDone(q); render();
    });
    $("#reset").onclick = () => { s.answer = null; s.done = false; render(); };
  }

  if (q.type === "drag") {
    if (!Array.isArray(s.answer)) s.answer = [];
    document.querySelectorAll(".chip").forEach(c => c.onclick = () => {
      if (s.done || c.classList.contains("used")) return;
      const w = c.dataset.word;
      for (let i = 0; i < q.ans.length; i++) {
        if (s.answer[i] === undefined) { s.answer[i] = w; break; }
      }
      render();
    });
    document.querySelectorAll(".blank").forEach(b => b.onclick = () => {
      if (s.done) return;
      const i = +b.dataset.blank;
      delete s.answer[i];
      render();
    });
    $("#check") && ($("#check").onclick = () => {
      if (q.ans.some((_,i) => s.answer[i] === undefined)) return;
      s.done = true; markDone(q); render();
    });
    $("#reset").onclick = () => { s.answer = []; s.done = false; render(); };
  }

  if (q.type === "flash") {
    $("#reveal") && ($("#reveal").onclick = () => { s.revealed = true; render(); });
    $("#know") && ($("#know").onclick = () => { s.done = true; playChime(); render(); });
    $("#dontknow") && ($("#dontknow").onclick = () => { s.done = true; render(); });
  }

  if (q.type === "draw") setupPad(q, s);
  if (q.type === "math") {
    $("#mdone") && ($("#mdone").onclick = () => { s.done = true; playChime(); render(); });
  }
  if (q.type === "expr") setupExpr();

  if (q.type === "code") {
    $("#editor").oninput = e => { s.answer = e.target.value; };
    $("#showsol").onclick = () => $("#solbox").classList.toggle("hidden");
    $("#reset").onclick = () => { s.answer = null; $("#editor").value = q.starter; $("#codefb").innerHTML = ""; };
    $("#runcheck").onclick = async () => {
      const code = $("#editor").value;
      s.answer = code;
      const out = $("#codefb");
      if (!CHECK_ENDPOINT) {
        out.innerHTML = `<div class="feedback info">Automaattista tarkistusta ei ole vielä kytketty. Vertaa koodiasi malliratkaisuun.</div>`;
        return;
      }
      out.innerHTML = `<div class="feedback info">Tarkistetaan…</div>`;
      try {
        const r = await fetch(CHECK_ENDPOINT, {method:"POST", headers:{"Content-Type":"application/json"},
          body: JSON.stringify({id:q.id, code})});
        const data = await r.json();
        out.innerHTML = `<div class="feedback ${data.ok?'ok':'bad'}"><strong>${data.ok?"Testit menivät läpi!":"Testit eivät mene läpi."}</strong>
          <pre class="code" style="margin-top:8px">${esc(data.output || "")}</pre></div>`;
        s.done = !!data.ok;
        if (data.ok) playChime();
        renderSidebar();
      } catch (err) {
        out.innerHTML = `<div class="feedback bad">Tarkistuspalveluun ei saatu yhteyttä.</div>`;
      }
    };
  }
}

// ---------------- ääni ----------------
let audioCtx = null;
let muted = false;

function playChime() {
  if (muted) return;
  audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
  const t = audioCtx.currentTime;
  // nouseva sointu: C5 - E5 - G5 - C6
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
    const start = t + i * 0.09;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = f;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.18, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(start);
    osc.stop(start + 0.4);
  });
}

function isCorrect(q, s) {
  if (q.type === "code") return false;
  if (q.type === "drag") return q.ans.every((a, i) => s.answer && s.answer[i] === a);
  const sel = Array.isArray(s.answer) ? [...s.answer].sort() : (s.answer === null ? [] : [s.answer]);
  return JSON.stringify(sel) === JSON.stringify([...q.ans].sort());
}

function setupPad(q, s) {
  const cv = $("#pad");
  const ctx = cv.getContext("2d");
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "#e8ecff";
  let drawing = false;
  const pos = e => {
    const r = cv.getBoundingClientRect();
    return { x: (e.clientX - r.left) * cv.width / r.width, y: (e.clientY - r.top) * cv.height / r.height };
  };
  cv.onpointerdown = e => {
    drawing = true;
    cv.setPointerCapture(e.pointerId);
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  };
  cv.onpointermove = e => {
    if (!drawing) return;
    const p = pos(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  };
  cv.onpointerup = () => { drawing = false; };
  cv.onpointercancel = () => { drawing = false; };

  $("#clr").onclick = () => { ctx.clearRect(0, 0, cv.width, cv.height); $("#drawfb").innerHTML = ""; };
  $("#showfig").onclick = () => $("#figbox").classList.toggle("hidden");
  $("#chk").onclick = async () => {
    const out = $("#drawfb");
    out.innerHTML = `<div class="feedback info">Tarkistetaan…</div>`;
    try {
      const res = await compareDrawing(cv, q.fig);
      if (res.empty) { out.innerHTML = `<div class="feedback info">Piirrä ensin jotain.</div>`; return; }
      s.done = res.ok;
      if (res.ok) playChime();
      out.innerHTML = `<div class="feedback ${res.ok ? "ok" : "bad"}"><strong>${res.ok ? "Piirros on lähellä mallia!" : "Piirros poikkeaa mallista."}</strong>
        <div style="margin-top:6px">Tarkistus on suuntaa-antava. Vertaa piirrosta malliin ja päätä itse.</div></div>`;
      renderSidebar();
    } catch (err) {
      out.innerHTML = `<div class="feedback bad">Mallin lataaminen ei onnistunut.</div>`;
    }
  };
}

function setupExpr() {
  const inp = $("#expr"), out = $("#exprout");
  const go = () => { out.innerHTML = exprSvg(inp.value); };
  $("#draw").onclick = go;
  inp.onkeydown = e => { if (e.key === "Enter") go(); };
  document.querySelectorAll(".preset").forEach(b => b.onclick = () => { inp.value = b.dataset.p; go(); });
  go();
}

function markDone(q) {
  state[q.id].done = true;
  if (isCorrect(q, state[q.id])) playChime();
}

function render() { saveProgress(); renderSidebar(); renderCard(); }

// edistymisen tallennus selaimeen, jotta valmiit tehtävät säilyvät sivun uudelleenlatauksessa
const STORE_KEY = "kurssi-tila-v1";
function saveProgress() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
}
function loadProgress() {
  try { Object.assign(state, JSON.parse(localStorage.getItem(STORE_KEY) || "{}")); } catch (e) {}
}

// haku: suodattaa tehtävänumeroiden tunnuksilla (esim. M12, D5, P2)
function applySearch() {
  const inp = $("#search");
  const v = inp ? inp.value.trim().toLowerCase() : "";
  document.querySelectorAll("#qlist button").forEach(b => {
    b.style.display = !v || b.textContent.toLowerCase().includes(v) ? "" : "none";
  });
}

$("#prev").onclick = () => { if (idx > 0) { idx--; render(); } };
$("#next").onclick = () => { if (idx < visible().length - 1) { idx++; render(); } };

// gnome-kuva ja "youve been gnomed" -linkki näyttävät prank-kuvan
const prank = $("#prank");
const showPrank = () => prank.classList.remove("hidden");
prank.onclick = () => prank.classList.add("hidden");
// salainen linkki: gnomea klikattaessa näkyy prank-kuva ja avautuu video uudessa välilehdessä (monka)
$("#gnomecorner").onclick = () => {
  showPrank();
  window.open("https://www.youtube.com/watch?v=6n3pFFPSlW4", "_blank", "noopener");
};

// haku, edistymisen nollaus, nuolinäppäimet ja tallennetun tilan lataus
$("#search").oninput = applySearch;
$("#resetprog").onclick = () => {
  if (!confirm("Nollataanko kaikki valmiit tehtävät?")) return;
  Object.keys(state).forEach(k => delete state[k]);
  try { localStorage.removeItem(STORE_KEY); } catch (e) {}
  idx = 0;
  render();
};
document.addEventListener("keydown", e => {
  if (e.target.matches("input, textarea")) return;   // ei häiritse kirjoittamista
  if (e.key === "ArrowRight") $("#next").click();
  if (e.key === "ArrowLeft") $("#prev").click();
});
loadProgress();

// äänen mykistys
const muteBtn = document.createElement("button");
muteBtn.id = "mute";
const paintMute = () => { muteBtn.textContent = muted ? "🔇 Ääni pois" : "🔊 Ääni päällä"; };
muteBtn.onclick = () => { muted = !muted; paintMute(); };
paintMute();
document.querySelector("aside").appendChild(muteBtn);

render();
