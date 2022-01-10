/* eslint-disable no-undef */
const buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let hasGameStarted = false;
let level = 0;

function playSound(name) {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function nextSequence() {
  userClickedPattern = [];
  const randomNumber = Math.floor(Math.random() * 4);
  const randomColour = buttonColours[randomNumber];
  gamePattern.push(randomColour);
  $(`#${randomColour}`).fadeOut(200).fadeIn(200);
  playSound(randomColour);
  level += 1;
  $('#level-title').text(`Level ${level}`);
}

function animatePress(currentColour) {
  const buttonId = `#${currentColour}`;
  $(buttonId).addClass('pressed');
  setTimeout(() => {
    $(buttonId).removeClass('pressed');
  }, 100);
}

function animateGameOver() {
  $('body').addClass('game-over');
  setTimeout(() => {
    $('body').removeClass('game-over');
  }, 200);
  $('#level-title').text('Game Over, Press Any Key to Restart');
}

function startOver() {
  level = 0;
  gamePattern = [];
  hasGameStarted = false;
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    animateGameOver();
    startOver();
  }
}

$('.btn').click((event) => {
  const userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keydown(() => {
  if (!hasGameStarted) {
    $('#level-title').text(`Level ${level}`);
    nextSequence();
    hasGameStarted = true;
  }
});
