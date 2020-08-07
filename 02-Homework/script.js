// design html to show the first page that has a button the user hits to start the quiz
// once this button is hit, page refreshes to question 1 and timer starts in top righ corner
// use event delegation to determine if user answer is correct, and reload page for next question
// keep count and use local storage to keep highscores.

// Need ID on each button to use event delegation
// Need a way to determine if user answer is correct

var $timer = document.querySelector(".timer");
var $button = document.querySelector(".btn");
var $container = document.querySelector(".container");
var $content = document.querySelector(".content");
var $title = document.querySelector('.title');
var $innerContainer = document.querySelector(".innerContainer");

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

function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        $timer.textContent = "Time: " + secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
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
    // btn1.addEventListener('click', nextQuestion(event));
    // btn2.addEventListener('click', nextQuestion(event));
    // btn3.addEventListener('click', nextQuestion(event));
    // btn4.addEventListener('click', nextQuestion(event));
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
        if (i > 1) {
            //end the quiz = > reroute to different url
            //window.location.href == "";
        }
        //add count
        i++;
        //question show
        questionLoop();
    }
});

// function nextQuestion(event) {
//     console.log(event);
//     //check if the answer is right
//     // if () {

//     // }
// }

$button.addEventListener("click", askQuestion);