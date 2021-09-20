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
    },
    {
     title: "Arrays in JavaScript can be used to store ______",
     choices: ["numbers", "other arrays", "booleans", "all of the above"],
     answer: "all of the above"
    },
    {
     title: "String values must be enclosed within _____ when being assigned to variables.",
     choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
     answer: "quotes"
    },
    {
     title: "Finding and fixing errors or mistakes in your code is called ______.",
     choices: ["looping", "debugging", "sequencing", "decomposing"],
     answer: "debugging"
    }
   ]
// create global variables that point to different html elements
var startButton = document.querySelector("#start-button");
var startScreen = document.querySelector("#start-page");
var timerDisplay = document.querySelector("#timer");
var timerState;
var initialTime = 60;
var score = 0;
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
        setTimeout(function(){
            feedback.textContent ="";
            if (questionIndex === questions.length || timerDisplay === 0) {
                endGame();
                
            }
            else {
            askQuestion();
            }
        },3000);
        score++;
    }
    else {
        feedback.textContent = "Wrong!"
        setTimeout(function(){
            feedback.textContent ="";
            if (questionIndex === questions.length || timerDisplay === 0) {
                endGame();
                
            }
            else {
            askQuestion();
            }
        },1000);
        initialTime = initialTime - 10;
        timerDisplay.textContent = initialTime;
    }

    questionIndex++;

};

// quiz end function to stop when questions run out or timer runs out (clearInterval on timer) and display endscreen with score
function endGame() {
    clearInterval(timerState);
    timerDisplay.textContent = 0;
    feedback.textContent = "Contratulations! You got " + score + " out of " + questions.length + " correct!";
    feedback.setAttribute("class", "congrats")
};

// save score and initials function into localStorage as object

// get high score and initials when "view high scores" is clicked

startButton.onclick = quizStart;