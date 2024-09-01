const score = JSON.parse(localStorage.getItem("score"));
const highScors = JSON.parse(localStorage.getItem("highScors")) || [];

const scoreElement = document.querySelector("p");
const saveButton = document.querySelector("button");
const input = document.querySelector("input");

scoreElement.innerText = score;

const saveHandler = () => {
  if (!input.value) alert("invalid username!");
  else {
    const finalScore = { username: input.value, score };
    highScors.push(finalScore);
    highScors.sort((a, b) => b.score - a.score);
    highScors.splice(10);
    localStorage.setItem("highScors", JSON.stringify(highScors));
    localStorage.removeItem("score");
    window.location.assign("/");
  }
};

saveButton.addEventListener("click", saveHandler);
