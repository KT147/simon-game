const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];

let level = 0;
let started = false;

function startGame() {
  if (!started) {
    started = true;
    nextSequence();
  }
}


document.querySelector("#level-title").addEventListener("click", startGame);
document.querySelector("#level-title").addEventListener("touchstart", function(e) {
  e.preventDefault();
  startGame();
});

document.querySelectorAll(".btn").forEach(function (button) {
  button.addEventListener("click", function () {
    const userChosenColour = button.id;
    userClickedPattern.push(userChosenColour);

    animatePress(button);
    checkAnswer(userChosenColour);
  });

});

function nextSequence() {
  level++;
  document.querySelector("#level-title").textContent = "Level " + level;

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);

  const element = document.querySelector("#" + randomChosenColour);
  animatePress(element);

  console.log(gamePattern);
}

function checkAnswer(currentLevel) {
  if (
    gamePattern.slice(0, userClickedPattern.length).join() ===
    userClickedPattern.join()
  ) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
        console.log("succsss");
        userClickedPattern.length = 0;
      }, 1000);
    }
  } else {
    playSound("wrong");
    document.querySelector("body").classList.add("game-over");
    setTimeout(() => {
      document.querySelector("body").classList.remove("game-over");
    }, 200);
    startOver();

    document.querySelector("#level-title").textContent =
      "Game Over, Press Here to Restart";
    console.log("wrong");
  }
}

function startOver() {
  gamePattern.length = 0;
  userClickedPattern.length = 0;
  level = 0;
  started = false;
}

function animatePress(currentColour) {
  currentColour.classList.add("pressed");

  setTimeout(() => {
    currentColour.classList.remove("pressed");
  }, 100);
}

function playSound(name) {
  switch (name) {
    case "green":
      const green = new Audio("sounds/green.mp3");
      green.play();
      break;

    case "blue":
      const blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;

    case "red":
      const red = new Audio("sounds/red.mp3");
      red.play();
      break;

    case "yellow":
      const yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;

    case "wrong":
      const wrong = new Audio("sounds/wrong.mp3");
      wrong.play();
      break;

    default:
      console.log(colour);
  }
}
