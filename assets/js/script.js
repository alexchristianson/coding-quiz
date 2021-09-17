// create array for questions and answers
var questions = [
    {
     title: "Commonly used data types DO NOT include:",
     choices: ["strings", "booleans", "alerts", "numbers"],
     answer: "alerts"
    },
    {
     title: "The condition in an if / else statement is enclosed within ____.",
     choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
     answer: "parentheses"
    }
   ]
// create global variables that point to different html elements
var startButton = document.querySelector("#start-button");
var startScreen = document.querySelector("#start-page");
var timerDisplay = document.querySelector("#timer");
var timerState;
var initialTime = 60;
var questionContainer = document.querySelector("#questions");
var questionIndex = 0;
var feedback = document.querySelector("#answer-feedback");
// start function to start timer, hide start screen, function to grab questions and answers array and display
function quizStart () {
    startScreen.setAttribute("class", "hide");
    questionContainer.removeAttribute("class");
    timerState = setInterval(function() {
        initialTime--
        timerDisplay.textContent = initialTime;
    }, 1000) 

askQuestion();
};

// function to check if selected answer is correct or incorrect and add time penalty if incorrect
function askQuestion () {
    var displayedQuestion = questions[questionIndex];
    var questionTitle = document.querySelector("#question-title");
    var questionText = document.querySelector("#question-text");
    questionTitle.textContent = displayedQuestion.title;
    questionText.innerHTML = "";
    displayedQuestion.choices.forEach(function(choice) {
        var createButton = document.createElement("button");
        createButton.setAttribute("class", "choice");
        createButton.setAttribute("value", choice);
        createButton.textContent = choice;
        createButton.onclick = checkAnswer;
        questionText.appendChild(createButton);
    })
};

function checkAnswer () {
    if (this.value === questions[questionIndex].answer) {
        feedback.textContent = "Correct!"
    }
    else {
        feedback.textContent = "Wrong!"
        initialTime = initialTime - 10;
        timerDisplay.textContent = initialTime;
    }

    questionIndex++;
    if (questionIndex === questions.length) {
        // quiz end function here (clearInterval on timerState)
    }
    else {
    askQuestion();
    }
};

// quiz end function to stop when questions run out or timer runs out (clearInterval on timer) and display endscreen with score

// save score and initials function into localStorage as object

// get high score and initials when "view high scores" is clicked

startButton.onclick = quizStart;