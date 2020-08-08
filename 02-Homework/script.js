// design html to show the first page that has a button the user hits to start the quiz
// once this button is hit, page refreshes to question 1 and timer starts in top righ corner
// use event delegation to determine if user answer is correct, and reload page for next question
// keep count and use local storage to keep highscores.

// if timer hits 0 or questions are done, endQuiz()
// endQuiz sends user to fill in initials for highscore and hit save
// once save button clicked, send user to a highscore page (variable)
// if user hits highscore link they get sent to same highscore page

var $timer = document.querySelector(".timer");
var $button = document.querySelector(".btn");
var $container = document.querySelector(".container");
var $content = document.querySelector(".content");
var $title = document.querySelector('.title');
var $innerContainer = document.querySelector(".innerContainer");
var $highscores = document.querySelector('.highscores');

var questions = [
    {
        Q: "Which of the following is used to describe how elements are displayed on the screen?",
        A: ["HTML", "CSS", "JavaScript", "JQuery"],
        answer: 'CSS'
    },
    {
        Q: "What does HTML stand for?",
        A: ['Nothing, its just a random acronym', 'Helping Text Markup Language', 'Human Text Markup Language', 'Hypertext Markup Language'],
        answer: 'Hypertext Markup Language'
    },
    {
        Q: "Where is the correct section to put CSS <style> tags?",
        A: ['<div>', '<head>', '<body>', '<footer>'],
        answer: '<head>'
    },
    {
        Q: "which one of the following invokes the function testFunction",
        A: ['call testFunction;', 'invoke testFunction();', 'testFunction;', 'testFunction();'],
        answer: 'testFunction();'
    },
    {
        Q: "which jQuery function would be used to invoke a function on the click of the mouse",
        A: ['onclick();', 'addEventListener();', 'onMouseClick();', 'ifclick();'],
        answer: 'onclick();'
    },
    {
        Q: "Which of the following declares a variable in JavaScript",
        A: ['add newVariable;', 'variable newVariable;', 'var newVariable;', 'create newVariable;'],
        answer: 'var newVariable;'
    },
    {
        Q: "Which of the following correctly adds a class to a <div> tag",
        A: ['<div cl = main>', '<div addclass = main>', '<div class = main>', '<div newclass = main>'],
        answer: '<div class = main>'
    },
    {
        Q: "Which of the following CSS code will center the text in any given tag",
        A: ['text-align: center;', 'center-text;', 'text-align: middle;', 'align-alltext: center;'],
        answer: 'text-align: center;'
    }
]

var secondsLeft = 60
var i = 0
var correctAnswerCount = 0
var allHighscores = [];

function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        $timer.textContent = "Time: " + secondsLeft;

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            $timer.textContent = "Time: 0"
            endQuiz();
            return;
        }

    }, 1000);
}

function askQuestion() {
    document.querySelector(".innerContainer").innerHTML = "";
    setTime();
    questionLoop();
}
function questionLoop() {
    $title.textContent = questions[i].Q;
    // button 1
    var btn1 = document.createElement("button");
    $innerContainer.appendChild(btn1);
    btn1.setAttribute("class", "answer-btn btn btn-success")
    btn1.textContent = questions[i].A[0];
    // button 2
    var btn2 = document.createElement("button");
    $innerContainer.appendChild(btn2);
    btn2.setAttribute("class", "answer-btn btn btn-success")
    btn2.textContent = questions[i].A[1];
    // button 3
    var btn3 = document.createElement("button");
    $innerContainer.appendChild(btn3);
    btn3.setAttribute("class", "answer-btn btn btn-success")
    btn3.textContent = questions[i].A[2];
    // button 4
    var btn4 = document.createElement("button");
    $innerContainer.appendChild(btn4);
    btn4.setAttribute("class", "answer-btn btn btn-success")
    btn4.textContent = questions[i].A[3];
}

document.querySelector(".container").addEventListener("click", function(event) {
    if (event.target.className.indexOf("answer-btn") > -1) {
        //check if the answer is right
        if (event.target.textContent === questions[i].answer) {
            correctAnswerCount++;
        } else {
            secondsLeft = (secondsLeft - 10)
        }
        console.log(correctAnswerCount);
        //empty the question container
        document.querySelector(".innerContainer").innerHTML = "";
        //check if all questions have been answered
        if (i > 6) {
            secondsLeft = 0;
            return;
            //end the quiz = > reroute to different url
            //window.location.href == "";
        }
        //add count
        i++;
        //question show
        questionLoop();
    }
});

function endQuiz() {
    $container.innerHTML = "";
    var gameOver = document.createElement("h2");
    $container.appendChild(gameOver);
    gameOver.textContent = "Game Over! Your final score is " + correctAnswerCount + ". Please enter your initials below to save your highscore.";
    var input = document.createElement("input");
    $container.appendChild(input);
    input.setAttribute("type", "text");
    input.setAttribute("class", "input");
    var saveBtn = document.createElement("button");
    $container.appendChild(saveBtn);
    saveBtn.setAttribute("class", "btn btn-success")
    saveBtn.textContent = 'save';
    document.querySelector(".btn").addEventListener("click", function(event) {
        if (event.target.className = 'btn-success') {
            //log score to array function
            saveHighscore();
            highscorePage();
        }
    });
}
//make this log initials and score to an array, put array in local storage
//then have a different function send to highscore page and put array down

function saveHighscore(event) {
    const $input = document.querySelector(".input");
    var initials= $input.value;
    console.log(initials);
    allHighscores.push({'initials': initials, 'scored': correctAnswerCount});
    if (localStorage.getItem("highscores")) {
        const savedScores = JSON.parse(localStorage.getItem("highscores"))
        allHighscores.push(...savedScores);
        console.log(allHighscores);
        localStorage.setItem('highscores', JSON.stringify(allHighscores));
    } else {
        localStorage.setItem('highscores', JSON.stringify(allHighscores));
    }
    
}

function highscorePage() {
    $container.innerHTML = "";
    var scoreboard = document.createElement("h2");
    $container.appendChild(scoreboard);
    scoreboard.textContent = "Highscores:";
    if (allHighscores != null){
        var ol = document.createElement("ol");
        $container.appendChild(ol);
        ol.setAttribute("style", "width: 100px;");
        for (let i = 0; i< allHighscores.length; i++) {
        var score = document.createElement("li");
        ol.appendChild(score);
        score.textContent = allHighscores[i].initials + ": " + allHighscores[i].scored;
        }
    }

}
// function nextQuestion(event) {
//     console.log(event);
//     //check if the answer is right
//     // if () {

//     // }
// }
$highscores.addEventListener("click", highscorePage);
$button.addEventListener("click", askQuestion);