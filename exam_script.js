let mcqData = [];
let complexData = [];
let currentPracticeTopic = '';
let currentPracticeIndex = 0;
let testQuestions = [];
let currentTestIndex = 0;
let userTestAnswers = [];
let testTimer;
let timeRemaining = 25 * 60; // 25 minutes in seconds

// Load questions on page load
async function loadQuestions() {
    mcqData = await fetch('questions.json').then(res => res.json());
    complexData = await fetch('complex.json').then(res => res.json());
    populateTopics();
}

function populateTopics() {
    const topicSelect = document.getElementById('topic-select');
    const topics = [...new Set([...mcqData.map(q => q.topic), ...complexData.map(q => q.topic)])];
    topics.forEach(t => {
        const option = document.createElement('option');
        option.value = t;
        option.textContent = t;
        topicSelect.appendChild(option);
    });
}

// Theme persistence
function applyTheme() {
    const theme = localStorage.getItem('theme') || 'blood-red';
    if(theme === 'blood-red'){
        document.documentElement.style.setProperty('--bg-gradient', 'linear-gradient(to bottom right, #2a0000, #660000, #b30000)');
        document.documentElement.style.setProperty('--text-color', '#ffeaea');
    }
}

// ---------------- Practice Mode ----------------
function renderPracticeQuestion(topic) {
    currentPracticeTopic = topic;
    const questions = mcqData.filter(q => q.topic === topic);
    if(questions.length === 0) return;
    const q = questions[currentPracticeIndex % questions.length];
    const container = document.getElementById('practice-question-container');
    container.innerHTML = `<p>${q.question}</p>` + q.options.map((opt,i) => `
        <label><input type="radio" name="practice-answer" value="${i}">${opt}</label><br>
    `).join('');
}

function checkPracticeAnswer() {
    const selected = document.querySelector('input[name="practice-answer"]:checked');
    if(!selected) return alert('Select an answer first!');
    const answerIndex = parseInt(selected.value);
    const questions = mcqData.filter(q => q.topic === currentPracticeTopic);
    const q = questions[currentPracticeIndex % questions.length];
    const container = document.getElementById('practice-question-container');
    container.innerHTML += `<div class="explanation"><h4>Explanation:</h4><p>${q.explanation_html || q.explanation}</p></div>`;
    MathJax.typeset();
    currentPracticeIndex++;
}

// ---------------- Test Mode ----------------
function startTest() {
    testQuestions = shuffleArray(mcqData).slice(0,25);
    currentTestIndex = 0;
    userTestAnswers = Array(25).fill(null);
    document.getElementById('test-area').style.display = 'block';
    document.getElementById('mode-selection').style.display = 'none';
    renderTestQuestion();
    startTimer();
}

function renderTestQuestion() {
    const q = testQuestions[currentTestIndex];
    const container = document.getElementById('test-question-container');
    container.innerHTML = `<p>Q${currentTestIndex+1}: ${q.question}</p>` + q.options.map((opt,i) => `
        <label><input type="radio" name="test-answer" value="${i}" ${userTestAnswers[currentTestIndex]===i?'checked':''}>${opt}</label><br>
    `).join('');
}

function recordAnswer() {
    const selected = document.querySelector('input[name="test-answer"]:checked');
    userTestAnswers[currentTestIndex] = selected ? parseInt(selected.value) : null;
    if(currentTestIndex < testQuestions.length - 1){
        currentTestIndex++;
        renderTestQuestion();
    }
}

function submitTest() {
    clearInterval(testTimer);
    let score = 0;
    testQuestions.forEach((q,i) => {
        if(userTestAnswers[i] === q.answer) score++;
    });
    showResults(score);
}

function showResults(score) {
    document.getElementById('test-area').style.display = 'none';
    const resultsArea = document.getElementById('results-area');
    resultsArea.style.display = 'block';
    document.getElementById('score-summary').textContent = `You scored ${score} out of ${testQuestions.length}`;
    const review = document.getElementById('review-container');
    review.innerHTML = testQuestions.map((q,i)=>`
        <div class="review-question">
            <p>Q${i+1}: ${q.question}</p>
            <p>Your answer: ${q.options[userTestAnswers[i]] || 'No Answer'}</p>
            <p>Correct answer: ${q.options[q.answer]}</p>
            <div class="explanation">${q.explanation_html || q.explanation}</div>
        </div>
    `).join('');
    MathJax.typeset();
}

function startTimer() {
    timeRemaining = 25 * 60;
    testTimer = setInterval(() => {
        const min = Math.floor(timeRemaining/60);
        const sec = timeRemaining % 60;
        document.getElementById('timer').textContent = `${min}:${sec.toString().padStart(2,'0')}`;
        if(timeRemaining-- <= 0){
            clearInterval(testTimer);
            submitTest();
        }
    },1000);
}

// ---------------- Utilities ----------------
function shuffleArray(arr){
    return arr.map(a=>[Math.random(),a]).sort((a,b)=>a[0]-b[0]).map(a=>a[1]);
}

// ---------------- Event Listeners ----------------
document.getElementById('practice-mode-btn').addEventListener('click', ()=>{
    document.getElementById('practice-area').style.display = 'block';
    document.getElementById('mode-selection').style.display = 'none';
    renderPracticeQuestion(document.getElementById('topic-select').value);
});

document.getElementById('test-mode-btn').addEventListener('click', startTest);
document.getElementById('check-practice-answer-btn').addEventListener('click', checkPracticeAnswer);
document.getElementById('next-question-btn').addEventListener('click', recordAnswer);
document.getElementById('submit-test-btn').addEventListener('click', submitTest);
document.getElementById('restart-btn').addEventListener('click', ()=>{
    document.getElementById('results-area').style.display = 'none';
    document.getElementById('mode-selection').style.display = 'block';
});

// Initialize
applyTheme();
loadQuestions();
