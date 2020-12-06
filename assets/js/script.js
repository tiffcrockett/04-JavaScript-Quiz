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
var viewScoresEl = document.getElementById('viewScores');
var myScore = document.getElementById('myScore');
var timer = document.getElementById('timer');
var comment = document.getElementById('comment'); 
var result = document.getElementById('result'); 
var allPlayersList = document.getElementById('allPlayersList');
var initials = document.getElementById('initials');
var startButton = document.getElementById('startButton');
var nextButton = document.getElementById('nextButton');
var submitButton = document.getElementById('submitButton');
var resetButton = document.getElementById('resetButton'); 
var clearButton = document.getElementById('clearStorageButton'); 

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

var savedPlayersList = JSON.parse(localStorage.getItem('savedPlayersList')) || [];

submitButton.addEventListener('submit', addPlayerToList); 

function addPlayerToList() { 

    gameOverContainerEl.style.display = 'none';
    highScoreContainerEl.style.display =  ''; 
    allPlayersList.textContent = initials.value.trim() +  ' - ' + score + 'points'; 
    
    var playerInfo = {
        initials: initials.value.trim(),
        score: score,
    };
    savedPlayersList.push(playerInfo); 
    savePlayersList();
}
// at game over, save updated score from allPlayersList to local storage
function savePlayersList() {
    localStorage.setItem('savedPlayersList', JSON.stringify(savedPlayersList));
}  

viewScoresEl.addEventListener('click',viewHighScores);

function viewHighScores() {  
    quizContainerEl.style.display = "none";
    highScoreContainerEl.style.display = ''; 

    var newSavedPlayersList;
    for(var i = 0; i < savedPlayersList.length; i++) {
    newSavedPlayersList = localStorage.getItem('savedPlayersList'); 

    var li = document.createElement('li');
    li.textContent = newSavedPlayersList;
    
    allPlayersList.textContent = newSavedPlayersList; 
    }
}   
     
resetButton.addEventListener('click',startOver); 

function startOver () { 
    window.location.reload();
}  

clearButton.addEventListener('click', clear);

function clear(){ 
    allPlayersList.textContent = "";
    window.localStorage.clear(savedPlayersList);
} 