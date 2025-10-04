document.addEventListener('DOMContentLoaded', () => {

// set footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Tab switching
const tabBtns = document.querySelectorAll(".tab-btn");
const topicBtns = document.querySelectorAll("#topics-list .topic-select");

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // reset active
    tabBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const term = btn.getAttribute("data-term");
    topicBtns.forEach(t => {
      if (term === "all" || t.getAttribute("data-term") === term) {
        t.classList.remove("hidden");
      } else {
        t.classList.add("hidden");
      }
    });
  });
});

/* ---------------------------
  Utility & theme handling
   --------------------------- */
document.getElementById('year').textContent = new Date().getFullYear();

const themes = {
  'spiderman': {bg:['#0b172a','#d62828','#e63946'],text:'#ffffff',btn1:'#0ea5e9',btn2:'#ef4444',ghost:'#0b1220'},
  'bloodred': {bg:['#2a0000','#660000','#b30000'],text:'#ffeaea',btn1:'#7f1d1d',btn2:'#b91c1c',ghost:'#1a1a1a'},
  'red-blue': {bg:['#2b2d42','#ef233c','#3a86ff'],text:'#ffffff',btn1:'#ef233c',btn2:'#3a86ff',ghost:'#161a2b'},
  'purple-black': {bg:['#0f0b1d','#3b0d54','#12002b'],text:'#ffffff',btn1:'#7c3aed',btn2:'#a21caf',ghost:'#0b0b12'},
  'sapphire-steel': {bg:['#13293d','#006494','#247ba0'],text:'#ffffff',btn1:'#00a6fb',btn2:'#0582ca',ghost:'#0d1b2a'},
  'emerald-charcoal': {bg:['#004d40','#1c313a','#2e7d32'],text:'#ffffff',btn1:'#10b981',btn2:'#065f46',ghost:'#0b1f1a'},
  'digital-twilight': {bg:['#0f2027','#203a43','#2c5364'],text:'#ffffff',btn1:'#22d3ee',btn2:'#0ea5e9',ghost:'#0a151b'},
  'coral-aqua': {bg:['#ff6f61','#6bc5d2','#004d61'],text:'#ffffff',btn1:'#ff8fa3',btn2:'#00bcd4',ghost:'#0f2a2f'},
  'electric-citrus': {bg:['#ff9f1c','#ffbf69','#ff4040'],text:'#000000',btn1:'#ff7f50',btn2:'#ff4040',ghost:'#2b1a00'},
  'artisan-clay': {bg:['#b3541e','#d9a066','#8c4a2f'],text:'#ffffff',btn1:'#b3541e',btn2:'#8c4a2f',ghost:'#2a140a'},
  'forest-canopy': {bg:['#004b23','#006400','#228b22'],text:'#ffffff',btn1:'#16a34a',btn2:'#065f46',ghost:'#06220f'},
  'ocean-depth': {bg:['#011f4b','#03396c','#005b96'],text:'#ffffff',btn1:'#3b82f6',btn2:'#0ea5e9',ghost:'#041024'},
  'desert-sunset': {bg:['#ff7e5f','#feb47b','#ffcc70'],text:'#000000',btn1:'#f97316',btn2:'#fde68a',ghost:'#3a1d0b'},
  'monochrome-focus': {bg:['#111111','#333333','#555555'],text:'#ffffff',btn1:'#6b7280',btn2:'#9ca3af',ghost:'#141414'},
  'soft-nordic': {bg:['#a8dadc','#457b9d','#1d3557'],text:'#000000',btn1:'#1d3557',btn2:'#457b9d',ghost:'#0f2338'},
  'neutral-peach': {bg:['#ffe0b2','#f48fb1','#f06292'],text:'#000000',btn1:'#f48fb1',btn2:'#f06292',ghost:'#3d2b2b'},
  'retro-pop': {bg:['#ff00ff','#00ffff','#ffff00'],text:'#000000',btn1:'#ff00ff',btn2:'#00ffff',ghost:'#1a1020'},
  'cyberpunk-glow': {bg:['#0f0b1d','#ff0080','#7928ca'],text:'#ffffff',btn1:'#ff0080',btn2:'#7928ca',ghost:'#0a0713'},
  'plum-gold': {bg:['#4b006e','#b07bac','#ffd700'],text:'#ffffff',btn1:'#a855f7',btn2:'#f59e0b',ghost:'#1a0a26'}
};

const dropdown = document.getElementById('theme-dropdown');
const themeChip = document.getElementById('theme-chip');
dropdown.addEventListener('change', ()=> applyTheme(dropdown.value));
document.getElementById('reset-theme').addEventListener('click', ()=> applyTheme('bloodred'));
document.getElementById('print-btn').addEventListener('click', ()=> window.print());

function applyTheme(name){
  const t = themes[name] || themes['bloodred'];
  document.documentElement.style.setProperty('--bg1', t.bg[0]);
  document.documentElement.style.setProperty('--bg2', t.bg[1]);
  document.documentElement.style.setProperty('--bg3', t.bg[2]);
  document.documentElement.style.setProperty('--text', t.text);
  document.documentElement.style.setProperty('--btn1', t.btn1);
  document.documentElement.style.setProperty('--btn2', t.btn2);
  document.documentElement.style.setProperty('--ghost', t.ghost);
  themeChip.style.background = `linear-gradient(90deg, ${t.bg.join(',')})`;
}
applyTheme('bloodred');
/* ---------------------------
   Helpers
--------------------------- */
function fmt(x, d=4){
  return Number.parseFloat(x).toFixed(d);
}



/* ---------------------------
  Utilities
   --------------------------- */
function el(html){const t=document.createElement('template');t.innerHTML=html.trim();return t.content.firstChild}
const approxEq = (a,b,eps=1e-10)=> Math.abs(a-b) <= eps;
const clamp01 = v => Math.max(0, Math.min(1, v));
function fmt(n,dec=8){ if(!isFinite(n)) return 'NaN'; const as = Number(n); return (Math.abs(as) < 1e-12) ? '0' : (Number.isInteger(as) ? as.toString() : as.toPrecision(dec)); }
function fact(n){ if(n<0) return NaN; if(n===0) return 1; let r=1; for(let i=1;i<=n;i++) r*=i; return r; }
function nPk(n,k){ return fact(n)/fact(n-k); }
function nCk(n,k){ return fact(n)/(fact(k)*fact(n-k)); }

/* ---------------------------
  Topic rendering
   --------------------------- */
const topicRoot = document.getElementById('topic-root');
const topicButtons = document.querySelectorAll('.topic-select');
topicButtons.forEach(b=>b.addEventListener('click', ()=>renderTopic(b.dataset.topic)));

function renderTopic(topic){
  let html='';
  if(topic==='prob') html = probHTML();
  else if(topic==='perm') html = permHTML();
  else if(topic==='atleast') html = atleastHTML();
  else if(topic==='cond') html = condHTML();
  else if(topic==='bayes') html = bayesHTML();
  else if(topic==='sets') html = setsHTML();
  else if(topic==='rv') html = rvHTML();
  else if(topic==='house') html = houseHTML();

  // Term 2 Topics
  else if(topic==='uniform') html = uniformHTML();
  else if(topic==='binomial') html = binomialHTML();
  else if(topic==='poisson') html = poisExpHTML();
  else if(topic==='normal') html = normalHTML();
  else if(topic==='sampling') html = samplingHTML();
  else if(topic==='ci') html = ciHTML();
  else if(topic==='ht-mean') html = htMeanHTML();
  else if(topic==='ht-2means') html = ht2MeansHTML();
  else if(topic==='ht-sigma-unknown') html = htSigmaUnknownHTML();
  else if(topic==='ht-2samples-unknown') html = ht2SamplesUnknownHTML();
  else if(topic==='ht-paired') html = htPairedHTML();
  else if(topic==='ht-fit') html = htFitHTML();
  else if(topic==='ht-assoc') html = htAssocHTML();
  else if(topic==='ht-regression') html = htRegressionHTML();
  else if(topic==='form-sheet') html = formulaSheetHTML();

  topicRoot.innerHTML='';
  topicRoot.appendChild(el(html));
  bindTopicEvents(topic);
  if(window.MathJax) MathJax.typesetPromise();
}


/* ---------------------------
  Help popup function (dark, non-transparent)
   --------------------------- */
function attachHelp(selector, text){
  const target = document.querySelector(selector);
  if(!target) return;
  const btn = target.querySelector('.help');
  if(!btn) return;
  let pop;
  btn.addEventListener('click', (e)=>{
    e.stopPropagation();
    if(pop){ pop.remove(); pop=null; return; }
    pop = document.createElement('div');
    pop.className='help-popup';
    pop.innerHTML=text;
    target.style.position='relative';
    target.appendChild(pop);
    pop.style.top = '120%';
    pop.style.left = '0';
  });
  document.addEventListener('click', ()=>{ if(pop){pop.remove(); pop=null;} });
}

/* ---------------------------
  1) Basic Probability
   --------------------------- */
function probHTML(){
  return `
  <div>
    <h2 class="text-2xl font-semibold">Basic Probability</h2>
    <p class="mt-2 text-sm opacity-90">Definition: $P(A)=\\dfrac{\\text{favourable outcomes}}{\\text{total outcomes}}$</p>
    <div class="mt-4 grid gap-4 md:grid-cols-2">
      <div class="label" id="help-k">Favourable outcomes (k) <span class="help">?</span></div>
      <input id="prob-k" class="input" type="number" min="0" value="1" />
      <div class="label" id="help-n">Total outcomes (n) <span class="help">?</span></div>
      <input id="prob-n" class="input" type="number" min="1" value="52" />
    </div>
    <div class="mt-4 flex gap-2">
      <button id="prob-explain" class="btn btn-primary">Explain</button>
      <button id="prob-example" class="btn btn-ghost">Load example</button>
    </div>
    <div id="prob-output" class="mt-5 topic-card p-4 rounded-md steps"></div>
  </div>`;
}
function explainProb(){
  const k = Number(document.getElementById('prob-k').value);
  const n = Number(document.getElementById('prob-n').value);
  const out = document.getElementById('prob-output');
  if(n<=0 || k<0){ out.innerHTML = `<p>Please enter valid non-negative numbers.</p>`; return; }
  const p = k/n;
  out.innerHTML = `
    <p><strong>Given</strong>: k=${k}, n=${n}</p>
    <p>Definition:</p>
    <p class="block">$P(A)=\\dfrac{\\text{favourable}}{\\text{total}}$</p>
    <p>Compute:</p>
    <p class="block">$P(A)=\\dfrac{${k}}{${n}} = ${fmt(p,8)}$</p>
    <p>Decimal: ${fmt(p,8)} (i.e., ${(p*100).toFixed(4)}\\%)</p>`;
  if(window.MathJax) MathJax.typesetPromise();
}

/* ---------------------------
  2) Permutations / Combinations / Counting
   --------------------------- */
function permHTML(){
  return `
  <div>
    <h2 class="text-2xl font-semibold">Permutations, Combinations & Counting</h2>
    <p class="mt-2 text-sm opacity-90">Permutations: order matters. Combinations: order doesn't. Options: with/without repetition.</p>
    <div class="mt-4 grid gap-4 md:grid-cols-2">
      <div class="label" id="help-pn">Total items (n) <span class="help">?</span></div>
      <input id="pc-n" class="input" type="number" min="0" value="5" />
      <div class="label" id="help-pk">Selected (k) <span class="help">?</span></div>
      <input id="pc-k" class="input" type="number" min="0" value="3" />
      <div class="label" id="help-rep">Repetition allowed? <span class="help">?</span></div>
      <select id="pc-rep" class="input text-black"><option value="no">No (without repetition)</option><option value="yes">Yes (with repetition)</option></select>
      <div class="label" id="help-type">Counting type <span class="help">?</span></div>
      <select id="pc-type" class="input text-black">
        <option value="perm">Permutation (order matters)</option>
        <option value="comb">Combination (order not important)</option>
        <option value="arrangements">Arrangements (general)</option>
      </select>
      <div class="label" id="help-sample">Sample space size (optional for probability) <span class="help">?</span></div>
      <input id="pc-space" class="input" type="number" min="0" value="0" />
    </div>
    <div class="mt-4 flex gap-2">
      <button id="pc-explain" class="btn btn-primary">Explain</button>
      <button id="pc-example" class="btn btn-ghost">Load example</button>
    </div>
    <div id="pc-output" class="mt-5 topic-card p-4 rounded-md steps"></div>
  </div>`;
}
function explainPC(){
  const n = Number(document.getElementById('pc-n').value);
  const k = Number(document.getElementById('pc-k').value);
  const rep = document.getElementById('pc-rep').value;
  const type = document.getElementById('pc-type').value;
  const space = Number(document.getElementById('pc-space').value);
  const out = document.getElementById('pc-output');
  if(k>n && rep==='no' && type!=='arrangements'){ out.innerHTML = `<p>For <em>without repetition</em>, k cannot exceed n.</p>`; return; }
  let count=0, formula='', expl='';
  if(type==='perm'){
    if(rep==='yes'){ count = Math.pow(n,k); formula = '$n^k$'; expl='With repetition and order matters.'; }
    else { count = nPk(n,k); formula = '$P(n,k)=\\dfrac{n!}{(n-k)!}$'; expl='Without repetition and order matters.'; }
  } else if(type==='comb'){
    if(rep==='yes'){ count = nCk(n+k-1,k); formula = '$\\binom{n+k-1}{k}$'; expl='With repetition and order irrelevant (stars and bars).'; }
    else { count = nCk(n,k); formula = '$\\binom{n}{k}=\\dfrac{n!}{k!(n-k)!}$'; expl='Without repetition and order irrelevant.'; }
  } else {
    if(rep==='yes'){ count = Math.pow(n,k); formula = '$n^k$'; expl='General product rule with repetition.'; }
    else { count = nPk(n,k); formula = '$n\\cdot(n-1)\\cdot\\dots\\cdot(n-k+1)$'; expl='Product rule without repetition.'; }
  }
  let probHTML='';
  if(space>0){ const p = count/space; probHTML = `<p class="block">Probability (if equally likely): $\\dfrac{${count}}{${space}} = ${fmt(p,8)}$</p>`; }
  out.innerHTML = `
    <p><strong>Inputs</strong>: n=${n}, k=${k}, repetition: ${rep}, type: ${type}</p>
    <p><strong>Formula</strong>: ${formula}</p>
    <p class="block">Count = ${fmt(count,12)}</p>
    <p>${expl}</p>
    ${probHTML}`;
  if(window.MathJax) MathJax.typesetPromise();
}

/* ---------------------------
  3) At least one error
   --------------------------- */
function atleastHTML(){
  return `
  <div>
    <h2 class="text-2xl font-semibold">Probability of At Least One</h2>
    <p class="mt-2 text-sm opacity-90">For independent trials: $P(\\text{at least one error}) = 1-(1-p)^n$</p>
    <div class="mt-4 grid gap-4 md:grid-cols-2">
      <div class="label" id="help-p">Error probability per trial p <span class="help">?</span></div>
      <input id="al-p" class="input" type="number" step="any" min="0" max="1" value="0.1" />
      <div class="label" id="help-nn">Number of trials n <span class="help">?</span></div>
      <input id="al-n" class="input" type="number" min="1" value="5" />
    </div>
    <div class="mt-4 flex gap-2">
      <button id="al-explain" class="btn btn-primary">Explain</button>
      <button id="al-example" class="btn btn-ghost">Load example</button>
    </div>
    <div id="al-output" class="mt-5 topic-card p-4 rounded-md steps"></div>
  </div>`;
}
function explainAtLeast(){
  const p = clamp01(Number(document.getElementById('al-p').value));
  const n = Math.max(1, Number(document.getElementById('al-n').value));
  const out = document.getElementById('al-output');
  const none = Math.pow(1-p,n);
  const atleast = 1 - none;
  out.innerHTML = `
    <p><strong>Given</strong>: $p=${p}$, $n=${n}$</p>
    <p>No error in one trial: $1-p$</p>
    <p>No error in all $n$ independent trials: $(1-p)^n = ${fmt(none,10)}$</p>
    <p class="block">At least one error: $1-(1-p)^n = ${fmt(atleast,10)}$</p>`;
  if(window.MathJax) MathJax.typesetPromise();
}

/* ---------------------------
  4) Conditional + Independence
   --------------------------- */
function condHTML(){
  return `
  <div>
    <h2 class="text-2xl font-semibold">Conditional Probability & Independence</h2>
    <p class="mt-2 text-sm opacity-90">$P(A|B)=\\dfrac{P(A\\cap B)}{P(B)}$</p>
    <div class="mt-4 grid gap-4 md:grid-cols-2">
      <div class="label" id="help-joint">Joint P(A∩B) <span class="help">?</span></div>
      <input id="cond-joint" class="input" type="number" step="any" min="0" value="0.02" />
      <div class="label" id="help-pb">Marginal P(B) <span class="help">?</span></div>
      <input id="cond-b" class="input" type="number" step="any" min="0" value="0.1" />
      <div class="label" id="help-pa">Marginal P(A) (for independence) <span class="help">?</span></div>
      <input id="cond-a" class="input" type="number" step="any" min="0" value="0.2" />
    </div>
    <div class="mt-4 flex gap-2">
      <button id="cond-explain" class="btn btn-primary">Explain</button>
      <button id="cond-example" class="btn btn-ghost">Load example</button>
    </div>
    <div id="cond-output" class="mt-5 topic-card p-4 rounded-md steps"></div>
  </div>`;
}
function explainCond(){
  const joint = Number(document.getElementById('cond-joint').value);
  const pb = Number(document.getElementById('cond-b').value);
  const pa = Number(document.getElementById('cond-a').value);
  const out = document.getElementById('cond-output');
  if(pb<=0){ out.innerHTML = `<p>$P(B)$ must be positive.</p>`; return; }
  const cond = joint/pb;
  const indep = approxEq(joint, pa*pb, 1e-8);
  out.innerHTML = `
    <p><strong>Given</strong>: $P(A\\cap B)=${joint}$, $P(B)=${pb}$, $P(A)=${pa}$</p>
    <p class="block">$P(A|B)=\\dfrac{P(A\\cap B)}{P(B)}=\\dfrac{${joint}}{${pb}}=${fmt(cond,10)}$</p>
    <div class="solid-divider"></div>
    <p><strong>Independence test</strong>:</p>
    <p class="block">Compare $P(A\\cap B)$ with $P(A)P(B)$:</p>
    <p class="block">${fmt(joint,10)} vs ${fmt(pa*pb,10)}</p>
    <p>${indep ? '<strong>Conclusion:</strong> Events appear <strong>independent</strong>.' : '<strong>Conclusion:</strong> Events are <strong>not independent</strong>.'}</p>`;
  if(window.MathJax) MathJax.typesetPromise();
}

/* ---------------------------
  5) Bayes
   --------------------------- */
function bayesHTML(){
  return `
  <div>
    <h2 class="text-2xl font-semibold">Bayes' Theorem</h2>
    <p class="mt-2 text-sm opacity-90">$P(A|B)=\\dfrac{P(B|A)P(A)}{P(B)}$; $P(B)=P(B|A)P(A)+P(B|\\neg A)P(\\neg A)$</p>
    <div class="mt-4 grid gap-4 md:grid-cols-2">
      <div class="label" id="help-pa-bayes">Prior P(A) <span class="help">?</span></div>
      <input id="bayes-pa" class="input" type="number" step="any" min="0" max="1" value="0.01" />
      <div class="label" id="help-like">Likelihood P(B|A) <span class="help">?</span></div>
      <input id="bayes-l" class="input" type="number" step="any" min="0" max="1" value="0.95" />
      <div class="label" id="help-fp">False positive P(B|¬A) <span class="help">?</span></div>
      <input id="bayes-fp" class="input" type="number" step="any" min="0" max="1" value="0.05" />
      <div class="label" id="help-pb">Optional: Provide P(B) <span class="help">?</span></div>
      <input id="bayes-pb" class="input" type="number" step="any" min="0" max="1" placeholder="auto" />
    </div>
    <div class="mt-4 flex gap-2">
      <button id="bayes-explain" class="btn btn-primary">Explain</button>
      <button id="bayes-example" class="btn btn-ghost">Load example (disease test)</button>
    </div>
    <div id="bayes-output" class="mt-5 topic-card p-4 rounded-md steps"></div>
  </div>`;
}
function explainBayes(){
  const pa = clamp01(Number(document.getElementById('bayes-pa').value));
  const l = clamp01(Number(document.getElementById('bayes-l').value));
  const fp = clamp01(Number(document.getElementById('bayes-fp').value));
  const pbInput = document.getElementById('bayes-pb').value;
  const out = document.getElementById('bayes-output');
  if(isNaN(pa)||isNaN(l)||isNaN(fp)){ out.innerHTML = '<p>Please enter valid probabilities (0..1).</p>'; return; }
  const pb = pbInput ? clamp01(Number(pbInput)) : (l*pa + fp*(1-pa));
  const numerator = l*pa;
  const posterior = numerator/pb;
  out.innerHTML = `
    <p><strong>Identify pieces</strong>:</p>
    <ul class="list-disc ml-5">
      <li>Prior: $P(A)=${pa}$</li>
      <li>Likelihood: $P(B|A)=${l}$</li>
      <li>False positive: $P(B|\\neg A)=${fp}$</li>
    </ul>
    <p class="mt-2">Denominator (law of total probability):</p>
    <p class="block">$P(B)=P(B|A)P(A)+P(B|\\neg A)P(\\neg A) = ${fmt(l*pa,10)} + ${fmt(fp*(1-pa),10)} = ${fmt(pb,10)}$</p>
    <p class="mt-2">Bayes' formula:</p>
    <p class="block">$P(A|B)=\\dfrac{${fmt(numerator,10)}}{${fmt(pb,10)}} = ${fmt(posterior,12)}$</p>
    <p>Interpretation: Posterior chance of $A$ given $B$ is ${(posterior*100).toFixed(4)}\\%.</p>`;
  if(window.MathJax) MathJax.typesetPromise();
}

/* ---------------------------
  6) Set Theory Tools (A, B, C, ... dynamic)
   --------------------------- */
function setsHTML(){
  return `
  <div>
    <h2 class="text-2xl font-semibold">Set Theory Tools</h2>
    <p class="mt-2 text-sm opacity-90">Work with A, B, C, ... (add/remove sets). Compute union, intersection, difference, symmetric difference, complement (requires U), Cartesian product, power set.</p>
    <div class="mt-4" id="sets-dyn">
      <div class="mb-2"><button id="add-set" class="btn btn-ghost">Add set</button> <button id="clear-sets" class="btn btn-ghost">Clear sets</button></div>
      <div id="sets-list"></div>
      <div class="mt-3 label" id="help-su">Universal set U (optional) <span class="help">?</span></div>
      <input id="set-u" class="input" placeholder="e.g. 1,2,3,4,5" />
      <div class="mt-3 label">Cartesian product display limit <input id="cp-limit" class="input max-w-[120px] ml-2" type="number" min="1" value="40" /></div>
    </div>
    <div class="mt-4 flex gap-2">
      <button id="sets-explain" class="btn btn-primary">Compute</button>
      <button id="sets-example" class="btn btn-ghost">Load example</button>
    </div>
    <div id="sets-output" class="mt-5 topic-card p-4 rounded-md steps"></div>
  </div>`;
}
function createSetRow(label) {
  const idx = label || String.fromCharCode(65 + document.querySelectorAll('.set-row').length); // A, B, C...
  return `
    <div class="set-row mt-2 p-2 border border-transparent rounded-md">
      <div class="flex gap-2 items-center">
        <div class="font-semibold">${idx}</div>
        <input class="input set-input flex-1" placeholder="e.g. 1,2,3 or a,b,c" />
        <button class="btn btn-ghost remove-set">Remove</button>
      </div>
    </div>`;
}
function parseSet(v){ return new Set(String(v||'').split(',').map(s=>s.trim()).filter(s=>s!=='')); }
function setToArray(s) { return Array.from(s.values()); }
const setOps = {
  union:(A,B)=> new Set([...A,...B]),
  inter:(A,B)=> new Set([...A].filter(x=>B.has(x))),
  diff:(A,B)=> new Set([...A].filter(x=>!B.has(x))),
  symdiff:(A,B)=> { const U=new Set([...A,...B]); const I=new Set([...A].filter(x=>B.has(x))); return new Set([...U].filter(x=>!I.has(x))); }
};
function explainSets(){
  const rows = document.querySelectorAll('.set-row');
  const arr = [];
  rows.forEach((r, i)=>{
    const val = r.querySelector('.set-input').value;
    arr.push({label: String.fromCharCode(65+i), set: parseSet(val)});
  });
  const Uraw = document.getElementById('set-u').value;
  const U = Uraw ? parseSet(Uraw) : null;
  const out = document.getElementById('sets-output');
  if(arr.length===0){ out.innerHTML = `<p>Add at least one set.</p>`; return; }
  // compute pairwise unions/intersections
  let html = `<p><strong>Sets</strong>: ${arr.map(a=>`${a.label}={${setToArray(a.set).join(', ')}}`).join('; ')}`;
  html += `</p><div class="solid-divider"></div>`;
  for(let i=0;i<arr.length;i++){
    for(let j=i+1;j<arr.length;j++){
      const A=arr[i].set, B=arr[j].set;
      const UAB = setOps.union(A,B), IAB = setOps.inter(A,B), DAB = setOps.diff(A,B), DBA = setOps.diff(B,A), XAB = setOps.symdiff(A,B);
      html += `<p class="block"><strong>${arr[i].label} \\cup ${arr[j].label}</strong> = {${setToArray(UAB).join(', ')}}</p>`;
      html += `<p class="block"><strong>${arr[i].label} \\cap ${arr[j].label}</strong> = {${setToArray(IAB).join(', ')}}</p>`;
      html += `<p class="block"><strong>${arr[i].label} \\setminus ${arr[j].label}</strong> = {${setToArray(DAB).join(', ')}}; <strong>${arr[j].label} \\setminus ${arr[i].label}</strong> = {${setToArray(DBA).join(', ')}}</p>`;
      html += `<p class="block"><strong>${arr[i].label} \\triangle ${arr[j].label}</strong> = {${setToArray(XAB).join(', ')}}</p><div class="solid-divider"></div>`;
    }
  }
  if(U){
    for(let i=0;i<arr.length;i++){
      const comp = setOps.diff(U, arr[i].set);
      html += `<p class="block"><strong>${arr[i].label}^c</strong> = {${setToArray(comp).join(', ')}}</p>`;
    }
  } else {
    html += `<p class="block"><em>Provide universal set U to compute complements.</em></p>`;
  }
  // cartesian for first two sets (if available)
  const cpLimit = Number(document.getElementById('cp-limit').value) || 40;
  if(arr.length>=2){
    const A = arr[0].set, B = arr[1].set;
    const pairs = [];
    for(const a of A) for(const b of B) pairs.push(`(${a},${b})`);
    html += `<div class="solid-divider"></div><p><strong>${arr[0].label} \\times ${arr[1].label} (first two sets)</strong> (showing up to ${cpLimit} pairs):</p>`;
    html += `<p class="block">${pairs.length <= cpLimit ? pairs.join(', ') : pairs.slice(0,cpLimit).join(', ') + ', ...'}</p>`;
  }
  // power sets for first set
  const A0 = arr[0].set;
  if(A0.size <= 12){
    const arr0 = setToArray(A0); const subsets = (1<<arr0.length);
    const list = [];
    for(let m=0;m<subsets && list.length < 256; m++){
      const sub=[]; for(let i=0;i<arr0.length;i++) if(m&(1<<i)) sub.push(arr0[i]); list.push(`{${sub.join(', ')}}`);
    }
    html += `<div class="solid-divider"></div><p><strong>Power set of ${arr[0].label}</strong> (capped at 256):</p><p class="block">${list.join(', ')}</p>`;
  } else html += `<div class="solid-divider"></div><p>Power set of ${arr[0].label} is too large to display (size: ${Math.pow(2, A0.size)}).</p>`;
  out.innerHTML = html;
  if(window.MathJax) MathJax.typesetPromise();
}

/* ---------------------------
  7) Random Variables — PMF & PDF + PMF-by-formula
   --------------------------- */
function rvHTML(){
  return `
  <div>
    <h2 class="text-2xl font-semibold">Random Variables — Discrete PMF & Continuous PDF</h2>
    <p class="mt-2 text-sm opacity-90">Compute $E[X]$, $Var[X]$, $E[X^2]$, and probabilities. Supports PMF-by-formula (enter formula in x) and range.</p>
    <div class="mt-3 grid gap-3 md:grid-cols-2">
      <div class="label" id="help-rv-kind">Type <span class="help">?</span></div>
      <select id="rv-kind" class="input text-black"><option value="discrete">Discrete PMF</option><option value="continuous">Continuous PDF (piecewise constant)</option></select>
      <div class="label">PMF by formula? <span class="help" id="help-pmf-by">?</span></div>
      <select id="rv-by" class="input text-black"><option value="manual">Manual rows</option><option value="formula">Formula: p(x) expression</option></select>
    </div>

    <div id="rv-formula-area" class="mt-3"></div>

    <div id="rv-table" class="mt-3"></div>

    <div class="grid md:grid-cols-3 gap-3 mt-3">
      <input id="rv-thresh-a" class="input" placeholder="a (for P[a < X < b])" />
      <input id="rv-thresh-b" class="input" placeholder="b (for P[a < X < b])" />
      <input id="rv-x0" class="input" placeholder="x₀ (for P[X>x₀] & P[X<x₀])" />
    </div>

    <div class="mt-4 flex flex-wrap gap-2">
      <button id="rv-add-row" class="btn btn-ghost">Add row</button>
      <button id="rv-explain" class="btn btn-primary">Explain</button>
      <button id="rv-normalize" class="btn btn-ghost">Auto-scale PDF/PMF (normalise)</button>
    </div>

    <div id="rv-output" class="mt-5 topic-card p-4 rounded-md steps"></div>
  </div>`;
}
function buildRVTable(kind, by){
  const wrap = document.getElementById('rv-table');
  wrap.innerHTML = '';
  if(by === 'formula' && kind==='discrete'){
    document.getElementById('rv-formula-area').innerHTML = `
      <div class="grid md:grid-cols-3 gap-3">
        <input id="rv-formula" class="input" placeholder="p(x) in variable x, e.g. x/15" value="x/15" />
        <input id="rv-range-lo" class="input" placeholder="x start (inclusive)" value="1" />
        <input id="rv-range-hi" class="input" placeholder="x end (inclusive)" value="5" />
      </div>
      <div class="mt-2"><button id="rv-generate" class="btn btn-ghost">Generate table from formula</button></div>`;
    document.getElementById('rv-generate').onclick = generatePMFbyFormula;
    // initial table fragment (will be filled by generate)
    wrap.innerHTML = `<p class="muted">Press "Generate table from formula" to compute the pmf table.</p>`;
    return;
  } else {
    document.getElementById('rv-formula-area').innerHTML = '';
  }

  if(kind==='continuous'){
    wrap.innerHTML = `
      <div class="grid md:grid-cols-4 gap-3">
        <div class="label">Interval start a</div><div class="label">Interval end b</div><div class="label">Density c</div><div></div>
        <input class="input rv-a" value="0"/><input class="input rv-b" value="1"/><input class="input rv-c" value="1"/><div class="flex items-center"><button class="btn btn-ghost rv-del">Delete</button></div>
      </div>`;
  } else {
    wrap.innerHTML = `
      <div class="grid md:grid-cols-4 gap-3">
        <div class="label">x</div><div class="label">p(x)</div><div class="label">x^2 p(x) (auto)</div><div></div>
        <input class="input rv-x" value="1"/><input class="input rv-p" value="0.2"/><input class="input rv-x2p" disabled value="0"/><div class="flex items-center"><button class="btn btn-ghost rv-del">Delete</button></div>
      </div>`;
  }
}
function attachRVHandlers(){
  const kindSel = document.getElementById('rv-kind');
  const bySel = document.getElementById('rv-by');
  buildRVTable(kindSel.value, bySel.value);
  kindSel.addEventListener('change', ()=> buildRVTable(kindSel.value, bySel.value));
  bySel.addEventListener('change', ()=> buildRVTable(kindSel.value, bySel.value));
  document.getElementById('rv-add-row').addEventListener('click', ()=>{
    const wrap = document.querySelector('#rv-table > .grid');
    const kind = document.getElementById('rv-kind').value;
    if(!wrap){ buildRVTable(kind, document.getElementById('rv-by').value); return; }
    if(kind==='continuous'){
      wrap.insertAdjacentHTML('beforeend', `<input class="input rv-a"/><input class="input rv-b"/><input class="input rv-c"/><div class="flex items-center"><button class="btn btn-ghost rv-del">Delete</button></div>`);
    } else {
      wrap.insertAdjacentHTML('beforeend', `<input class="input rv-x"/><input class="input rv-p"/><input class="input rv-x2p" disabled/><div class="flex items-center"><button class="btn btn-ghost rv-del">Delete</button></div>`);
    }
  });
  document.getElementById('rv-table').addEventListener('click', (e)=>{
    if(e.target.classList.contains('rv-del')) {
      const row = e.target.closest('.grid');
      // remove the last 4 nodes (x, p, x2p, button container) of the grid
      // remove by DOM approach: find button container and remove previous 3 siblings
      const cont = e.target.closest('div');
      const siblings = [];
      // remove backwards until we've removed 4 elements (assumes structure kept)
      let cur = cont.previousElementSibling;
      for(let i=0;i<3 && cur;i++){
        const prev = cur.previousElementSibling;
        cur.remove();
        cur = prev;
      }
      cont.remove();
    }
  });
}
function generatePMFbyFormula(){
  const formula = document.getElementById('rv-formula').value;
  const lo = parseInt(document.getElementById('rv-range-lo').value);
  const hi = parseInt(document.getElementById('rv-range-hi').value);
  const wrap = document.getElementById('rv-table');
  if(isNaN(lo) || isNaN(hi) || lo>hi){ wrap.innerHTML = `<p>Invalid range.</p>`; return; }
  // use math.js to compile formula
  let compile;
  try { compile = math.compile(formula); } catch(e){ wrap.innerHTML = `<p>Formula parse error: ${e.message}</p>`; return; }
  const rows = [];
  let sum = 0;
  for(let x=lo;x<=hi;x++){
    try {
      const scope = {x: x};
      const v = Number(compile.evaluate(scope));
      rows.push({x, p: v});
      sum += v;
    } catch(e){
      wrap.innerHTML = `<p>Evaluation error at x=${x}: ${e.message}</p>`; return;
    }
  }
  // display table and normalization hint
  let html = `<table><thead><tr><th>x</th><th>raw p(x)</th><th>normalized p(x)</th></tr></thead><tbody>`;
  for(const r of rows){
    const norm = (sum === 0) ? 0 : r.p / sum;
    html += `<tr><td>${r.x}</td><td>${fmt(r.p,10)}</td><td>${fmt(norm,10)}</td></tr>`;
  }
  html += `</tbody></table><p class="mt-2 muted">Sum of raw p(x): ${fmt(sum,10)}. Normalized p(x) divides each raw value by this sum to make a valid PMF.</p>`;
  wrap.innerHTML = html;
}

function explainRV(){
  const kind = document.getElementById('rv-kind').value;
  const out = document.getElementById('rv-output');
  const a = parseFloat(document.getElementById('rv-thresh-a').value);
  const b = parseFloat(document.getElementById('rv-thresh-b').value);
  const x0 = parseFloat(document.getElementById('rv-x0').value);
  // discrete manual
  if(kind==='discrete' && document.getElementById('rv-by').value === 'manual'){
    const xs = Array.from(document.querySelectorAll('.rv-x')).map(i=>parseFloat(i.value));
    const ps = Array.from(document.querySelectorAll('.rv-p')).map(i=>parseFloat(i.value));
    const pairs = xs.map((x,i)=>({x,p:ps[i]})).filter(o=>!isNaN(o.x)&&!isNaN(o.p));
    const pSum = pairs.reduce((s,o)=>s+o.p,0);
    const EX = pairs.reduce((s,o)=>s+o.x*o.p,0);
    const EX2 = pairs.reduce((s,o)=>s+o.x*o.x*o.p,0);
    const Var = EX2 - EX*EX;
    const Pgt = isNaN(x0)? null : pairs.filter(o=>o.x>x0).reduce((s,o)=>s+o.p,0);
    const Plt = isNaN(x0)? null : pairs.filter(o=>o.x<x0).reduce((s,o)=>s+o.p,0);
    const Pab = (isNaN(a)||isNaN(b))? null : pairs.filter(o=>o.x>a && o.x<b).reduce((s,o)=>s+o.p,0);
    out.innerHTML = `
      <p><strong>Check PMF</strong>: $\\sum p(x) = ${fmt(pSum,10)}$ ${approxEq(pSum,1,1e-6)?'(valid)': '(⚠ should equal 1 — use Normalize)'}</p>
      <p class="block">$E[X] = \\sum x p(x) = ${fmt(EX,10)}$</p>
      <p class="block">$E[X^2] = \\sum x^2 p(x) = ${fmt(EX2,10)}$</p>
      <p class="block">$Var[X] = E[X^2] - (E[X])^2 = ${fmt(Var,10)}$</p>
      ${!isNaN(x0)? `<p class="block">$P[X>${x0}] = ${fmt(Pgt,10)}$, $P[X<${x0}] = ${fmt(Plt,10)}$</p>` : ''}
      ${( !isNaN(a) && !isNaN(b))? `<p class="block">$P[${a} < X < ${b}] = ${fmt(Pab,10)}$</p>` : ''}
      <div class="solid-divider"></div>
      <p>Properties:</p>
      <ul class="ml-5">
        <li>$E[A+B] = E[A] + E[B]$</li>
        <li>$E[A-B] = E[A] - E[B]$</li>
        <li>$Var[A+B] = Var[A] + Var[B]$ (if independent)</li>
        <li>$Var[cA] = c^2 Var[A]$, $E[cA] = c E[A]$</li>
      </ul>
    `;
  } else if(kind==='continuous' || (kind==='discrete' && document.getElementById('rv-by').value === 'formula')){
    // continuous piecewise constant or discrete formula-generated table
    if(document.getElementById('rv-by').value === 'formula' && document.getElementById('rv-kind').value === 'discrete'){
      // the table area contains normalized values; parse them
      const rows = Array.from(document.querySelectorAll('#rv-table tbody tr')).map(tr=>{
        const tds = tr.querySelectorAll('td');
        return {x: Number(tds[0].textContent), p: Number(tds[2].textContent)};
      });
      if(rows.length===0){ out.innerHTML = '<p>Generate a PMF table first.</p>'; return; }
      const pSum = rows.reduce((s,r)=>s+r.p,0);
      const EX = rows.reduce((s,r)=>s+r.x*r.p,0);
      const EX2 = rows.reduce((s,r)=>s+r.x*r.x*r.p,0);
      const Var = EX2 - EX*EX;
      const Pgt = isNaN(x0)? null : rows.filter(o=>o.x>x0).reduce((s,o)=>s+o.p,0);
      const Plt = isNaN(x0)? null : rows.filter(o=>o.x<x0).reduce((s,o)=>s+o.p,0);
      const Pab = (isNaN(a)||isNaN(b))? null : rows.filter(o=>o.x>a && o.x<b).reduce((s,o)=>s+o.p,0);
      out.innerHTML = `
        <p><strong>Check PMF</strong>: $\\sum p(x) = ${fmt(pSum,10)}$ ${approxEq(pSum,1,1e-6)?'(valid)': '(⚠ should equal 1)'}</p>
        <p class="block">$E[X] = ${fmt(EX,10)}, E[X^2] = ${fmt(EX2,10)}, Var[X] = ${fmt(Var,10)}</p>
        ${!isNaN(x0)? `<p class="block">$P[X>${x0}] = ${fmt(Pgt,10)}$, $P[X<${x0}] = ${fmt(Plt,10)}$</p>` : ''}
        ${( !isNaN(a) && !isNaN(b))? `<p class="block">$P[${a} < X < ${b}] = ${fmt(Pab,10)}$</p>` : ''}
      `;
    } else {
      // continuous piecewise-constant
      const as = Array.from(document.querySelectorAll('.rv-a')).map(i=>parseFloat(i.value));
      const bs = Array.from(document.querySelectorAll('.rv-b')).map(i=>parseFloat(i.value));
      const cs = Array.from(document.querySelectorAll('.rv-c')).map(i=>parseFloat(i.value));
      let total = 0; for(let i=0;i<as.length;i++){ total += (bs[i]-as[i])*cs[i]; }
      const normWarn = approxEq(total,1,1e-6)? '' : `<p>⚠ Density integral ≠ 1 (currently ${fmt(total,10)}). Use "Auto-scale" to normalize.</p>`;
      let EX=0, EX2=0;
      for(let i=0;i<as.length;i++){ const a1=as[i], b1=bs[i], c=cs[i]; EX += c*( (b1*b1 - a1*a1)/2 ); EX2 += c*( (b1**3 - a1**3)/3 ); }
      const Var = EX2 - EX*EX;
      let Pgt=null, Plt=null, Pab=null;
      const x0v = parseFloat(document.getElementById('rv-x0').value);
      if(!isNaN(x0v)){
        Pgt=0; Plt=0;
        for(let i=0;i<as.length;i++){
          const a1=as[i], b1=bs[i], c=cs[i];
          if(x0v < a1) { Pgt += c*(b1-a1); }
          else if(x0v >= b1){ Plt += c*(b1-a1); }
          else { Pgt += c*(b1-x0v); Plt += c*(x0v-a1); }
        }
      }
      if(!isNaN(a) && !isNaN(b)){
        Pab = 0;
        for(let i=0;i<as.length;i++){
          const lo=Math.max(as[i],a), hi=Math.min(bs[i],b);
          if(hi>lo) Pab += cs[i]*(hi-lo);
        }
      }
      out.innerHTML = `
        ${normWarn}
        <p class="block">$E[X] = ${fmt(EX,10)}$</p>
        <p class="block">$E[X^2] = ${fmt(EX2,10)}$</p>
        <p class="block">$Var[X] = ${fmt(Var,10)}$</p>
        ${!isNaN(x0v)? `<p class="block">$P[X>${x0v}] = ${fmt(Pgt,10)}$, $P[X<${x0v}] = ${fmt(Plt,10)}$</p>` : ''}
        ${( !isNaN(a) && !isNaN(b))? `<p class="block">$P[${a} < X < ${b}] = ${fmt(Pab,10)}$</p>` : ''}
      `;
    }
  }
  if(window.MathJax) MathJax.typesetPromise();
}

function normalizeRV(){
  const kind = document.getElementById('rv-kind').value;
  const out = document.getElementById('rv-output');
  if(kind==='discrete' && document.getElementById('rv-by').value === 'manual'){
    const ps = Array.from(document.querySelectorAll('.rv-p')).map(i=>parseFloat(i.value));
    const sum = ps.reduce((s,v)=>s+v,0);
    if(sum === 0){ out.innerHTML = '<p>Cannot normalize: total probability is 0</p>'; return; }
    document.querySelectorAll('.rv-p').forEach((input, i)=>{ input.value = (ps[i]/sum).toString(); });
    explainRV();
  } else if(kind==='continuous'){
    const as = Array.from(document.querySelectorAll('.rv-a')).map(i=>parseFloat(i.value));
    const bs = Array.from(document.querySelectorAll('.rv-b')).map(i=>parseFloat(i.value));
    const cs = Array.from(document.querySelectorAll('.rv-c')).map(i=>parseFloat(i.value));
    let total = 0; for(let i=0;i<as.length;i++){ total += (bs[i]-as[i])*cs[i]; }
    if(total === 0){ out.innerHTML = '<p>Cannot normalize: integral is 0</p>'; return; }
    // scale densities
    document.querySelectorAll('.rv-c').forEach((input, i)=>{ input.value = (cs[i] / total).toString(); });
    explainRV();
  } else if(document.getElementById('rv-by').value === 'formula' && document.getElementById('rv-kind').value === 'discrete'){
    // regenerate and show normalized column already displays normalized values
    generatePMFbyFormula();
    explainRV();
  }
}

/* ---------------------------
  8) House advantage & betting UI
   --------------------------- */
function houseHTML(){
  return `
  <div>
    <h2 class="text-2xl font-semibold">House Advantage & Betting</h2>
    <p class="mt-2 text-sm opacity-90">Enter bet size, decimal odds or fractional, and win rate to compute expected value, house edge, and loss scenarios.</p>
    <div class="mt-3 grid gap-3 md:grid-cols-2">
      <div class="label">Bet amount (stake) <span class="help">?</span></div>
      <input id="bet-amt" class="input" type="number" min="0" value="10" />
      <div class="label">Win probability (player) <span class="help">?</span></div>
      <input id="bet-winrate" class="input" type="number" step="any" min="0" max="1" value="0.5" />
      <div class="label">Payout odds (decimal) <span class="help">?</span></div>
      <input id="bet-decimal" class="input" type="number" step="any" min="0" value="2.0" />
      <div class="label">Optional: number of plays (n)</div>
      <input id="bet-n" class="input" type="number" min="1" value="100" />
    </div>
    <div class="mt-3 flex gap-2">
      <button id="bet-explain" class="btn btn-primary">Compute House Edge & EV</button>
      <button id="bet-example" class="btn btn-ghost">Load example</button>
    </div>
    <div id="bet-output" class="mt-5 topic-card p-4 rounded-md steps"></div>
  </div>`;
}
function explainBet(){
  const stake = Number(document.getElementById('bet-amt').value);
  const p = clamp01(Number(document.getElementById('bet-winrate').value));
  const decimal = Number(document.getElementById('bet-decimal').value);
  const n = Math.max(1, Number(document.getElementById('bet-n').value));
  const out = document.getElementById('bet-output');
  // Expected payout per win = stake * (decimal - 1) (profit) or total return includes stake.
  // Expected profit per play = p * (stake*(decimal-1)) - (1-p) * stake
  const profitPerWin = stake * (decimal - 1);
  const expectedProfit = p * profitPerWin - (1-p) * stake;
  const expectedReturn = expectedProfit; // profit relative
  const houseEdge = -expectedReturn / ( stake * (p*decimal + (1-p)*0) ) || 0; // approximate relative to turnover; alternative measure below
  // More interpretable: Expected value per stake = expectedProfit / stake
  const evPerStake = expectedProfit / stake;
  // Over n plays expected total loss/gain
  const totalEv = expectedProfit * n;
  // Probability to lose entire bankroll impossible to calculate w/out bankroll; we show expected loss.
  out.innerHTML = `
    <p><strong>Inputs:</strong> stake = ${fmt(stake,6)}, player win rate p = ${fmt(p,6)}, decimal odds = ${fmt(decimal,6)}, plays n = ${n}</p>
    <p class="block">Payout profit on win = stake * (decimal - 1) = ${fmt(profitPerWin,6)}</p>
    <p class="block">Expected profit per play = $p \\times$ profit_on_win $-$ (1-p)$\\times$ stake = ${fmt(expectedProfit,8)}</p>
    <p class="block">Expected return per stake = ${fmt(evPerStake,8)} (i.e., ${(evPerStake*100).toFixed(4)}%)</p>
    <p class="block">Expected total after ${n} plays (expected profit) = ${fmt(totalEv,8)}</p>
    <div class="solid-divider"></div>
    <p><strong>House advantage (intuitive):</strong></p>
    <p class="muted">If house sets odds so that fair decimal = 1 / p. House edge per stake = (fair_payout - actual_payout)/fair_payout.</p>
    <p class="block">Fair decimal odds = ${fmt(1/p,6)}</p>
    <p class="block">House edge (approx) = 1 - (actual decimal / fair decimal) = ${fmt(1 - decimal * p,6)}</p>
    <p class="muted">Interpretation: positive value here means house expected profit fraction per stake.</p>
    <div class="solid-divider"></div>
    <p><strong>How much the house can expect to win (on average) from this bettor):</strong></p>
    <p class="block">Per play: ${fmt(-expectedProfit,8)} (negative = house profit if player EV negative)</p>
    <p class="block">Over ${n} plays: ${fmt(-totalEv,8)}</p>
  `;
}
/* ----- UNIFORM ----- */
/* ---------------------------
   9) Uniform Distribution
--------------------------- */
function uniformHTML(){
  return `
  <div>
    <h2 class="text-2xl font-semibold">Uniform Distribution</h2>
    <p class="mt-2 small">$X \\sim U(a,b)$</p>
    <div class="mt-4 grid gap-3 md:grid-cols-2">
      <div><label class="label">Lower bound (a)</label><input id="uni-a" class="input" type="number" value="0" /></div>
      <div><label class="label">Upper bound (b)</label><input id="uni-b" class="input" type="number" value="1" /></div>
      <div><label class="label">Point x</label><input id="uni-x" class="input" type="number" value="0.5" /></div>
      <div class="label">Bounds: low &lt; X &lt; high
        <div class="flex gap-2"><input id="uni-low" class="input" type="number" placeholder="lower"/><input id="uni-high" class="input" type="number" placeholder="upper"/></div>
      </div>
      <div class="col-span-2">
        <label class="label">Inverse: Find x for a given probability p</label>
        <div class="flex items-center gap-2">
          <select id="uni-inv-type" class="input">
            <option value="le">P(X ≤ x) = p</option>
            <option value="gt">P(X > x) = p</option>
          </select>
          <input id="uni-inv-p" class="input" type="number" min="0" max="1" step="0.01" value="0.5"/>
          <button id="uni-inv-calc" class="btn btn-secondary">Find x</button>
        </div>
      </div>
    </div>
    <div class="mt-4 flex gap-2">
      <button id="uni-explain" class="btn btn-primary">Explain & Calculate</button>
      <button id="uni-example" class="btn btn-ghost">Load example</button>
    </div>
    <div id="uni-output" class="mt-5 topic-card p-4 rounded-md steps"></div>
  </div>`;
}
function explainUniform(){
  const a = Number(document.getElementById('uni-a').value);
  const b = Number(document.getElementById('uni-b').value);
  const x = Number(document.getElementById('uni-x').value);
  const lowVal = document.getElementById('uni-low').value;
  const highVal = document.getElementById('uni-high').value;
  const out = document.getElementById('uni-output');

  if(!(b > a)){ 
    out.innerHTML = `<p class="text-red-400">Upper bound (b) must be greater than lower bound (a).</p>`; 
    return; 
  }

  const pdf = (x >= a && x <= b) ? 1 / (b - a) : 0;
  const cdf = (val) => (val < a) ? 0 : (val > b) ? 1 : (val - a) / (b - a);
  const cdfAtX = cdf(x);

  let boundsStr = '';
  if(lowVal !== '' && highVal !== ''){
    const lo = Number(lowVal), hi = Number(highVal);
    const raw = cdf(hi) - cdf(lo);
    const probBounds = Math.max(0, Math.min(1, raw));
    boundsStr = `
      <hr class="my-3 border-white/20">
      <h3 class="font-semibold">Probability for Range</h3>
      <p>Formula: $P(lo < X < hi) = F(hi) - F(lo)$</p>
      <p>Substitute: $= \\tfrac{${hi}-${a}}{${b}-${a}} - \\tfrac{${lo}-${a}}{${b}-${a}} = ${fmt(probBounds,8)}$</p>
      <p><strong>Excel:</strong> =IF(AND(x>=${a},x<=${b}), ((${hi}-${a})/(${b}-${a}) - (${lo}-${a})/(${b}-${a})), 0)</p>`;
  }

  out.innerHTML = `
    <h3 class="font-semibold">Analysis for x = ${x}</h3>
    <div class="space-y-3 mt-2">
      <p><strong>PDF:</strong><br>
         $f(x) = \\frac{1}{b-a}$ for $a \\leq x \\leq b$.<br>
         Substitute: $f(${x}) = \\tfrac{1}{${b}-${a}} = ${fmt(pdf,8)}$<br>
         <strong>Excel:</strong> =IF(AND(${x}>=${a},${x}<=${b}), 1/(${b}-${a}), 0)</p>

      <p><strong>CDF at x:</strong><br>
         $F(x) = \\tfrac{x-a}{b-a}$ for $a \\leq x \\leq b$.<br>
         Substitute: $F(${x}) = \\tfrac{${x}-${a}}{${b}-${a}} = ${fmt(cdfAtX,8)}$<br>
         <strong>Excel:</strong> =IF(${x}<${a},0,IF(${x}>${b},1,(${x}-${a})/(${b}-${a})))</p>

      <p><strong>P(X > x):</strong><br>
         $P(X>x) = 1 - F(x) = 1 - ${fmt(cdfAtX,8)} = ${fmt(1 - cdfAtX,8)}$<br>
         <strong>Excel:</strong> =1 - (( ${x}-${a})/(${b}-${a}))</p>
    </div>
    ${boundsStr}
    <hr class="my-3 border-white/20">
    <h3 class="font-semibold">Distribution Properties</h3>
    <p>Mean: $\\mu = \\tfrac{a+b}{2} = ${fmt((a+b)/2,8)}$<br><strong>Excel:</strong> =(${a}+${b})/2</p>
    <p>Variance: $\\sigma^2 = \\tfrac{(b-a)^2}{12} = ${fmt(Math.pow(b-a,2)/12,8)}$<br><strong>Excel:</strong> =(${b}-${a})^2/12</p>
  `;
  if(window.MathJax) MathJax.typesetPromise();
}


/* ----- BINOMIAL ----- */
function binomialHTML(){
  return `
  <div>
    <h2 class="text-2xl font-semibold">Binomial Distribution</h2>
    <p class="small">$X \\sim Bin(n,p)$</p>
    <div class="mt-4 grid gap-3 md:grid-cols-2">
      <div><label class="label">Trials (n)</label><input id="bin-n" class="input" type="number" value="10" /></div>
      <div><label class="label">Probability (p)</label><input id="bin-p" class="input" type="number" value="0.5" step="0.01" /></div>
      <div><label class="label">Successes (k)</label><input id="bin-k" class="input" type="number" value="5" /></div>
      <div class="label">Bounds: low ≤ X ≤ high
        <div class="flex gap-2"><input id="bin-low" class="input" type="number" placeholder="lower"/><input id="bin-high" class="input" type="number" placeholder="upper"/></div>
      </div>
      <div class="col-span-2">
        <label class="label">Inverse: Find k for a given cumulative probability</label>
        <div class="flex items-center gap-2">
          <select id="bin-inv-type" class="input"><option value="le">P(X ≤ k) ≥ p</option><option value="gt">P(X > k) ≤ p</option></select>
          <input id="bin-inv-p" class="input" type="number" min="0" max="1" step="0.01" value="0.5"/>
          <button id="bin-inv-calc" class="btn btn-secondary">Find k</button>
        </div>
      </div>
    </div>
    <div class="mt-4 flex gap-2"><button id="bin-explain" class="btn btn-primary">Explain & Calculate</button><button id="bin-example" class="btn btn-ghost">Load example</button></div>
    <div id="bin-output" class="mt-5 topic-card p-4 rounded-md steps"></div>
  </div>`;
}

function explainBinomial(){
  const n = Number(document.getElementById('bin-n').value);
  const p = Number(document.getElementById('bin-p').value);
  const k = Number(document.getElementById('bin-k').value);
  const lowVal = document.getElementById('bin-low').value;
  const highVal = document.getElementById('bin-high').value;
  const out = document.getElementById('bin-output');

  if(!Number.isInteger(n) || n<0 || isNaN(p) || p<0 || p>1 || isNaN(k) || k<0){
    out.innerHTML = `<p class="text-red-400">Invalid inputs. Ensure n & k are non-negative integers and 0 ≤ p ≤ 1.</p>`; return;
  }

  const choose = (nn, kk) => (typeof math !== 'undefined' && math.combinations) ? math.combinations(nn, kk) : nCk(nn, kk);
  const pmf = (val) => (val < 0 || val > n || !Number.isInteger(val)) ? 0 : choose(n, val) * Math.pow(p, val) * Math.pow(1 - p, n - val);
  const cdf = (val) => { let s=0; for (let i=0;i<=val;i++) s += pmf(i); return s; };

  const pmfAtK = pmf(k);
  const cdfAtK = cdf(k);
  const cdfAtKMinus1 = (k>0) ? cdf(k-1) : 0;

  let boundsStr = '';
  if(lowVal !== '' && highVal !== ''){
    const lo = Number(lowVal), hi = Number(highVal);
    const probBounds = (lo <= hi) ? (cdf(hi) - cdf(lo - 1)) : 0;
    boundsStr = `
      <hr class="my-3 border-white/20">
      <h3 class="font-semibold">Probability for Range</h3>
      <p>Formula: $P(${lo} ≤ X ≤ ${hi}) = F(${hi}) - F(${lo-1})$</p>
      <p>Value = ${fmt(probBounds,8)}</p>
      <p><strong>Excel:</strong> =BINOM.DIST(${hi},${n},${p},TRUE) - BINOM.DIST(${lo}-1,${n},${p},TRUE)</p>`;
  }

  out.innerHTML = `
    <h3 class="font-semibold">Analysis for k = ${k}</h3>
    <div class="space-y-4 mt-2">
      <p><strong>PMF:</strong><br>
         $P(X=k) = {n \\choose k} p^k (1-p)^{n-k}$<br>
         For k=${k}: $= {${n} \\choose ${k}} (${p})^{${k}} (1-${p})^{${n-k}} = ${fmt(pmfAtK,10)}$<br>
         <strong>Excel:</strong> =BINOM.DIST(${k},${n},${p},FALSE)</p>

      <p><strong>CDF at k:</strong><br>
         $P(X ≤ k) = \\sum_{i=0}^{k} {n \\choose i} p^i (1-p)^{n-i}$<br>
         Value = ${fmt(cdfAtK,10)}<br>
         <strong>Excel:</strong> =BINOM.DIST(${k},${n},${p},TRUE)</p>

      <p><strong>P(X < k):</strong><br>
         $P(X < k) = P(X ≤ k-1)$<br>
         Value = ${fmt(cdfAtKMinus1,10)}<br>
         <strong>Excel:</strong> =BINOM.DIST(${k-1},${n},${p},TRUE)</p>

      <p><strong>P(X > k):</strong><br>
         $P(X > k) = 1 - P(X ≤ k)$<br>
         Value = ${fmt(1-cdfAtK,10)}<br>
         <strong>Excel:</strong> =1 - BINOM.DIST(${k},${n},${p},TRUE)</p>

      <p><strong>P(X ≥ k):</strong><br>
         $P(X ≥ k) = 1 - P(X ≤ k-1)$<br>
         Value = ${fmt(1-cdfAtKMinus1,10)}<br>
         <strong>Excel:</strong> =1 - BINOM.DIST(${k-1},${n},${p},TRUE)</p>
    </div>
    ${boundsStr}
    <hr class="my-3 border-white/20">
    <h3 class="font-semibold">Properties</h3>
    <p>Mean: $\\mu = np = ${n}\\times${p} = ${fmt(n*p,8)}$<br>
       <strong>Excel:</strong> =${n}*${p}</p>
    <p>Variance: $\\sigma^2 = np(1-p) = ${n}\\times${p}\\times(1-${p}) = ${fmt(n*p*(1-p),8)}$<br>
       <strong>Excel:</strong> =${n}*${p}*(1-${p})</p>
  `;
  if(window.MathJax) MathJax.typesetPromise();
}

function inverseBinomial(){
  const n = Number(document.getElementById('bin-n').value);
  const p = Number(document.getElementById('bin-p').value);
  let targetP = Number(document.getElementById('bin-inv-p').value);
  const type = document.getElementById('bin-inv-type').value;
  const out = document.getElementById('bin-output');
  if(!Number.isInteger(n) || n<0 || isNaN(p) || p<0 || p>1 || isNaN(targetP) || targetP<0 || targetP>1){ out.innerHTML = `<p class="text-red-400">Invalid inputs for inverse calculation.</p>`; return; }

  const choose = (nn, kk) => (typeof math !== 'undefined' && math.combinations) ? math.combinations(nn, kk) : nCk(nn, kk);
  if (type === 'le'){
    let k = 0, cumulative = 0;
    while(k <= n){
      cumulative += choose(n,k) * Math.pow(p,k) * Math.pow(1-p, n-k);
      if (cumulative >= targetP) break;
      k++;
    }
    out.innerHTML = `<h3 class="font-semibold">Inverse Calculation</h3><p>Smallest k with P(X ≤ k) ≥ ${targetP} is <strong>k = ${k}</strong>.</p>`;
  } else {
    // find largest k such that P(X > k) ≤ targetP -> smallest k with P(X ≤ k) ≥ 1 - targetP
    const needed = 1 - targetP;
    let k = 0, cumulative = 0;
    while(k <= n){
      cumulative += choose(n,k) * Math.pow(p,k) * Math.pow(1-p, n-k);
      if (cumulative >= needed) break;
      k++;
    }
    out.innerHTML = `<h3 class="font-semibold">Inverse Calculation</h3><p>For P(X > k) ≤ ${targetP}, smallest k with P(X ≤ k) ≥ ${needed} is <strong>k = ${k}</strong>.</p>`;
  }
  if(window.MathJax) MathJax.typesetPromise();
}

/* ----- POISSON / EXPONENTIAL (toggle + shading) ----- */
function poisExpHTML(){
  return `
  <div>
    <h2 class="text-2xl font-semibold">Poisson & Exponential Distribution</h2>
    <p class="small">Select mode below:</p>
    <select id="mode-select" class="input mt-2">
      <option value="poisson">Poisson (discrete counts)</option>
      <option value="exp">Exponential (continuous waiting times)</option>
    </select>

    <div class="mt-4 grid gap-3 md:grid-cols-2">
      <div><label class="label">Rate (λ)</label>
        <input id="pois-l" class="input" type="number" value="3" step="0.1" /></div>

      <div id="poisson-inputs">
        <label class="label">k</label><input id="pois-k" class="input" type="number" value="2" />
      </div>

      <div id="exp-inputs" style="display:none;">
        <label class="label">x (time)</label><input id="exp-x" class="input" type="number" value="1" step="0.1" />
      </div>

      <div class="label">Bounds:
        <div class="flex gap-2">
          <input id="pois-low" class="input" type="number" placeholder="lower"/>
          <input id="pois-high" class="input" type="number" placeholder="upper"/>
        </div>
      </div>

      <div class="col-span-2">
        <label class="label">Inverse: Find value for cumulative probability</label>
        <div class="flex items-center gap-2">
          <input id="pois-inv-p" class="input" type="number" min="0" max="1" step="0.01" value="0.5"/>
          <button id="pois-inv-calc" class="btn btn-secondary">Find Value</button>
        </div>
      </div>
    </div>

    <div class="mt-4 flex gap-2">
      <button id="pois-explain" class="btn btn-primary">Explain & Calculate</button>
      <button id="pois-example" class="btn btn-ghost">Load example</button>
    </div>
    <canvas id="pois-chart" height="200" class="mt-6"></canvas>
    <div id="pois-output" class="mt-5 topic-card p-4 rounded-md steps"></div>
  </div>`;
}

/* Switch mode show/hide */
document.addEventListener("change", e=>{
  if(e.target && e.target.id==="mode-select"){
    document.getElementById("poisson-inputs").style.display = e.target.value==="poisson"?"block":"none";
    document.getElementById("exp-inputs").style.display = e.target.value==="exp"?"block":"none";
  }
});

function explainPoisExp(){
  const mode = document.getElementById("mode-select").value;
  const λ = Number(document.getElementById("pois-l").value);
  const lowVal = document.getElementById("pois-low").value;
  const highVal = document.getElementById("pois-high").value;
  const out = document.getElementById("pois-output");

  if(isNaN(λ) || λ<=0){ out.innerHTML = `<p class="text-red-400">λ must be > 0</p>`; return; }

  const ctx=document.getElementById('pois-chart').getContext('2d');
  if(window.poisChart){ window.poisChart.destroy(); }

  if(mode==="poisson"){
    const k = Number(document.getElementById("pois-k").value);
    const pmf=(val)=> Math.exp(-λ)*Math.pow(λ,val)/fact(val);
    const cdf=(val)=>{let s=0;for(let i=0;i<=val;i++) s+=pmf(i);return s;};
    const pmfAtK=pmf(k), cdfAtK=cdf(k);

    let boundsStr='';
    let range=null;
    if(lowVal!=='' && highVal!==''){
      const lo=Number(lowVal), hi=Number(highVal);
      let s=0; for(let i=Math.max(0,lo);i<=hi;i++) s+=pmf(i);
      boundsStr=`<hr><h3>Range Probability</h3>
        <p>P(${lo} ≤ X ≤ ${hi}) = ${fmt(s,10)}<br>
        <strong>Excel:</strong> =POISSON.DIST(${hi},${λ},TRUE)-POISSON.DIST(${lo}-1,${λ},TRUE)</p>`;
      range=[lo,hi];
    }

    out.innerHTML=`
      <h3>Poisson: X ~ Pois(${λ})</h3>
      <p><strong>P(X=${k}):</strong> ${fmt(pmfAtK,10)}<br>
      Excel: =POISSON.DIST(${k},${λ},FALSE)</p>
      <p><strong>P(X ≤ ${k}):</strong> ${fmt(cdfAtK,10)}<br>
      Excel: =POISSON.DIST(${k},${λ},TRUE)</p>
      <p><strong>P(X > ${k}):</strong> ${fmt(1-cdfAtK,10)}<br>
      Excel: =1-POISSON.DIST(${k},${λ},TRUE)</p>
      ${boundsStr}
      <hr><p>Mean = Var = ${λ}</p>`;

    // Graph (bar with shading)
    const labels=[...Array(k+10).keys()];
    const probs=labels.map(v=>pmf(v));
    const bg=labels.map(v=>{
      if(range && v>=range[0] && v<=range[1]) return 'rgba(37,99,235,0.5)';
      if(v===k) return 'rgba(239,68,68,0.7)';
      return 'rgba(148,163,184,0.4)';
    });
    window.poisChart=new Chart(ctx,{
      type:'bar',
      data:{labels,datasets:[{label:'P(X=k)',data:probs,backgroundColor:bg}]},
      options:{scales:{x:{title:{display:true,text:'k'}},y:{title:{display:true,text:'P(X=k)'}}}}
    });
  } else {
    const x=Number(document.getElementById("exp-x").value);
    const pdf=λ*Math.exp(-λ*x);
    const cdf=1-Math.exp(-λ*x);

    let boundsStr='';
    let range=null;
    if(lowVal!=='' && highVal!==''){
      const lo=Number(lowVal), hi=Number(highVal);
      const prob=Math.exp(-λ*lo)-Math.exp(-λ*hi);
      boundsStr=`<hr><h3>Range Probability</h3>
        <p>P(${lo} ≤ X ≤ ${hi}) = ${fmt(prob,10)}<br>
        Excel: =EXP(-${λ}*${lo})-EXP(-${λ}*${hi})</p>`;
      range=[lo,hi];
    }

    out.innerHTML=`
      <h3>Exponential: X ~ Exp(${λ})</h3>
      <p><strong>PDF f(${x}):</strong> ${fmt(pdf,10)}<br>
      Excel: =EXPON.DIST(${x},${λ},FALSE)</p>
      <p><strong>P(X < ${x}):</strong> ${fmt(cdf,10)}<br>
      Excel: =EXPON.DIST(${x},${λ},TRUE)</p>
      <p><strong>P(X > ${x}):</strong> ${fmt(Math.exp(-λ*x),10)}<br>
      Excel: =EXP(-${λ}*${x})</p>
      ${boundsStr}
      <hr><p>Mean=1/λ=${fmt(1/λ,8)}, Var=1/λ²=${fmt(1/(λ*λ),8)}</p>`;

    // Graph (curve with shading)
    const xs=[],ys=[],start=0,end=Math.max(x*2, (range?range[1]:5));
    const step=end/100;
    for(let xi=0;xi<=end;xi+=step){
      xs.push(xi); ys.push(λ*Math.exp(-λ*xi));
    }
    const bg=ys.map(()=> 'rgba(148,163,184,0.6)');
    // overlay shading
    const shadeData=xs.map((xi,i)=>{
      if(range && xi>=range[0] && xi<=range[1]) return ys[i];
      if(!range && xi<=x) return ys[i];
      return null;
    });
    window.poisChart=new Chart(ctx,{
      type:'line',
      data:{labels:xs,datasets:[
        {label:'PDF',data:ys,borderColor:'#2563eb',fill:false},
        {label:'Shaded',data:shadeData,borderColor:'rgba(239,68,68,0.7)',backgroundColor:'rgba(239,68,68,0.3)',fill:true}
      ]},
      options:{scales:{x:{title:{display:true,text:'x'}},y:{title:{display:true,text:'Density'}}}}
    });
  }
  if(window.MathJax) MathJax.typesetPromise();
}

/* Inverse function */
function inversePoisExp(){
  const mode=document.getElementById("mode-select").value;
  const λ=Number(document.getElementById("pois-l").value);
  const targetP=Number(document.getElementById("pois-inv-p").value);
  const out=document.getElementById("pois-output");
  if(isNaN(λ)||λ<=0||isNaN(targetP)||targetP<0||targetP>1){
    out.innerHTML=`<p class="text-red-400">Invalid inputs for inverse.</p>`; return;
  }
  if(mode==="poisson"){
    let k=0,cum=0,pmf=(v)=>Math.exp(-λ)*Math.pow(λ,v)/fact(v);
    while(cum<targetP && k<1e6){ cum+=pmf(k); k++; }
    out.innerHTML=`<h3>Poisson Inverse</h3>
      Smallest k with P(X ≤ k) ≥ ${targetP} is <strong>${k-1}</strong><br>
      Formula: find k such that Σ₀ᵏ P(X=i) ≥ p<br>
      Excel: iterative with POISSON.DIST`;
  } else {
    const x=-Math.log(1-targetP)/λ;
    out.innerHTML=`<h3>Exponential Inverse</h3>
      Solve p=1-e^{-λx} → x=-ln(1-p)/λ<br>
      For p=${targetP}: x=${fmt(x,8)}<br>
      Excel: =-LN(1-${targetP})/${λ}`;
  }
  if(window.MathJax) MathJax.typesetPromise();
}

/* Event listeners */
const poisExpExplain=document.getElementById('pois-explain');
if(poisExpExplain) poisExpExplain.addEventListener('click',explainPoisExp);

const poisExpExample=document.getElementById('pois-example');
if(poisExpExample) poisExpExample.addEventListener('click',()=>{
  const mode=document.getElementById('mode-select').value;
  if(mode==="poisson"){ document.getElementById('pois-l').value=3; document.getElementById('pois-k').value=2; }
  else { document.getElementById('pois-l').value=2; document.getElementById('exp-x').value=1.5; }
  explainPoisExp();
});

const poisExpInv=document.getElementById('pois-inv-calc');
if(poisExpInv) poisExpInv.addEventListener('click',inversePoisExp);


/* ---------------------------
  SETUP & HELPER FUNCTIONS
--------------------------- */

// This function can be called to inject and set up the entire component.
function setupNormalDistributionApp() {
  const container = document.getElementById('app-container'); // Ensure you have a div with this ID in your HTML
  if (container) {
    container.innerHTML = normalHTML();
    addNormalEventListeners();
    explainNormal(); // Perform an initial calculation and draw the graph
  } else {
    console.error("Container element with ID 'app-container' not found.");
  }
}

// A simple number formatting function
function fmt(number, decimals) {
    if (isNaN(number)) return 'NaN';
    return number.toFixed(decimals);
}

/* ----- STATISTICAL HELPERS (NORMAL DISTRIBUTION) ----- */

/* fast erf approximation (Abramowitz & Stegun) */
function erf_approx(x){
  if(typeof Math.erf === 'function') return Math.erf(x);
  const sign = (x >= 0) ? 1 : -1;
  const ax = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * ax);
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429;
  const y = 1 - (((((a5*t + a4)*t + a3)*t + a2)*t + a1) * t) * Math.exp(-ax*ax);
  return sign * y;
}
function stdNormalCDF(z){
  return 0.5 * (1 + erf_approx(z / Math.SQRT2));
}
/* Acklam inverse normal (fast and accurate) */
function stdNormalInv(p){
  const a = [-3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02, 1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00];
  const b = [-5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02, 6.680131188771972e+01, -1.328068155288572e+01];
  const c = [-7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00, -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00];
  const d = [7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00, 3.754408661907416e+00];
  const plow = 0.02425, phigh = 1 - plow;
  if(p <= 0) return -Infinity;
  if(p >= 1) return Infinity;
  let q, r;
  if(p < plow){
    q = Math.sqrt(-2*Math.log(p));
    return (((((c[0]*q + c[1])*q + c[2])*q + c[3])*q + c[4])*q + c[5]) / ((((d[0]*q + d[1])*q + d[2])*q + d[3])*q + 1);
  } else if(p > phigh){
    q = Math.sqrt(-2*Math.log(1 - p));
    return -(((((c[0]*q + c[1])*q + c[2])*q + c[3])*q + c[4])*q + c[5]) / ((((d[0]*q + d[1])*q + d[2])*q + d[3])*q + 1);
  } else {
    q = p - 0.5;
    r = q*q;
    return (((((a[0]*r + a[1])*r + a[2])*r + a[3])*r + a[4])*r + a[5]) * q /
           (((((b[0]*r + b[1])*r + b[2])*r + b[3])*r + b[4])*r + 1);
  }
}

/* ---------------------------
  NORMAL DISTRIBUTION COMPONENT
--------------------------- */

function normalHTML(){
  return `
  <div>
    <h2 class="text-2xl font-semibold">Normal Distribution</h2>
    <p class="small">X ~ N(μ, σ²)</p>
    <div class="mt-4 grid gap-3 md:grid-cols-2">
      <div><label class="label">μ (mean)</label><input id="norm-mu" class="input" type="number" value="0" step="0.1" /></div>
      <div><label class="label">σ (sd)</label><input id="norm-sigma" class="input" type="number" value="1" step="0.1" /></div>
      <div><label class="label">Point x</label><input id="norm-x" class="input" type="number" value="1.64" /></div>
      <div class="label">Bounds low ≤ X ≤ high
        <div class="flex gap-2"><input id="norm-low" class="input" type="number" placeholder="lower"/><input id="norm-high" class="input" type="number" placeholder="upper"/></div>
      </div>
      <div class="col-span-2">
        <label class="label">Inverse: Find x such that P(X ≤ x) = p or P(X > x) = p</label>
        <div class="flex items-center gap-2">
          <select id="norm-inv-type" class="input"><option value="le">P(X ≤ x) = p</option><option value="gt">P(X > x) = p</option></select>
          <input id="norm-inv-p" class="input" type="number" min="0" max="1" step="0.0001" value="0.95"/>
          <button id="norm-inv-calc" class="btn btn-secondary">Find x</button>
        </div>
      </div>
    </div>
    <div class="mt-4 flex gap-2"><button id="norm-explain" class="btn btn-primary">Calculate</button><button id="norm-example" class="btn btn-ghost">Load example</button></div>
    
    <!-- NEW: Shading Toggle Buttons -->
    <div class="mt-6">
      <label class="label">Graph Shading</label>
      <div id="norm-shade-toggle" class="flex gap-1">
        <button data-shade="left" class="btn btn-toggle active">P(X ≤ x)</button>
        <button data-shade="right" class="btn btn-toggle">P(X ≥ x)</button>
        <button data-shade="between" class="btn btn-toggle">Between</button>
      </div>
    </div>

    <canvas id="norm-chart" height="200" class="mt-4"></canvas>
    <div id="norm-output" class="mt-5 topic-card p-4 rounded-md steps"></div>
  </div>`;
}

function explainNormal(){
  const mu = Number(document.getElementById('norm-mu').value);
  const sigma = Number(document.getElementById('norm-sigma').value);
  const x = Number(document.getElementById('norm-x').value);
  const lowVal = document.getElementById('norm-low').value;
  const highVal = document.getElementById('norm-high').value;
  const out = document.getElementById('norm-output');

  if(isNaN(mu) || isNaN(sigma) || sigma <= 0){ out.innerHTML = `<p class="text-red-400">σ must be positive.</p>`; return; }

  const z = (x - mu) / sigma;
  const pdf = (1 / (sigma * Math.sqrt(2*Math.PI))) * Math.exp(-0.5 * z * z);
  const cdf = stdNormalCDF(z);

  let boundsStr = '';
  if(lowVal !== '' && highVal !== ''){
    const lo = Number(lowVal), hi = Number(highVal);
    const czlo = stdNormalCDF((lo - mu) / sigma);
    const czhi = stdNormalCDF((hi - mu) / sigma);
    boundsStr = `<hr class="my-3 border-white/20"><h3 class="font-semibold">Range Probability</h3>
      <p>P(${lo} ≤ X ≤ ${hi}) = ${fmt(Math.max(0, czhi - czlo), 10)}<br>
      <strong>Excel:</strong> =NORM.DIST(${hi},${mu},${sigma},TRUE)-NORM.DIST(${lo},${mu},${sigma},TRUE)</p>`;
  }

 out.innerHTML = `
    <h3 class="font-semibold">Analysis for x = ${x}</h3>
    <div class="space-y-2 mt-2">
      <p><strong>PDF f(x):</strong> ${fmt(pdf, 10)}<br>
      <strong>Excel:</strong> =NORM.DIST(${x},${mu},${sigma},FALSE)</p>

      <p><strong>P(X ≤ x):</strong> ${fmt(cdf, 10)}<br>
      <strong>Excel:</strong> =NORM.DIST(${x},${mu},${sigma},TRUE)</p>

      <p><strong>P(X > x):</strong> ${fmt(1 - cdf, 10)}<br>
      <strong>Excel:</strong> =1-NORM.DIST(${x},${mu},${sigma},TRUE)</p>
    </div>
    ${boundsStr}
    <hr class="my-3 border-white/20">
    <p>Mean = ${fmt(mu,8)}, SD = ${fmt(sigma,8)}</p>
  `;

  if(window.MathJax) MathJax.typesetPromise();

  // ---- UPDATED Graph Logic using Chart.js ----
  const shadeToggle = document.getElementById('norm-shade-toggle');
  const activeShadeButton = shadeToggle.querySelector('.btn-toggle.active');
  const shadeMode = activeShadeButton ? activeShadeButton.dataset.shade : 'left';

  const ctx = document.getElementById('norm-chart').getContext('2d');
  if(window.normChart){ window.normChart.destroy(); }
  
  const xs = [], ys = [], ys_shaded = [];
  const start = mu - 4 * sigma, end = mu + 4 * sigma, step = (end - start) / 200;
  const lowBound = (lowVal !== '') ? Number(lowVal) : -Infinity;
  const highBound = (highVal !== '') ? Number(highVal) : Infinity;

  for(let xi = start; xi <= end; xi += step){
    const zi = (xi - mu) / sigma;
    const yi = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * zi * zi);
    xs.push(xi);
    ys.push(yi);

    let shouldShade = false;
    switch (shadeMode) {
      case 'left': if (xi <= x) shouldShade = true; break;
      case 'right': if (xi >= x) shouldShade = true; break;
      case 'between': if (xi >= lowBound && xi <= highBound) shouldShade = true; break;
    }
    ys_shaded.push(shouldShade ? yi : null);
  }
  
  window.normChart = new Chart(ctx,{
    type:'line',
    data:{
      labels:xs,
      datasets:[
        {
          label: 'Shaded Area',
          data: ys_shaded,
          fill: 'origin',
          backgroundColor: 'rgba(37, 99, 235, 0.5)',
          borderColor: 'transparent',
          pointRadius: 0,
        },
        {
          label:'Normal PDF',
          data:ys,
          fill:false,
          borderColor:'#2563eb',
          borderWidth: 2,
          pointRadius: 0,
        }
    ]},
    options:{
      scales:{
        x:{ type: 'linear', title:{display:true,text:'x'}, ticks: { callback: v => fmt(v, 2) }},
        y:{ title:{display:true,text:'Density'}, beginAtZero: true }
      },
      plugins: { legend: { display: false } },
      interaction: { intersect: false, mode: 'index' }
    }
  });
}

function inverseNormal(){
  const mu = Number(document.getElementById('norm-mu').value);
  const sigma = Number(document.getElementById('norm-sigma').value);
  let p = Number(document.getElementById('norm-inv-p').value);
  const type = document.getElementById('norm-inv-type').value;
  const out = document.getElementById('norm-output');

  if(isNaN(mu) || isNaN(sigma) || sigma <= 0 || isNaN(p) || p <= 0 || p >= 1){
    out.innerHTML = `<p class="text-red-400">Invalid inputs (0 < p < 1 and σ > 0).</p>`; return;
  }
  if(type === 'gt') p = 1 - p;
  const z = stdNormalInv(p);
  const x = mu + sigma * z;
  out.innerHTML = `<h3 class="font-semibold">Inverse Calculation</h3>
    <p>Value of x such that <strong>${document.getElementById('norm-inv-type').selectedOptions[0].text}</strong> is <strong>${fmt(x, 8)}</strong>.<br>
    <strong>Excel:</strong> =NORM.INV(${p},${mu},${sigma})</p>`;
  if(window.MathJax) MathJax.typesetPromise();
}

document.addEventListener('click', (e) => {
  // --- Button Clicks by ID ---
  if (e.target.id === 'norm-explain') {
    explainNormal();
  }
  if (e.target.id === 'norm-inv-calc') {
    inverseNormal();
  }
  if (e.target.id === 'norm-example') {
    document.getElementById('norm-mu').value = "100";
    document.getElementById('norm-sigma').value = "15";
    document.getElementById('norm-x').value = "115";
    document.getElementById('norm-low').value = "90";
    document.getElementById('norm-high').value = "120";
    explainNormal();
  }

  // --- Shade Toggle Buttons ---
  // Check if a button inside the toggle container was clicked
  if (e.target.closest('#norm-shade-toggle') && e.target.tagName === 'BUTTON') {
    // Remove 'active' class from all toggle buttons
    document.querySelectorAll('#norm-shade-toggle .btn-toggle').forEach(btn => {
      btn.classList.remove('active');
    });
    // Add 'active' class to the clicked button
    e.target.classList.add('active');
    // Redraw the graph with the new shading
    explainNormal();
  }
});

/* ---------------------------
  13) Confidence Interval for Mean
   --------------------------- */
function ciHTML() {
  return `
  <div>
    <h2 class="text-2xl font-semibold">Confidence Interval for Mean</h2>
    <p class="mt-2 text-sm opacity-90">Calculate the range within which the true population mean is likely to lie, based on a sample.</p>
    <div class="mt-4 grid gap-4 md:grid-cols-2">
      <div class="label" id="help-ci-mean">Sample Mean (x̄) <span class="help">?</span></div>
      <input id="ci-mean" class="input text-black" type="number" value="22" />
      <div class="label" id="help-ci-stddev">Standard Deviation (σ) <span class="help">?</span></div>
      <input id="ci-stddev" class="input text-black" type="number" value="4" />
      <div class="label" id="help-ci-n">Sample Size (n) <span class="help">?</span></div>
      <input id="ci-n" class="input text-black" type="number" min="1" value="36" />
      <div class="label" id="help-ci-confidence">Confidence Level (%) <span class="help">?</span></div>
      <input id="ci-confidence" class="input text-black" type="number" min="0" max="100" value="99" />
    </div>
    <div class="mt-4 flex gap-2">
      <button id="ci-explain" class="btn btn-primary">Explain</button>
      <button id="ci-example" class="btn btn-ghost">Load example</button>
    </div>
    <div id="ci-output" class="mt-5 topic-card p-4 rounded-md steps"></div>
  </div>`;
}

function explainCI() {
  // 1. Get user inputs from the HTML elements
  const mean = Number(document.getElementById('ci-mean').value);
  const stddev = Number(document.getElementById('ci-stddev').value);
  const n = Number(document.getElementById('ci-n').value);
  const confidence = Number(document.getElementById('ci-confidence').value);
  const out = document.getElementById('ci-output');

  // 2. Validate inputs
  if (n <= 0 || stddev < 0 || confidence <= 0 || confidence >= 100) {
    out.innerHTML = `<p>Please enter valid inputs. Sample size and confidence level must be positive, and standard deviation cannot be negative.</p>`;
    return;
  }

  // 3. Calculate necessary values
  // A map of common z-scores for different confidence levels
  const zScores = { 90: 1.645, 95: 1.96, 98: 2.326, 99: 2.576 };
  const z = zScores[confidence] || 2.58; // Use common value or default to 2.58 for 99%
  
  const marginOfError = z * (stddev / Math.sqrt(n));
  const lowerBound = mean - marginOfError;
  const upperBound = mean + marginOfError;

  // 4. Generate the explanation HTML
  out.innerHTML = `
    <p><strong>Inputs</strong>: Sample Mean (x̄) = ${mean}, Standard Deviation (σ) = ${stddev}, Sample Size (n) = ${n}, Confidence Level = ${confidence}%</p>
    
    <h3 class="text-lg font-semibold mt-4">Formulae</h3>
    <p>The formula for the confidence interval (CI) is:</p>
    <p class="text-center my-2">$\\large CI = \\bar{x} \\pm Z \\cdot \\frac{\\sigma}{\\sqrt{n}}$</p>
    <p>Where the Margin of Error (E) is: $E = Z \\cdot \\frac{\\sigma}{\\sqrt{n}}$</p>
    
    <h3 class="text-lg font-semibold mt-4">Working Out</h3>
    <ol class="list-decimal list-inside space-y-2">
        <li>
            <strong>Find the Z-score (critical value).</strong>
            <p class="ml-4">For a ${confidence}% confidence level, the corresponding Z-score is approximately <strong>${z.toFixed(3)}</strong>.</p>
        </li>
        <li>
            <strong>Calculate the Margin of Error (E).</strong>
            <p class="ml-4">$E = ${z.toFixed(3)} \\cdot \\frac{${stddev}}{\\sqrt{${n}}}$</p>
            <p class="ml-4">$E = ${z.toFixed(3)} \\cdot \\frac{${stddev}}{${Math.sqrt(n).toFixed(3)}}$</p>
            <p class="ml-4">$E \\approx ${marginOfError.toFixed(4)}$</p>
        </li>
        <li>
            <strong>Calculate the Confidence Interval.</strong>
            <p class="ml-4">Lower Bound = $\\bar{x} - E = ${mean} - ${marginOfError.toFixed(4)} = \\mathbf{${lowerBound.toFixed(4)}}$</p>
            <p class="ml-4">Upper Bound = $\\bar{x} + E = ${mean} + ${marginOfError.toFixed(4)} = \\mathbf{${upperBound.toFixed(4)}}$</p>
            </li>
    </ol>

    <h3 class="text-lg font-semibold mt-4">Result</h3>
    <p>With ${confidence}% confidence, the true population mean is estimated to be between <strong>${lowerBound.toFixed(2)}</strong> and <strong>${upperBound.toFixed(2)}</strong>.</p>
  `;

  // 5. Re-render mathematical formulas using MathJax
  if (window.MathJax) {
    MathJax.typesetPromise();
  }
}

/* ---------------------------
  14) Sampling Distribution of the Sample Mean
   --------------------------- */

function samplingHTML() {
  return `
  <div>
    <h2 class="text-2xl font-semibold">Sampling Distribution of the Sample Mean</h2>
    <p class="small">X̄ ~ N(μ, σ²/n)</p>
    <div class="mt-4 grid gap-3 md:grid-cols-2">
      <div><label class="label">μ (Population Mean)</label><input id="sampling-mu" class="input" type="number" value="100" /></div>
      <div><label class="label">σ (Population SD)</label><input id="sampling-sigma" class="input" type="number" value="15" /></div>
      <div><label class="label">n (Sample Size)</label><input id="sampling-n" class="input" type="number" value="30" min="2" /></div>
      <div><label class="label">Point x̄ (Sample Mean)</label><input id="sampling-x" class="input" type="number" value="105" /></div>
      <div class="label">Bounds low ≤ X̄ ≤ high
        <div class="flex gap-2"><input id="sampling-low" class="input" type="number" placeholder="lower"/><input id="sampling-high" class="input" type="number" placeholder="upper"/></div>
      </div>
      <div class="col-span-2">
        <label class="label">Inverse: Find x̄ such that P(X̄ ≤ x̄) = p</label>
        <div class="flex items-center gap-2">
          <select id="sampling-inv-type" class="input"><option value="le">P(X̄ ≤ x̄) = p</option><option value="gt">P(X̄ > x̄) = p</option></select>
          <input id="sampling-inv-p" class="input" type="number" min="0" max="1" step="0.0001" value="0.95"/>
          <button id="sampling-inv-calc" class="btn btn-secondary">Find x̄</button>
        </div>
      </div>
    </div>
    <div class="mt-4 flex gap-2"><button id="sampling-explain" class="btn btn-primary">Explain & Calculate</button><button id="sampling-example" class="btn btn-ghost">Load example</button></div>
    <canvas id="sampling-chart" height="200" class="mt-6"></canvas>
    <div id="sampling-output" class="mt-5 topic-card p-4 rounded-md steps"></div>
  </div>`;
}

function explainSampling() {
  const mu = Number(document.getElementById('sampling-mu').value);
  const sigma = Number(document.getElementById('sampling-sigma').value);
  const n = Number(document.getElementById('sampling-n').value);
  const x_bar = Number(document.getElementById('sampling-x').value);
  const lowVal = document.getElementById('sampling-low').value;
  const highVal = document.getElementById('sampling-high').value;
  const out = document.getElementById('sampling-output');

  if (isNaN(mu) || isNaN(sigma) || sigma <= 0 || isNaN(n) || n < 2) {
    out.innerHTML = `<p class="text-red-400">σ must be positive and n must be at least 2.</p>`;
    // Clear any previous chart if input is invalid
    const ctx = document.getElementById('sampling-chart').getContext('2d');
    if(window.samplingChart){ window.samplingChart.destroy(); }
    return;
  }

  // 1. Calculate the Standard Error
  const stdError = sigma / Math.sqrt(n);

  // 2. Use the Standard Error to calculate Z-score and CDF
  const z = (x_bar - mu) / stdError;
  const cdf = stdNormalCDF(z);

  let boundsStr = '';
  if (lowVal !== '' && highVal !== '') {
    const lo = Number(lowVal), hi = Number(highVal);
    const z_lo = (lo - mu) / stdError;
    const z_hi = (hi - mu) / stdError;
    const cdf_lo = stdNormalCDF(z_lo);
    const cdf_hi = stdNormalCDF(z_hi);
    boundsStr = `<hr class="my-3 border-white/20"><h3 class="font-semibold">Range Probability</h3>
      <p>P(${lo} ≤ X̄ ≤ ${hi}) = F(${hi}) - F(${lo}) = ${fmt(Math.max(0, cdf_hi - cdf_lo), 10)}<br>
      Z-scores: Z_low = ${fmt(z_lo, 4)}, Z_high = ${fmt(z_hi, 4)}<br>
      <strong>Excel:</strong> =NORM.DIST(${hi}, ${mu}, ${stdError}, TRUE) - NORM.DIST(${lo}, ${mu}, ${stdError}, TRUE)</p>`;
  }

  out.innerHTML = `
    <h3 class="font-semibold">Distribution Parameters</h3>
    <div class="space-y-2 mt-2">
     <p><strong>Mean of Sample Means (μ_x̄):</strong> μ = <strong>${fmt(mu, 8)}</strong></p>
     <p><strong>Standard Error (σ_x̄):</strong> σ/√n = ${sigma}/√${n} = <strong>${fmt(stdError, 8)}</strong></p>
    </div>
    <hr class="my-3 border-white/20">
    <h3 class="font-semibold">Analysis for sample mean x̄ = ${x_bar}</h3>
    <div class="space-y-2 mt-2">
      <p><strong>Z-score:</strong> ${fmt(z, 10)}<br>
      Formula: $z = \\frac{\\bar{x} - \\mu}{\\sigma / \\sqrt{n}} = \\frac{${x_bar} - ${mu}}{${sigma} / \\sqrt{${n}}} = ${fmt(z, 4)}$</p>

      <p><strong>P(X̄ < ${x_bar}):</strong> ${fmt(cdf, 10)}<br>
      Formula: $P(X̄ < \\bar{x}) = \\Phi(z)$<br>
      <strong>Excel:</strong> =NORM.DIST(${x_bar}, ${mu}, ${stdError}, TRUE)</p>

      <p><strong>P(X̄ > ${x_bar}):</strong> ${fmt(1 - cdf, 10)}<br>
      Formula: $P(X̄ > \\bar{x}) = 1 - \\Phi(z)$<br>
      <strong>Excel:</strong> =1-NORM.DIST(${x_bar}, ${mu}, ${stdError}, TRUE)</p>
    </div>
    ${boundsStr}
  `;

  if (window.MathJax) MathJax.typesetPromise();

  // ---- Graph using Chart.js ----
  const ctx = document.getElementById('sampling-chart').getContext('2d');
  if (window.samplingChart) { window.samplingChart.destroy(); }
  const xs = [], ys = [];
  const start = mu - 4 * stdError, end = mu + 4 * stdError, step = (end - start) / 100;
  for (let xi = start; xi <= end; xi += step) {
    const zi = (xi - mu) / stdError;
    ys.push((1 / (stdError * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * zi * zi));
    xs.push(xi);
  }
  window.samplingChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: xs,
      datasets: [{
        label: 'Sampling Distribution PDF',
        data: ys,
        fill: false,
        borderColor: '#2563eb',
        borderWidth: 2,
        pointRadius: 0
      }]
    },
    options: {
      scales: {
        x: { title: { display: true, text: 'Sample Mean (x̄)' }, ticks: { callback: v => fmt(v,2) } },
        y: { title: { display: true, text: 'Density' } }
      }
    }
  });
}

function inverseSampling() {
  const mu = Number(document.getElementById('sampling-mu').value);
  const sigma = Number(document.getElementById('sampling-sigma').value);
  const n = Number(document.getElementById('sampling-n').value);
  let p = Number(document.getElementById('sampling-inv-p').value);
  const type = document.getElementById('sampling-inv-type').value;
  const out = document.getElementById('sampling-output');

  if (isNaN(mu) || isNaN(sigma) || sigma <= 0 || isNaN(n) || n < 2 || isNaN(p) || p <= 0 || p >= 1) {
    out.innerHTML = `<p class="text-red-400">Invalid inputs (0 < p < 1, σ > 0, n ≥ 2).</p>`;
    return;
  }
  
  const stdError = sigma / Math.sqrt(n);
  
  // Adjust probability for "greater than" queries
  if (type === 'gt') p = 1 - p;

  const z = stdNormalInv(p);
  const x_bar = mu + stdError * z;

  out.innerHTML = `<h3 class="font-semibold">Inverse Calculation</h3>
    <p>Sample mean (x̄) such that <strong>${document.getElementById('sampling-inv-type').selectedOptions[0].text}</strong> is <strong>${fmt(x_bar, 8)}</strong>.<br>
    Formula: $x̄ = \\mu + z_p \\cdot (\\sigma / \\sqrt{n})$<br>
    The z-score for p=${p.toFixed(4)} is ${fmt(z, 4)}.<br>
    <strong>Excel:</strong> =NORM.INV(${p}, ${mu}, ${stdError})</p>`;
  if (window.MathJax) MathJax.typesetPromise();
}
/* ---------------------------
  15) Hypothesis Test: One-Sample Z-Test for Mean
   --------------------------- */

function htMeanHTML() {
  return `
  <div>
    <h2 class="text-2xl font-semibold">Hypothesis Test: Mean (Z-Test)</h2>
    <p class="mt-2 text-sm opacity-90">Test a claim about a population mean when the population standard deviation (σ) is known.</p>
    
    <div class="mt-4 grid gap-4 md:grid-cols-2">
      <div><label class="label">Population Mean (μ₀ under H₀)</label><input id="ht-mu0" class="input" type="number" value="400" /></div>
      <div><label class="label">Sample Mean (x̄)</label><input id="ht-xbar" class="input" type="number" value="393" /></div>
      <div><label class="label">Population SD (σ)</label><input id="ht-sigma" class="input" type="number" value="20" /></div>
      <div><label class="label">Sample Size (n)</label><input id="ht-n" class="input" type="number" min="2" value="65" /></div>
      <div class="col-span-2"><label class="label">Significance Level (α, in %)</label><input id="ht-alpha" class="input" type="number" min="0" max="100" value="5" /></div>
      <div class="col-span-2">
        <label class="label">Hypothesis Type</label>
        <select id="ht-type" class="input">
          <option value="neq">Two-tailed (H₁: μ ≠ μ₀)</option>
          <option value="lt">Left-tailed (H₁: μ < μ₀)</option>
          <option value="gt">Right-tailed (H₁: μ > μ₀)</option>
        </select>
      </div>
    </div>
    
    <div class="mt-4 flex gap-2">
      <button id="ht-explain" class="btn btn-primary">Run Test & Explain</button>
      <button id="ht-example" class="btn btn-ghost">Load example</button>
    </div>
    <div id="ht-output" class="mt-5 topic-card p-4 rounded-md steps"></div>

    <hr class="my-6 border-white/20">

    <h3 class="text-xl font-semibold">Inverse Calculator: P-value to Z-score</h3>
    <div class="mt-3 grid gap-3 md:grid-cols-3">
        <div><label class="label">P-value</label><input id="ht-inv-p" class="input" type="number" min="0" max="1" step="0.001" value="0.05" /></div>
        <div>
          <label class="label">Tails</label>
          <select id="ht-inv-tails" class="input"><option value="one">One-tailed</option><option value="two">Two-tailed</option></select>
        </div>
        <div class="self-end"><button id="ht-inv-calc" class="btn btn-secondary w-full">Find Z-score</button></div>
    </div>
    <div id="ht-inv-output" class="mt-4 topic-card p-4 rounded-md steps"></div>
  </div>`;
}

function explainHTMean() {
    const mu0 = Number(document.getElementById('ht-mu0').value);
    const x_bar = Number(document.getElementById('ht-xbar').value);
    const sigma = Number(document.getElementById('ht-sigma').value);
    const n = Number(document.getElementById('ht-n').value);
    const alpha_percent = Number(document.getElementById('ht-alpha').value);
    const type = document.getElementById('ht-type').value;
    const out = document.getElementById('ht-output');

    if (isNaN(mu0) || isNaN(x_bar) || isNaN(sigma) || sigma <= 0 || isNaN(n) || n < 2 || isNaN(alpha_percent) || alpha_percent <= 0 || alpha_percent >= 100) {
        out.innerHTML = `<p class="text-red-400">Please provide valid inputs. σ must be positive, n must be at least 2, and α must be between 0 and 100.</p>`;
        return;
    }

    const alpha = alpha_percent / 100;
    const stdError = sigma / Math.sqrt(n);
    const z_stat = (x_bar - mu0) / stdError;

    let h0, h1, tail_desc, p_value, critical_str, rejection_region_str, conclusion_claim;

    if (type === 'neq') {
        tail_desc = "two-tailed";
        h0 = `H₀: μ = ${mu0}`;
        h1 = `H₁: μ ≠ ${mu0}`;
        conclusion_claim = `the mean is different from ${mu0}`;
        p_value = 2 * (z_stat < 0 ? stdNormalCDF(z_stat) : 1 - stdNormalCDF(z_stat));
        const cv = stdNormalInv(1 - alpha / 2);
        critical_str = `±${fmt(cv, 3)}`;
        rejection_region_str = `Z < -${fmt(cv, 3)} or Z > ${fmt(cv, 3)}`;
    } else if (type === 'lt') {
        tail_desc = "left-tailed";
        h0 = `H₀: μ ≥ ${mu0}`;
        h1 = `H₁: μ < ${mu0}`;
        conclusion_claim = `the mean is less than ${mu0}`;
        p_value = stdNormalCDF(z_stat);
        const cv = stdNormalInv(alpha);
        critical_str = `${fmt(cv, 3)}`;
        rejection_region_str = `Z < ${fmt(cv, 3)}`;
    } else { // 'gt'
        tail_desc = "right-tailed";
        h0 = `H₀: μ ≤ ${mu0}`;
        h1 = `H₁: μ > ${mu0}`;
        conclusion_claim = `the mean is greater than ${mu0}`;
        p_value = 1 - stdNormalCDF(z_stat);
        const cv = stdNormalInv(1 - alpha);
        critical_str = `${fmt(cv, 3)}`;
        rejection_region_str = `Z > ${fmt(cv, 3)}`;
    }

    const reject_h0 = p_value < alpha;
    
    let conclusion;
    if (reject_h0) {
        conclusion = `<strong>We reject the null hypothesis.</strong> There is sufficient evidence at the ${alpha_percent}% significance level to conclude that ${conclusion_claim} (p-value ≈ ${fmt(p_value, 5)}).`;
    } else {
        conclusion = `<strong>We do not have sufficient evidence to reject the null hypothesis.</strong> We cannot conclude that the mean is different from ${mu0} (p-value ≈ ${fmt(p_value, 5)}).`;
    }

    out.innerHTML = `
        <ol class="list-decimal list-inside space-y-4">
            <li>
                <strong>State the Hypotheses:</strong> This is a ${tail_desc} test.
                <p class="ml-4 mt-1">Null Hypothesis (H₀): <strong>${h0}</strong></p>
                <p class="ml-4">Alternative Hypothesis (H₁): <strong>${h1}</strong></p>
            </li>
            <li>
                <strong>Significance Level (α):</strong> The chosen significance level is <strong>${alpha}</strong> (${alpha_percent}%).
            </li>
            <li>
                <strong>Calculate the Test Statistic (Z):</strong>
                <p class="ml-4 mt-1">Standard Error (σ_x̄) = σ/√n = ${sigma}/√${n} = ${fmt(stdError, 5)}</p>
                <p class="ml-4">Z = (x̄ - μ₀) / σ_x̄ = (${x_bar} - ${mu0}) / ${fmt(stdError, 5)} = <strong>${fmt(z_stat, 4)}</strong></p>
                <p class="ml-4"><strong>Excel:</strong> =(${x_bar}-${mu0})/(${sigma}/SQRT(${n}))</p>
            </li>
            <li>
                <strong>Determine Critical Region and P-value:</strong>
                <p class="ml-4 mt-1"><strong>Critical Value(s):</strong> The critical value for a ${tail_desc} test at α=${alpha} is <strong>${critical_str}</strong>.</p>
                <p class="ml-4"><strong>Rejection Region:</strong> Reject H₀ if <strong>${rejection_region_str}</strong>.</p>
                <p class="ml-4 mt-2"><strong>Calculated P-value:</strong> The probability of observing a test statistic this extreme or more is <strong>${fmt(p_value, 5)}</strong>.</p>
                <p class="ml-4 opacity-80 text-sm">The p-value represents the probability of obtaining your sample results (or more extreme) if the null hypothesis were actually true. A small p-value (typically < α) suggests that your observed data is unlikely under the null hypothesis.</p>
            </li>
            <li>
                <strong>Decision:</strong>
                <p class="ml-4 mt-1">Comparing the p-value to α: ${fmt(p_value, 5)} ${p_value < alpha ? '<' : '>'} ${alpha}.</p>
                <p class="ml-4">Comparing the test statistic to the critical value: The Z-statistic ${fmt(z_stat, 4)} ${reject_h0 ? 'falls' : 'does not fall'} in the rejection region.</p>
                <p class="ml-4">Both methods lead to the same decision: <strong>${reject_h0 ? 'Reject H₀' : 'Fail to Reject H₀'}</strong>.</p>
            </li>
            <li>
                <strong>Conclusion:</strong>
                <p class="ml-4 mt-1">${conclusion}</p>
            </li>
        </ol>
    `;
    if(window.MathJax) MathJax.typesetPromise();
}

function inversePtoZ() {
    const p = Number(document.getElementById('ht-inv-p').value);
    const tails = document.getElementById('ht-inv-tails').value;
    const out = document.getElementById('ht-inv-output');

    if (isNaN(p) || p <= 0 || p >= 1) {
        out.innerHTML = `<p class="text-red-400">P-value must be between 0 and 1.</p>`;
        return;
    }
    
    let z_score, area, excel_formula;
    if (tails === 'one') {
        area = p;
        z_score = stdNormalInv(area);
        excel_formula = `=NORM.S.INV(${p})`;
        out.innerHTML = `<p>For a <strong>one-tailed</strong> p-value of ${p}, the corresponding Z-score is approximately <strong>${fmt(z_score, 5)}</strong>.</p>
                         <p class="mt-2">This is the Z-score where the area in one tail is equal to ${p}.</p>
                         <p class="mt-1"><strong>Excel:</strong> ${excel_formula}</p>`;
    } else { // two
        area = p / 2;
        z_score = stdNormalInv(1 - area);
        excel_formula = `=NORM.S.INV(1-${p}/2)`;
        out.innerHTML = `<p>For a <strong>two-tailed</strong> p-value of ${p}, the critical Z-scores are approximately <strong>±${fmt(z_score, 5)}</strong>.</p>
                         <p class="mt-2">This is the Z-score where the area in each tail is ${area} (totaling ${p}).</p>
                         <p class="mt-1"><strong>Excel:</strong> ${excel_formula}</p>`;
    }
}

/* ---------------------------
  16) Hypothesis Test: Comparing Two Sample Means (Z-Test)
   --------------------------- */

function ht2MeansHTML() {
  return `
  <div>
    <h2 class="text-2xl font-semibold">Hypothesis Test: Comparing Two Sample Means (Z-Test)</h2>
    <p class="mt-2 text-sm opacity-90">Test if there's a significant difference between two population means when both population standard deviations (σ₁, σ₂) are known.</p>
    
    <div class="mt-4 grid gap-4 md:grid-cols-2">
      <div><label class="label">Sample Mean 1 (x̄₁)</label><input id="ht2-xbar1" class="input" type="number" value="291" /></div>
      <div><label class="label">Sample Mean 2 (x̄₂)</label><input id="ht2-xbar2" class="input" type="number" value="302" /></div>
      
      <div><label class="label">Population SD 1 (σ₁)</label><input id="ht2-sigma1" class="input" type="number" value="15" /></div>
      <div><label class="label">Population SD 2 (σ₂)</label><input id="ht2-sigma2" class="input" type="number" value="20" /></div>
      
      <div><label class="label">Sample Size 1 (n₁)</label><input id="ht2-n1" class="input" type="number" min="2" value="30" /></div>
      <div><label class="label">Sample Size 2 (n₂)</label><input id="ht2-n2" class="input" type="number" min="2" value="35" /></div>
      
      <div class="col-span-2"><label class="label">Significance Level (α, in %)</label><input id="ht2-alpha" class="input" type="number" min="0" max="100" value="5" /></div>
      <div class="col-span-2">
        <label class="label">Hypothesis Type (H₀: μ₁ = μ₂)</label>
        <select id="ht2-type" class="input">
          <option value="neq">Two-tailed (H₁: μ₁ ≠ μ₂)</option>
          <option value="lt">Left-tailed (H₁: μ₁ < μ₂)</option>
          <option value="gt">Right-tailed (H₁: μ₁ > μ₂)</option>
        </select>
      </div>
    </div>
    
    <div class="mt-4 flex gap-2">
      <button id="ht2-explain" class="btn btn-primary">Run Test & Explain</button>
      <button id="ht2-example" class="btn btn-ghost">Load example</button>
    </div>
    <div id="ht2-output" class="mt-5 topic-card p-4 rounded-md steps"></div>

    <hr class="my-6 border-white/20">

    <h3 class="text-xl font-semibold">Inverse Calculator: P-value to Z-score</h3>
    <div class="mt-3 grid gap-3 md:grid-cols-3">
        <div><label class="label">P-value</label><input id="ht2-inv-p" class="input" type="number" min="0" max="1" step="0.001" value="0.05" /></div>
        <div>
          <label class="label">Tails</label>
          <select id="ht2-inv-tails" class="input"><option value="one">One-tailed</option><option value="two">Two-tailed</option></select>
        </div>
        <div class="self-end"><button id="ht2-inv-calc" class="btn btn-secondary w-full">Find Z-score</button></div>
    </div>
    <div id="ht2-inv-output" class="mt-4 topic-card p-4 rounded-md steps"></div>
  </div>`;
}

function explainHT2Means() {
    const xbar1 = Number(document.getElementById('ht2-xbar1').value);
    const xbar2 = Number(document.getElementById('ht2-xbar2').value);
    const sigma1 = Number(document.getElementById('ht2-sigma1').value);
    const sigma2 = Number(document.getElementById('ht2-sigma2').value);
    const n1 = Number(document.getElementById('ht2-n1').value);
    const n2 = Number(document.getElementById('ht2-n2').value);
    const alpha_percent = Number(document.getElementById('ht2-alpha').value);
    const type = document.getElementById('ht2-type').value;
    const out = document.getElementById('ht2-output');

    if (isNaN(xbar1) || isNaN(xbar2) || isNaN(sigma1) || sigma1 <= 0 || isNaN(sigma2) || sigma2 <= 0 || isNaN(n1) || n1 < 2 || isNaN(n2) || n2 < 2 || isNaN(alpha_percent) || alpha_percent <= 0 || alpha_percent >= 100) {
        out.innerHTML = `<p class="text-red-400">Please provide valid inputs. Standard deviations must be positive, sample sizes must be at least 2, and α must be between 0 and 100.</p>`;
        return;
    }

    const alpha = alpha_percent / 100;

    // Calculate Standard Error of the Difference
    const stdErrorDiff = Math.sqrt((sigma1 * sigma1 / n1) + (sigma2 * sigma2 / n2));

    // Calculate Test Statistic
    const z_stat = (xbar1 - xbar2) / stdErrorDiff;

    let h0, h1, tail_desc, p_value, critical_str, rejection_region_str, conclusion_claim;

    if (type === 'neq') {
        tail_desc = "two-tailed";
        h0 = `H₀: μ₁ = μ₂ (or μ₁ - μ₂ = 0)`;
        h1 = `H₁: μ₁ ≠ μ₂ (or μ₁ - μ₂ ≠ 0)`;
        conclusion_claim = `the means of population 1 and population 2 are different`;
        p_value = 2 * (z_stat < 0 ? stdNormalCDF(z_stat) : 1 - stdNormalCDF(z_stat));
        const cv = stdNormalInv(1 - alpha / 2);
        critical_str = `±${fmt(cv, 3)}`;
        rejection_region_str = `Z < -${fmt(cv, 3)} or Z > ${fmt(cv, 3)}`;
    } else if (type === 'lt') {
        tail_desc = "left-tailed";
        h0 = `H₀: μ₁ ≥ μ₂ (or μ₁ - μ₂ ≥ 0)`;
        h1 = `H₁: μ₁ < μ₂ (or μ₁ - μ₂ < 0)`;
        conclusion_claim = `the mean of population 1 is less than the mean of population 2`;
        p_value = stdNormalCDF(z_stat);
        const cv = stdNormalInv(alpha);
        critical_str = `${fmt(cv, 3)}`;
        rejection_region_str = `Z < ${fmt(cv, 3)}`;
    } else { // 'gt'
        tail_desc = "right-tailed";
        h0 = `H₀: μ₁ ≤ μ₂ (or μ₁ - μ₂ ≤ 0)`;
        h1 = `H₁: μ₁ > μ₂ (or μ₁ - μ₂ > 0)`;
        conclusion_claim = `the mean of population 1 is greater than the mean of population 2`;
        p_value = 1 - stdNormalCDF(z_stat);
        const cv = stdNormalInv(1 - alpha);
        critical_str = `${fmt(cv, 3)}`;
        rejection_region_str = `Z > ${fmt(cv, 3)}`;
    }

    const reject_h0 = p_value < alpha;
    
    let conclusion;
    if (reject_h0) {
        conclusion = `<strong>We reject the null hypothesis.</strong> There is sufficient evidence at the ${alpha_percent}% significance level to conclude that ${conclusion_claim} (p-value ≈ ${fmt(p_value, 5)}).`;
    } else {
        conclusion = `<strong>We do not have sufficient evidence to reject the null hypothesis.</strong> We conclude that the means of population 1 and population 2 are equal (p-value ≈ ${fmt(p_value, 5)}).`;
    }

    out.innerHTML = `
        <ol class="list-decimal list-inside space-y-4">
            <li>
                <strong>State the Hypotheses:</strong> This is a ${tail_desc} test.
                <p class="ml-4 mt-1">Null Hypothesis (H₀): <strong>${h0}</strong></p>
                <p class="ml-4">Alternative Hypothesis (H₁): <strong>${h1}</strong></p>
            </li>
            <li>
                <strong>Significance Level (α):</strong> The chosen significance level is <strong>${alpha}</strong> (${alpha_percent}%).
            </li>
            <li>
                <strong>Calculate the Test Statistic (Z):</strong>
                <p class="ml-4 mt-1">Difference in Sample Means (x̄₁ - x̄₂) = ${xbar1} - ${xbar2} = ${xbar1 - xbar2}</p>
                <p class="ml-4">Standard Error of the Difference (SE) = $\\sqrt{\\frac{\\sigma_1^2}{n_1} + \\frac{\\sigma_2^2}{n_2}}$ = $\\sqrt{\\frac{${sigma1}^2}{${n1}} + \\frac{${sigma2}^2}{${n2}}}$ = ${fmt(stdErrorDiff, 5)}</p>
                <p class="ml-4">Z = $\\frac{(x̄₁ - x̄₂) - 0}{SE}$ = $\\frac{(${xbar1} - ${xbar2})}{${fmt(stdErrorDiff, 5)}}$ = <strong>${fmt(z_stat, 4)}</strong></p>
                <p class="ml-4"><strong>Excel:</strong> =(${xbar1}-${xbar2})/SQRT((${sigma1}^2/${n1})+(${sigma2}^2/${n2}))</p>
            </li>
            <li>
                <strong>Determine Critical Region and P-value:</strong>
                <p class="ml-4 mt-1"><strong>Critical Value(s):</strong> The critical value for a ${tail_desc} test at α=${alpha} is <strong>${critical_str}</strong>.</p>
                <p class="ml-4"><strong>Rejection Region:</strong> Reject H₀ if <strong>${rejection_region_str}</strong>.</p>
                <p class="ml-4 mt-2"><strong>Calculated P-value:</strong> The probability of observing a test statistic this extreme or more is <strong>${fmt(p_value, 5)}</strong>.</p>
                <p class="ml-4 opacity-80 text-sm">The p-value represents the probability of obtaining your sample results (or more extreme) if the null hypothesis were actually true. A small p-value (typically < α) suggests that your observed data is unlikely under the null hypothesis.</p>
            </li>
            <li>
                <strong>Decision:</strong>
                <p class="ml-4 mt-1">Comparing the p-value to α: ${fmt(p_value, 5)} ${p_value < alpha ? '<' : '>'} ${alpha}.</p>
                <p class="ml-4">Comparing the test statistic to the critical value: The Z-statistic ${fmt(z_stat, 4)} ${reject_h0 ? 'falls' : 'does not fall'} in the rejection region.</p>
                <p class="ml-4">Both methods lead to the same decision: <strong>${reject_h0 ? 'Reject H₀' : 'Fail to Reject H₀'}</strong>.</p>
            </li>
            <li>
                <strong>Conclusion:</strong>
                <p class="ml-4 mt-1">${conclusion}</p>
            </li>
        </ol>
    `;
    if(window.MathJax) MathJax.typesetPromise();
}

// Reuse the inversePtoZ function from the previous module,
// as the logic for converting p-value to Z-score is identical regardless of context.
function inverseHT2MeansPtoZ() {
    const p = Number(document.getElementById('ht2-inv-p').value);
    const tails = document.getElementById('ht2-inv-tails').value;
    const out = document.getElementById('ht2-inv-output');

    if (isNaN(p) || p <= 0 || p >= 1) {
        out.innerHTML = `<p class="text-red-400">P-value must be between 0 and 1.</p>`;
        return;
    }
    
    let z_score, area, excel_formula;
    if (tails === 'one') {
        area = p;
        z_score = stdNormalInv(area);
        excel_formula = `=NORM.S.INV(${p})`;
        out.innerHTML = `<p>For a <strong>one-tailed</strong> p-value of ${p}, the corresponding Z-score is approximately <strong>${fmt(z_score, 5)}</strong>.</p>
                         <p class="mt-2">This is the Z-score where the area in one tail is equal to ${p}.</p>
                         <p class="mt-1"><strong>Excel:</strong> ${excel_formula}</p>`;
    } else { // two
        area = p / 2;
        // For two-tailed, critical value is typically positive, so we find the Z for (1 - alpha/2)
        z_score = stdNormalInv(1 - area); 
        excel_formula = `=NORM.S.INV(1-${p}/2)`;
        out.innerHTML = `<p>For a <strong>two-tailed</strong> p-value of ${p}, the critical Z-scores are approximately <strong>±${fmt(z_score, 5)}</strong>.</p>
                         <p class="mt-2">This is the Z-score where the area in each tail is ${area} (totaling ${p}).</p>
                         <p class="mt-1"><strong>Excel:</strong> ${excel_formula}</p>`;
    }
}

// --- Helper functions for Student's t-distribution ---

// Lanczos approximation for the gamma function
function logGamma(x) {
    const g = 7;
    const p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    if (x < 0.5) return Math.PI / (Math.sin(Math.PI * x) * Math.exp(logGamma(1 - x)));
    x -= 1;
    let a = p[0];
    let t = x + g + 0.5;
    for (let i = 1; i < p.length; i++) {
        a += p[i] / (x + i);
    }
    return Math.log(Math.sqrt(2 * Math.PI)) + (x + 0.5) * Math.log(t) - t + Math.log(a / x);
}

// Incomplete beta function, required for t-CDF
function incompleteBeta(x, a, b) {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    const bt = Math.exp(logGamma(a + b) - logGamma(a) - logGamma(b) + a * Math.log(x) + b * Math.log(1 - x));
    if (x < (a + 1) / (a + b + 2)) {
        return bt * continuedFraction(x, a, b) / a;
    } else {
        return 1 - bt * continuedFraction(1 - x, b, a) / b;
    }
}
function continuedFraction(x, a, b) {
    const maxIterations = 200;
    const epsilon = 1e-15;
    let am = 1, bm = 1, az = 1, bz = 1 - (a + b) * x / (a + 1);
    for (let m = 1; m <= maxIterations; m++) {
        let d = m * (b - m) * x / ((a + 2 * m - 1) * (a + 2 * m));
        am = az + d * am;
        bm = bz + d * bm;
        d = -(a + m) * (a + b + m) * x / ((a + 2 * m) * (a + 2 * m + 1));
        az = am + d * az;
        bz = bm + d * bz;
        if (Math.abs(az) > epsilon && Math.abs(bz) > epsilon) {
            am /= bz; bm /= bz; az /= bz; bz = 1;
        } else {
            am = Infinity;
        }
        if (Math.abs(az - am) < epsilon * Math.abs(az)) return az;
    }
    return az;
}

// Student's t-distribution Cumulative Distribution Function (CDF)
function t_cdf(t, df) {
    const x = df / (df + t * t);
    if (t > 0) {
        return 1 - 0.5 * incompleteBeta(x, df / 2, 0.5);
    } else {
        return 0.5 * incompleteBeta(x, df / 2, 0.5);
    }
}

// Inverse of the Student's t-distribution CDF (approximated)
function t_inv(p, df) {
    if (p <= 0 || p >= 1) return NaN;
    const z = stdNormalInv(p); // Use normal inverse as starting point
    let t = z;
    const maxIter = 10;
    for (let i = 0; i < maxIter; i++) {
      let cdf_val = t_cdf(t, df);
      let pdf_val = Math.exp(logGamma((df + 1) / 2) - logGamma(df / 2)) / (Math.sqrt(df * Math.PI) * Math.pow(1 + (t * t / df), (df + 1) / 2));
      let step = (cdf_val - p) / pdf_val;
      t -= step;
      if(Math.abs(step) < 1e-8) break;
    }
    return t;
}

/* ---------------------------
  17) Hypothesis Test (σ unknown) — one sample
   --------------------------- */
function htSigmaUnknownHTML() {
  return `
  <div>
    <h2 class="text-2xl font-semibold">Hypothesis Test: Mean (σ unknown) - One Sample t-test</h2>
    <p class="mt-2 text-sm opacity-90">Test a claim about a population mean when only the sample standard deviation (s) is known.</p>
    
    <div class="mt-4 grid gap-4 md:grid-cols-2">
      <div><label class="label">Hypothesized Mean (μ₀)</label><input id="ht-su-mu0" class="input" type="number" value="13" /></div>
      <div><label class="label">Sample Mean (x̄)</label><input id="ht-su-xbar" class="input" type="number" value="12.75" /></div>
      <div><label class="label">Sample Standard Deviation (s)</label><input id="ht-su-s" class="input" type="number" value="0.6" /></div>
      <div><label class="label">Sample Size (n)</label><input id="ht-su-n" class="input" type="number" min="2" value="36" /></div>
      <div class="col-span-2"><label class="label">Significance Level (α, in %)</label><input id="ht-su-alpha" class="input" type="number" min="0" max="100" value="1" /></div>
      <div class="col-span-2">
        <label class="label">Hypothesis Type</label>
        <select id="ht-su-type" class="input">
          <option value="neq">Two-tailed (H₁: μ ≠ μ₀)</option>
          <option value="lt">Left-tailed (H₁: μ < μ₀)</option>
          <option value="gt">Right-tailed (H₁: μ > μ₀)</option>
        </select>
      </div>
    </div>
    
    <div class="mt-4 flex gap-2">
      <button id="ht-su-explain" class="btn btn-primary">Run Test & Explain</button>
      <button id="ht-su-example" class="btn btn-ghost">Load example</button>
    </div>
    <div id="ht-su-output" class="mt-5 topic-card p-4 rounded-md steps"></div>
  </div>`;
}

function explainHTSigmaUnknown() {
    const mu0 = Number(document.getElementById('ht-su-mu0').value);
    const x_bar = Number(document.getElementById('ht-su-xbar').value);
    const s = Number(document.getElementById('ht-su-s').value);
    const n = Number(document.getElementById('ht-su-n').value);
    const alpha_percent = Number(document.getElementById('ht-su-alpha').value);
    const type = document.getElementById('ht-su-type').value;
    const out = document.getElementById('ht-su-output');

    if (isNaN(mu0) || isNaN(x_bar) || isNaN(s) || s <= 0 || isNaN(n) || n < 2 || isNaN(alpha_percent) || alpha_percent <= 0 || alpha_percent >= 100) {
        out.innerHTML = `<p class="text-red-400">Provide valid inputs. s must be positive, n ≥ 2, and 0 < α < 100.</p>`;
        return;
    }

    const alpha = alpha_percent / 100;
    const df = n - 1;
    const stdError = s / Math.sqrt(n);
    const t_stat = (x_bar - mu0) / stdError;

    let h0, h1, tail_desc, p_value, critical_str, rejection_region_str, conclusion_claim;

    if (type === 'neq') {
        tail_desc = "two-tailed";
        h0 = `H₀: μ = ${mu0}`;
        h1 = `H₁: μ ≠ ${mu0}`;
        conclusion_claim = `the mean is different from ${mu0}`;
        p_value = 2 * (t_stat < 0 ? t_cdf(t_stat, df) : 1 - t_cdf(t_stat, df));
        const cv = t_inv(1 - alpha / 2, df);
        critical_str = `±${fmt(cv, 4)}`;
        rejection_region_str = `t < -${fmt(cv, 4)} or t > ${fmt(cv, 4)}`;
    } else if (type === 'lt') {
        tail_desc = "left-tailed";
        h0 = `H₀: μ ≥ ${mu0}`;
        h1 = `H₁: μ < ${mu0}`;
        conclusion_claim = `the mean is less than ${mu0}`;
        p_value = t_cdf(t_stat, df);
        const cv = t_inv(alpha, df);
        critical_str = `${fmt(cv, 4)}`;
        rejection_region_str = `t < ${fmt(cv, 4)}`;
    } else { // 'gt'
        tail_desc = "right-tailed";
        h0 = `H₀: μ ≤ ${mu0}`;
        h1 = `H₁: μ > ${mu0}`;
        conclusion_claim = `the mean is greater than ${mu0}`;
        p_value = 1 - t_cdf(t_stat, df);
        const cv = t_inv(1 - alpha, df);
        critical_str = `${fmt(cv, 4)}`;
        rejection_region_str = `t > ${fmt(cv, 4)}`;
    }

    const reject_h0 = p_value < alpha;
    
    let conclusion;
    if (reject_h0) {
        conclusion = `<strong>We reject the null hypothesis.</strong> There is sufficient evidence at the ${alpha_percent}% significance level to conclude that ${conclusion_claim} (p-value ≈ ${fmt(p_value, 5)}).`;
    } else {
        conclusion = `<strong>We do not have sufficient evidence to reject the null hypothesis.</strong> We cannot conclude that the mean is different from ${mu0} (p-value ≈ ${fmt(p_value, 5)}).`;
    }

    out.innerHTML = `
        <ol class="list-decimal list-inside space-y-4">
            <li>
                <strong>State the Hypotheses:</strong> This is a ${tail_desc} test.
                <p class="ml-4 mt-1">Null Hypothesis (H₀): <strong>${h0}</strong></p>
                <p class="ml-4">Alternative Hypothesis (H₁): <strong>${h1}</strong></p>
            </li>
            <li>
                <strong>Degrees of Freedom (df):</strong>
                <p class="ml-4 mt-1">df = n - 1 = ${n} - 1 = <strong>${df}</strong>.</p>
                <p class="ml-4 opacity-80 text-sm">Degrees of freedom determine the specific shape of the t-distribution. A higher df means the distribution is closer to the standard normal distribution.</p>
            </li>
            <li>
                <strong>Calculate the Test Statistic (t):</strong>
                <p class="ml-4 mt-1">Standard Error (SE) = s/√n = ${s}/√${n} = ${fmt(stdError, 5)}</p>
                <p class="ml-4">t = (x̄ - μ₀) / SE = (${x_bar} - ${mu0}) / ${fmt(stdError, 5)} = <strong>${fmt(t_stat, 4)}</strong></p>
            </li>
            <li>
                <strong>Determine Critical Region and P-value:</strong>
                <p class="ml-4 mt-1"><strong>Critical Value(s):</strong> The critical value for a ${tail_desc} test with df=${df} at α=${alpha} is <strong>${critical_str}</strong>.</p>
                <p class="ml-4"><strong>Excel:</strong> ${type === 'neq' ? `=T.INV.2T(${alpha}, ${df})` : `=T.INV(${alpha}, ${df})`}</p>
                <p class="ml-4 mt-2"><strong>Calculated P-value:</strong> The probability of observing a t-statistic this extreme or more is <strong>${fmt(p_value, 5)}</strong>.</p>
                <p class="ml-4"><strong>Excel:</strong> ${type === 'neq' ? `=T.DIST.2T(ABS(${fmt(t_stat, 4)}), ${df})` : (type === 'lt' ? `=T.DIST(${fmt(t_stat, 4)}, ${df}, TRUE)` : `=T.DIST.RT(${fmt(t_stat, 4)}, ${df})`)}</p>
            </li>
            <li>
                <strong>Decision & Conclusion:</strong>
                <p class="ml-4 mt-1">Since the p-value (${fmt(p_value, 5)}) is ${p_value < alpha ? 'less' : 'greater'} than α (${alpha}), we <strong>${reject_h0 ? 'reject H₀' : 'fail to reject H₀'}</strong>.</p>
                <p class="ml-4 mt-1">${conclusion}</p>
            </li>
        </ol>
    `;
    if(window.MathJax) MathJax.typesetPromise();
}

/* ---------------------------
  18) Hypothesis Test (σ unknown) — two independent samples (POOLED)
   --------------------------- */
function ht2SamplesUnknownHTML(){
  return `
  <div>
    <h2 class="text-2xl font-semibold">Hypothesis Test (σ unknown) - Pooled Two-Sample t-test</h2>
    <p class="mt-2 text-sm opacity-90">Test if there's a significant difference between two means. <strong>This test assumes the two populations have equal variances.</strong></p>
    
    <div class="mt-4 grid gap-4 md:grid-cols-2">
      <div><label class="label">Sample Mean 1 (x̄₁)</label><input id="ht2-su-xbar1" class="input" type="number" value="6.875" /></div>
      <div><label class="label">Sample Mean 2 (x̄₂)</label><input id="ht2-su-xbar2" class="input" type="number" value="6" /></div>
      
      <div><label class="label">Sample SD 1 (s₁)</label><input id="ht2-su-s1" class="input" type="number" value="1.4577" /></div>
      <div><label class="label">Sample SD 2 (s₂)</label><input id="ht2-su-s2" class="input" type="number" value="1.5811" /></div>
      
      <div><label class="label">Sample Size 1 (n₁)</label><input id="ht2-su-n1" class="input" type="number" min="2" value="8" /></div>
      <div><label class="label">Sample Size 2 (n₂)</label><input id="ht2-su-n2" class="input" type="number" min="2" value="9" /></div>
      
      <div class="col-span-2"><label class="label">Significance Level (α, in %)</label><input id="ht2-su-alpha" class="input" type="number" min="0" max="100" value="5" /></div>
      <div class="col-span-2">
        <label class="label">Hypothesis Type (H₀: μ₁ = μ₂)</label>
        <select id="ht2-su-type" class="input">
          <option value="neq">Two-tailed (H₁: μ₁ ≠ μ₂)</option>
          <option value="lt">Left-tailed (H₁: μ₁ < μ₂)</option>
          <option value="gt">Right-tailed (H₁: μ₁ > μ₂)</option>
        </select>
      </div>
    </div>
    
    <div class="mt-4 flex gap-2">
      <button id="ht2-su-explain" class="btn btn-primary">Run Test & Explain</button>
      <button id="ht2-su-example" class="btn btn-ghost">Load example</button>
    </div>
    <div id="ht2-su-output" class="mt-5 topic-card p-4 rounded-md steps"></div>
  </div>`;
}

function explainHT2SamplesUnknown(){
    const xbar1 = Number(document.getElementById('ht2-su-xbar1').value);
    const xbar2 = Number(document.getElementById('ht2-su-xbar2').value);
    const s1 = Number(document.getElementById('ht2-su-s1').value);
    const s2 = Number(document.getElementById('ht2-su-s2').value);
    const n1 = Number(document.getElementById('ht2-su-n1').value);
    const n2 = Number(document.getElementById('ht2-su-n2').value);
    const alpha_percent = Number(document.getElementById('ht2-su-alpha').value);
    const type = document.getElementById('ht2-su-type').value;
    const out = document.getElementById('ht2-su-output');

    if (isNaN(xbar1) || isNaN(xbar2) || isNaN(s1) || s1 <= 0 || isNaN(s2) || s2 <= 0 || isNaN(n1) || n1 < 2 || isNaN(n2) || n2 < 2 || isNaN(alpha_percent) || alpha_percent <= 0 || alpha_percent >= 100) {
        out.innerHTML = `<p class="text-red-400">Provide valid inputs. s must be positive, n ≥ 2, and 0 < α < 100.</p>`;
        return;
    }
    
    const alpha = alpha_percent / 100;

    // Pooled t-test calculations
    const df = n1 + n2 - 2;
    const sp_numerator = (n1 - 1) * s1 * s1 + (n2 - 1) * s2 * s2;
    const sp_squared = sp_numerator / df;
    const sp = Math.sqrt(sp_squared); // Pooled standard deviation
    const stdErrorPooled = sp * Math.sqrt(1/n1 + 1/n2);
    const t_stat = (xbar1 - xbar2) / stdErrorPooled;

    let h0, h1, tail_desc, p_value, critical_str, rejection_region_str, conclusion_claim;

    if (type === 'neq') {
        tail_desc = "two-tailed";
        h0 = `H₀: μ₁ = μ₂`; h1 = `H₁: μ₁ ≠ μ₂`;
        conclusion_claim = `the means of population 1 and population 2 are different`;
        p_value = 2 * (t_stat < 0 ? t_cdf(t_stat, df) : 1 - t_cdf(t_stat, df));
        const cv = t_inv(1 - alpha / 2, df);
        critical_str = `±${fmt(cv, 4)}`;
        rejection_region_str = `t < -${fmt(cv, 4)} or t > ${fmt(cv, 4)}`;
    } else if (type === 'lt') {
        tail_desc = "left-tailed";
        h0 = `H₀: μ₁ ≥ μ₂`; h1 = `H₁: μ₁ < μ₂`;
        conclusion_claim = `the mean of population 1 is less than the mean of population 2`;
        p_value = t_cdf(t_stat, df);
        const cv = t_inv(alpha, df);
        critical_str = `${fmt(cv, 4)}`;
        rejection_region_str = `t < ${fmt(cv, 4)}`;
    } else { // gt
        tail_desc = "right-tailed";
        h0 = `H₀: μ₁ ≤ μ₂`; h1 = `H₁: μ₁ > μ₂`;
        conclusion_claim = `the mean of population 1 is greater than the mean of population 2`;
        p_value = 1 - t_cdf(t_stat, df);
        const cv = t_inv(1 - alpha, df);
        critical_str = `${fmt(cv, 4)}`;
        rejection_region_str = `t > ${fmt(cv, 4)}`;
    }

    const reject_h0 = p_value < alpha;

    let conclusion;
    if (reject_h0) {
        conclusion = `<strong>We reject the null hypothesis.</strong> There is sufficient evidence at the ${alpha_percent}% significance level to conclude that ${conclusion_claim} (p-value ≈ ${fmt(p_value, 5)}).`;
    } else {
        conclusion = `<strong>We do not have sufficient evidence to reject the null hypothesis.</strong> We cannot conclude that the means of the two populations are different (p-value ≈ ${fmt(p_value, 5)}).`;
    }

    out.innerHTML = `
        <ol class="list-decimal list-inside space-y-4">
            <li>
                <strong>State the Hypotheses:</strong>
                <p class="ml-4 mt-1">Null Hypothesis (H₀): <strong>${h0}</strong></p>
                <p class="ml-4">Alternative Hypothesis (H₁): <strong>${h1}</strong></p>
            </li>
            <li>
                <strong>Calculate Pooled Standard Deviation (sₚ) and Degrees of Freedom (df):</strong>
                <p class="ml-4 mt-1">df = n₁ + n₂ - 2 = ${n1} + ${n2} - 2 = <strong>${df}</strong></p>
                <p class="ml-4 mt-1">Pooled Variance (sₚ²) = $\\frac{(n₁-1)s₁² + (n₂-1)s₂²}{n₁+n₂-2}$ = ${fmt(sp_squared, 5)}</p>
                <p class="ml-4 mt-1">Pooled Standard Deviation (sₚ) = $\\sqrt{s_p^2}$ = <strong>${fmt(sp, 5)}</strong></p>
            </li>
            <li>
                <strong>Calculate the Test Statistic (t):</strong>
                <p class="ml-4 mt-1">Standard Error (SE) = $s_p \\cdot \\sqrt{\\frac{1}{n₁} + \\frac{1}{n₂}}$ = ${fmt(sp, 4)} * ${fmt(Math.sqrt(1/n1 + 1/n2), 4)} = ${fmt(stdErrorPooled, 5)}</p>
                <p class="ml-4">t = $\\frac{(x̄₁ - x̄₂)}{SE}$ = $\\frac{(${xbar1} - ${xbar2})}{${fmt(stdErrorPooled, 5)}}$ = <strong>${fmt(t_stat, 4)}</strong></p>
            </li>
            <li>
                <strong>Determine Critical Region and P-value:</strong>
                <p class="ml-4 mt-1"><strong>Critical Value(s):</strong> For df=${df} at α=${alpha}, the critical value is <strong>${critical_str}</strong>.</p>
                <p class="ml-4"><strong>Excel:</strong> ${type === 'neq' ? `=T.INV.2T(${alpha}, ${df})` : `=T.INV(${alpha}, ${df})`}</p>
                <p class="ml-4 mt-2"><strong>Calculated P-value:</strong> The probability of observing a t-statistic this extreme or more is <strong>${fmt(p_value, 5)}</strong>.</p>
                <p class="ml-4"><strong>Excel:</strong> ${type === 'neq' ? `=T.DIST.2T(ABS(${fmt(t_stat, 4)}), ${df})` : (type === 'lt' ? `=T.DIST(${fmt(t_stat, 4)}, ${df}, TRUE)` : `=T.DIST.RT(${fmt(t_stat, 4)}, ${df})`)}</p>
            </li>
            <li>
                <strong>Decision & Conclusion:</strong>
                <p class="ml-4 mt-1">Since the p-value (${fmt(p_value, 5)}) is ${p_value < alpha ? 'less' : 'greater'} than α (${alpha}), we <strong>${reject_h0 ? 'reject H₀' : 'fail to reject H₀'}</strong>.</p>
                <p class="ml-4 mt-1">${conclusion}</p>
            </li>
        </ol>
    `;
    if(window.MathJax) MathJax.typesetPromise();
}

/* ---------------------------
  19) Hypothesis Test (Matched Pairs)
   --------------------------- */
function htPairedHTML(){
  return `
  <div>
    <h2 class="text-2xl font-semibold">Hypothesis Test: Matched Pairs (Paired t-test)</h2>
    <p class="mt-2 text-sm opacity-90">Tests the mean difference between paired observations (e.g., before vs. after). Assumes the differences are normally distributed.</p>
    
    <div class="mt-4 grid gap-4 md:grid-cols-2">
      <div><label class="label">Mean of Differences (d̄)</label><input id="ht-p-dbar" class="input" type="number" value="0.252" /></div>
      <div><label class="label">SD of Differences (s_d)</label><input id="ht-p-sd" class="input" type="number" value="0.218" /></div>
      <div><label class="label">Number of Pairs (n)</label><input id="ht-p-n" class="input" type="number" min="2" value="5" /></div>
      <div><label class="label">Hypothesized Difference (μ_d)</label><input id="ht-p-mu_d" class="input" type="number" value="0" /></div>
      <div class="col-span-2"><label class="label">Significance Level (α, in %)</label><input id="ht-p-alpha" class="input" type="number" min="0" max="100" value="5" /></div>
      <div class="col-span-2">
        <label class="label">Hypothesis Type</label>
        <select id="ht-p-type" class="input">
          <option value="neq">Two-tailed (H₁: μ_d ≠ 0)</option>
          <option value="lt">Left-tailed (H₁: μ_d < 0)</option>
          <option value="gt">Right-tailed (H₁: μ_d > 0)</option>
        </select>
      </div>
    </div>
    
    <div class="mt-4 flex gap-2"><button id="ht-p-explain" class="btn btn-primary">Run Test</button><button id="ht-p-example" class="btn btn-ghost">Load example</button></div>
    <div id="ht-p-output" class="mt-5 topic-card p-4 rounded-md steps"></div>
  </div>`;
}

/* ---------------------------
  FORMULA & EXCEL CHEAT SHEET
--------------------------- */
function formulaSheetHTML() {
  return `
  <div>
    <h2 class="text-2xl font-semibold">Formula & Excel Cheat Sheet</h2>
    <p class="mt-2 text-sm opacity-90">A summary of the key formulae and Excel functions used in this calculator.</p>

    <!-- Basic Probability -->
    <h3 class="text-xl font-semibold mt-6 mb-2">Basic Probability</h3>
    <div class="grid md:grid-cols-2 gap-4 p-4 border rounded-md">
        <div>
            <h4 class="font-bold">Formula</h4>
            <ul class="list-disc list-inside space-y-1 mt-1">
                <li><strong>P(A) = Favourable Outcomes / Total Outcomes</strong></li>
            </ul>
        </div>
        <div>
            <h4 class="font-bold">Excel Function</h4>
            <p>Simple division: <code>=k/n</code></p>
        </div>
    </div>

    <!-- Permutations & Combinations -->
    <h3 class="text-xl font-semibold mt-6 mb-2">Permutations & Combinations</h3>
    <div class="grid md:grid-cols-2 gap-4 p-4 border rounded-md">
        <div>
            <h4 class="font-bold">Key Formulae (n items, choose k)</h4>
            <ul class="list-disc list-inside space-y-1 mt-1">
                <li><strong>Permutation (no repetition):</strong> <code>P(n,k) = n! / (n-k)!</code></li>
                <li><strong>Combination (no repetition):</strong> <code>C(n,k) = n! / (k!(n-k)!)</code></li>
                <li><strong>Permutation (with repetition):</strong> <code>n^k</code></li>
                <li><strong>Combination (with repetition):</strong> <code>C(n+k-1, k)</code></li>
            </ul>
        </div>
        <div>
            <h4 class="font-bold">Excel Functions</h4>
            <ul class="list-disc list-inside space-y-1 mt-1">
                <li><strong>Permutation (no repetition):</strong> <code>=PERMUT(n, k)</code></li>
                <li><strong>Combination (no repetition):</strong> <code>=COMBIN(n, k)</code></li>
                <li><strong>Permutation (with repetition):</strong> <code>=POWER(n, k)</code></li>
                <li><strong>Combination (with repetition):</strong> <code>=COMBIN(n+k-1, k)</code></li>
            </ul>
        </div>
    </div>

    <!-- At Least One Event -->
    <h3 class="text-xl font-semibold mt-6 mb-2">Probability of "At Least One"</h3>
    <div class="grid md:grid-cols-2 gap-4 p-4 border rounded-md">
        <div>
            <h4 class="font-bold">Formula (for independent trials)</h4>
            <p><code>P(At least one) = 1 - P(None)</code><br><code>P(At least one success) = 1 - (1-p)^n</code></p>
        </div>
        <div>
            <h4 class="font-bold">Excel Function</h4>
            <p>Built from formula: <code>=1 - (1-p)^n</code></p>
        </div>
    </div>
    
    <!-- Conditional Probability & Bayes -->
    <h3 class="text-xl font-semibold mt-6 mb-2">Conditional Probability & Bayes' Theorem</h3>
    <div class="grid md:grid-cols-2 gap-4 p-4 border rounded-md">
        <div>
            <h4 class="font-bold">Key Formulae</h4>
            <ul class="list-disc list-inside space-y-1 mt-1">
                <li><strong>Conditional Probability:</strong> <code>P(A|B) = P(A ∩ B) / P(B)</code></li>
                <li><strong>Independence Test:</strong> Events are independent if <code>P(A ∩ B) = P(A) * P(B)</code></li>
                <li><strong>Bayes' Theorem:</strong> <code>P(A|B) = [P(B|A)P(A)] / P(B)</code></li>
            </ul>
        </div>
        <div>
            <h4 class="font-bold">Excel Functions</h4>
            <p>All are built directly from the formulae using basic arithmetic (<code>*</code>, <code>/</code>).</p>
        </div>
    </div>

    <!-- Random Variables -->
    <h3 class="text-xl font-semibold mt-6 mb-2">Discrete Random Variables</h3>
    <div class="grid md:grid-cols-2 gap-4 p-4 border rounded-md">
        <div>
            <h4 class="font-bold">Key Formulae</h4>
            <ul class="list-disc list-inside space-y-1 mt-1">
                <li><strong>Expected Value E[X]:</strong> <code>Σ [x * p(x)]</code></li>
                <li><strong>Variance Var[X]:</strong> <code>E[X²] - (E[X])²</code></li>
            </ul>
        </div>
        <div>
            <h4 class="font-bold">Excel Functions</h4>
            <ul class="list-disc list-inside space-y-1 mt-1">
                <li><strong>Expected Value E[X]:</strong> <code>=SUMPRODUCT(x_range, p_range)</code></li>
                <li><strong>Variance Var[X]:</strong> <code>=SUMPRODUCT(x_squared_range, p_range) - (E[X])^2</code></li>
            </ul>
        </div>
    </div>

    <!-- Betting / House Edge -->
    <h3 class="text-xl font-semibold mt-6 mb-2">Betting & Expected Value</h3>
    <div class="grid md:grid-cols-2 gap-4 p-4 border rounded-md">
        <div>
            <h4 class="font-bold">Formula</h4>
             <p><code>EV = (p_win * profit) - (p_loss * stake)</code></p>
        </div>
        <div>
            <h4 class="font-bold">Excel Function</h4>
            <p>Built from formula.</p>
        </div>
    </div>

    <!-- Normal Distribution -->
    <h3 class="text-xl font-semibold mt-6 mb-2">Normal Distribution</h3>
    <div class="grid md:grid-cols-2 gap-4 p-4 border rounded-md">
        <div>
            <h4 class="font-bold">Key Formulae</h4>
            <ul class="list-disc list-inside space-y-1 mt-1">
                <li><strong>Z-score:</strong> <code>z = (x - μ) / σ</code></li>
                <li><strong>PDF f(x):</strong> <code>(1 / (σ√(2π))) * e^(-(x-μ)² / 2σ²)</code></li>
                <li><strong>Inverse (find x):</strong> <code>x = μ + z * σ</code></li>
            </ul>
        </div>
        <div>
            <h4 class="font-bold">Excel Functions</h4>
            <ul class="list-disc list-inside space-y-1 mt-1">
                <li><strong>P(X ≤ x):</strong> <code>=NORM.DIST(x, mean, sd, TRUE)</code></li>
                <li><strong>PDF f(x):</strong> <code>=NORM.DIST(x, mean, sd, FALSE)</code></li>
                <li><strong>Find x for P(X ≤ x):</strong> <code>=NORM.INV(prob, mean, sd)</code></li>
            </ul>
        </div>
    </div>

    <!-- Confidence Interval for Mean -->
    <h3 class="text-xl font-semibold mt-6 mb-2">Confidence Interval for Mean (σ known)</h3>
    <div class="grid md:grid-cols-2 gap-4 p-4 border rounded-md">
        <div>
            <h4 class="font-bold">Key Formulae</h4>
            <ul class="list-disc list-inside space-y-1 mt-1">
                <li><strong>Margin of Error (E):</strong> <code>E = Z * (σ / √n)</code></li>
                <li><strong>Confidence Interval:</strong> <code>CI = x̄ ± E</code></li>
            </ul>
        </div>
        <div>
            <h4 class="font-bold">Excel Functions</h4>
            <ul class="list-disc list-inside space-y-1 mt-1">
                <li><strong>Margin of Error (E):</strong> <code>=CONFIDENCE.NORM(alpha, sd, n)</code></li>
                <li><strong>Lower Bound:</strong> <code>=mean - CONFIDENCE.NORM(...)</code></li>
                <li><strong>Upper Bound:</strong> <code>=mean + CONFIDENCE.NORM(...)</code></li>
            </ul>
        </div>
    </div>

    <!-- Sampling Distribution of the Sample Mean -->
    <h3 class="text-xl font-semibold mt-6 mb-2">Sampling Distribution of the Sample Mean</h3>
    <div class="grid md:grid-cols-2 gap-4 p-4 border rounded-md">
        <div>
            <h4 class="font-bold">Key Formulae</h4>
            <ul class="list-disc list-inside space-y-1 mt-1">
                <li><strong>Standard Error (σ_x̄):</strong> <code>σ_x̄ = σ / √n</code></li>
                <li><strong>Z-score for x̄:</strong> <code>z = (x̄ - μ) / σ_x̄</code></li>
            </ul>
        </div>
        <div>
            <h4 class="font-bold">Excel Functions</h4>
            <ul class="list-disc list-inside space-y-1 mt-1">
                <li><strong>P(X̄ ≤ x̄):</strong> <code>=NORM.DIST(x̄, μ, σ/√n, TRUE)</code></li>
                <li><strong>Find x̄ for P(X̄ ≤ x̄):</strong> <code>=NORM.INV(prob, μ, σ/√n)</code></li>
            </ul>
        </div>
    </div>

    <!-- One-Sample Z-Test -->
    <h3 class="text-xl font-semibold mt-6 mb-2">One-Sample Z-Test for Mean (σ known)</h3>
    <div class="grid md:grid-cols-2 gap-4 p-4 border rounded-md">
        <div><h4 class="font-bold">Formula</h4><code>Z = (x̄ - μ₀) / (σ / √n)</code></div>
        <div><h4 class="font-bold">Excel P-value</h4><code>=Z.TEST(data_range, μ₀, σ)</code></div>
    </div>

    <!-- Two-Sample Z-Test -->
    <h3 class="text-xl font-semibold mt-6 mb-2">Two-Sample Z-Test for Means (σ known)</h3>
    <div class="grid md:grid-cols-2 gap-4 p-4 border rounded-md">
        <div><h4 class="font-bold">Formula</h4><code>Z = (x̄₁ - x̄₂) / √(σ₁²/n₁ + σ₂²/n₂)</code></div>
        <div><h4 class="font-bold">Excel</h4><p>No direct function; build from formula.</p></div>
    </div>

    <!-- One-Sample t-Test -->
    <h3 class="text-xl font-semibold mt-6 mb-2">One-Sample t-Test for Mean (σ unknown)</h3>
    <div class="grid md:grid-cols-2 gap-4 p-4 border rounded-md">
        <div>
            <h4 class="font-bold">Key Formulae</h4>
            <ul class="list-disc list-inside mt-1">
                <li><strong>Degrees of Freedom:</strong> <code>df = n - 1</code></li>
                <li><strong>Test Statistic (t):</strong> <code>t = (x̄ - μ₀) / (s / √n)</code></li>
            </ul>
        </div>
        <div>
            <h4 class="font-bold">Excel P-values</h4>
            <ul class="list-disc list-inside mt-1">
                <li><strong>Right-Tailed:</strong> <code>=T.DIST.RT(t, df)</code></li>
                <li><strong>Two-Tailed:</strong> <code>=T.DIST.2T(ABS(t), df)</code></li>
            </ul>
        </div>
    </div>
    
    <!-- Pooled Two-Sample t-Test -->
    <h3 class="text-xl font-semibold mt-6 mb-2">Pooled Two-Sample t-Test (Equal Variances)</h3>
    <div class="grid md:grid-cols-2 gap-4 p-4 border rounded-md">
        <div>
            <h4 class="font-bold">Key Formulae</h4>
            <ul class="list-disc list-inside mt-1">
                <li><strong>Degrees of Freedom:</strong> <code>df = n₁ + n₂ - 2</code></li>
                <li><strong>Pooled Variance (sₚ²):</strong> <code>((n₁-1)s₁² + (n₂-1)s₂²) / df</code></li>
            </ul>
        </div>
        <div>
            <h4 class="font-bold">Excel P-value (from data)</h4>
            <code>=T.TEST(array1, array2, tails, 2)</code>
            <p class="text-sm opacity-80">(Type 2 assumes equal variance)</p>
        </div>
    </div>

    <!-- Paired t-Test -->
    <h3 class="text-xl font-semibold mt-6 mb-2">Paired t-Test (Matched Pairs)</h3>
    <div class="grid md:grid-cols-2 gap-4 p-4 border rounded-md">
        <div>
            <h4 class="font-bold">Key Formulae</h4>
            <ul class="list-disc list-inside mt-1">
                <li><strong>Degrees of Freedom:</strong> <code>df = n - 1</code></li>
                <li><strong>Test Statistic (t):</strong> <code>t = d̄ / (s_d / √n)</code></li>
            </ul>
        </div>
        <div>
            <h4 class="font-bold">Excel P-value (from data)</h4>
            <code>=T.TEST(array1, array2, tails, 1)</code>
            <p class="text-sm opacity-80">(Type 1 is for paired tests)</p>
        </div>
    </div>

    <!-- Chi-Squared Goodness-of-Fit -->
    <h3 class="text-xl font-semibold mt-6 mb-2">Chi-Squared (χ²) Goodness-of-Fit Test</h3>
    <div class="grid md:grid-cols-2 gap-4 p-4 border rounded-md">
        <div>
            <h4 class="font-bold">Key Formulae</h4>
            <ul class="list-disc list-inside mt-1">
                <li><strong>Degrees of Freedom:</strong> <code>df = k - 1</code> (k=categories)</li>
                <li><strong>Test Statistic (χ²):</strong> <code>Σ [(O-E)² / E]</code></li>
            </ul>
        </div>
        <div>
            <h4 class="font-bold">Excel Functions</h4>
             <ul class="list-disc list-inside mt-1">
                <li><strong>P-value (from stat):</strong> <code>=CHISQ.DIST.RT(χ², df)</code></li>
                <li><strong>P-value (from data):</strong> <code>=CHISQ.TEST(obs_range, exp_range)</code></li>
            </ul>
        </div>
    </div>

    <!-- Chi-Squared Test of Association -->
    <h3 class="text-xl font-semibold mt-6 mb-2">Chi-Squared (χ²) Test of Association</h3>
    <div class="grid md:grid-cols-2 gap-4 p-4 border rounded-md">
        <div>
            <h4 class="font-bold">Key Formulae</h4>
            <ul class="list-disc list-inside mt-1">
                <li><strong>Degrees of Freedom:</strong> <code>df = (rows-1)(cols-1)</code></li>
                <li><strong>Expected:</strong> <code>(Row Total * Col Total) / Grand Total</code></li>
            </ul>
        </div>
        <div>
            <h4 class="font-bold">Excel Function</h4>
            <p><strong>P-value (from data):</strong> <code>=CHISQ.TEST(observed_range)</code></p>
        </div>
    </div>
    
    <!-- Linear Regression Slope Test -->
    <h3 class="text-xl font-semibold mt-6 mb-2">Test for Slope in Linear Regression</h3>
    <div class="grid md:grid-cols-2 gap-4 p-4 border rounded-md">
        <div>
            <h4 class="font-bold">Key Formulae</h4>
            <ul class="list-disc list-inside mt-1">
                <li><strong>Degrees of Freedom:</strong> <code>df = n - 2</code></li>
                <li><strong>Test Statistic (t):</strong> <code>t = (b₁ - 0) / SE</code></li>
            </ul>
        </div>
        <div>
            <h4 class="font-bold">Excel Function</h4>
            <p>Use the <strong>Data Analysis Toolpak</strong> or the <code>LINEST</code> array function to get all regression output, including the t-stat and p-value for the slope.</p>
        </div>
    </div>
  </div>`;
}

function explainHTPaired(){
    const d_bar = Number(document.getElementById('ht-p-dbar').value);
    const s_d = Number(document.getElementById('ht-p-sd').value);
    const n = Number(document.getElementById('ht-p-n').value);
    const mu_d = Number(document.getElementById('ht-p-mu_d').value);
    const alpha_percent = Number(document.getElementById('ht-p-alpha').value);
    const type = document.getElementById('ht-p-type').value;
    const out = document.getElementById('ht-p-output');

    if (isNaN(d_bar) || isNaN(s_d) || s_d <= 0 || isNaN(n) || n < 2 || isNaN(mu_d) || isNaN(alpha_percent) || alpha_percent <= 0 || alpha_percent >= 100) {
        out.innerHTML = `<p class="text-red-400">Please provide valid inputs.</p>`; return;
    }

    const alpha = alpha_percent / 100;
    const df = n - 1;
    const stdError = s_d / Math.sqrt(n);
    const t_stat = (d_bar - mu_d) / stdError;
    
    // Logic for p-value, critical values, etc.
    let h0, h1, p_value, critical_str, conclusion_claim;
    if (type === 'neq') {
        h0 = `H₀: μ_d = ${mu_d}`; h1 = `H₁: μ_d ≠ ${mu_d}`;
        conclusion_claim = `the mean difference is different from ${mu_d}`;
        p_value = 2 * (t_stat < 0 ? t_cdf(t_stat, df) : 1 - t_cdf(t_stat, df));
        const cv = t_inv(1 - alpha / 2, df); critical_str = `±${fmt(cv, 4)}`;
    } else if (type === 'lt') {
        h0 = `H₀: μ_d ≥ ${mu_d}`; h1 = `H₁: μ_d < ${mu_d}`;
        conclusion_claim = `the mean difference is less than ${mu_d}`;
        p_value = t_cdf(t_stat, df);
        const cv = t_inv(alpha, df); critical_str = `${fmt(cv, 4)}`;
    } else { // gt
        h0 = `H₀: μ_d ≤ ${mu_d}`; h1 = `H₁: μ_d > ${mu_d}`;
        conclusion_claim = `the mean difference is greater than ${mu_d}`;
        p_value = 1 - t_cdf(t_stat, df);
        const cv = t_inv(1 - alpha, df); critical_str = `${fmt(cv, 4)}`;
    }
    const reject_h0 = p_value < alpha;
    let conclusion = reject_h0 ? `<strong>We reject the null hypothesis.</strong> There is sufficient evidence to conclude that ${conclusion_claim} (p-value ≈ ${fmt(p_value, 5)}).` : `<strong>We do not have sufficient evidence to reject the null hypothesis.</strong> We cannot conclude that the mean difference is different from ${mu_d} (p-value ≈ ${fmt(p_value, 5)}).`;

    out.innerHTML = `
        <ol class="list-decimal list-inside space-y-4">
            <li><strong>Hypotheses:</strong> H₀: <strong>${h0}</strong>, H₁: <strong>${h1}</strong></li>
            <li><strong>Degrees of Freedom (df):</strong> df = n - 1 = ${n} - 1 = <strong>${df}</strong></li>
            <li>
                <strong>Test Statistic (t):</strong>
                <p class="ml-4">SE = s_d/√n = ${s_d}/√${n} = ${fmt(stdError, 5)}</p>
                <p class="ml-4">t = (d̄ - μ_d) / SE = (${d_bar} - ${mu_d}) / ${fmt(stdError, 5)} = <strong>${fmt(t_stat, 4)}</strong></p>
            </li>
            <li>
                <strong>P-value and Critical Value:</strong>
                <p class="ml-4">P-value = <strong>${fmt(p_value, 5)}</strong>. Critical Value(s) at α=${alpha} is <strong>${critical_str}</strong>.</p>
                <p class="ml-4"><strong>Excel P-value:</strong> ${type === 'neq' ? `=T.DIST.2T(ABS(${fmt(t_stat, 4)}), ${df})` : (type === 'lt' ? `=T.DIST(${fmt(t_stat, 4)}, ${df}, TRUE)` : `=T.DIST.RT(${fmt(t_stat, 4)}, ${df})`)}</p>
            </li>
            <li><strong>Conclusion:</strong> ${conclusion}</li>
        </ol>
    `;
    if(window.MathJax) MathJax.typesetPromise();
}



/* ---------------------------
  20) Goodness-of-Fit Test (χ²)
--------------------------- */
function htFitHTML(){
  return `
  <div>
    <h2 class="text-2xl font-semibold">Goodness-of-Fit Test (χ²)</h2>
    <p class="mt-2 text-sm opacity-90">Tests if the observed frequency distribution fits an expected distribution.</p>
    
    <div class="mt-4 grid gap-4 md:grid-cols-2">
      <div class="col-span-2">
        <label class="label">Observed Frequencies (O)</label>
        <textarea id="ht-fit-obs" class="input" rows="3" placeholder="20, 33, 51, 41, 30"></textarea>
      </div>
      <div class="col-span-2">
        <label class="label">Expected Frequencies (E)</label>
        <textarea id="ht-fit-exp" class="input" rows="3" placeholder="21.6, 38.9, 46.7, 37.3, 22.4"></textarea>
      </div>
      <div class="col-span-2">
        <label class="label">Significance Level (α, in %)</label>
        <input id="ht-fit-alpha" class="input" type="number" min="0" max="100" value="5" />
      </div>
    </div>
    
    <div class="mt-4 flex gap-2">
      <button id="ht-fit-explain" class="btn btn-primary">Run Test</button>
      <button id="ht-fit-example" class="btn btn-ghost">Load example</button>
    </div>
    <div id="ht-fit-output" class="mt-5 topic-card p-4 rounded-md steps"></div>
  </div>`;
}

function explainHTFit(){
  const obs_str = document.getElementById('ht-fit-obs').value.split(',').map(s => s.trim());
  const exp_str = document.getElementById('ht-fit-exp').value.split(',').map(s => s.trim());
  const alpha_percent = Number(document.getElementById('ht-fit-alpha').value);
  const out = document.getElementById('ht-fit-output');

  if (obs_str.length !== exp_str.length || obs_str.length < 2) {
    out.innerHTML = `<p class="text-red-400">Observed and Expected lists must match in length (≥2).</p>`;
    return;
  }

  const obs = obs_str.map(Number);
  const exp = exp_str.map(Number);
  const k = obs.length;
  let chi2_stat = 0;

  for (let i = 0; i < k; i++) {
    if (isNaN(obs[i]) || isNaN(exp[i]) || exp[i] <= 0) {
      out.innerHTML = `<p class="text-red-400">All values must be numeric and expected values positive.</p>`;
      return;
    }
    chi2_stat += Math.pow(obs[i] - exp[i], 2) / exp[i];
  }

  const alpha = alpha_percent / 100;
  const df = k - 1;
  const p_value = 1 - chi2_cdf(chi2_stat, df);
  const cv = chi2_inv(1 - alpha, df);
  const reject_h0 = p_value < alpha;

  const conclusion = reject_h0
    ? `<strong>Reject H₀:</strong> Observed distribution does not fit expected (p ≈ ${fmt(p_value,5)}).`
    : `<strong>Fail to reject H₀:</strong> Observed distribution fits expected (p ≈ ${fmt(p_value,5)}).`;

  out.innerHTML = `
    <ol class="list-decimal list-inside space-y-4">
      <li><strong>df =</strong> ${df}</li>
      <li><strong>χ² =</strong> ${fmt(chi2_stat,4)}</li>
      <li><strong>P-value =</strong> ${fmt(p_value,5)}, <strong>Critical Value =</strong> ${fmt(cv,4)}</li>
      <li>${conclusion}</li>
      <hr>
      <p><strong>Excel:</strong><br>
      P-value = =CHISQ.DIST.RT(${fmt(chi2_stat,4)}, ${df})<br>
      Critical Value = =CHISQ.INV.RT(${alpha}, ${df})</p>
    </ol>`;
  if (window.MathJax) MathJax.typesetPromise();
}

document.addEventListener("click", e=>{
  if(e.target.id==="ht-fit-explain") explainHTFit();
  if(e.target.id==="ht-fit-example"){
    document.getElementById('ht-fit-obs').value="20,33,51,41,30";
    document.getElementById('ht-fit-exp').value="21.6,38.9,46.7,37.3,22.4";
    explainHTFit();
  }
});


// A simple number formatting function (this was missing)
function fmt(number, decimals) {
  return number.toFixed(decimals);
}

// These are complex statistical functions (these were missing)
// They are needed to calculate the p-value and critical value for the Chi-Squared test.
// Source: Adapted from public domain statistical libraries
function logGamma(x) {
    let cof = [76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
    let y = x;
    let tmp = x + 5.5;
    tmp -= (x + 0.5) * Math.log(tmp);
    let ser = 1.000000000190015;
    for (let j = 0; j < 6; j++) ser += cof[j] / ++y;
    return -tmp + Math.log(2.5066282746310005 * ser / x);
}

function incompleteGamma(a, x) {
    const GLN = logGamma(a);
    if (x < 0 || a <= 0) return 0;
    if (x < a + 1) {
        let ap = a;
        let del = sum = 1 / a;
        for (let n = 1; n <= 100; n++) {
            ap++;
            del = del * x / ap;
            sum += del;
            if (Math.abs(del) < Math.abs(sum) * 1e-7) {
                return sum * Math.exp(-x + a * Math.log(x) - GLN);
            }
        }
    } else {
        let b = x + 1 - a;
        let c = 1 / 1e-30;
        let d = 1 / b;
        let h = d;
        for (let n = 1; n <= 100; n++) {
            let an = -n * (n - a);
            b += 2;
            d = an * d + b;
            if (Math.abs(d) < 1e-30) d = 1e-30;
            c = b + an / c;
            if (Math.abs(c) < 1e-30) c = 1e-30;
            d = 1 / d;
            let del = d * c;
            h *= del;
            if (Math.abs(del - 1) < 1e-7) {
                return 1 - Math.exp(-x + a * Math.log(x) - GLN) * h;
            }
        }
    }
    return 0; // Should not be reached
}

function chi2_cdf(x, df) {
    if (x < 0) return 0;
    return incompleteGamma(df / 2, x / 2);
}

function chi2_inv(p, df) {
    // This is a complex function. For simplicity, we'll use an approximation.
    // For highly accurate results, a more robust statistical library would be needed.
    let x = 10;
    for (let i = 0; i < 20; i++) {
        let e = chi2_cdf(x, df) - p;
        if (Math.abs(e) < 1e-5) return x;
        x -= e / (Math.pow(x / 2, df / 2 - 1) * Math.exp(-x / 2) / (2 * Math.exp(logGamma(df / 2))));
    }
    return x;
}

/* ---------------------------
  YOUR ORIGINAL CODE (NOW WORKING)
--------------------------- */

/* 21) Test of Association (χ²) */
function htAssocHTML(){
  return `
  <div>
    <h2 class="text-2xl font-semibold">Test of Association / Independence (χ²)</h2>
    <p class="mt-2 text-sm opacity-90">Tests if there is a significant association between two categorical variables.</p>
    
    <div class="mt-4 grid gap-4">
      <div class="col-span-2">
        <label class="label">Observed Frequencies (Contingency Table)</label>
        <textarea id="ht-assoc-obs" class="input" rows="4" placeholder="75,55,20\n45,40,18"></textarea>
      </div>
      <div class="col-span-2">
        <label class="label">Significance Level (α, in %)</label>
        <input id="ht-assoc-alpha" class="input" type="number" value="5" />
      </div>
    </div>
    
    <div class="mt-4 flex gap-2">
      <button id="ht-assoc-explain" class="btn btn-primary">Run Test</button>
      <button id="ht-assoc-example" class="btn btn-ghost">Load example</button>
    </div>
    <div id="ht-assoc-output" class="mt-5 topic-card p-4 rounded-md steps"></div>
  </div>`;
}

function explainHTAssoc(){
  
  const raw = document.getElementById('ht-assoc-obs').value.trim().split('\n');
  const alpha_percent = Number(document.getElementById('ht-assoc-alpha').value);
  const out = document.getElementById('ht-assoc-output');

  // Clear previous output and handle empty input
  out.innerHTML = "";
  if (!raw || raw.length === 0 || raw[0].trim() === "") {
    out.innerHTML = `<p class="text-red-500">Error: Input data cannot be empty.</p>`;
    return;
  }
  
  const obs = raw.map(r => r.split(',').map(v => parseFloat(v.trim())));
  const rows = obs.length, cols = obs[0].length;
  const row_totals = obs.map(r => r.reduce((a,b)=>a+b,0));
  const col_totals = Array(cols).fill(0).map((_,c)=>obs.reduce((sum,r)=>sum+r[c],0));
  const grand = row_totals.reduce((a,b)=>a+b,0);

  let chi2_stat = 0;
  for (let r=0;r<rows;r++){
    for (let c=0;c<cols;c++){
      const exp = (row_totals[r]*col_totals[c])/grand;
      chi2_stat += Math.pow(obs[r][c]-exp,2)/exp;
    }
  }

  const alpha = alpha_percent/100;
  const df = (rows-1)*(cols-1);
  const p_value = 1 - chi2_cdf(chi2_stat, df);
  const cv = chi2_inv(1-alpha, df);
  const reject_h0 = p_value < alpha;

  const conclusion = reject_h0
    ? `<strong>Reject H₀:</strong> There is a significant association (p ≈ ${fmt(p_value,5)}).`
    : `<strong>Fail to reject H₀:</strong> Variables are independent (p ≈ ${fmt(p_value,5)}).`;

  out.innerHTML = `
    <ol class="list-decimal list-inside space-y-4">
      <li>df = (${rows}-1)×(${cols}-1) = ${df}</li>
      <li>χ² = ${fmt(chi2_stat,4)}</li>
      <li>P-value = ${fmt(p_value,5)}, CV = ${fmt(cv,4)}</li>
      <li>${conclusion}</li>
      <hr>
      <p><strong>Excel:</strong><br>
      P-value = =CHISQ.DIST.RT(${fmt(chi2_stat,4)}, ${df})<br>
      Critical Value = =CHISQ.INV.RT(${alpha}, ${df})</p>
    </ol>`;
  
  // This is optional, for rendering math equations if you use the MathJax library
  if (window.MathJax && window.MathJax.typesetPromise) {
    window.MathJax.typesetPromise();
  }
}

// Your event listener was correct and works perfectly!
document.addEventListener("click", e=>{
  if(e.target.id==="ht-assoc-explain") explainHTAssoc();
  if(e.target.id==="ht-assoc-example"){
    document.getElementById('ht-assoc-obs').value="75,55,20\n45,40,18";
    explainHTAssoc();
  }
});


/* ---------------------------
  22) Test for Predictive Relationship (Regression)
--------------------------- */
function htRegressionHTML(){
  return `
  <div>
    <h2 class="text-2xl font-semibold">Test for Predictive Relationship (Linear Regression)</h2>
    <p class="mt-2 text-sm opacity-90">Tests if the slope coefficient (β₁) differs significantly from zero.</p>
    
    <div class="mt-4 grid gap-4 md:grid-cols-2">
      <div><label class="label">Slope (b₁)</label><input id="ht-reg-b1" class="input" type="number" value="0.03884" /></div>
      <div><label class="label">Standard Error (SE)</label><input id="ht-reg-se" class="input" type="number" value="0.00116" /></div>
      <div><label class="label">Sample Size (n)</label><input id="ht-reg-n" class="input" type="number" value="400" /></div>
      <div><label class="label">Hypothesized β₁</label><input id="ht-reg-beta" class="input" type="number" value="0" /></div>
      <div class="col-span-2"><label class="label">Significance Level (%)</label><input id="ht-reg-alpha" class="input" type="number" value="5" /></div>
    </div>

    <div class="mt-4 flex gap-2">
      <button id="ht-reg-explain" class="btn btn-primary">Run Test</button>
      <button id="ht-reg-example" class="btn btn-ghost">Load example</button>
    </div>
    <div id="ht-reg-output" class="mt-5 topic-card p-4 rounded-md steps"></div>
  </div>`;
}

function explainHTRegression(){
  const b1 = Number(document.getElementById('ht-reg-b1').value);
  const se = Number(document.getElementById('ht-reg-se').value);
  const n = Number(document.getElementById('ht-reg-n').value);
  const beta = Number(document.getElementById('ht-reg-beta').value);
  const alpha_percent = Number(document.getElementById('ht-reg-alpha').value);
  const out = document.getElementById('ht-reg-output');

  if (isNaN(b1) || isNaN(se) || se <= 0 || n < 3) {
    out.innerHTML = `<p class="text-red-400">Please enter valid inputs.</p>`;
    return;
  }

  const alpha = alpha_percent / 100;
  const df = n - 2;
  const t_stat = (b1 - beta) / se;
  const p_value = 2 * (1 - t_cdf(Math.abs(t_stat), df));
  const cv = t_inv(1 - alpha/2, df);
  const reject_h0 = p_value < alpha;

  const conclusion = reject_h0
    ? `<strong>Reject H₀:</strong> Significant linear relationship (p ≈ ${fmt(p_value,5)}).`
    : `<strong>Fail to reject H₀:</strong> No significant relationship (p ≈ ${fmt(p_value,5)}).`;

  out.innerHTML = `
    <ol class="list-decimal list-inside space-y-4">
      <li>df = ${df}</li>
      <li>t = ${fmt(t_stat,4)}</li>
      <li>P-value = ${fmt(p_value,5)}, CV = ±${fmt(cv,4)}</li>
      <li>${conclusion}</li>
      <hr>
      <p><strong>Excel:</strong><br>
      P-value = =T.DIST.2T(ABS(${fmt(t_stat,4)}), ${df})<br>
      Critical Value = =T.INV.2T(${alpha}, ${df})</p>
    </ol>`;
  if (window.MathJax) MathJax.typesetPromise();
}

document.addEventListener("click", e=>{
  if(e.target.id==="ht-reg-explain") explainHTRegression();
  if(e.target.id==="ht-reg-example"){
    document.getElementById('ht-reg-b1').value=0.03884;
    document.getElementById('ht-reg-se').value=0.00116;
    document.getElementById('ht-reg-n').value=400;
    document.getElementById('ht-reg-beta').value=0;
    explainHTRegression();
  }
});



/* ---------------------------
  Bind events for topics & help
   --------------------------- */
function bindTopicEvents(topic) {
  // ==============================
  // DISTRIBUTION HANDLERS
  // ==============================


  // Uniform Distribution
  const uniExplain = document.getElementById('uni-explain');
  if (uniExplain) uniExplain.addEventListener('click', explainUniform);
  const uniExample = document.getElementById('uni-example');
  if (uniExample) uniExample.addEventListener('click', () => {
    document.getElementById('uni-a').value = -1;
    document.getElementById('uni-b').value = 4;
    document.getElementById('uni-x').value = 1.5;
    explainUniform();
  });
  const uniInvCalc = document.getElementById('uni-inv-calc');
  if (uniInvCalc) uniInvCalc.addEventListener('click', inverseUniform);

  // Binomial Distribution
  const binExplain = document.getElementById('bin-explain');
  if (binExplain) binExplain.addEventListener('click', explainBinomial);
  const binExample = document.getElementById('bin-example');
  if (binExample) binExample.addEventListener('click', () => {
    document.getElementById('bin-n').value = 10;
    document.getElementById('bin-p').value = 0.3;
    document.getElementById('bin-k').value = 2;
    explainBinomial();
  });
  const binInvCalc = document.getElementById('bin-inv-calc');
  if (binInvCalc) binInvCalc.addEventListener('click', inverseBinomial);

 const poisExpExplain=document.getElementById('pois-explain');
if(poisExpExplain) poisExpExplain.addEventListener('click',explainPoisExp);

const poisExpExample=document.getElementById('pois-example');
if(poisExpExample) poisExpExample.addEventListener('click',()=>{
  const mode=document.getElementById('mode-select').value;
  if(mode==="poisson"){
    document.getElementById('pois-l').value=3;
    document.getElementById('pois-k').value=2;
  } else {
    document.getElementById('pois-l').value=2;
    document.getElementById('exp-x').value=1.5;
  }
  explainPoisExp();
});

const poisExpInv=document.getElementById('pois-inv-calc');
if(poisExpInv) poisExpInv.addEventListener('click',inversePoisExp);



// --- New generic inverse calculator binding ---

  // --- CONFIDENCE INTERVAL ---
  const ciExplain = document.getElementById('ci-explain');
  if (ciExplain) ciExplain.addEventListener('click', explainCI);

  const ciExample = document.getElementById('ci-example');
  if (ciExample) ciExample.addEventListener('click', () => {
    document.getElementById('ci-mean').value = 22;
    document.getElementById('ci-stddev').value = 4;
    document.getElementById('ci-n').value = 36;
    document.getElementById('ci-confidence').value = 99;
    explainCI();
  });

  // --- SAMPLING DISTRIBUTION ---
  const samplingExplain = document.getElementById('sampling-explain');
  if (samplingExplain) samplingExplain.addEventListener('click', explainSampling);

  const samplingExample = document.getElementById('sampling-example');
  if (samplingExample) samplingExample.addEventListener('click', () => {
    document.getElementById('sampling-mu').value = 100;
    document.getElementById('sampling-sigma').value = 15;
    document.getElementById('sampling-n').value = 30;
    document.getElementById('sampling-x').value = 105;
    explainSampling();
  });
  
  const samplingInvCalc = document.getElementById('sampling-inv-calc');
  if (samplingInvCalc) samplingInvCalc.addEventListener('click', inverseSampling);


  // --- HYPOTHESIS TEST: ONE MEAN (Z-TEST) ---
  const htExplain = document.getElementById('ht-explain');
  if (htExplain) htExplain.addEventListener('click', explainHTMean);

  const htExample = document.getElementById('ht-example');
  if (htExample) htExample.addEventListener('click', () => {
    document.getElementById('ht-mu0').value = 400;
    document.getElementById('ht-xbar').value = 393;
    document.getElementById('ht-sigma').value = 20;
    document.getElementById('ht-n').value = 65;
    document.getElementById('ht-alpha').value = 5;
    explainHTMean();
  });
  
  const htInvCalc = document.getElementById('ht-inv-calc');
  if (htInvCalc) htInvCalc.addEventListener('click', inversePtoZ);

  // --- HYPOTHESIS TEST: TWO MEANS (Z-TEST) ---
  const ht2Explain = document.getElementById('ht2-explain');
  if (ht2Explain) ht2Explain.addEventListener('click', explainHT2Means);
  
  const ht2Example = document.getElementById('ht2-example');
  if (ht2Example) ht2Example.addEventListener('click', () => {
    document.getElementById('ht2-xbar1').value = 291;
    document.getElementById('ht2-xbar2').value = 302;
    document.getElementById('ht2-sigma1').value = 15;
    document.getElementById('ht2-sigma2').value = 20;
    document.getElementById('ht2-n1').value = 30;
    document.getElementById('ht2-n2').value = 35;
    document.getElementById('ht2-alpha').value = 5;
    explainHT2Means();
  });

  const ht2InvCalc = document.getElementById('ht2-inv-calc');
  if (ht2InvCalc) ht2InvCalc.addEventListener('click', inverseHT2MeansPtoZ);

  // --- HYPOTHESIS TEST: ONE MEAN (T-TEST) ---
  const htSuExplain = document.getElementById('ht-su-explain');
  if (htSuExplain) htSuExplain.addEventListener('click', explainHTSigmaUnknown);

  const htSuExample = document.getElementById('ht-su-example');
  if (htSuExample) htSuExample.addEventListener('click', () => {
    document.getElementById('ht-su-mu0').value = 13;
    document.getElementById('ht-su-xbar').value = 12.75;
    document.getElementById('ht-su-s').value = 0.6;
    document.getElementById('ht-su-n').value = 36;
    document.getElementById('ht-su-alpha').value = 1;
    explainHTSigmaUnknown();
  });

  // --- HYPOTHESIS TEST: TWO MEANS (POOLED T-TEST) ---
  const ht2SuExplain = document.getElementById('ht2-su-explain');
  if (ht2SuExplain) ht2SuExplain.addEventListener('click', explainHT2SamplesUnknown);

  const ht2SuExample = document.getElementById('ht2-su-example');
  if (ht2SuExample) ht2SuExample.addEventListener('click', () => {
    document.getElementById('ht2-su-xbar1').value = 6.875;
    document.getElementById('ht2-su-xbar2').value = 6;
    document.getElementById('ht2-su-s1').value = 1.4577;
    document.getElementById('ht2-su-s2').value = 1.5811;
    document.getElementById('ht2-su-n1').value = 8;
    document.getElementById('ht2-su-n2').value = 9;
    document.getElementById('ht2-su-alpha').value = 5;
    explainHT2SamplesUnknown();
  });

  // use document-level delegation so late-inserted elements work
  document.addEventListener('click', (e) => {
    const id = e.target.id;

    // --- PAIRED T-TEST ---
    if (id === 'ht-p-explain') explainHTPaired();
    if (id === 'ht-p-example') {
      document.getElementById('ht-p-dbar').value = 0.252;
      document.getElementById('ht-p-sd').value = 0.218;
      document.getElementById('ht-p-n').value = 5;
      document.getElementById('ht-p-mu_d').value = 0;
      document.getElementById('ht-p-alpha').value = 5;
      explainHTPaired();
    }

  });


  // ==============================
  // PROBABILITY & OTHER TOPICS
  // ==============================

  attachHelp('#help-k', 'k is the number of favourable outcomes (successes). For example, number of red cards in a deck: 26.');
  attachHelp('#help-n', 'n is the total number of equally likely outcomes (sample space size).');

  if (topic === 'prob') {
    document.getElementById('prob-explain').onclick = explainProb;
    document.getElementById('prob-example').onclick = () => {
      document.getElementById('prob-k').value = 13;
      document.getElementById('prob-n').value = 52;
      explainProb();
    };
  }

  if (topic === 'perm') {
    attachHelp('#help-pn', 'Total items available to choose from.');
    attachHelp('#help-pk', 'Number of items chosen.');
    attachHelp('#help-rep', 'With repetition: elements can repeat. Without: cannot.');
    attachHelp('#help-type', 'Permutation: order matters. Combination: order doesn’t matter. Arrangements: general counting rules.');
    attachHelp('#help-sample', 'If you know the total sample space size, enter it to compute probability from count.');
    document.getElementById('pc-explain').onclick = explainPC;
    document.getElementById('pc-example').onclick = () => {
      document.getElementById('pc-n').value = 10;
      document.getElementById('pc-k').value = 3;
      document.getElementById('pc-rep').value = 'no';
      document.getElementById('pc-type').value = 'perm';
      explainPC();
    };
  }

  if (topic === 'atleast') {
    attachHelp('#help-p', 'Probability of error on each independent trial.');
    attachHelp('#help-nn', 'Number of independent trials.');
    document.getElementById('al-explain').onclick = explainAtLeast;
    document.getElementById('al-example').onclick = () => {
      document.getElementById('al-p').value = 0.08;
      document.getElementById('al-n').value = 10;
      explainAtLeast();
    };
  }

  if (topic === 'cond') {
    attachHelp('#help-joint', 'Joint probability P(A∩B) — chance that both A and B occur.');
    attachHelp('#help-pb', 'Marginal chance P(B).');
    attachHelp('#help-pa', 'Marginal chance P(A) — used to test independence: check if P(A∩B) = P(A)P(B).');
    document.getElementById('cond-explain').onclick = explainCond;
    document.getElementById('cond-example').onclick = () => {
      document.getElementById('cond-joint').value = 0.06;
      document.getElementById('cond-b').value = 0.2;
      document.getElementById('cond-a').value = 0.3;
      explainCond();
    };
  }

  if (topic === 'bayes') {
    attachHelp('#help-pa-bayes', 'Prior probability P(A) of the hypothesis (e.g., disease prevalence).');
    attachHelp('#help-like', 'P(B|A): probability of evidence B if A is true (sensitivity).');
    attachHelp('#help-fp', 'P(B|¬A): probability of evidence B if A is false (false positive rate).');
    attachHelp('#help-pb', 'If unknown, we compute P(B) using the law of total probability.');
    document.getElementById('bayes-explain').onclick = explainBayes;
    document.getElementById('bayes-example').onclick = () => {
      document.getElementById('bayes-pa').value = 0.01;
      document.getElementById('bayes-l').value = 0.9;
      document.getElementById('bayes-fp').value = 0.08;
      explainBayes();
    };
  }

  if (topic === 'sets') {
    const list = document.getElementById('sets-list');
    list.innerHTML = createSetRow('A') + createSetRow('B');
    document.getElementById('add-set').addEventListener('click', () => {
      list.insertAdjacentHTML('beforeend', createSetRow());
      attachRemoveSet();
    });
    document.getElementById('clear-sets').addEventListener('click', () => { list.innerHTML = ''; });
    attachRemoveSet();
    document.getElementById('sets-explain').onclick = explainSets;
    document.getElementById('sets-example').onclick = () => {
      document.querySelectorAll('.set-input')[0].value = '1,2,3';
      document.querySelectorAll('.set-input')[1].value = '3,4,5';
      document.getElementById('set-u').value = '1,2,3,4,5';
      explainSets();
    };
  }

  if (topic === 'rv') {
    attachHelp('#help-rv-kind', 'Choose Discrete PMF or Continuous PDF (piecewise constant) for teaching purposes.');
    attachHelp('#help-pmf-by', 'If "Formula" selected, enter a formula in x (e.g. x/15) and a range x=start..end. The system normalizes automatically.');
    attachRVHandlers();
    document.getElementById('rv-explain').onclick = explainRV;
    document.getElementById('rv-normalize').onclick = normalizeRV;
    document.getElementById('rv-add-row').onclick = () => {
      document.querySelector('#rv-table > .grid') || buildRVTable(
        document.getElementById('rv-kind').value,
        document.getElementById('rv-by').value
      );
    };
  }

  if (topic === 'house') {
    document.getElementById('bet-explain').onclick = explainBet;
    document.getElementById('bet-example').onclick = () => {
      document.getElementById('bet-amt').value = 10;
      document.getElementById('bet-winrate').value = 0.48;
      document.getElementById('bet-decimal').value = 2.0;
      document.getElementById('bet-n').value = 100;
      explainBet();
    };
  }
}



/* remove-set helper */
function attachRemoveSet(){
  document.querySelectorAll('.remove-set').forEach(btn=>{
    btn.onclick = (e)=>{
      const row = e.target.closest('.set-row');
      row.remove();
    };
  });
}

/* Default: load Bayes */
renderTopic('bayes');
});