const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let timerMillis = 0;
let timerSeconds = 10;

function playSound(name) {
  let audioElement = new Audio("./sounds/" + name + ".mp3");
  audioElement.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  for (let i = 0; i < gamePattern.length; i++) {
    setTimeout(function () {
      $("#" + gamePattern[i])
        .fadeOut(100)
        .fadeIn(100);
      playSound(gamePattern[i]);
    }, 1000 * i);
  }
  level++;
  $("#level-title").text("Level " + level);
}

$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  if (checkAnswer(userClickedPattern.length - 1) === true) {
    timerSeconds += 5;
  }
});

$(document).keypress(function () {
  if (level === 0) {
    nextSequence();
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
      return true;
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
    return false;
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
