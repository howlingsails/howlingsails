/* cap10typez.js */
// ====================== DOM Elements ======================
const addCommandButton   = document.getElementById('addCommandButton');
const ownCommandsInput   = document.getElementById('ownCommandsInput');
const startButton        = document.getElementById('startButton');
const gameArea           = document.getElementById('gameArea');
const commandDescription = document.getElementById('commandDescription');
const commandDisplay     = document.getElementById('commandDisplay');
const typingInput        = document.getElementById('typingInput');
const feedback           = document.getElementById('feedback');
const encouragementDisplay = document.getElementById('encouragement');
const attemptsDisplay    = document.getElementById('attempts');
const pointsDisplay      = document.getElementById('points');
const speedDisplay       = document.getElementById('speed');
const progressBar        = document.getElementById('progressBar');
const historyTableBody   = document.querySelector('#historyTable tbody');
const pointsChartCanvas  = document.getElementById('pointsChart');
const avg5Display        = document.getElementById('avg5');
const avg10Display       = document.getElementById('avg10');
const starsDisplay       = document.getElementById('starsDisplay');
const categoryGrid       = document.getElementById('categoryGrid');
const ctx                = pointsChartCanvas.getContext('2d');

// ====================== Config & State ======================
let commands = [];              // {command, description}[]
let currentCommand = '';
let currentDescription = '';
let attempts = 0;
let allowedMistakes = 1;

let typingPoints = 0;           // accumulated char‐points for star thresholds
let totalStars = 0;             // stars earned today
let points = 0;                 // total points today

let startTime = null;
let firstCharTyped = false;

const BONUS_DURATION_MIN = 5;  // minutes for star threshold calc
const BASELINE_WPM     = 10;    // starting speed
const CHAR_PER_WORD    = 5;

let lastFiveWPM = [];

const encouragementMessages = [
    "Great job! Keep going!",
    "You're doing awesome!",
    "Stay focused!",
    "Almost there!",
    "Keep up the good work!",
    "Don't give up!",
    "You're getting better!",
    "Fantastic effort!",
    "Keep typing!",
    "You're a typing star!",
    "Excellent work!",
    "You're on fire!",
    "Keep the momentum!",
    "Outstanding!",
    "You're improving!",
    "Keep pushing!",
    "Nice typing!",
    "You're nailing it!",
    "Superb!",
    "You're unstoppable!"
];

const mistakeMessages = [
    "You can do better!",
    "Dude, focus!",
    "NO MISTAKES!",
    "Shake it off!",
    "Stay sharp!",
    "Keep trying!",
    "Don't slip up!",
    "Stay on track!",
    "Concentrate!",
    "Keep your eyes on the prize!",
    "Stay alert!",
    "Don't lose focus!",
    "Keep your head in the game!",
    "Stay determined!",
    "You got this!",
    "Keep pushing forward!",
    "Stay motivated!",
    "Focus up!",
    "Don't let it slide!",
    "Keep your concentration!"
];

const gettingPointsMessages = [
    "Awesome! You've earned more points!",
    "Fantastic! Points on the way!",
    "Brilliant! Keep collecting points!",
    "Excellent! Your points are growing!",
    "Super! Points added to your tally!",
    "Great! You're racking up points!",
    "Nice! Points are yours!",
    "Well done! Points awarded!",
    "Impressive! Points boosted!",
    "Outstanding! Points secured!",
    "Terrific! Points incoming!",
    "Marvelous! Points achieved!",
    "Sensational! Points collected!",
    "Remarkable! Points granted!",
    "Phenomenal! Points increased!",
    "Spectacular! Points received!",
    "Stellar! Points boosted!",
    "Fabulous! Points earned!",
    "Magnificent! Points accumulated!",
    "Exemplary! Points credited!"
];

const starMessages = [
    "Congratulations! You've earned a Typing Star!",
    "Well done! Another Typing Star collected!",
    "Awesome! A Typing Star is yours!",
    "Fantastic! You've secured a Typing Star!",
    "Great job! You've gained a Typing Star!"
];




// ====================== Initialization ======================
window.addEventListener('DOMContentLoaded', () => {
  populateCategoryGrid();
  points = getTodayPoints();
  totalStars = getTotalStars();
  updatePointsDisplay();
  updateStarsDisplay();
  loadHistory();
  updateCharts();
});

// intro → selection
document.getElementById('readyButton').addEventListener('click', () => {
  document.getElementById('introSection').style.display     = 'none';
  document.getElementById('selectionArea').style.display   = 'block';
});

// main controls
addCommandButton.addEventListener('click', addOwnCommands);
startButton.addEventListener('click', startGame);
typingInput.addEventListener('input', handleTyping);

// ====================== Category Grid ======================
function populateCategoryGrid() {
  categoryGrid.innerHTML = '';
  for (const cat in commandCategories) {
    const container = document.createElement('div');
    container.className = 'category-item';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.id   = `cb-${cat}`;
    cb.value= cat;
    cb.addEventListener('change', handleCategoryChange);
    const label = document.createElement('label');
    label.htmlFor    = cb.id;
    label.textContent= cat;
    container.append(cb, label);
    categoryGrid.appendChild(container);
  }
}

function handleCategoryChange() {
  const checked = Array.from(categoryGrid.querySelectorAll('input:checked')).map(c=>c.value);
  document.getElementById('selectedCategoriesList').innerHTML = '';
  commands = [];
  const ta = document.getElementById('commandsTextArea');
  ta.value = '';
  checked.forEach(cat => {
    const div = document.createElement('div');
    div.textContent = cat;
    document.getElementById('selectedCategoriesList').append(div);
    commandCategories[cat].forEach(cmdObj => {
      if (!commands.some(c=>c.command===cmdObj.command)) {
        commands.push(cmdObj);
        ta.value += cmdObj.command + "\n";
      }
    });
  });
}

// ====================== Custom Commands ======================
function addOwnCommands() {
  const lines = ownCommandsInput.value.trim()
                .split('\n').map(l=>l.trim()).filter(Boolean);
  if (lines.length === 0) {
    return alert('Paste at least one command.');
  }
  let added = 0;
  lines.forEach(cmd => {
    if (!commands.some(c=>c.command===cmd)) {
      commands.push({command: cmd, description: 'Custom command'});
      added++;
    }
  });
  ownCommandsInput.value = '';
  alert(`Added ${added} custom commands.`);
}

// ====================== Game Flow ======================
function startGame() {
  if (commands.length === 0) {
    return alert('Select categories or add commands first.');
  }
  points      = getTodayPoints();
  totalStars  = getTotalStars();
  updatePointsDisplay();
  updateStarsDisplay();
  document.getElementById('selectionArea').style.display = 'none';
  gameArea.style.display = 'block';
  loadNewCommand();
}

function loadNewCommand() {
  // pick next command
  const idx = Math.floor(Math.random() * commands.length);
  currentCommand     = commands[idx].command;
  currentDescription = commands[idx].description;

  // reset typing state
  attempts        = 0;
  firstCharTyped  = false;
  startTime       = null;
  typingInput.value = '';
  typingInput.disabled = false;
  feedback.textContent = 'Start typing the command above.';
  encouragementDisplay.textContent = '';
  speedDisplay.textContent = `Typing Speed: N/A WPM`;

  // compute 5% error budget
  allowedMistakes = Math.max(1, Math.floor(currentCommand.length * 0.05));
  attemptsDisplay.textContent = `Mistakes: ${attempts} / ${allowedMistakes}`;

  // render
  commandDescription.textContent = currentDescription;
  commandDisplay.textContent     = currentCommand;
}

// ====================== Typing Handler ======================
function handleTyping() {
  const input    = typingInput.value;
  const expected = currentCommand.slice(0, input.length);

  // start timer
  if (!firstCharTyped && input.length > 0) {
    firstCharTyped = true;
    startTime = performance.now();
  }

  // mistake?
  if (input !== expected) {
    // revert to last correct prefix
    typingInput.value = expected;
    attempts++;
    playBeep();
    feedback.textContent = `❌ Mistake! ${allowedMistakes - attempts} left.`;
    attemptsDisplay.textContent = `Mistakes: ${attempts} / ${allowedMistakes}`;

    // exhausted?
    if (attempts >= allowedMistakes) {
      feedback.textContent = `⏭ Too many mistakes—skipping command.`;
      setTimeout(loadNewCommand, 800);
    }
    return;
  }

  // correct & complete?
  if (input === currentCommand) {
    // calculate speed
    const durationSec = (performance.now() - startTime) / 1000;
    const cpm         = Math.round(currentCommand.length / durationSec * 60);
    const wpm         = Math.round(cpm / CHAR_PER_WORD);
    speedDisplay.textContent = `Typing Speed: ${wpm} WPM`;

    feedback.textContent = '✅ Well done!';
    encouragementDisplay.textContent = getRandomMessage(encouragementMessages);
    speakMessage(encouragementDisplay.textContent);

    // award points: char‐points + attempts-left
    const charPts  = calculateCommandPoints(currentCommand);
    const bonusPts    = Math.max(0, allowedMistakes - attempts);
    points += charPts + bonusPts;
    typingPoints += charPts;  // for stars

    updatePointsDisplay();
    checkStarAchievement();
    saveSessionData(wpm);

    // next
    setTimeout(loadNewCommand, 1000);
  }
}

// ====================== Scoring & Stars ======================
function calculateCommandPoints(cmd) {
  const subtotal = [...cmd].reduce((sum, ch) => {
    if (/[a-z]/.test(ch)) return sum + 0.10;   // standard lower alpha
    if (/[0-9]/.test(ch)) return sum + 0.20;   // numbers
    if (/[A-Z]/.test(ch)) return sum + 0.13;   // shift alpha
    return sum + 0.42;                         // symbols and punctuation
  }, 0);
  return Math.ceil(subtotal);                  // round up to whole point
}

function updatePointsDisplay() {
  pointsDisplay.textContent = `Points: ${points}`;
}

function updateStarsDisplay() {
  starsDisplay.textContent = `Stars: ${totalStars}`;
}

function checkStarAchievement() {
  // dynamic threshold: (baseline + 5*stars_so_far) WPM × CHAR_PER_WORD × BONUS_DURATION_MIN
  const thresholdChars =
    (BASELINE_WPM + totalStars * 5)
    * CHAR_PER_WORD
    * BONUS_DURATION_MIN;

  if (typingPoints >= thresholdChars) {
    totalStars++;
    typingPoints -= thresholdChars;
    alert(getRandomMessage(starMessages));
    updateStarsDisplay();
  }
}

// ====================== Persistence & History ======================
function getTodayPoints() {
  const day = new Date().toISOString().slice(0,10);
  const hist = JSON.parse(localStorage.getItem('cap10typez_history') || '{}');
  return hist[day] || 0;
}

function getTotalStars() {
  return JSON.parse(localStorage.getItem('cap10typez_totalStars') || '0');
}

function saveSessionData(wpm) {
  const day = new Date().toISOString().slice(0,10);
  const hist = JSON.parse(localStorage.getItem('cap10typez_history') || '{}');
  hist[day] = points;
  localStorage.setItem('cap10typez_history', JSON.stringify(hist));
  localStorage.setItem('cap10typez_totalStars', JSON.stringify(totalStars));

  const sessions = JSON.parse(localStorage.getItem('cap10typez_sessions') || '[]');
  sessions.push({ timestamp: new Date().toISOString(), typingSpeed: wpm });
  localStorage.setItem('cap10typez_sessions', JSON.stringify(sessions));

  loadHistory();
  updateCharts();
}

function loadHistory() {
  const hist = JSON.parse(localStorage.getItem('cap10typez_history') || '{}');
  historyTableBody.innerHTML = '';
  Object.entries(hist)
    .sort((a,b) => b[0].localeCompare(a[0]))
    .forEach(([date,pts]) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${date}</td><td>${pts}</td>`;
      historyTableBody.appendChild(tr);
    });
}

// ====================== Charts & Averages ======================
function drawPointsChart() {
  ctx.clearRect(0,0,pointsChartCanvas.width,pointsChartCanvas.height);
  const hist  = JSON.parse(localStorage.getItem('cap10typez_history') || '{}');
  const dates = Object.keys(hist).sort().slice(-5);
  const vals  = dates.map(d=>hist[d]);

  if (!dates.length) {
    ctx.fillStyle = '#39ff14';
    ctx.font       = '16px Courier New';
    ctx.textAlign  = 'center';
    ctx.fillText('No data available',
      pointsChartCanvas.width/2,
      pointsChartCanvas.height/2
    );
    return;
  }

  const pad = 60;
  const w   = pointsChartCanvas.width - 2*pad;
  const h   = pointsChartCanvas.height - 2*pad;
  const maxP= Math.max(...vals, 10);

  // axes
  ctx.strokeStyle='#ff073a';
  ctx.beginPath(); ctx.moveTo(pad,pad);      ctx.lineTo(pad,pad+h); ctx.stroke();
  ctx.strokeStyle='#00c3ff';
  ctx.beginPath(); ctx.moveTo(pad,pad+h); ctx.lineTo(pad+w,pad+h); ctx.stroke();

  // bars + labels
  vals.forEach((v,i)=>{
    const barW = (w/dates.length)*0.5;
    const x    = pad + (w/dates.length)*i + barW*0.25;
    const barH = (v/maxP)*h;
    ctx.fillStyle = '#ffea00';
    ctx.fillRect(x, pad+h-barH, barW, barH);
    ctx.fillStyle = '#39ff14';
    ctx.textAlign = 'center';
    ctx.font      = '12px Courier New';
    ctx.fillText(v, x+barW/2, pad+h-barH-5);
    ctx.fillText(dates[i], x+barW/2, pad+h+20);
  });
}

function calculateRollingAverages() {
  const sessions = JSON.parse(localStorage.getItem('cap10typez_sessions') || '[]');
  const avg = n => {
    if (sessions.length < n) return 'N/A';
    const sum = sessions.slice(-n).reduce((a,s)=>a+s.typingSpeed,0);
    return Math.round(sum/n) + ' WPM';
  };
  avg5Display.textContent  = avg(5);
  avg10Display.textContent = avg(10);
}

function updateCharts() {
  drawPointsChart();
  calculateRollingAverages();
}

// ====================== Audio & TTS ======================
function playBeep() {
  const audioCtx = new (window.AudioContext||window.webkitAudioContext)();
  const osc = audioCtx.createOscillator();
  osc.connect(audioCtx.destination);
  osc.start();
  setTimeout(()=>osc.stop(), 200);
}

function speakMessage(msg) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(msg);
  utt.lang = 'en-US';
  window.speechSynthesis.speak(utt);
}

function getRandomMessage(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
