let quiz = [];
let current = 0;
let score = 0;

function login() {
  let user = document.getElementById("username").value;
  localStorage.setItem("user", user);
  alert("Login Successful");
}

function addQuestion() {
  quiz.push({
    q: q.value,
    options: [a1.value, a2.value, a3.value, a4.value],
    correct: correct.value.toUpperCase()
  });
  alert("Question Added");
}

function saveQuiz() {
  localStorage.setItem("quiz", JSON.stringify(quiz));
  alert("Quiz Saved");
}

function loadQuizzes() {
  let qz = JSON.parse(localStorage.getItem("quiz"));
  if (!qz) return;
  document.getElementById("quizList").innerHTML =
    `<a href="take.html" class="btn">Start Quiz</a>`;
}

function loadQuestion() {
  let qz = JSON.parse(localStorage.getItem("quiz"));
  document.getElementById("question").innerText = qz[current].q;

  let html = "";
  qz[current].options.forEach((o, i) => {
    html += `<button onclick="check('${String.fromCharCode(65 + i)}')">${o}</button>`;
  });
  options.innerHTML = html;
}

function check(ans) {
  let qz = JSON.parse(localStorage.getItem("quiz"));
  if (ans === qz[current].correct) score++;
}

function next() {
  let qz = JSON.parse(localStorage.getItem("quiz"));
  current++;
  if (current < qz.length) {
    loadQuestion();
  } else {
    localStorage.setItem("score", score);
    window.location = "result.html";
  }
}

if (location.pathname.includes("quizzes")) loadQuizzes();
if (location.pathname.includes("take")) loadQuestion();
if (location.pathname.includes("result")) {
  document.getElementById("score").innerText =
    "Your Score: " + localStorage.getItem("score");
}
