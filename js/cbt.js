let currentQuestion = 0;
let userAnswers = [];

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const optionsForm = document.getElementById("options-form");
const nextBtn = document.getElementById("next-btn");
const timerDisplay = document.getElementById("timer");

/* ===== TIMER SETTINGS ===== */
let totalTime = 5 * 60; // 5 minutes
let timer = null;

/* ===== TIMER FUNCTION ===== */
function startTimer() {
    timer = setInterval(() => {
        const minutes = Math.floor(totalTime / 60);
        const seconds = totalTime % 60;

        timerDisplay.textContent =
            `Time Left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        if (totalTime <= 0) {
            clearInterval(timer);
            autoSubmit();
        }

        totalTime--;
    }, 1000);
}

/* ===== LOAD QUESTION ===== */
function loadQuestion() {
    const q = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;
    questionText.textContent = q.question;
    optionsForm.innerHTML = "";

    q.options.forEach((option, index) => {
        const label = document.createElement("label");
        label.innerHTML = `
            <input type="radio" name="option" value="${index}">
            ${option}
        `;
        optionsForm.appendChild(label);
    });

    if (userAnswers[currentQuestion] !== undefined) {
        document.querySelector(
            `input[value="${userAnswers[currentQuestion]}"]`
        ).checked = true;
    }

    // Change button text on last question
    if (currentQuestion === questions.length - 1) {
        nextBtn.textContent = "Submit Test";
    } else {
        nextBtn.textContent = "Next";
    }
}

/* ===== NEXT / SUBMIT BUTTON ===== */
nextBtn.addEventListener("click", () => {
    const selected = document.querySelector('input[name="option"]:checked');

    if (!selected) {
        alert("Please select an answer.");
        return;
    }

    userAnswers[currentQuestion] = parseInt(selected.value);

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        submitTest();
    }
});

/* ===== SUBMIT FUNCTIONS ===== */
function submitTest() {
    if (timer) {
        clearInterval(timer);
    }

    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    window.location.href = "result.html";
}

function autoSubmit() {
    alert("Time is up! Test will be submitted.");
    submitTest();
}

/* ===== INIT ===== */
loadQuestion();
startTimer();
