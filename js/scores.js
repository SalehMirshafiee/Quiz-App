const highScors = JSON.parse(localStorage.getItem("highScors")) || [];

const list = document.querySelector("ol");

const content = highScors.map((score, index) => {
  return `
     <li>
        <span>${index +1}</span>
        <p>${score.username}</p>
        <span>${score.score}</span>
    </li>
    `;
});

list.innerHTML = content.join("");