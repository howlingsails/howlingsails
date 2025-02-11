/* cap10typez.js */
// ====================== DOM Elements ======================
const addCommandButton = document.getElementById('addCommandButton');
const ownCommandsInput = document.getElementById('ownCommandsInput');
const startButton = document.getElementById('startButton');
const gameArea = document.getElementById('gameArea');
const commandDescription = document.getElementById('commandDescription');
const commandDisplay = document.getElementById('commandDisplay');
const typingInput = document.getElementById('typingInput');
const feedback = document.getElementById('feedback');
const attemptsDisplay = document.getElementById('attempts');
const encouragementDisplay = document.getElementById('encouragement');
const pointsDisplay = document.getElementById('points');
const speedDisplay = document.getElementById('speed');
const progressBar = document.getElementById('progressBar');
const historyTableBody = document.querySelector('#historyTable tbody');
const pointsChartCanvas = document.getElementById('pointsChart');
const avg5Display = document.getElementById('avg5');
const avg10Display = document.getElementById('avg10');
const starsDisplay = document.getElementById('starsDisplay'); // New Element for Stars

// New DOM element for category grid
const categoryGrid = document.getElementById('categoryGrid');

// Initialize Canvas for Points Chart
const ctx = pointsChartCanvas.getContext('2d');

// ====================== Variables ======================
let commands = []; // Array of objects: {command: '', description: ''}
let currentCommand = '';
let currentDescription = '';
let attempts = 0;
const maxAttempts = 5;

let typingPoints = 0; // Accumulated points from characters typed
let starMultiplier = 1; // Starts at 1, doubles with each 200-point streak
let totalStars = 0; // Total stars collected

let points = 0; // Total points including command bonuses
let startTime = null; // To track typing speed
let firstCharTyped = false; // To start timer on first character

let lastFiveWPM = []; // To track last 5 WPM

// ====================== Messages ======================
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
    updatePointsDisplay();
    updateStarsDisplay();
    loadHistory();
    updateCharts();
});

document.addEventListener("DOMContentLoaded", function () {
    const introSection = document.getElementById("introSection");
    const selectionArea = document.getElementById("selectionArea");
    const readyButton = document.getElementById("readyButton");

    // Hide selection area until they click "I'm Ready!"
    selectionArea.style.display = "none";

    readyButton.addEventListener("click", function () {
        introSection.style.display = "none";
        selectionArea.style.display = "block";
    });
});

// ====================== Event Listeners ======================
addCommandButton.addEventListener('click', addOwnCommands);
startButton.addEventListener('click', startGame);
typingInput.addEventListener('input', handleTyping);

// ====================== New Functionality for Category Grid ======================
function populateCategoryGrid() {
    // Clear the grid first
    categoryGrid.innerHTML = '';
    for (const category in commandCategories) {
        const container = document.createElement('div');
        container.className = 'category-item';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `checkbox-${category}`;
        checkbox.value = category;
        checkbox.addEventListener('change', handleCategoryChange);
        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = category;
        container.appendChild(checkbox);
        container.appendChild(label);
        categoryGrid.appendChild(container);
    }
}

function handleCategoryChange() {
    const checkedBoxes = document.querySelectorAll('#categoryGrid input[type="checkbox"]:checked');
    const selectedCategories = Array.from(checkedBoxes).map(cb => cb.value);

    const selectedCategoriesList = document.getElementById('selectedCategoriesList');
    selectedCategoriesList.innerHTML = '';
    commands = [];
    const commandsTextArea = document.getElementById('commandsTextArea');
    commandsTextArea.value = '';

    selectedCategories.forEach(category => {
        // Now just output the category name without the extra text
        const categoryLabel = document.createElement('div');
        categoryLabel.textContent = category;
        selectedCategoriesList.appendChild(categoryLabel);

        commandCategories[category].forEach(cmdObj => {
            if (!commands.some(cmd => cmd.command === cmdObj.command)) {
                commands.push({
                    command: cmdObj.command,
                    description: cmdObj.description
                });
                commandsTextArea.value += `${cmdObj.command}\n`;
            }
        });
    });
}

// ====================== Functions ======================
function addOwnCommands() {
    const ownCommandsText = ownCommandsInput.value.trim();
    if (ownCommandsText === '') {
        alert('Please paste your own commands before adding.');
        return;
    }
    const ownCommands = ownCommandsText.split('\n').map(cmd => cmd.trim()).filter(cmd => cmd.length > 0);
    ownCommands.forEach(cmd => {
        if (!commands.some(existingCmd => existingCmd.command === cmd)) {
            commands.push({ command: cmd, description: 'Custom command' });
        }
    });
    ownCommandsInput.value = '';
    alert(`Added ${ownCommands.length} custom commands.`);
}

function startGame() {
    if (commands.length === 0) {
        alert('Please select at least one command category or add your own commands before starting the game.');
        return;
    }
    attempts = 0;
    typingPoints = 0;
    starMultiplier = 1;
    totalStars = getTotalStars();
    points = getTodayPoints();
    updatePointsDisplay();
    updateStarsDisplay();
    attemptsDisplay.textContent = `Attempts: ${attempts} / ${maxAttempts}`;
    feedback.textContent = '';
    encouragementDisplay.textContent = '';
    speedDisplay.textContent = `Typing Speed: N/A WPM`;
    updateProgressBar();
    speakMessage("Game started! Good luck!");

    const selectionArea = document.getElementById('selectionArea');
    selectionArea.style.display = 'none';
    gameArea.style.display = 'block';
    typingInput.disabled = false;
    typingInput.value = '';
    typingInput.focus();

    lastFiveWPM = [];
    loadNewCommand();
}

function loadNewCommand() {
    if (commands.length === 0) {
        gameOver();
        return;
    }
    const randomIndex = Math.floor(Math.random() * commands.length);
    currentCommand = commands[randomIndex].command;
    currentDescription = commands[randomIndex].description;

    commandDescription.textContent = currentDescription;
    speakMessage(currentDescription);
    commandDisplay.textContent = currentCommand;
    typingInput.value = '';
    typingInput.disabled = false;
    feedback.textContent = 'Start typing the command above.';
    encouragementDisplay.textContent = '';
    speedDisplay.textContent = `Typing Speed: N/A WPM`;
    updateProgressBar();
    firstCharTyped = false;
}

function handleTyping(event) {
    const userInput = typingInput.value;
    const expectedInput = currentCommand.substring(0, userInput.length);
    if (!firstCharTyped && userInput.length > 0) {
        startTime = new Date();
        firstCharTyped = true;
    }
    if (!window.keyAttempts) {
        window.keyAttempts = {};
    }
    const currentKey = userInput.slice(-1);
    if (userInput !== expectedInput) {
        if (!window.keyAttempts[currentKey]) {
            window.keyAttempts[currentKey] = 0;
        }
        window.keyAttempts[currentKey] += 1;
        if (window.keyAttempts[currentKey] >= maxAttempts) {
            playBeep();
            feedback.textContent = `Too many mistakes for '${currentKey}'. Restarting from the last correct position...`;
            typingInput.value = currentCommand.substring(0, userInput.length - 1);
            window.keyAttempts[currentKey] = 0;
        } else {
            playBeep();
            const remainingAttempts = maxAttempts - window.keyAttempts[currentKey];
            feedback.textContent = `Incorrect key '${currentKey}'. ${remainingAttempts} attempts remaining.`;
        }
    } else {
        delete window.keyAttempts[currentKey];
        if (userInput === currentCommand) {
            feedback.textContent = 'Well done! You typed the command correctly.';
            const encouragement = getRandomMessage(encouragementMessages);
            encouragementDisplay.textContent = encouragement;
            speakMessage(encouragement);

            const endTime = new Date();
            const durationInSeconds = (endTime - startTime) / 1000;
            const cpm = Math.round(currentCommand.length / durationInSeconds * 60);
            const wpm = Math.round(cpm / 5);
            speedDisplay.textContent = `Typing Speed: ${wpm} WPM`;

            lastFiveWPM.push(wpm);
            if (lastFiveWPM.length > 5) {
                lastFiveWPM.shift();
            }

            const charPoints = calculateCharacterPoints(currentCommand);
            points += charPoints + 5;
            typingPoints += charPoints;
            updatePointsDisplay();
            checkStarAchievement();
            saveSessionData(wpm);
            setTimeout(() => {
                loadNewCommand();
            }, 1000);
        } else {
            feedback.textContent = 'Keep going...';
            const encouragement = getRandomMessage(encouragementMessages);
            encouragementDisplay.textContent = encouragement;
        }
    }
    updateProgressBar();
}

function calculateCharacterPoints(command) {
    let pts = 0;
    for (const char of command) {
        if (isSpecialCharacter(char)) {
            pts += 2;
        } else {
            pts += 1;
        }
    }
    return pts;
}

function isSpecialCharacter(char) {
    const specialChars = /[~`!@#$%^&*()\-_=+\[\]{};:'",.<>/?\\|]/;
    return specialChars.test(char);
}

function updatePointsDisplay() {
    pointsDisplay.textContent = `Points: ${points}`;
}

function updateStarsDisplay() {
    starsDisplay.textContent = `Stars: ${totalStars}`;
}

function getTodayPoints() {
    const today = new Date().toISOString().split('T')[0];
    const history = JSON.parse(localStorage.getItem('cap10typez_history')) || {};
    return history[today] || 0;
}

function getTotalStars() {
    const stars = JSON.parse(localStorage.getItem('cap10typez_totalStars')) || 0;
    return stars;
}

function saveSessionData(wpm) {
    const today = new Date().toISOString().split('T')[0];
    const history = JSON.parse(localStorage.getItem('cap10typez_history')) || {};
    const sessions = JSON.parse(localStorage.getItem('cap10typez_sessions')) || [];
    if (wpm !== null) {
        history[today] = points;
    }
    localStorage.setItem('cap10typez_history', JSON.stringify(history));
    if (wpm !== null) {
        const session = {
            timestamp: new Date().toISOString(),
            typingSpeed: wpm
        };
        sessions.push(session);
        localStorage.setItem('cap10typez_sessions', JSON.stringify(sessions));
    }
    localStorage.setItem('cap10typez_totalStars', JSON.stringify(totalStars));
    loadHistory();
    updateCharts();
    updateStarsDisplay();
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem('cap10typez_history')) || {};
    historyTableBody.innerHTML = '';
    const historyArray = Object.keys(history).map(date => ({
        date,
        points: history[date]
    })).sort((a, b) => new Date(b.date) - new Date(a.date));
    historyArray.forEach(entry => {
        const row = document.createElement('tr');
        const dateCell = document.createElement('td');
        const pointsCell = document.createElement('td');
        dateCell.textContent = entry.date;
        pointsCell.textContent = entry.points;
        row.appendChild(dateCell);
        row.appendChild(pointsCell);
        historyTableBody.appendChild(row);
    });
}

function drawPointsChart() {
    ctx.clearRect(0, 0, pointsChartCanvas.width, pointsChartCanvas.height);
    const history = JSON.parse(localStorage.getItem('cap10typez_history')) || {};
    const dates = Object.keys(history).sort();
    const last5Dates = dates.slice(-5);
    const last5Points = last5Dates.map(date => history[date]);
    if (last5Dates.length === 0) {
        ctx.fillStyle = '#39ff14';
        ctx.font = '16px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText('No data available', pointsChartCanvas.width / 2, pointsChartCanvas.height / 2);
        return;
    }
    const neonGreen = '#39ff14';
    const neonRed = '#ff073a';
    const neonBlue = '#00c3ff';
    const neonYellow = '#ffea00';
    const padding = 60;
    const chartWidth = pointsChartCanvas.width - padding * 2;
    const chartHeight = pointsChartCanvas.height - padding * 2;
    const maxPoints = Math.max(...last5Points, 10);
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, padding + chartHeight);
    ctx.strokeStyle = neonRed;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(padding, padding + chartHeight);
    ctx.lineTo(padding + chartWidth, padding + chartHeight);
    ctx.strokeStyle = neonBlue;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = neonGreen;
    ctx.font = '14px Courier New';
    ctx.textAlign = 'right';
    ctx.fillText(maxPoints, padding - 10, padding + 5);
    ctx.fillText(0, padding - 10, padding + chartHeight + 5);
    ctx.textAlign = 'center';
    last5Dates.forEach((date, index) => {
        const x = padding + (chartWidth / last5Dates.length) * (index + 0.5);
        ctx.fillText(date, x, padding + chartHeight + 20);
    });
    const barWidth = (chartWidth / last5Dates.length) * 0.5;
    last5Points.forEach((point, index) => {
        const barHeight = (point / maxPoints) * chartHeight;
        const x = padding + (chartWidth / last5Dates.length) * index + barWidth * 0.25;
        const y = padding + chartHeight - barHeight;
        ctx.fillStyle = neonYellow;
        ctx.fillRect(x, y, barWidth, barHeight);
        ctx.fillStyle = neonGreen;
        ctx.font = '12px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText(point, x + barWidth / 2, y - 5);
    });
}

function calculateRollingAverages() {
    const sessions = JSON.parse(localStorage.getItem('cap10typez_sessions')) || [];
    const totalSessions = sessions.length;
    function getAverageWpm(n) {
        if (totalSessions < n) return 'N/A';
        const lastNSessions = sessions.slice(-n);
        const sum = lastNSessions.reduce((acc, session) => acc + session.typingSpeed, 0);
        return Math.round(sum / n);
    }
    const avg5 = getAverageWpm(5);
    const avg10 = getAverageWpm(10);
    avg5Display.textContent = avg5 !== 'N/A' ? `${avg5} WPM` : 'N/A';
    avg10Display.textContent = avg10 !== 'N/A' ? `${avg10} WPM` : 'N/A';
}

function updateCharts() {
    drawPointsChart();
    calculateRollingAverages();
}

function updateProgressBar() {
    const targetPoints = 200;
    const currentThreshold = targetPoints * starMultiplier;
    const progressPercentage = (typingPoints % currentThreshold) / currentThreshold * 100;
    progressBar.style.width = `${progressPercentage}%`;
    progressBar.textContent = `${Math.floor(progressPercentage)}%`;
}

function checkStarAchievement() {
    const targetPoints = 200;
    if (typingPoints >= targetPoints) {
        const earnedStars = starMultiplier;
        totalStars += earnedStars;
        alert(getRandomMessage(starMessages));
        typingPoints -= targetPoints;
        starMultiplier *= 2;
        updateStarsDisplay();
        updateProgressBar();
    }
}

function gameOver() {
    saveSessionData(null);
    typingPoints = 0;
    starMultiplier = 1;
    updateProgressBar();
    setTimeout(() => {
        if (confirm('Game Over! Do you want to play again?')) {
            resetGame();
        }
    }, 1000);
}

function resetGame() {
    const selectionArea = document.getElementById('selectionArea');
    selectionArea.style.display = 'block';
    gameArea.style.display = 'none';
    startButton.disabled = false;
    currentCommand = '';
    currentDescription = '';
    attempts = 0;
    typingPoints = 0;
    starMultiplier = 1;
    points = getTodayPoints();
    updatePointsDisplay();
    updateStarsDisplay();
    attemptsDisplay.textContent = `Attempts: ${attempts} / ${maxAttempts}`;
    feedback.textContent = '';
    encouragementDisplay.textContent = '';
    speedDisplay.textContent = `Typing Speed: N/A WPM`;
    updateProgressBar();
}

function playBeep() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
    setTimeout(() => {
        oscillator.stop();
    }, 200);
}

function speakMessage(message) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    }
}

function getRandomMessage(messagesArray) {
    const index = Math.floor(Math.random() * messagesArray.length);
    return messagesArray[index];
}
