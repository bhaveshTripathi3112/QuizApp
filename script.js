const landingPage = document.getElementById('landing-page');
const quizContainer = document.getElementById('quiz-container');
const startBtn = document.getElementById('start-btn');

startBtn.addEventListener('click', () => {
  landingPage.style.display = 'none';
  quizContainer.style.display = 'block';
  fetchQuestions();
});

const questionBox = document.getElementById('question-box');
const optionsList = document.getElementById('options');
const timerEl = document.getElementById('time');
const nextBtn = document.getElementById('next-btn');
const resultBox = document.getElementById('result');

let questions = [];
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;
let selectedOption = null;

function fetchQuestions() {
    fetch('http://localhost:3000/api/questions')
      .then(res => res.json())
      .then(data => {
        questions = data;
        showQuestion();
      });
  }
  

function showQuestion() {
  const q = questions[currentIndex];
  questionBox.textContent = q.question;
  optionsList.innerHTML = '';

  q.options.forEach(option => {
    const li = document.createElement('li');
    li.textContent = option;
    li.onclick = () => {
      clearSelection();
      li.style.backgroundColor = "#bde0fe";
      selectedOption = option;
      nextBtn.style.display = "inline-block";
    };
    optionsList.appendChild(li);
  });

  startTimer();
}

function clearSelection() {
  [...optionsList.children].forEach(li => li.style.backgroundColor = "#eee");
}

function startTimer() {
  timeLeft = 10;
  timerEl.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      autoSubmit();
    }
  }, 1000);
}

function autoSubmit() {
    nextBtn.click();
}
  

nextBtn.onclick = () => {
    clearInterval(timer);
  
    const q = questions[currentIndex];
  
    // Fetch correct answer
    fetch(`http://localhost:3000/api/answers/${q.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.answer === selectedOption) {
          score++;
        }
  
        selectedOption = null;
        nextBtn.style.display = "none";
        currentIndex++;
  
        if (currentIndex < questions.length) {
          showQuestion();
        } else {
          showResult();
        }
    });
};
  
function showResult() {
  document.getElementById('quiz-container').style.display = 'none';
  resultBox.style.display = 'block';
  resultBox.innerHTML = `<h2>Quiz Completed!</h2><p>Your Score: ${score} / ${questions.length}</p>`;
}
