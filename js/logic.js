const CHOICESARRAY = ["paper", "scissor", "rock"];
const PLAYERCHOICES = document.querySelectorAll(".player-choice");
const PLAYERCHOOSEN = document.querySelector(".player-choosen");
const PLAYERSCORE = document.querySelector(".player-score");
const COMPUTERCHOOSEN = document.querySelector(".computer-choosen");
const COMPUTERSCORE = document.querySelector(".computer-score");
const RESULTIMG = document.querySelector(".result-gif");
let playerScore = 0;
let aiScore = 0;
let aiChoice = null;

function gameEventLoop() {
  let aiChoice = CHOICESARRAY[Math.floor(Math.random() * (2 + 1))];
  PLAYERCHOOSEN.setAttribute("src", this.getAttribute("src"));
  COMPUTERCHOOSEN.setAttribute("src", `assets/${aiChoice}.png`);
  checkResult({
    playerChoice: this.dataset.choice,
    aiChoice: aiChoice,
  });
}

function gamePlay() {
  PLAYERCHOICES.forEach((choice) => {
    choice.addEventListener("click", gameEventLoop);
  });
}

function checkResult(round) {
  function changeScore(result) {
    if (result === "Player Won") {
      PLAYERSCORE.textContent = `Player: ${++playerScore}`;
    } else {
      COMPUTERSCORE.textContent = `Computer: ${++aiScore}`;
    }
  }

  if (round.playerChoice === round.aiChoice) {
    return;
  } else if (round.playerChoice == "rock") {
    if (round.aiChoice == "paper") {
      changeScore("Computer Won");
    } else {
      changeScore("Player Won");
    }
  } else if (round.playerChoice == "scissor") {
    if (round.aiChoice == "rock") {
      changeScore("Computer Won");
    } else {
      changeScore("Player Won");
    }
  } else if (round.playerChoice == "paper") {
    if (round.aiChoice == "scissor") {
      changeScore("Computer Won");
    } else {
      changeScore("Player Won");
    }
  }
  if (playerScore === 5 || aiScore === 5) {
    playerScore === 5
      ? RESULTIMG.setAttribute("src", `assets/winner.gif`)
      : RESULTIMG.setAttribute("src", `assets/lose.gif`);
    RESULTIMG.classList.toggle("result-gif");

    PLAYERCHOICES.forEach((choice) => {
      choice.removeEventListener("click", gameEventLoop);
    });
  }
}

gamePlay();
