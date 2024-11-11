const questions = [
  {
    question: "What is the capital of France?",
    A: "Berlin",
    B: "Madrid",
    C: "Paris",
    D: "Rome",
    Ans: "C",
  },
  {
    question: "Which planet is known as the Red Planet?",
    A: "Earth",
    B: "Mars",
    C: "Jupiter",
    D: "Saturn",
    Ans: "B",
  },
  {
    question: "What is the largest mammal?",
    A: "Elephant",
    B: "Blue Whale",
    C: "Giraffe",
    D: "Hippopotamus",
    Ans: "B",
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    A: "Osmium",
    B: "Oxygen",
    C: "Gold",
    D: "Iron",
    Ans: "B",
  },
  {
    question: "What is the square root of 64?",
    A: "6",
    B: "8",
    C: "7",
    D: "9",
    Ans: "B",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    A: "Charles Dickens",
    B: "Mark Twain",
    C: "William Shakespeare",
    D: "Jane Austen",
    Ans: "C",
  },
  {
    question: "What is the boiling point of water?",
    A: "100°C",
    B: "90°C",
    C: "120°C",
    D: "80°C",
    Ans: "A",
  },
  {
    question: "Which animal is known as the 'Ship of the Desert'?",
    A: "Elephant",
    B: "Camel",
    C: "Horse",
    D: "Lion",
    Ans: "B",
  },
  {
    question: "Who painted the Mona Lisa?",
    A: "Vincent van Gogh",
    B: "Pablo Picasso",
    C: "Leonardo da Vinci",
    D: "Michelangelo",
    Ans: "C",
  },
  {
    question: "What is the largest continent by area?",
    A: "Africa",
    B: "Asia",
    C: "Europe",
    D: "North America",
    Ans: "B",
  },
];

let curr_index = 0;
let score = 0;
let curr_question = questions[curr_index];
let sec = 60;
let timer;

// start quiz
function startQuiz() {
  document.querySelector(".start-container").style.display = "none";
  document.querySelector(".quiz-container").style.display = "flex";
  document.querySelector(".next-btn-container").style.display = "block";
  document.querySelector(".next-btn").innerText = "Next";
  quiz_timer();
}

// show question
function showQuestion() {
  document.querySelector("#question").innerText = curr_question["question"];
  document.querySelector(".optiontextA").innerText = curr_question["A"];
  document.querySelector(".optiontextB").innerText = curr_question["B"];
  document.querySelector(".optiontextC").innerText = curr_question["C"];
  document.querySelector(".optiontextD").innerText = curr_question["D"];
  document.querySelector("#progress-percent").innerText =
    Math.round((curr_index / questions.length) * 100) + "%";
}

showQuestion();

// next button and answer check
function nextQuestion() {
  let options = document.querySelectorAll(".options");
  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      if (options[i].value == curr_question["Ans"]) {
        score++;
      }
      options[i].checked = false;
    }
  }

  curr_index++;

  document.querySelector("#pro-bar").style.height = "18px";
  document.querySelector("#pro-bar").style.width = `${Math.round(
    (curr_index / questions.length) * 100
  )}%`;

  if (curr_index == questions.length - 1) {
    document.querySelector(".next-btn").innerText = "Submit";
  }
  if (curr_index == questions.length) {
    EndQuiz();
  } else {
    curr_question = questions[curr_index];
    showQuestion();
  }
}

//End quiz
function EndQuiz() {
  document.querySelector(".next-btn-container").style.display = "none";
  document.querySelector(".quiz-container").style.display = "none";
  document.querySelector(".results-container").style.display = "flex";
  document.querySelector("#score").innerText = score;
  if (score == 10) {
    document.querySelector(".appraise").innerText = "Excellent!! You did it";
  } else if (score >= 7 && score <= 9) {
    document.querySelector(".appraise").innerText =
      "Wonderful!! You almost had it.";
  } else if (score < 7 && score > 5) {
    document.querySelector(".appraise").innerText =
      "Great!! You are almost there";
  } else if (score < 5) {
    document.querySelector(".appraise").innerText = "Don't give up Try Again!!";
  }
}

function retryQuiz() {
  score = 0;
  curr_index = 0;
  curr_question = questions[curr_index];
  clearInterval(timer);
  timer = null;
  sec = 60;
  document.querySelector("#progress-percent").innerText = "0%";
  document.querySelector("#pro-bar").style.height = "0px";
  document.querySelector("#pro-bar").style.width = "0px";
  document.querySelector(".results-container").style.display = "none";
  document.querySelector(".start-container").style.display = "flex";
}

function quiz_timer() {
  if (timer) {
    clearInterval(timer);
  }

  timer = setInterval(() => {
    sec--;
    if (sec < 0) {
      EndQuiz();
      clearInterval(timer);
    }
    if (sec > 10) {
      document.querySelector("#time").innerText = `00:${sec}`;
    } else {
      document.querySelector("#time").innerText = `00:0${sec}`;
    }
  }, 1000);
}
