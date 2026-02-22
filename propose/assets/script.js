// Proposal site script — cleaned and extended
const PERSON = { her: 'Meyssem', him: 'Houssem' };

const GIFS = {
  romantic: [
    'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif',
    'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif',
    'https://media.giphy.com/media/xT0GqssRweIhlz209i/giphy.gif'
  ],
  cute: [
    'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
    'https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif',
    'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif'
  ],
  funny: [
    'https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif',
    'https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif',
    'https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif'
  ],
  funnyCats: [
    'https://media.giphy.com/media/13borq7Zo2kulO/giphy.gif',
    'https://media.giphy.com/media/12Hz1LQvQpZQY/giphy.gif',
    'https://media.giphy.com/media/10dU7AN7xsi1I4/giphy.gif',
    'https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif',
    'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
    'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif'
  ]
};

const RIDDLES = [
  { q: "I am not alive, but I grow; I don’t have lungs, but I need air; What am I?", a: ['fire'], hint: 'Think warmth and sparks.' },
  { q: "I speak without a mouth and hear without ears. I have nobody, but I come alive with wind. What am I?", a: ['echo'], hint: 'You hear me in caves and mountains.' },
  { q: "I’m light as a feather, yet the strongest person can’t hold me for five minutes. What am I?", a: ['breath','your breath'], hint: 'You do it all day without thinking.' },
  { q: "I have keys but no locks. I have space but no room. You can enter but can’t go outside. What am I?", a: ['keyboard'], hint: 'You type on me.' },
  { q: "What has hands but can’t clap?", a: ['clock','a clock'], hint: 'It tells time.' },
  { q: "I have cities but no houses, forests but no trees, and water but no fish. What am I?", a: ['map','a map'], hint: 'You use me to navigate.' },
  { q: "Forward I am heavy, backward I am not. What am I?", a: ['ton'], hint: 'Think of the wordplay.' }
];

function pickRandom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

// start button
const startButton = document.getElementById('startGame');
if (startButton) startButton.addEventListener('click', startFlow);

function startFlow(){
  const hero = document.querySelector('.hero');
  hero.innerHTML = `
    <img class="hero-gif" src="https://media.giphy.com/media/3o6gbbuLW76jkt8vIc/giphy.gif" alt="love gif">
    <h2 class="title">Ready for a tiny adventure?</h2>
    <p class="subtitle">A few silly games, some riddles, and a very important question — tailored for you, ${PERSON.her}.</p>
    <button id="playBtn" class="main-btn">Start the Fun</button>
  `;
  document.getElementById('playBtn').addEventListener('click', () => {
    startHeartGame();
  });
}

function startHeartGame(){
  const hero = document.querySelector('.hero');
  hero.innerHTML = `
    <h2 class="title">Minigame: Catch the Hearts 💘</h2>
    <p class="subtitle">Click as many cute emotes as you can in 12 seconds — every click counts as one silly promise from ${PERSON.him}.</p>
    <div id="gameArea" class="game-area"></div>
    <div style="margin-top:1em;font-size:1.6em;">🐻💖🌸😻🍓</div>
  `;
  const gameArea = document.getElementById('gameArea');
  gameArea.style.position = 'relative';
  gameArea.style.height = '320px';
  gameArea.style.margin = '1em auto';
  gameArea.style.maxWidth = '420px';
  gameArea.style.borderRadius = '14px';
  gameArea.style.overflow = 'hidden';
  gameArea.style.background = 'linear-gradient(180deg,#fff,#fffefc)';

  let score = 0; let timeLeft = 12;
  const timerEl = document.createElement('div');
  timerEl.className = 'timer'; timerEl.textContent = `⏰ ${timeLeft}s`;
  timerEl.style.position = 'absolute'; timerEl.style.top='8px'; timerEl.style.right='12px'; timerEl.style.fontWeight='700'; timerEl.style.color='#d72660';
  gameArea.appendChild(timerEl);

  const emotes = ['💖','🐻','🌸','😻','🍓','🦋','🥰','🧸','💘','🎀'];
  const spawn = setInterval(()=>{
    const s = document.createElement('span');
    s.textContent = pickRandom(emotes);
    s.style.position='absolute';
    s.style.left = Math.random()*(gameArea.clientWidth-40)+'px';
    s.style.top = Math.random()*(gameArea.clientHeight-40)+'px';
    s.style.fontSize = (18 + Math.random()*28)+'px';
    s.style.cursor='pointer';
    s.style.userSelect='none';
    s.addEventListener('click', ()=>{ score++; s.remove(); });
    gameArea.appendChild(s);
    setTimeout(()=>s.remove(),1400);
  },420);

  const tick = setInterval(()=>{
    timeLeft--; timerEl.textContent = `⏰ ${timeLeft}s`;
    if (timeLeft<=0){ clearInterval(tick); clearInterval(spawn); gameArea.innerHTML = `
      <h3 style='color:#d72660;'>Your Score: ${score}</h3>
      <p style='font-size:1.05em;'>You caught my heart, ${PERSON.her}! Ready for a riddle?</p>
      <button id='startRiddles' class='main-btn'>Yes — riddles!</button>`;
      document.getElementById('startRiddles').addEventListener('click', ()=>startRiddleFlow(0));
    }
  },1000);
}

function startRiddleFlow(index){
  showRiddle(index);
}

function showRiddle(i){
  const r = RIDDLES[i];
  const hero = document.querySelector('.hero');
  hero.innerHTML = `
    <h2 class="title">Riddle ${i+1} 🧩</h2>
    <p class="subtitle">${PERSON.her}, ${r.q}</p>
    <input id="riddleInput" type="text" placeholder="Type your answer...">
    <div class="riddle-controls">
      <button id="riddleSubmit" class="main-btn">Submit</button>
      <button id="riddleHint" class="main-btn" style="opacity:.9;">Hint</button>
      <button id="riddleSkip" class="main-btn" style="opacity:.9;">Skip</button>
    </div>
  `;
  document.getElementById('riddleHint').addEventListener('click', ()=>alert(r.hint));
  document.getElementById('riddleSkip').addEventListener('click', ()=>{
    const next = i+1; if (next < RIDDLES.length) showRiddle(next); else showSurprise();
  });
  document.getElementById('riddleSubmit').addEventListener('click', ()=>{
    const ans = document.getElementById('riddleInput').value.trim().toLowerCase();
    if (!ans) { alert(`Take your time, ${PERSON.her}. Or ask for a hint.`); return; }
    if (r.a.includes(ans)) { showSurprise(); }
    else { alert(`Almost! ${PERSON.her}, try again or use a hint.`); }
  });
}

function showSurprise(){
  const hero = document.querySelector('.hero');
  // choose a category based on a playful random
  const cat = Math.random() < 0.5 ? 'romantic' : (Math.random() < 0.6 ? 'cute' : 'funny');
  const gif = pickRandom(GIFS[cat]);
  hero.innerHTML = `
    <h2 class="title">Surprise ✨</h2>
    <p class="subtitle">${PERSON.her}, you solved it — and earned a tiny celebration. Here's something ${cat} just for you.</p>
    <img src="${gif}" class="surprise-gif" alt="surprise">
    <div style="margin-top:1em;"><button id='moreSurprise' class='main-btn'>More!</button> <button id='toFinal' class='main-btn'>Next</button></div>
  `;
  document.getElementById('moreSurprise').addEventListener('click', ()=>{
    // show two more quick gifs (cute + funny cats)
    const gif2 = pickRandom(GIFS.cute);
    const gif3 = pickRandom(GIFS.funnyCats);
    hero.innerHTML = `
      <h2 class="title">For You 💕</h2>
      <p class="subtitle">A tiny selection — because you deserve the whole internet of smiles.</p>
      <img src="${gif2}" class="surprise-gif" alt="cute">
      <img src="${gif3}" class="surprise-gif" alt="funny cat">
      <div style="margin-top:1em;"><button id='toFinal2' class='main-btn'>Okay, the Final One</button></div>
    `;
    document.getElementById('toFinal2').addEventListener('click', showProposal);
  });
  document.getElementById('toFinal').addEventListener('click', showProposal);
}

function showProposal(){
  const hero = document.querySelector('.hero');
  const gif = pickRandom(GIFS.romantic);
  hero.innerHTML = `
    <h1 class="title">Will you be my everything? 💍</h1>
    <p class="subtitle">${PERSON.her}, I'm here, a little ridiculous, a lot in love, and I want to keep making you laugh. Will you be mine — again and always?</p>
    <img src="${gif}" class="surprise-gif" alt="celebrate">
    <div style="margin-top:1em;"><button id='yesBtn' class='main-btn'>Yes, of course!</button> <button id='noBtn' class='main-btn' style='opacity:.7;pointer-events:none;'>Nope (not allowed)</button></div>
  `;
  document.getElementById('yesBtn').addEventListener('click', ()=>{
    launchConfetti();
    hero.innerHTML = `<h1 class='title' style='color:#7a3b6c;'>Yay! 🎊</h1><p class='subtitle'>${PERSON.her} & ${PERSON.him}: A thousand tiny adventures await. Let's go! 💑</p><div style='margin-top:1em;font-size:2em;'>🎉🥳💖</div>`;
  });
}

function launchConfetti(){
  const colors = ['#ff6b6b','#ffd166','#caffbf','#9bf6ff','#bdb2ff','#ffb4e6'];
  for (let i=0;i<60;i++){
    const c = document.createElement('div'); c.className='confetti';
    c.style.left = Math.random()*100+'%'; c.style.background = pickRandom(colors);
    c.style.top = '-20px'; c.style.width = (8 + Math.random()*10)+'px'; c.style.height = (12 + Math.random()*10)+'px';
    document.body.appendChild(c);
    const fall = 1800 + Math.random()*2200;
    c.animate([
      { transform: `translateY(0) rotate(${Math.random()*360}deg)`, opacity: 1 },
      { transform: `translateY(${window.innerHeight + 200}px) rotate(${Math.random()*720}deg)`, opacity: 0.9 }
    ], { duration: fall, easing: 'cubic-bezier(.2,.7,.2,1)' });
    setTimeout(()=>c.remove(), fall+300);
  }
}

// small accessibility: allow Enter to submit riddle when input exists
document.addEventListener('keydown', (e)=>{
  if (e.key === 'Enter'){
    const submit = document.getElementById('riddleSubmit');
    if (submit) submit.click();
  }
});

// If user opened directly and wants to skip straight to startFlow
if (!document.querySelector('.hero') && document.body) {
  const h = document.createElement('div'); h.className='hero'; document.body.appendChild(h);
}
