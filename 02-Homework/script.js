// design html to show the first page that has a button the user hits to start the quiz
// once this button is hit, page refreshes to question 1 and timer starts in top righ corner
// use event delegation to determine if user answer is correct, and reload page for next question
// keep count and use local storage to keep highscores.

var $container = document.querySelector(".container");
var $timer = document.querySelector(".timer");
var $button = document.querySelector(".btn");
var $container = document.querySelector(".container");
var $content = document.querySelector(".content");
var $title = document.querySelector('.title');

var questions = ["Which of the following is used to describe how elements are displayed on the screen?"]
var secondsLeft = 60

function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      $timer.textContent = "Time: " + secondsLeft;
  
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        return;
      }
  
    }, 1000);
  }

function askQuestion() {
    $container.removeChild(this);
    $content.textContent = '';
    setTime();
    $title.textContent = (questions[0]);




}

$button.addEventListener("click", askQuestion);