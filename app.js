const questions = [
  {
    question: "Hansi daha boyukdu?",
    answers: [
      { text: "fil", correct: true },
      { text: "qarisqa", correct: false },
      { text: "canavar", correct: false },
      { text: "ilan", correct: false },
    ],
  },
  {
    question: "hansi daha muhteremdi?",
    answers: [
      { text: "Karahanli", correct: false },
      { text: "Kilic", correct: false },
      { text: "LaZ-Ziyya", correct: true },
      { text: "Testere Necmi", correct: false },
    ],
  },
  {
    question: "hansi daha gucludu?",
    answers: [
      { text: "Aslan", correct: false },
      { text: "ilan", correct: false },
      { text: "zurafe", correct: false },
      { text: "Sir", correct: true },
    ],
  },
  {
    question: "hansi daha gozu qanlidir?",
    answers: [
      { text: "Karahanli", correct: false },
      { text: "Kilic", correct: false },
      { text: "LaZ-Ziyya", correct: false },
      { text: "Testere Necmi", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
   score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function showCore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextButton.innerHTML = "Play again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showCore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
