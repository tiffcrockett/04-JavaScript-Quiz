var currentQuestion = 0;
var score = 0;
var totalQuestions = questions.length; 
var startContainerEl = document.getElementById('start'); 
var quizContainerEl = document.getElementById('quiz');  
var gameOverContainerEl = document.getElementById('gameOver'); 
var highScoreContainerEl = document.getElementById('highScore');
var questionEl = document.getElementById('question');
var opt1 = document.getElementById('opt1');
var opt2 = document.getElementById('opt2');
var opt3 = document.getElementById('opt3');
var opt4 = document.getElementById('opt4'); 

var myScore = document.getElementById('myScore');
var timer = document.getElementById('timer');
var comment = document.getElementById('comment'); 
var result = document.getElementById('result');  
var startButton = document.getElementById('startButton');
var nexttButton = document.getElementById('nextButton');
var submitButton = document.getElementById('submitButton');
var resetButton = document.getElementById('resetButton'); 
var clearButton = document.getElementById('clearStorageButton'); 

var players = [];
var storedPlayers = [];

function init() {
    var playerString = localStorage.getItem('storedPlayers');
    if(playerString !==null || playerString != '') {
        storedPlayers = JSON.parse(playerString);
        savedPlayers = storedPlayers;
        renderPlayers(); 
    }
} 

function storedPlayers() {
    localStorage.setItem('savedPlayers', JSON.stringify(players));
} 

function renderPlayersList() { 
    gameOverContainerEl.style.display = 'none';
     highScoreContainerEl.style.display =  ''; 

    playersList.textContent = ''; 
    for(var i = 0; i < players.length; i++) {
        players = players[i]; 

        var li = document.createElement('li');
        li.textContent = playerInfo;
        playersList.appendChild(li);
    } 
    
        submitButton.addEventListener('submit', function (event) {
            event.preventDefault(); 

        playerInitials = playerInput.value.trim();
        if(playersInitials === '') {
            return;
        }
        
        players.push(playerInitials + score + 'points');
        playerInitials.value = '';

        storedPlayers();
        renderPlayersList();
        })
    }  

init();

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', loadNextQuestion);

function startQuiz() { 
    startContainerEl.style.display = 'none'; 
    quizContainerEl.style.display = '';
    loadQuestion(currentQuestion);
}
// // get questions from the question array
function loadQuestion(questionIndex) {  
    var questn = questions[questionIndex];  
    questionEl.textContent = questn.question;
    opt1.textContent = questn.option1;
    opt2.textContent = questn.option2;
    opt3.textContent = questn.option3;
    opt4.textContent = questn.option4; 
 }  

function loadNextQuestion() { 
    //player must choose an option for quiz to proceed 
    var playerChoice = document.querySelector('input[type=radio]:checked');
    
    var playerAnswer = playerChoice.value;
        if(questions[currentQuestion].answer === playerAnswer) {
            score += 10;
            myScore.textContent = 'Score: ' + score;
            comment.style.display = '';
            comment.textContent = 'Your answer is correct!'; 
            } else {   
            comment.style.display = '';
            comment.textContent = 'Wrong answer!'; 
        } 
        playerChoice.checked = false;
        currentQuestion++;
        if(currentQuestion === totalQuestions) {
            quizContainerEl.style.display = 'none';
            gameOverContainerEl.style.display = '';
            result.textContent = 'Your Score: ' + score;
            return;
        }
        loadQuestion(currentQuestion); 
}

renderPlayersList();

// var viewScoresEl = document.getElementById('viewScores');
// viewHighScoresEl.addEventListener('click', getPlayers);
// function getStoredPlayers() { 
    
//     quizContainerEl.style.display = 'none';
//     highScoreContainerEl.style.display = '';
//     localStorage.getItem('storedPlayers');
// }

// function startOver () { 
// 	highScore.style.display = "none";
// 	start.style.display = "block";
// 	// clear playerList
// }

// function clearStorage() {
// // clear all stored scores from local storage
// }

// resetButton.addEventListener('click', startOver);
// clearButton.addEventListener('click', removeScores);

