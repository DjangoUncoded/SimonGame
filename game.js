var Colors = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var clicked = [];
var started = false;  // Change `start` to `started` for consistency
var level = 0;

$(document).keypress(function() {
    console.log(event.key);
    
    if (!started) {
        nextSequence();
        started = true;
    }
});
$(document).click(function() {
    
    
    if (!started) {
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    var userchoice = $(this).attr("id"); //Adding to the users selcted array
    clicked.push(userchoice);
    playsound(userchoice);
    animate(userchoice);
    checkAnswer(clicked.length - 1);
});

function checkAnswer(currenlevel) {
    if (gamepattern[currenlevel] === clicked[currenlevel]) {
        if (gamepattern.length === clicked.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playsound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence() { //adding only to the game pattern (Randomized)
     clicked=[];
    level++;
    $("#level-title").text("Level " + level);  // Fixed selector
    var num = Math.floor(Math.random() * 4);
    var rcolor = Colors[num];
    gamepattern.push(rcolor);
    playsound(rcolor);
    $("#" + rcolor).fadeIn(100).fadeOut(100).fadeIn(100);
}

function startOver() {
    level = 0;
    gamepattern = [];  // Fixed `gamepattern` consistency
    started = false;
}

function playsound(name) {
    var audio = new Audio("./" + name + ".mp3");
    audio.play();
}

function animate(color) {
    $("#" + color).addClass("pressed");  // Fixed adding class syntax
    setTimeout(function() {
        $("#" + color).removeClass("pressed");
    }, 100);
}

















