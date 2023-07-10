var buttonColours = ["yellow","red", "blue", "green"];
var gamePattern=[];
var userClickedPattern = [];
var start = false;
var level = 0;
$(document).keypress(function(){
    if(!start){
        $("#level-title").text("Level " + level);
        nextSequence();
        start = true;
    }
});
function playsound( name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play(); 
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // animatePress(randomChosenColour);
    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);  

}

function animatePress(name){
    $("#"+ name).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#" + name).addClass("pressed");
    // #('#' + name).removeClass(".pressed");
    setTimeout(function () {
        $("#" + name).removeClass("pressed");
      }, 100);
}

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    animatePress(userChosenColour);
    playsound(userChosenColour);

    checkAnswer(userClickedPattern.length-1)
} );

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    start = false;
}



