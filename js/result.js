const userAnswers = JSON.parse(localStorage.getItem("userAnswers")) || [];
let score = 0;

questions.forEach((question, index) => {
    if (userAnswers[index] === question.answer) {
        score++;
    }
});

const totalQuestions = questions.length;
const wrongAnswers = totalQuestions - score;
const percentage = Math.round((score / totalQuestions) * 100);

let status = percentage >= 50 ? "PASS" : "FAIL";

const resultSummary = document.getElementById("result-summary");

resultSummary.innerHTML = `
    <div class="result-card ${status.toLowerCase()}">
        <h2>${status}</h2>
        <p><strong>Total Questions:</strong> ${totalQuestions}</p>
        <p><strong>Correct Answers:</strong> ${score}</p>
        <p><strong>Wrong Answers:</strong> ${wrongAnswers}</p>
        <p><strong>Score:</strong> ${percentage}%</p>
    </div>
`;
