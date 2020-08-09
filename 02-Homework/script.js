//HTML targeters
var $timer = document.querySelector(".timer");
var $button = document.querySelector(".btn");
var $container = document.querySelector(".container");
var $content = document.querySelector(".content");
var $title = document.querySelector('.title');
var $innerContainer = document.querySelector(".innerContainer");
var $highscores = document.querySelector('.highscores');

// list of questions for quiz
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
//declaring variables that will be used later on
var secondsLeft = 60
var i = 0
var correctAnswerCount = 0
var allHighscores = [];
//funtion used to start the timer
function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        $timer.textContent = "Time: " + secondsLeft;
        //if timer falls at or below 0, stop timer and end the quiz
        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            $timer.textContent = "Time: 0"
            endQuiz();
            return;
        }
    }, 1000);
}
//funtion used to start quiz which clears the page, starts the clock, and asks all questions
function askQuestion() {
    document.querySelector(".innerContainer").innerHTML = "";
    setTime();
    questionLoop();
}
//funtion used to loop through questions array and display each question on page
function questionLoop() {
    $title.textContent = questions[i].Q;
    //answer button 1
    var btn1 = document.createElement("button");
    $innerContainer.appendChild(btn1);
    btn1.setAttribute("class", "answer-btn btn btn-success")
    btn1.textContent = questions[i].A[0];
    //answer button 2
    var btn2 = document.createElement("button");
    $innerContainer.appendChild(btn2);
    btn2.setAttribute("class", "answer-btn btn btn-success")
    btn2.textContent = questions[i].A[1];
    //answer button 3
    var btn3 = document.createElement("button");
    $innerContainer.appendChild(btn3);
    btn3.setAttribute("class", "answer-btn btn btn-success")
    btn3.textContent = questions[i].A[2];
    //answer button 4
    var btn4 = document.createElement("button");
    $innerContainer.appendChild(btn4);
    btn4.setAttribute("class", "answer-btn btn btn-success")
    btn4.textContent = questions[i].A[3];
}
//if user clicks on an answer button...
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
        }
        //add count
        i++;
        //show next question and answers
        questionLoop();
    }
});
//ends quiz by showing user a message and asks for user initials to save for highscore
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
    //if user clicks save, their score is saved to an array, and they are sent to highscore page
    document.querySelector(".btn").addEventListener("click", function(event) {
        if (event.target.className = 'btn-success') {
            saveHighscore();
            highscorePage();
        }
    });
}
//takes user initials and score and adds them as an object to an array, then save to local storage
function saveHighscore(event) {
    const $input = document.querySelector(".input");
    var initials= $input.value;
    console.log(initials);
    allHighscores.push({'initials': initials, 'scored': correctAnswerCount});
    savedHighscores();
    
}
//using local storage to either add new highscore to array or create a new item of highscores
function savedHighscores() {
    if (localStorage.getItem("highscores")) {
        const savedScores = JSON.parse(localStorage.getItem("highscores"))
        allHighscores.push(...savedScores);
        localStorage.setItem('highscores', JSON.stringify(allHighscores));
    } else if (!(localStorage.getItem("highscores"))) {
        localStorage.setItem('highscores', JSON.stringify(allHighscores));
    }
}
//sets page text to highscore page
function highscorePage() {
    $container.innerHTML = "";
    var scoreboard = document.createElement("h2");
    $container.appendChild(scoreboard);
    scoreboard.textContent = "Highscores:";
    //if a highscore exists,add ordered list of highscores to page
    if (allHighscores != null){
        var ol = document.createElement("ol");
        $container.appendChild(ol);
        ol.setAttribute("style", "width: 100px;");
        //sort highscore array in decending order
        allHighscores.sort(function (x, y) {
            return y.scored - x.scored;
        });
        //run through all elements in highscore array, post them to page
        for (let i = 0; i< allHighscores.length; i++) {
        var score = document.createElement("li");
        ol.appendChild(score);
        score.textContent = allHighscores[i].initials + ": " + allHighscores[i].scored;
        }
    }
    //add a clear button that clears highscore array in local storage
    var clearBtn = document.createElement("button");
    $container.appendChild(clearBtn);
    clearBtn.setAttribute("class", "clearbtn btn btn-success")
    clearBtn.textContent = 'clear';
    document.querySelector(".clearbtn").addEventListener("click", function(event) {
        //reset browser to highscore page without scores shown
        if (event.target.className = 'btn-success') {
            localStorage.clear();
            allHighscores = [];
            $container.innerHTML = "";
            var scoreboard = document.createElement("h2");
            $container.appendChild(scoreboard);
            scoreboard.textContent = "Highscores:";
        }
    });
}
//when highscore is clicked, take user to the highscore page
$highscores.addEventListener("click", function() {
    savedHighscores();
    highscorePage(); 
})
//when start quiz button is clicked, ask questions
$button.addEventListener("click", askQuestion);