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
var timerState;
var initialTime = 60;
var score = 0;
var questionIndex = 0;
var allScores = [];
var startButton = document.querySelector("#start-button");
var highScores = document.querySelector("#score-button");
var startScreen = document.querySelector("#start-page");
var timerDisplay = document.querySelector("#timer");
var questionContainer = document.querySelector("#questions");
var feedback = document.querySelector("#answer-feedback");
var questionTitle = document.querySelector("#question-title");
var questionText = document.querySelector("#question-text");
var scoreDisplay = document.querySelector("#high-scores");
var recordName = document.querySelector("#recorded-name");
var recordScore = document.querySelector("#recorded-score");

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
        },1000);
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
    questionTitle.textContent = "Congratulations! You got " + score + " out of " + questions.length + " correct!";
    questionText.setAttribute("class", "hide")

 // save score and initials function into localStorage as object

    // prompt user to enter initials
    var enterInitials = document.createElement("initialsPrompt");
    enterInitials.setAttribute("id", "enter-initials");
    enterInitials.textContent = "Enter your initials: ";

    feedback.appendChild(enterInitials);

    // make input box for initials
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    feedback.appendChild(createInput);

    // make submit button
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("class", "buttons");
    createSubmit.textContent = "Submit";

    feedback.appendChild(createSubmit);

    // function to capture initials and local storage for initials and score
    createSubmit.onclick = function () {
        var initials = createInput.value;

        if (initials === "") {

            alert("Please enter your intitials!");

        } else {
            var finalScore = {
                initials: initials,
                score: score
            }

            var allScores = localStorage.getItem("allScores");
            allScores = JSON.parse(allScores);
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore); 
        }
    }
};

// get high score and initials when "view high scores" is clicked
function viewScores() {
    var allScores = localStorage.getItem("allScores");
    allScores = JSON.parse(allScores);
    recordScore.textContent = "High Scores";

    startScreen.setAttribute("class", "hide");
    questionContainer.setAttribute("class", "hide");
    
    if (allScores.length < 0) {
        alert("No previous scores recorded!")
    }

    for (i = 0; i < allScores.length; i++){
        var eachNewScore = document.createElement("p");
        eachNewScore.innerHTML = "Initials: " + allScores[i].initials + " Score: " + allScores[i].score;
        console.log(eachNewScore);
        
       
        scoreDisplay.appendChild(eachNewScore); 
    }
     
};


highScores.onclick = viewScores;

startButton.onclick = quizStart;