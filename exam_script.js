let questions = [];
let complexQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;
let timerInterval;
let testQuestions = [];
let testDuration = 25 * 60; // 25 minutes in seconds

document.addEventListener("DOMContentLoaded", async () => {
    await loadQuestions();
    populateTopics();
    initTheme();

    document.getElementById("practiceModeBtn").onclick = () => {
        document.getElementById("modeSelection").style.display = "none";
        document.getElementById("topicSelection").style.display = "block";
    };

    document.getElementById("complexModeBtn").onclick = () => {
        startComplexPractice();
    };

    document.getElementById("testModeBtn").onclick = () => {
        startTest();
    };

    document.getElementById("startPracticeBtn").onclick = () => {
        let topic = document.getElementById("topicSelect").value;
        renderPracticeQuestion(topic);
    };

    document.getElementById("submitAnswerBtn").onclick = () => {
        checkPracticeAnswer();
    };

    document.getElementById("nextQuestionBtn").onclick = () => {
        nextPracticeQuestion();
    };

    document.getElementById("restartTestBtn").onclick = () => {
        location.reload();
    };

    document.getElementById("themeSelect").onchange = () => {
        applyTheme(document.getElementById("themeSelect").value);
    };
});

async function loadQuestions() {
    questions = await fetch('questions.json').then(res => res.json());
    complexQuestions = await fetch('complex.json').then(res => res.json());
}

function populateTopics() {
    let topics = [...new Set(questions.map(q => q.topic))];
    let select = document.getElementById("topicSelect");
    topics.forEach(t => {
        let opt = document.createElement("option");
        opt.value = t;
        opt.textContent = t;
        select.appendChild(opt);
    });
}

// ---------------- Practice Mode ----------------
let currentPracticeQuestions = [];
let currentPracticeTopic = "";

function renderPracticeQuestion(topic) {
    currentPracticeTopic = topic;
    currentPracticeQuestions = questions.filter(q => q.topic === topic);
    currentQuestionIndex = 0;
    userAnswers = [];
    document.getElementById("topicSelection").style.display = "none";
    document.getElementById("questionArea").style.display = "block";
    displayPracticeQuestion();
}

function displayPracticeQuestion() {
    const q = currentPracticeQuestions[currentQuestionIndex];
    document.getElementById("questionContainer").innerHTML = `<h3>${q.question}</h3>`;
    const optionsDiv = document.getElementById("optionsContainer");
    optionsDiv.innerHTML = "";
    q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => {
            userAnswers[currentQuestionIndex] = i;
            checkPracticeAnswer();
        };
        optionsDiv.appendChild(btn);
    });
    document.getElementById("complexAnswerInput").style.display = "none";
    document.getElementById("submitAnswerBtn").style.display = "none";
    document.getElementById("nextQuestionBtn").style.display = "none";
}

function checkPracticeAnswer() {
    const q = currentPracticeQuestions[currentQuestionIndex];
    const userAnswer = userAnswers[currentQuestionIndex];
    const container = document.getElementById("questionContainer");
    if(userAnswer === q.answer) {
        container.innerHTML += `<p style="color:green;"><b>Correct!</b></p>${q.explanation_html}`;
    } else {
        container.innerHTML += `<p style="color:red;"><b>Incorrect!</b></p>Your Answer: ${q.options[userAnswer] || 'None'}<br>${q.explanation_html}`;
    }
    document.getElementById("nextQuestionBtn").style.display = "inline-block";
}

function nextPracticeQuestion() {
    currentQuestionIndex++;
    if(currentQuestionIndex >= currentPracticeQuestions.length) {
        alert("You've completed all questions in this topic!");
        location.reload();
    } else {
        displayPracticeQuestion();
    }
}

// ---------------- Complex Mode ----------------
let currentComplexIndex = 0;

function startComplexPractice() {
    currentComplexIndex = 0;
    userAnswers = [];
    document.getElementById("modeSelection").style.display = "none";
    document.getElementById("questionArea").style.display = "block";
    displayComplexQuestion();
}

function displayComplexQuestion() {
    const q = complexQuestions[currentComplexIndex];
    document.getElementById("questionContainer").innerHTML = q.question_html;
    document.getElementById("complexAnswerInput").style.display = "inline-block";
    document.getElementById("submitAnswerBtn").style.display = "inline-block";
    document.getElementById("nextQuestionBtn").style.display = "none";
}

function checkComplexAnswer() {
    const q = complexQuestions[currentComplexIndex];
    const userAnswer = document.getElementById("complexAnswerInput").value.trim();
    userAnswers[currentComplexIndex] = userAnswer;
    const container = document.getElementById("questionContainer");
    if(userAnswer === q.correct_answer) {
        container.innerHTML += `<p style="color:green;"><b>Correct!</b></p>${q.solution_html}`;
    } else {
        container.innerHTML += `<p style="color:red;"><b>Incorrect!</b></p>Your Answer: ${userAnswer}<br>${q.solution_html}`;
    }
    document.getElementById("nextQuestionBtn").style.display = "inline-block";
    document.getElementById("submitAnswerBtn").style.display = "none";
}

document.getElementById("submitAnswerBtn").addEventListener("click", checkComplexAnswer);

document.getElementById("nextQuestionBtn").addEventListener("click", () => {
    currentComplexIndex++;
    if(currentComplexIndex >= complexQuestions.length) {
        alert("You've completed all complex questions!");
        location.reload();
    } else {
        displayComplexQuestion();
    }
});

// ---------------- Test Mode ----------------
function startTest() {
    userAnswers = [];
    score = 0;
    currentQuestionIndex = 0;
    testQuestions = shuffleArray([...questions]).slice(0,25);
    document.getElementById("modeSelection").style.display = "none";
    document.getElementById("timerArea").style.display = "block";
    document.getElementById("questionArea").style.display = "block";
    renderTestQuestion();
    startTimer();
}

function renderTestQuestion() {
    const q = testQuestions[currentQuestionIndex];
    document.getElementById("questionContainer").innerHTML = `<h3>Q${currentQuestionIndex+1}: ${q.question}</h3>`;
    const optionsDiv = document.getElementById("optionsContainer");
    optionsDiv.innerHTML = "";
    q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => {
            recordAnswer(i);
        };
        optionsDiv.appendChild(btn);
    });
    document.getElementById("complexAnswerInput").style.display = "none";
    document.getElementById("submitAnswerBtn").style.display = "none";
    document.getElementById("nextQuestionBtn").style.display = "none";
}

function recordAnswer(selected) {
    userAnswers[currentQuestionIndex] = selected;
    currentQuestionIndex++;
    if(currentQuestionIndex >= testQuestions.length) {
        submitTest();
    } else {
        renderTestQuestion();
    }
}

function submitTest() {
    clearInterval(timerInterval);
    score = testQuestions.reduce((acc, q, idx) => acc + (userAnswers[idx] === q.answer ? 1 : 0), 0);
    showResults();
}

function showResults() {
    document.getElementById("questionArea").style.display = "none";
    document.getElementById("timerArea").style.display = "none";
    document.getElementById("resultsArea").style.display = "block";
    document.getElementById("scoreDisplay").textContent = `Your Score: ${score} / ${testQuestions.length}`;
    const review = document.getElementById("reviewContainer");
    review.innerHTML = "";
    testQuestions.forEach((q, idx) => {
        const div = document.createElement("div");
        div.innerHTML = `<h4>Q${idx+1}: ${q.question}</h4>
                         <p>Your Answer: ${q.options[userAnswers[idx]] || 'None'}</p>
                         <p>Correct Answer: ${q.options[q.answer]}</p>
                         ${q.explanation_html}`;
        review.appendChild(div);
    });
}

// ---------------- Timer ----------------
function startTimer() {
    let timeLeft = testDuration;
    const timerEl = document.getElementById("timer");
    timerInterval = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerEl.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
        if(timeLeft <= 0) {
            clearInterval(timerInterval);
            submitTest();
        }
        timeLeft--;
    }, 1000);
}

// ---------------- Utilities ----------------
function shuffleArray(array) {
    for(let i = array.length -1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// ---------------- Theme ----------------
function initTheme() {
    const saved = localStorage.getItem("theme") || "spiderman";
    applyTheme(saved);
    document.getElementById("themeSelect").value = saved;
}

function applyTheme(theme) {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
}
