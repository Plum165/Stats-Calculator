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
  else if(topic==='poisson') html = poissonHTML();
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
/* ---------------------------
  9) Uniform Distribution
--------------------------- */
function uniformHTML(){
  return `
  <div>
    <h2 class="text-2xl font-semibold">Uniform Distribution</h2>
    <p class="mt-2 small">Definition: $X \\sim U(a,b)$ with PDF $f(x) = \\frac{1}{b-a}$ for $a \\le x \\le b$</p>

    <div class="mt-4 grid gap-3 md:grid-cols-2">
      <div class="label">Lower bound (a)</div>
      <input id="uni-a" class="input" type="number" value="0" />
      <div class="label">Upper bound (b)</div>
      <input id="uni-b" class="input" type="number" value="1" />
      <div class="label">Point x (for PDF)</div>
      <input id="uni-x" class="input" type="number" value="0.5" />
      <div class="label">Bounds: a &lt; X &lt; b (use to compute probability)</div>
      <div class="flex gap-2">
        <input id="uni-low" class="input" type="number" placeholder="lower (use a or bigger)"/>
        <input id="uni-high" class="input" type="number" placeholder="upper (use b or smaller)"/>
      </div>
      <div class="label">Inverse target P(X ≤ x) = p</div>
      <input id="uni-inv-p" class="input" type="number" min="0" max="1" step="0.01" value="0.5" />
    </div>

    <div class="mt-4 flex gap-2">
      <button id="uni-explain" class="btn btn-primary">Explain</button>
      <button id="uni-example" class="btn btn-ghost">Load example</button>
      <button data-inverse-for="uni" class="btn btn-link" title="Find x for P(X ≤ x) = p">Inverse (find x)</button>
    </div>

    <div id="uni-output" class="mt-5 topic-card p-4 rounded-md steps"></div>
  </div>`;
}
function explainUniform(){
  const a = Number(document.getElementById('uni-a').value);
  const b = Number(document.getElementById('uni-b').value);
  const x = Number(document.getElementById('uni-x').value);
  const low = document.getElementById('uni-low').value;
  const high = document.getElementById('uni-high').value;
  const invP = Number(document.getElementById('uni-inv-p').value || 0.5);
  const out = document.getElementById('uni-output');
  if(!(b>a)){ out.innerHTML = `<p>Upper bound must be > lower bound (b &gt; a).</p>`; return; }

  // pdf at x
  const pdf = (x>=a && x<=b) ? 1/(b-a) : 0;
  // CDF function
  function cdf(u){
    if(u < a) return 0;
    if(u > b) return 1;
    return (u - a) / (b - a);
  }

  let boundsStr = '';
  if(low !== '' && high !== ''){
    const lo = Number(low), hi = Number(high);
    const probBounds = clamp(cdf(hi) - cdf(lo), 0, 1);
    boundsStr = `<p><strong>Bounds</strong>: P(${lo} &lt; X &lt; ${hi}) = ${fmt(probBounds,6)}</p>
      <p><em>Excel equivalent</em>: <code>=IF(AND(${lo}&gt;=${a},${hi}&lt;=${b}), (${hi}-${lo})/(${b}-${a}), "check bounds")</code></p>`;
  }

  // expectation/variance/mode
  const mean = (a + b) / 2;
  const variance = Math.pow(b - a, 2) / 12;
  const mode = 'any value in [a,b] (uniform)';

  out.innerHTML = `
    <p><strong>PDF at x=${x}:</strong> ${fmt(pdf,6)}</p>
    ${boundsStr}
    <p><strong>Mean</strong> = ${fmt(mean,6)}</p>
    <p><strong>Variance</strong> = ${fmt(variance,6)}</p>
    <p><strong>Mode</strong> = ${mode}</p>
    <p><strong>Inverse example</strong>: For p=${invP}, x = a + p*(b-a) = ${fmt(a + invP*(b-a),6)}</p>
    <p><em>Excel equivalents:</em><br/>
       PDF (check): <code>=IF(AND(x&gt;=${a},x&lt;=${b}),1/(${b}-${a}),0)</code><br/>
       CDF: <code>=IF(x&lt;${a},0,IF(x&gt;${b},1,(x-${a})/(${b}-${a})))</code>
    </p>
  `;
  if(window.MathJax) MathJax.typesetPromise();
}
function inverseUniform(){
  const a = Number(document.getElementById('uni-a').value);
  const b = Number(document.getElementById('uni-b').value);
  const p = Number(document.getElementById('uni-inv-p').value);
  if(!(b>a) || p<0 || p>1){ alert('Check inputs'); return; }
  const x = a + p*(b-a);
  const out = document.getElementById('uni-output');
  out.innerHTML = `<p>Inverse: x such that P(X ≤ x) = ${p} → x = ${fmt(x,6)}. Excel: <code>=${a} + ${p}*(${b}-${a})</code></p>`;
}

/* ---------------------------
  10) Binomial Distribution
--------------------------- */
function binomialHTML(){
  return `
  <div>
    <h2 class="text-2xl font-semibold">Binomial Distribution</h2>
    <p class="small">$X \\sim Bin(n,p)$ with $P(X=k) = {n \\choose k} p^k (1-p)^{n-k}$</p>

    <div class="mt-4 grid gap-3 md:grid-cols-2">
      <div class="label">Trials (n)</div><input id="bin-n" class="input" type="number" value="10" />
      <div class="label">Probability (p)</div><input id="bin-p" class="input" type="number" value="0.5" step="0.01" />
      <div class="label">Successes (k)</div><input id="bin-k" class="input" type="number" value="5" />
      <div class="label">Bounds: lower a</div><input id="bin-low" class="input" type="number" placeholder="lower (inclusive)"/>
      <div class="label">Bounds: upper b</div><input id="bin-high" class="input" type="number" placeholder="upper (inclusive)"/>
      <div class="label">Inverse target CDF p (find smallest x s.t. P(X ≤ x) ≥ p)</div>
      <input id="bin-inv-p" class="input" type="number" step="0.01" min="0" max="1" value="0.5"/>
    </div>

    <div class="mt-4 flex gap-2">
      <button id="bin-explain" class="btn btn-primary">Explain</button>
      <button id="bin-example" class="btn btn-ghost">Load example</button>
      <button data-inverse-for="bin" class="btn btn-link">Inverse (find x)</button>
    </div>

    <div id="bin-output" class="mt-5 topic-card p-4 rounded-md steps"></div>
  </div>`;
}
function explainBinomial(){
  const n = Number(document.getElementById('bin-n').value);
  const p = Number(document.getElementById('bin-p').value);
  const k = Number(document.getElementById('bin-k').value);
  const low = document.getElementById('bin-low').value;
  const high = document.getElementById('bin-high').value;
  const invP = Number(document.getElementById('bin-inv-p').value || 0.5);
  const out = document.getElementById('bin-output');
  if(n<0 || p<0 || p>1){ out.innerHTML = `<p>Check n and p</p>`; return; }

  // PMF at k
  const comb = math.combinations(n, k);
  const pmf = comb * Math.pow(p,k) * Math.pow(1-p, n - k);

  // CDF for <= x
  function cdf(x){
    let s = 0;
    for(let i=0;i<=Math.floor(x);i++){
      s += math.combinations(n,i) * Math.pow(p,i) * Math.pow(1-p, n-i);
    }
    return s;
  }

  let boundsStr = '';
  if(low !== '' && high !== ''){
    const lo = Math.max(0, Number(low));
    const hi = Math.min(n, Number(high));
    let s=0;
    for(let i=lo;i<=hi;i++) s += math.combinations(n,i) * Math.pow(p,i) * Math.pow(1-p, n-i);
    boundsStr = `<p><strong>Bounds:</strong> P(${lo} ≤ X ≤ ${hi}) = ${fmt(s,6)}</p>
      <p><em>Excel</em>: <code>=BINOM.DIST.RANGE(${n},${p},${lo},${hi})</code> (or sum BINOM.DIST)</p>`;
  }

  const mean = n*p;
  const variance = n*p*(1-p);
  // mode: floor((n+1)*p)
  const mode = Math.floor((n+1)*p);

  out.innerHTML = `
    <p><strong>PMF</strong> P(X=${k}) = ${fmt(pmf,8)}</p>
    ${boundsStr}
    <p><strong>Mean</strong> = ${fmt(mean,6)}, <strong>Var</strong> = ${fmt(variance,6)}, <strong>Mode</strong> = ${mode}</p>
    <p><em>Excel Equivalents</em>: PMF: <code>=BINOM.DIST(${k},${n},${p},FALSE)</code> | CDF: <code>=BINOM.DIST(${k},${n},${p},TRUE)</code></p>
    <p><strong>Inverse hint</strong>: smallest x with CDF(x) ≥ ${invP}</p>
  `;
  if(window.MathJax) MathJax.typesetPromise();
}
function inverseBinomial(){
  const n = Number(document.getElementById('bin-n').value);
  const p = Number(document.getElementById('bin-p').value);
  const target = Number(document.getElementById('bin-inv-p').value);
  let cumulative = 0;
  let x = 0;
  while(x <= n){
    cumulative += math.combinations(n,x) * Math.pow(p,x) * Math.pow(1-p, n-x);
    if(cumulative >= target) break;
    x++;
  }
  const out = document.getElementById('bin-output');
  out.innerHTML = `<p>Inverse result: smallest x with P(X ≤ x) ≥ ${target} is x = ${x}. Excel: use cumulative search or <code>=BINOM.INV(${n},${p},${target})</code> if available.</p>`;
}

/* ---------------------------
  11) Poisson & Exponential
--------------------------- */
function poissonHTML(){
  return `
  <div>
    <h2 class="text-2xl font-semibold">Poisson & Exponential</h2>
    <p class="small">Poisson: $P(X=k)=e^{-\\lambda}\\frac{\\lambda^k}{k!}$. Exponential (continuous) PDF $f(x)=\\lambda e^{-\\lambda x}$ for x≥0</p>

    <div class="mt-4 grid gap-3 md:grid-cols-2">
      <div class="label">Poisson: λ (rate)</div><input id="ps-lam" class="input" type="number" value="3" />
      <div class="label">Poisson: k (count)</div><input id="ps-k" class="input" type="number" value="2" />
      <div class="label">Poisson bounds lower</div><input id="ps-low" class="input" type="number" placeholder="lower" />
      <div class="label">Poisson bounds upper</div><input id="ps-high" class="input" type="number" placeholder="upper" />
      <div class="label">Exponential: λ (rate)</div><input id="ex-lam" class="input" type="number" value="0.5" />
      <div class="label">Exponential: x</div><input id="ex-x" class="input" type="number" value="2" />
      <div class="label">Exponential bounds low</div><input id="ex-low" class="input" type="number" placeholder="low" />
      <div class="label">Exponential bounds high</div><input id="ex-high" class="input" type="number" placeholder="high" />
    </div>

    <div class="mt-4 flex gap-2">
      <button id="ps-explain" class="btn btn-primary">Poisson Explain</button>
      <button id="ps-example" class="btn btn-ghost">Load Poisson example</button>
      <button id="ex-explain" class="btn btn-primary">Exponential Explain</button>
      <button id="ex-example" class="btn btn-ghost">Load Exponential example</button>
    </div>

    <div id="ps-output" class="mt-5 topic-card p-4 rounded-md steps"></div>
  </div>`;
}
function explainPoisson(){
  const lambda = Number(document.getElementById('ps-lam').value);
  const k = Number(document.getElementById('ps-k').value);
  const low = document.getElementById('ps-low').value;
  const high = document.getElementById('ps-high').value;
  const out = document.getElementById('ps-output');
  if(lambda <= 0){ out.innerHTML = '<p>λ must be > 0</p>'; return; }

  // pmf
  const pmf = Math.exp(-lambda) * Math.pow(lambda, k) / math.factorial(k);

  // bounds
  let boundStr = '';
  if(low !== '' && high !== ''){
    const lo = Math.max(0, Number(low));
    const hi = Math.floor(Number(high));
    let s = 0;
    for(let i=lo;i<=hi;i++) s += Math.exp(-lambda) * Math.pow(lambda,i) / math.factorial(i);
    boundStr = `<p>P(${lo} ≤ X ≤ ${hi}) = ${fmt(s,6)}</p>
      <p><em>Excel</em>: use <code>=POISSON.DIST(k,λ,FALSE)</code> for PMF or TRUE for CDF (sum as needed)</p>`;
  }

  const mean = lambda;
  const variance = lambda;
  const mode = Math.floor(lambda);

  out.innerHTML = `
    <p><strong>Poisson PMF</strong> P(X=${k}) = ${fmt(pmf,8)}</p>
    ${boundStr}
    <p><strong>Mean</strong> = ${fmt(mean,6)}, <strong>Var</strong> = ${fmt(variance,6)}, <strong>Mode</strong> = ${mode}</p>
    <p><em>Excel</em>: PMF <code>=POISSON.DIST(${k},${lambda},FALSE)</code> | CDF <code>=POISSON.DIST(${k},${lambda},TRUE)</code></p>
  `;
}

function explainExponential(){
  const lambda = Number(document.getElementById('ex-lam').value);
  const x = Number(document.getElementById('ex-x').value);
  const low = document.getElementById('ex-low').value;
  const high = document.getElementById('ex-high').value;
  const out = document.getElementById('ps-output');
  if(lambda <= 0){ out.innerHTML = '<p>λ must be > 0</p>'; return; }

  const pdf = (x >= 0) ? lambda * Math.exp(-lambda * x) : 0;
  let boundStr = '';
  if(low !== '' && high !== ''){
    const lo = Math.max(0, Number(low));
    const hi = Math.max(lo, Number(high));
    const prob = Math.exp(-lambda*lo) - Math.exp(-lambda*hi);
    boundStr = `<p>P(${lo} &lt; X &lt; ${hi}) = ${fmt(prob,6)}</p>
      <p><em>Excel</em>: =EXPON.DIST(x,λ,TRUE) for CDF (Office 365) or derivations.</p>`;
  }
  const mean = 1/lambda;
  const variance = 1/(lambda*lambda);
  const mode = 0;

  out.innerHTML = `
    <p><strong>Exponential PDF at x=${x}</strong> = ${fmt(pdf,8)}</p>
    ${boundStr}
    <p><strong>Mean</strong> = ${fmt(mean,6)}, <strong>Var</strong> = ${fmt(variance,6)}, <strong>Mode</strong> = ${mode}</p>
    <p><em>Excel</em>: PDF <code>=EXPON.DIST(${x},${lambda},FALSE)</code> | CDF <code>=EXPON.DIST(${x},${lambda},TRUE)</code></p>
  `;
}

/* ---------------------------
  12) Normal Distribution (with plot)
--------------------------- */
function normalHTML(){
  return `
  <div>
    <h2 class="text-2xl font-semibold">Normal Distribution</h2>
    <p class="small">$X \\sim N(\\mu,\\sigma^2)$. PDF: $\\frac{1}{\\sigma\\sqrt{2\\pi}}e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}$</p>

    <div class="mt-4 grid gap-3 md:grid-cols-2">
      <div class="label">Mean (μ)</div><input id="norm-mu" class="input" type="number" value="0" />
      <div class="label">Std Dev (σ)</div><input id="norm-sigma" class="input" type="number" value="1" step="0.1" />
      <div class="label">Point x (PDF)</div><input id="norm-x" class="input" type="number" value="0" />
      <div class="label">Bounds a (lower)</div><input id="norm-a" class="input" type="number" placeholder="-1" />
      <div class="label">Bounds b (upper)</div><input id="norm-b" class="input" type="number" placeholder="1" />
      <div class="label">Inverse target p (CDF)</div><input id="norm-inv-p" class="input" type="number" min="0" max="1" step="0.001" value="0.5" />
    </div>

    <div class="mt-4 flex gap-2">
      <button id="norm-explain" class="btn btn-primary">Explain</button>
      <button id="norm-example" class="btn btn-ghost">Load example</button>
      <button data-inverse-for="norm" class="btn btn-link">Inverse (find x)</button>
    </div>

    <div class="mt-4">
      <canvas id="norm-canvas" width="800" height="240"></canvas>
    </div>

    <div id="norm-output" class="mt-5 topic-card p-4 rounded-md steps"></div>
  </div>`;
}
function normalPDF(x, mu, sigma){
  return (1/(sigma*Math.sqrt(2*Math.PI))) * Math.exp(-Math.pow(x-mu,2)/(2*sigma*sigma));
}
function normalCDF(x, mu, sigma){
  // use error function via math.erf from mathjs
  const z = (x - mu)/(sigma*Math.sqrt(2));
  // math.erf might exist; fallback to approximate via math.erf
  if(typeof math.erf === 'function'){
    return 0.5*(1 + math.erf(z));
  } else {
    // basic approximation (Abramowitz-Stegun)
    const t = 1/(1 + 0.3275911*Math.abs(z));
    const a1=0.254829592, a2=-0.284496736, a3=1.421413741, a4=-1.453152027, a5=1.061405429;
    const er = 1 - (((((a5*t + a4)*t)+a3)*t + a2)*t + a1)*t*Math.exp(-z*z);
    return 0.5*(1 + Math.sign(z)*er);
  }
}
function explainNormal(){
  const mu = Number(document.getElementById('norm-mu').value);
  const sigma = Number(document.getElementById('norm-sigma').value);
  const x = Number(document.getElementById('norm-x').value);
  const a = document.getElementById('norm-a').value;
  const b = document.getElementById('norm-b').value;
  const invP = Number(document.getElementById('norm-inv-p').value || 0.5);
  const out = document.getElementById('norm-output');
  if(sigma <= 0){ out.innerHTML = '<p>σ must be > 0</p>'; return; }

  const pdf = normalPDF(x, mu, sigma);
  let boundsStr = '';
  if(a !== '' && b !== ''){
    const A = Number(a), B = Number(b);
    const prob = normalCDF(B,mu,sigma) - normalCDF(A,mu,sigma);
    boundsStr = `<p>P(${A} &lt; X &lt; ${B}) = ${fmt(prob,8)}</p>
      <p><em>Excel</em>: =NORM.DIST(${B},${mu},${sigma},TRUE) - NORM.DIST(${A},${mu},${sigma},TRUE)</p>`;
  }

  const mean = mu;
  const variance = sigma*sigma;
  const mode = mu;

  out.innerHTML = `
    <p><strong>PDF at x=${x}</strong> = ${fmt(pdf,8)}</p>
    ${boundsStr}
    <p><strong>Mean</strong> = ${fmt(mean,6)}, <strong>Var</strong> = ${fmt(variance,6)}, <strong>Mode</strong> = ${fmt(mode,6)}</p>
    <p><em>Excel:</em> PDF/CDF: <code>=NORM.DIST(x,${mu},${sigma},FALSE)</code> and <code>=NORM.DIST(x,${mu},${sigma},TRUE)</code></p>
    <p><strong>Inverse hint</strong>: use <code>=NORM.INV(p,${mu},${sigma})</code> in Excel or use the inverseNormal tool below.</p>
  `;

  // draw graph with shaded region (if a and b present)
  drawNormalPlot(mu, sigma, a !== '' ? Number(a) : null, b !== '' ? Number(b) : null);
  if(window.MathJax) MathJax.typesetPromise();
}
function inverseNormal(){
  const mu = Number(document.getElementById('norm-mu').value);
  const sigma = Number(document.getElementById('norm-sigma').value);
  const p = Number(document.getElementById('norm-inv-p').value);
  // use mathjs's erf inverse? math.inv might have erfInverse not guaranteed. We'll use numeric binary search.
  if(p<=0 || p>=1){ alert('p must be between 0 and 1 (exclusive)'); return; }
  let lo = mu - 10*sigma, hi = mu + 10*sigma;
  for(let i=0;i<60;i++){
    const mid = (lo+hi)/2;
    const c = normalCDF(mid, mu, sigma);
    if(c < p) lo = mid; else hi = mid;
  }
  const x = (lo+hi)/2;
  const out = document.getElementById('norm-output');
  out.innerHTML = `<p>Inverse Normal: x such that P(X ≤ x) = ${p} → x ≈ ${fmt(x,6)}. Excel: <code>=NORM.INV(${p},${mu},${sigma})</code></p>`;
}

/* draw normal distribution on canvas (approx) */
function drawNormalPlot(mu, sigma, shadeA=null, shadeB=null){
  const c = document.getElementById('norm-canvas');
  if(!c) return;
  const ctx = c.getContext('2d');
  const w = c.width = c.clientWidth * devicePixelRatio;
  const h = c.height = c.clientHeight * devicePixelRatio;
  ctx.clearRect(0,0,w,h);
  // x range: mu-4σ to mu+4σ
  const minX = mu - 4*sigma, maxX = mu + 4*sigma;
  const step = (maxX - minX) / (w/ (1.0*devicePixelRatio));
  // compute pdf values
  let maxPdf = 0;
  const xs = [];
  const ys = [];
  for(let x=minX; x<=maxX; x+=step){
    const y = normalPDF(x, mu, sigma);
    xs.push(x); ys.push(y);
    if(y>maxPdf) maxPdf = y;
  }
  // scale functions
  const px = x=> ( (x - minX) / (maxX - minX) ) * w;
  const py = y=> h - (y / maxPdf) * (h*0.85);

  // draw curve
  ctx.beginPath();
  ctx.lineWidth = 2 * devicePixelRatio;
  ctx.strokeStyle = 'rgba(255,255,255,0.9)';
  for(let i=0;i<xs.length;i++){
    const X = px(xs[i]), Y = py(ys[i]);
    if(i===0) ctx.moveTo(X,Y); else ctx.lineTo(X,Y);
  }
  ctx.stroke();

  // shading if shadeA/shadeB present
  if(shadeA !== null && shadeB !== null){
    const a = Math.max(minX, shadeA), b = Math.min(maxX, shadeB);
    ctx.beginPath();
    // move along xs where x between a and b
    let started = false;
    for(let i=0;i<xs.length;i++){
      if(xs[i] >= a && xs[i] <= b){
        const X = px(xs[i]), Y = py(ys[i]);
        if(!started){ ctx.moveTo(X, h); ctx.lineTo(X,Y); started = true; }
        else ctx.lineTo(X,Y);
      }
    }
    // close path
    ctx.lineTo(px(Math.min(b, maxX)), h);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.fill();
  }

  // axes labels (simple)
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.font = `${12 * devicePixelRatio}px sans-serif`;
  ctx.fillText(`μ=${mu}, σ=${sigma}`, 10 * devicePixelRatio, 18 * devicePixelRatio);
}

/* ---------------------------
  inverse wrappers (dispatch)
--------------------------- */
function inversePoisson(){ /* would need search - similar to binomial */ alert('Use CDF search; not implemented inline.'); }
function inverseExponential(){
  const lam = Number(document.getElementById('ex-lam').value);
  const p = Number(document.getElementById('ex-inv-p') ? document.getElementById('ex-inv-p').value : 0.5);
  if(lam<=0){ alert('λ>0'); return; }
  const x = -Math.log(1-p)/lam;
  const out = document.getElementById('ps-output');
  out.innerHTML = `<p>Inverse Exponential: x = -ln(1-p)/λ = ${fmt(x,6)}. Excel: <code>=EXPON.DIST.INV(${p},${lam})</code> (if available)</p>`;
}

/* ---------------------------
  (13–22) placeholders for hypothesis testing modules
  Each returns a ready-to-fill HTML structure (Load example + Explain)
--------------------------- */
function normalPlaceholder(title){
  return `<div><h2 class="text-2xl font-semibold">${title}</h2><p class="mt-2">Coming soon — detailed examples and calculators.</p></div>`;
}
function samplingHTML(){ return normalPlaceholder('Sampling Distribution of the Sample Mean'); }
function ciHTML(){ return normalPlaceholder('Confidence Interval for Mean'); }
function htMeanHTML(){ return normalPlaceholder('Hypothesis Test: Mean equals value'); }
function ht2MeansHTML(){ return normalPlaceholder('Comparing Two Sample Means'); }
function htSigmaUnknownHTML(){ return normalPlaceholder('Hypothesis Test (σ unknown) — one sample'); }
function ht2SamplesUnknownHTML(){ return normalPlaceholder('Hypothesis Test (σ unknown) — two independent samples'); }
function htPairedHTML(){ return normalPlaceholder('Hypothesis Test (Matched Pairs)'); }
function htFitHTML(){ return normalPlaceholder('Goodness-of-Fit Test'); }
function htAssocHTML(){ return normalPlaceholder('Test of Association (Categorical)'); }
function htRegressionHTML(){ return normalPlaceholder('Test for Predictive Relationship'); }

/* ---------------------------
  Bind events for topics & help
   --------------------------- */
function bindTopicEvents(topic) {
  // ==============================
  // DISTRIBUTION HANDLERS
  // ==============================

  // uniform
  const uniExplain = document.getElementById('uni-explain');
  if (uniExplain) uniExplain.addEventListener('click', explainUniform);
  const uniExample = document.getElementById('uni-example');
  if (uniExample) uniExample.addEventListener('click', () => {
    document.getElementById('uni-a').value = -1;
    document.getElementById('uni-b').value = 4;
    document.getElementById('uni-x').value = 1.5;
    explainUniform();
  });

  // binomial
  const binExplain = document.getElementById('bin-explain');
  if (binExplain) binExplain.addEventListener('click', explainBinomial);
  const binExample = document.getElementById('bin-example');
  if (binExample) binExample.addEventListener('click', () => {
    document.getElementById('bin-n').value = 10;
    document.getElementById('bin-p').value = 0.3;
    document.getElementById('bin-k').value = 2;
    explainBinomial();
  });

  // poisson
  const psExplain = document.getElementById('ps-explain');
  if (psExplain) psExplain.addEventListener('click', explainPoisson);
  const psExample = document.getElementById('ps-example');
  if (psExample) psExample.addEventListener('click', () => {
    document.getElementById('ps-lam').value = 3;
    document.getElementById('ps-k').value = 2;
    explainPoisson();
  });

  // exponential
  const exExplain = document.getElementById('ex-explain');
  if (exExplain) exExplain.addEventListener('click', explainExponential);
  const exExample = document.getElementById('ex-example');
  if (exExample) exExample.addEventListener('click', () => {
    document.getElementById('ex-lam').value = 0.5;
    document.getElementById('ex-x').value = 2;
    explainExponential();
  });

  // normal
  const normExplain = document.getElementById('norm-explain');
  if (normExplain) normExplain.addEventListener('click', explainNormal);
  const normExample = document.getElementById('norm-example');
  if (normExample) normExample.addEventListener('click', () => {
    document.getElementById('norm-mu').value = 100;
    document.getElementById('norm-sigma').value = 15;
    document.getElementById('norm-x').value = 115;
    document.getElementById('norm-a').value = 85;
    document.getElementById('norm-b').value = 120;
    explainNormal();
  });

  // inverse helpers
  document.querySelectorAll('[data-inverse-for]').forEach(btn => {
    btn.addEventListener('click', () => {
      const forId = btn.dataset.inverseFor;
      if (forId.startsWith('norm')) inverseNormal(forId);
      else if (forId.startsWith('bin')) inverseBinomial(forId);
      else if (forId.startsWith('ps')) inversePoisson(forId);
      else if (forId.startsWith('ex')) inverseExponential(forId);
      else if (forId.startsWith('uni')) inverseUniform(forId);
    });
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