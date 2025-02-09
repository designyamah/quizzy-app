const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correctAnswer: "Paris",
  },
  {
    question: "What is HTML?",
    options: [
      "Hyper Test Markup",
      "Hyper Test Markup Language",
      "Hyper Text Markup Script",
      "Hyper Text Markup Language",
    ],
    correctAnswer: "Hyper Text Markup Language",
  },
  {
    question: "What is CSS?",
    options: [
      "Hyper Test Markup",
      "Hyper Test Markup Language",
      "Cascading Stylesheet",
      "Hyper Text Markup Language",
    ],
    correctAnswer: "Cascading Stylesheet",
  },
  {
    question:
      "Which programming language is known as the 'mother of all languages'?",
    options: ["C", "Python", "Java", "Assembly"],
    correctAnswer: "C",
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "/* */", "#", "--"],
    correctAnswer: "//",
  },
  {
    question: "What does HTTP stand for?",
    options: [
      "HyperText Transfer Protocol",
      "Hyper Transfer Text Protocol",
      "Hyperlink Text Transfer Protocol",
      "High Tech Transfer Protocol",
    ],
    correctAnswer: "HyperText Transfer Protocol",
  },
  {
    question: "What does JS stand for?",
    options: ["Java Style", "JavaScript", "Just Script", "Jumping Syntax"],
    correctAnswer: "JavaScript",
  },
  {
    question: "Which of the following is a JavaScript framework?",
    options: ["React", "Bootstrap", "Django", "Laravel"],
    correctAnswer: "React",
  },
  {
    question: "Which CSS property controls text size?",
    options: ["font-size", "text-size", "size", "font-style"],
    correctAnswer: "font-size",
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Apple", "Netscape", "Google"],
    correctAnswer: "Netscape",
  },

  {
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["Number", "String", "Boolean", "Character"],
    correctAnswer: "Character",
  },
  {
    question: "Which array method removes the last element from an array?",
    options: ["pop()", "shift()", "slice()", "splice()"],
    correctAnswer: "pop()",
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "let", "const", "All of the above"],
    correctAnswer: "All of the above",
  },
];

//keep track of the currently selected question
let currentQuestionIndex = 0;
//keep track of the scores
let score = 0;

//select all the required dom elements
const quizHeader = document.querySelector(".quiz-header");
const quizQuestionCounter = document.querySelector(".quiz-question-counter");
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
  quizQuestionCounter.innerHTML = `Question ${currentQuestionIndex + 1}/${
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
  quizQuestionCounter.innerHTML = `Quiz Completed!`;
  quizHeader.innerHTML = `${
    score >= questions.length ? "Brains indeed 👍 " : "Up your game 😜"
  }`;
  quizQuestionHeader.innerHTML = `My Brains Score: ${score}/${questions.length} `;
  quizQuestionsList.innerHTML = "";
  progressBar.style.width = "100%"; // Full progress bar when completed
  button.innerHTML = `Test my Brains Again <ion-icon name="refresh-outline"></ion-icon>`;
  button.removeEventListener("click", nextQuestion);
  button.addEventListener("click", restartQuiz);
}

// Function to restart the quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  button.innerHTML = `Next <ion-icon name="arrow-forward-outline"></ion-icon>`;
  button.removeEventListener("click", restartQuiz);
  button.addEventListener("click", nextQuestion);
  showQuestion();
  quizHeader.innerHTML = `Got the brains 🤯, lets see 👇`;
}

// Attach event listener to Next button
button.addEventListener("click", nextQuestion);

// Load the first question when the page loads
showQuestion();
