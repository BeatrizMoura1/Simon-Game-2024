
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0

$(document).one("keypress", function() {

    $("#level-title").text("Level " + level);
    nextSequence();
});

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        
        if (userClickedPattern.length === gamePattern.length) {
            
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over", "body");
        
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        startOver();
    }
}

function nextSequence(){

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function startOver() {

    level = 0;
    gamePattern = [];
    reset();
}

function playSound(name) {

    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed", currentColour);
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}