const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correctAnswer: "Paris",
  },
  {
    question: "What is HTML",
    options: [
      "Hyper Test Markup",
      "Hyper Test Markup Language",
      "Hyper Text Markup Script",
      "Hyper Text Markup Language",
    ],
    correctAnswer: "Hyper Text Markup Language",
  },
  {
    question: "What is CSS",
    options: [
      "Hyper Test Markup",
      "Hyper Test Markup Language",
      "Cascading Styleheet",
      "Hyper Text Markup Language",
    ],
    correctAnswer: "Cascading Styleheet",
  },
];

let currentQuestionIndex = 0;
let score = 0;

const quizHeader = document.querySelector(".quiz-header");
const quizQuestionHeader = document.querySelector(".quiz-question-header");
const quizQuestionsList = document.querySelector(".quiz-questions-list");
const progressBar = document.querySelector(".progress-bar");
const button = document.querySelector(".quiz-button");

// Function to update progress bar
function updateProgressBar() {
  let progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

// Function to display the question
function showQuestion() {
  const questionData = questions[currentQuestionIndex];

  // Update question text
  quizQuestionHeader.innerHTML = questionData.question;

  // Clear old options
  quizQuestionsList.innerHTML = "";

  // Add new options dynamically using insertAdjacentHTML
  questionData.options.forEach((questionOption) => {
    let ui = `
        <li class="options">${questionOption}</li>
      `;
    quizQuestionsList.insertAdjacentHTML("beforeend", ui);
  });

  // Update progress
  quizHeader.innerHTML = `Question ${currentQuestionIndex + 1}/${
    questions.length
  }`;
  updateProgressBar();
}

// Event delegation for handling answer selection
quizQuestionsList.addEventListener("click", function (event) {
  if (event.target.classList.contains("options")) {
    selectOption(event.target);
  }
});

// Function to handle answer selection
function selectOption(selectedOption) {
  // Remove "selected" class from all options
  document.querySelectorAll(".options").forEach((opt) => {
    opt.classList.remove("selected");
  });

  // Highlight selected option
  selectedOption.classList.add("selected");
}

// Function to move to the next question
function nextQuestion() {
  const selectedOption = document.querySelector(".options.selected");

  if (!selectedOption) {
    alert("Please select an answer before proceeding!");
    return;
  }

  const correctAnswer = questions[currentQuestionIndex].correctAnswer;

  // Increase score if the selected option is correct
  if (selectedOption.textContent === correctAnswer) {
    score++;
  }

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++; // Move to the next question
    showQuestion(); // Display the next question
  } else {
    console.log("Quiz Completed!");
    showResults();
  }
}

// Function to show results at the end
function showResults() {
  quizHeader.innerHTML = `Quiz Completed!`;
  quizQuestionHeader.innerHTML = `Your Score: ${score}/${questions.length} `;
  quizQuestionsList.innerHTML = "";
  progressBar.style.width = "100%"; // Full progress bar when completed
  button.textContent = "Restart Quiz";
  button.removeEventListener("click", nextQuestion);
  button.addEventListener("click", restartQuiz);
}

// Function to restart the quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  button.textContent = "Next";
  button.removeEventListener("click", restartQuiz);
  button.addEventListener("click", nextQuestion);
  showQuestion();
}

// Attach event listener to Next button
button.addEventListener("click", nextQuestion);

// Load the first question when the page loads
showQuestion();
