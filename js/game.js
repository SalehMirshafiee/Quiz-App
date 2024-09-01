import formatDate from "./helper.js";

const level = localStorage.getItem("level") || "medium";

const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionText = document.getElementById("qustion-text");
const answerList = document.querySelectorAll(".answer-text");
const scoreText = document.querySelector(".score");
const nextButton = document.getElementById("next-button");
const finishButton = document.getElementById("finish-button");
const questionNumber = document.querySelector(".qustion-number");
const error = document.getElementById("error");

const BOUNOS_SCORE = 10;
const URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;

let formatedData = null;
let questionIndex = 0;
let correctAnswer = null;
let score = 0;
let isAccepted = true;


const fetchData = async () => {
  try {
    const response = await fetch(URL);
        const json = await response.json();
    console.log(json);
    formatedData = formatDate(json.results);
    start();
  }   catch (err) {
    loader.style.display = "none";
    error.style.display = "block";
  }
};

const showQuestion = () => {
  questionNumber.innerText = questionIndex + 1;

  const { answers, question, correctAwnserIndex } = formatedData[questionIndex];
  correctAnswer = correctAwnserIndex;
  console.log(correctAnswer);
  questionText.innerText = question;
  answerList.forEach((button, index) => {
    button.innerText = answers[index];
  });
};

const cheakAnswer = (event, index) => {
  if (!isAccepted) return;
  isAccepted = false;

  const isCorroct = index === correctAnswer ? true : false;
  if (isCorroct) {
    event.target.classList.add("corroct");
    score += BOUNOS_SCORE;
    scoreText.innerText = score;
  } else {
    event.target.classList.add("incorrect");
    answerList[correctAnswer].classList.add("corroct");
  }
};

const nextHandler = () => {
  questionIndex++;
  if (questionIndex < formatedData.length) {
    isAccepted = true;
    showQuestion();
    removeClasses();
  } else {
    finishHandler();
  }
};

const removeClasses = () => {
  answerList.forEach((button) => {
    button.className = "answer-text";
  });
};

const finishHandler = () => {
  localStorage.setItem("score", JSON.stringify(score));
  window.location.assign("./end.html");
};

const start = () => {
  showQuestion();
  loader.style.display = "none";
  container.style.display = "block";
};

window.addEventListener("load", fetchData);
answerList.forEach((button, index) => {
  button.addEventListener("click", (event) => cheakAnswer(event, index));
});
nextButton.addEventListener("click", nextHandler);
finishButton.addEventListener("click", finishHandler);

