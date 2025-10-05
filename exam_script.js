document.addEventListener('DOMContentLoaded', () => {
    // --- STATE MANAGEMENT ---
    let ALL_MCQ = [];
    let ALL_CALC = [];
    let currentMcqIndex = null;
    let selectedMcqOption = null;
    let currentCalcIndex = 0;

    // Test State
    let testQuestions = [];
    let currentTestIndex = 0;
    let userTestAnswers = [];
    let timerInterval = null;
    let currentTestType = 'ct1'; // Default test type

    // --- DOM ELEMENTS ---
    const themeDropdown = document.getElementById('themeDropdown');
    const tabs = {
        mcq: document.getElementById('tabMCQ'),
        calc: document.getElementById('tabCalc'),
        test: document.getElementById('tabTest')
    };
    const sections = {
        mcq: document.getElementById('mcqSection'),
        calc: document.getElementById('calcSection'),
        test: document.getElementById('testSection')
    };

    // MCQ Elements
    const qListEl = document.getElementById('questionList');
    const qTitle = document.getElementById('qTitle');
    const qText = document.getElementById('qText');
    const optionsArea = document.getElementById('optionsArea');
    const explanationEl = document.getElementById('explanation');

    // Calc Elements
    const calcTitle = document.getElementById('calcTitle');
    const calcText = document.getElementById('calcText');
    const calcInput = document.getElementById('calcInput');
    const calcExplanationEl = document.getElementById('calcExplanation');

    // Test Elements
    const testStartScreen = document.getElementById('testStartScreen');
    const testInterface = document.getElementById('testInterface');
    const testResultsScreen = document.getElementById('testResultsScreen');
    const timerEl = document.getElementById('timer');
    const testQTitle = document.getElementById('testQTitle');
    const testQText = document.getElementById('testQText');
    const testOptionsArea = document.getElementById('testOptionsArea');
    const testScoreEl = document.getElementById('testScore');
    const testReviewEl = document.getElementById('testReview');

    // --- THEME ENGINE ---
    const applyTheme = (themeName) => {
        document.body.dataset.theme = themeName;
        localStorage.setItem('examTheme', themeName);
    };

    const savedTheme = localStorage.getItem('examTheme') || 'spiderman';
    themeDropdown.value = savedTheme;
    applyTheme(savedTheme);
    themeDropdown.addEventListener('change', () => applyTheme(themeDropdown.value));

    // --- TAB MANAGEMENT ---
    const switchTab = (activeTab) => {
        Object.keys(tabs).forEach(key => {
            const is_active = key === activeTab;
            tabs[key].classList.toggle('btn-primary', is_active);
            tabs[key].classList.toggle('btn-ghost', !is_active);
            sections[key].style.display = is_active ? (key === 'mcq' ? 'grid' : 'block') : 'none';
        });
    };

    Object.keys(tabs).forEach(key => {
        tabs[key].addEventListener('click', () => switchTab(key));
    });

    // --- DATA FETCHING ---
    async function loadQuestions() {
        try {
            const [mcqRes, calcRes] = await Promise.all([
                fetch('questions.json'),
                fetch('complex.json')
            ]);
            ALL_MCQ = await mcqRes.json();
            ALL_CALC = await calcRes.json();
            console.log("Questions loaded successfully.");
            initializeApp();
        } catch (error) {
            console.error("Failed to load questions:", error);
            qListEl.innerHTML = "Error loading questions. Please refresh the page.";
        }
    }

    // --- INITIALIZATION ---
    function initializeApp() {
        initMcqList();
        initCalcQuestions();
        switchTab('mcq'); // Default to MCQ tab
    }

    // --- MCQ PRACTICE MODE ---
    function initMcqList() {
        qListEl.innerHTML = '';
        const topics = [...new Set(ALL_MCQ.map(q => q.topic))];

        // Topic filter dropdown
        const topicSelect = document.createElement('select');
        topicSelect.className = 'mb-2 w-full p-1 rounded';
        topicSelect.innerHTML = `<option value="all">All Topics</option>` + topics.map(t => `<option value="${t}">${t}</option>`).join('');
        qListEl.parentNode.insertBefore(topicSelect, qListEl);

        topicSelect.addEventListener('change', () => {
            const selectedTopic = topicSelect.value;
            qListEl.innerHTML = '';
            ALL_MCQ.forEach((q, index) => {
                if (selectedTopic === 'all' || q.topic === selectedTopic) {
                    const item = document.createElement('div');
                    item.className = 'q-item';
                    item.innerHTML = `<strong>Q${q.id}</strong> — ${q.topic}`;
                    item.dataset.index = index;
                    item.addEventListener('click', () => selectMcq(index));
                    qListEl.appendChild(item);
                }
            });
        });

        // Initially load all
        topicSelect.dispatchEvent(new Event('change'));
    }

    function selectMcq(index) {
        if (index < 0 || index >= ALL_MCQ.length) return;
        currentMcqIndex = index;
        selectedMcqOption = null;
        const q = ALL_MCQ[index];

        qListEl.querySelectorAll('.q-item').forEach(el => el.classList.remove('active'));
        qListEl.querySelector(`[data-index="${index}"]`)?.classList.add('active');

        qTitle.textContent = `Question ${q.id} — ${q.topic}`;
        qText.innerHTML = q.question;
        optionsArea.innerHTML = '';

        q.options.forEach((opt, i) => {
            const o = document.createElement('div');
            o.className = 'option';
            o.dataset.index = i;
            o.innerHTML = `<strong>${String.fromCharCode(65 + i)}.</strong> <span class="ml-2">${opt}</span>`;
            o.addEventListener('click', () => {
                optionsArea.querySelectorAll('.option').forEach(n => n.classList.remove('selected'));
                o.classList.add('selected');
                selectedMcqOption = i;
            });
            optionsArea.appendChild(o);
        });

        explanationEl.style.display = 'none';
        explanationEl.innerHTML = '';
        if (window.MathJax) MathJax.typesetPromise();
    }

    document.getElementById('checkBtn').addEventListener('click', () => {
        if (currentMcqIndex === null || selectedMcqOption === null) return alert('Please select an option first.');
        const q = ALL_MCQ[currentMcqIndex];
        const isCorrect = selectedMcqOption === q.answer;

        optionsArea.querySelectorAll('.option').forEach((el, i) => {
            el.classList.remove('correct', 'wrong');
            if (i === q.answer) el.classList.add('correct');
            if (i === selectedMcqOption && !isCorrect) el.classList.add('wrong');
        });

        explanationEl.style.display = 'block';
        explanationEl.innerHTML = (isCorrect ? `<p><strong>Correct ✅</strong></p>` : `<p><strong>Incorrect ❌</strong> The correct answer is ${String.fromCharCode(65 + q.answer)}.</p>`) + `<hr class="my-2 border-white/20">` + q.explanation_html;
        if (window.MathJax) MathJax.typesetPromise();
    });

    document.getElementById('explainBtn').addEventListener('click', () => {
        if (currentMcqIndex === null) return;
        const q = ALL_MCQ[currentMcqIndex];
        explanationEl.style.display = 'block';
        explanationEl.innerHTML = q.explanation_html;
        optionsArea.querySelectorAll('.option').forEach(el => el.classList.remove('correct', 'wrong'));
        optionsArea.querySelector(`[data-index="${q.answer}"]`).classList.add('correct');
        if (window.MathJax) MathJax.typesetPromise();
    });

    document.getElementById('showAnsBtn').addEventListener('click', () => {
        if (currentMcqIndex === null) return;
        const q = ALL_MCQ[currentMcqIndex];
        optionsArea.querySelectorAll('.option').forEach(el => el.classList.remove('correct', 'wrong'));
        optionsArea.querySelector(`[data-index="${q.answer}"]`).classList.add('correct');
    });

    document.getElementById('randomBtn').addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * ALL_MCQ.length);
        selectMcq(randomIndex);
    });

    document.getElementById('resetSel').addEventListener('click', () => {
        if (currentMcqIndex !== null) selectMcq(currentMcqIndex);
    });

    // --- CALCULATIONS PRACTICE MODE ---
    function initCalcQuestions() {
        selectCalcQuestion(0);
    }

    function selectCalcQuestion(index) {
        currentCalcIndex = index;
        const q = ALL_CALC[index];
        calcTitle.textContent = `Calculation — ${q.topic}`;
        calcText.innerHTML = q.question_html;
        calcInput.value = '';
        calcExplanationEl.style.display = 'none';
        if (window.MathJax) MathJax.typesetPromise();
    }

    document.getElementById('prevCalcBtn').addEventListener('click', () => {
        if (currentCalcIndex > 0) selectCalcQuestion(currentCalcIndex - 1);
    });

    document.getElementById('nextCalcBtn').addEventListener('click', () => {
        if (currentCalcIndex < ALL_CALC.length - 1) selectCalcQuestion(currentCalcIndex + 1);
    });

    document.getElementById('calcCheckBtn').addEventListener('click', () => {
        const q = ALL_CALC[currentCalcIndex];
        const userVal = parseFloat(calcInput.value);
        if (isNaN(userVal)) return alert('Please enter a numeric answer.');

        const isCorrect = Math.abs(userVal - q.correct_answer) < 0.001;
        calcExplanationEl.style.display = 'block';
        calcExplanationEl.innerHTML = (isCorrect ? `<p><strong>Correct ✅</strong></p>` : `<p><strong>Incorrect ❌</strong> The correct answer is ${q.correct_answer}.</p>`) + `<hr class="my-2 border-white/20">` + q.solution_html;
        if (window.MathJax) MathJax.typesetPromise();
    });

    document.getElementById('calcExplainBtn').addEventListener('click', () => {
        const q = ALL_CALC[currentCalcIndex];
        calcExplanationEl.style.display = 'block';
        calcExplanationEl.innerHTML = q.solution_html;
        if (window.MathJax) MathJax.typesetPromise();
    });

    // --- TIMED TEST MODE ---
    const testSelect = document.createElement('select');
    testSelect.className = 'mb-2 w-full p-1 rounded';
    testSelect.innerHTML = `
        <option value="ct1">Class Test 1 (25 Qs)</option>
        <option value="ct2">Class Test 2 (25 Qs)</option>
        <option value="exam">Exam (35 Qs)</option>`;
    testStartScreen.insertBefore(testSelect, testStartScreen.firstChild);

    testSelect.addEventListener('change', () => currentTestType = testSelect.value);

    document.getElementById('startTestBtn').addEventListener('click', startTest);

    function startTest() {
        let numQuestions = 25;
        let questionRange = [0, 107];

        if (currentTestType === 'ct2') {
            numQuestions = 25;
            questionRange = [107, 261];
        } else if (currentTestType === 'exam') {
            numQuestions = 35;
            questionRange = [261, 300];
        }

        const topicMap = {};
        for (let i = questionRange[0]; i < questionRange[1]; i++) {
            const q = ALL_MCQ[i];
            if (!topicMap[q.topic]) topicMap[q.topic] = [];
            topicMap[q.topic].push(q);
        }

        const questions = [];
        const topics = Object.keys(topicMap);

        // Ensure each topic included once if possible
        topics.forEach(t => {
            if (questions.length < numQuestions) {
                const arr = topicMap[t];
                questions.push(arr[arr.length - 1]); // take later questions
            }
        });

        // Fill remaining randomly from pool
        const remaining = [];
        for (let t of topics) remaining.push(...topicMap[t]);
        remaining.sort(() => 0.5 - Math.random());
        while (questions.length < numQuestions && remaining.length > 0) {
            const q = remaining.pop();
            if (!questions.includes(q)) questions.push(q);
        }

        testQuestions = questions.slice(0, numQuestions);
        currentTestIndex = 0;
        userTestAnswers = new Array(numQuestions).fill(null);

        testStartScreen.style.display = 'none';
        testResultsScreen.style.display = 'none';
        testInterface.style.display = 'block';

        renderTestQuestion();
        startTimer((currentTestType === 'exam' ? 120 : 90) * 60); // 2 hours for exam, 90 mins for CT
    }

    function startTimer(duration) {
        let timer = duration;
        timerInterval = setInterval(() => {
            const minutes = Math.floor(timer / 60);
            const seconds = timer % 60;
            timerEl.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
            if (--timer < 0) {
                clearInterval(timerInterval);
                alert("Time's up! Submitting test...");
                submitTest();
            }
        }, 1000);
    }

    function renderTestQuestion() {
        const q = testQuestions[currentTestIndex];
        const total = testQuestions.length;
        testQTitle.textContent = `Question ${currentTestIndex + 1} of ${total}`;
        testQText.innerHTML = q.question;
        testOptionsArea.innerHTML = '';

        q.options.forEach((opt, i) => {
            const o = document.createElement('div');
            o.className = 'option';
            o.dataset.index = i;
            o.innerHTML = `<strong>${String.fromCharCode(65 + i)}.</strong> <span class="ml-2">${opt}</span>`;
            if (userTestAnswers[currentTestIndex] === i) o.classList.add('selected');
            o.addEventListener('click', () => {
                userTestAnswers[currentTestIndex] = i;
                testOptionsArea.querySelectorAll('.option').forEach(n => n.classList.remove('selected'));
                o.classList.add('selected');
            });
            testOptionsArea.appendChild(o);
        });

        document.getElementById('prevTestBtn').style.display = currentTestIndex > 0 ? 'inline-flex' : 'none';
        document.getElementById('nextTestBtn').style.display = currentTestIndex < total - 1 ? 'inline-flex' : 'none';
        document.getElementById('submitTestBtn').style.display = currentTestIndex === total - 1 ? 'inline-flex' : 'none';

        if (window.MathJax) MathJax.typesetPromise();
    }

    document.getElementById('nextTestBtn').addEventListener('click', () => {
        if (currentTestIndex < testQuestions.length - 1) {
            currentTestIndex++;
            renderTestQuestion();
        }
    });

    document.getElementById('prevTestBtn').addEventListener('click', () => {
        if (currentTestIndex > 0) {
            currentTestIndex--;
            renderTestQuestion();
        }
    });

    document.getElementById('submitTestBtn').addEventListener('click', submitTest);

    function submitTest() {
        clearInterval(timerInterval);
        let score = 0;
        userTestAnswers.forEach((answer, index) => {
            if (answer === testQuestions[index].answer) score++;
        });

        testInterface.style.display = 'none';
        testResultsScreen.style.display = 'block';

        testScoreEl.innerHTML = `Your Score: <strong>${score} out of ${testQuestions.length}</strong> (${(score / testQuestions.length * 100).toFixed(1)}%)`;
        renderTestReview();
    }

    function renderTestReview() {
        testReviewEl.innerHTML = '<h3 class="font-bold text-xl mb-4">Question Review</h3>';
        testQuestions.forEach((q, i) => {
            const userAnswer = userTestAnswers[i];
            const isCorrect = userAnswer === q.answer;
            const reviewItem = document.createElement('div');
            reviewItem.className = 'review-item';

            let resultIcon = isCorrect ? '✅' : '❌';
            let userAnswerText = userAnswer !== null ? String.fromCharCode(65 + userAnswer) : "Not Answered";
            let correctAnswerText = String.fromCharCode(65 + q.answer);

            reviewItem.innerHTML = `
                <p class="font-bold">Question ${i+1}: ${resultIcon}</p>
                <p class="my-2">${q.question}</p>
                <p>You answered: <strong>${userAnswerText}</strong>. Correct answer: <strong>${correctAnswerText}</strong>.</p>
                ${!isCorrect ? `<div class="steps mt-2">${q.explanation_html}</div>` : ''}
            `;
            testReviewEl.appendChild(reviewItem);
        });
        if (window.MathJax) MathJax.typesetPromise();
    }

    // --- LOAD INITIAL DATA ---
    loadQuestions();
});
