
var colors = ["red", "pink", "green", "indigo"];
var sequence = [];
var gameOver = true;
var userSequenceLength = 0;
var highscore = 0;
var level = 0;

$(document).dblclick(startTheGame);
$(".box").click(boxClicked)

function startTheGame() {
    if (!gameOver)
        return;
    $(".score").removeClass("invisible");
    $("#header").addClass("invisible");
    $("#highscoreTitle").removeClass("invisible");
    gameOver = false;
    randomSequence();
}

function boxClicked() {
    if (gameOver)
        return;
    if ($(this).attr("id") != sequence[userSequenceLength]){
        wrongAnswer();
        return;
    }
    playSound($(this).attr("id"));
    userSequenceLength += 1;
    if (userSequenceLength == level){
        highscore = Math.max(highscore, level);
        setTimeout(randomSequence, 600);
    }
}

function randomSequence() {
    $("#highscore").text(highscore);
    userSequenceLength = 0;
    nextBlink = colors[Math.floor(Math.random() * 4)]
    sequence.push(nextBlink);
    level++;
    $(".score").text(level);
    blink(nextBlink);
}

function blink(id) {
    $("#" + id).fadeTo("fast", 0).fadeTo("fast", 1);
    playSound(id);
}

function playSound(id) {
    var audio = new Audio("audio/" + id + ".mp3");
    audio.play();
}

function wrongAnswer(){
    playSound("wrong");
    $("body").addClass("wrongAnswerBody");
    $(".header").addClass("wrongAnswerHeader");
    setTimeout(() => {$("body").removeClass("wrongAnswerBody");}, 300);
    setTimeout(() => {$(".header").removeClass("wrongAnswerHeader")}, 300)
    returnToPreviousState();
}

function returnToPreviousState() {
    $(".score").addClass("invisible");
    $("#highscoreTitle").addClass("invisible");
    $("#header").removeClass("invisible");
    sequence = [];
    gameOver = true;    
    level = 0;
    userSequenceLength = 0
}