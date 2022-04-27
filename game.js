let level = 0;
let userChosenPattern = [];
let generatedPattern = [];
let codes = ["green", "red", "yellow", "blue"];
let started = false;

$(document).on("keypress", function (e) {
    if (!started) {
        userSequence();
    }

})

$(".btn").on("click", function () {
    let curCol = this.id;
    let audio = new Audio(curCol + ".mp3");
    audio.play();
    userChosenPattern.push(curCol);
    $("#" + curCol).addClass("pressed");

    setTimeout(function () {
        $("#" + curCol).removeClass("pressed");
    }, 100)

    checkAnswer(userChosenPattern.length - 1);

})

function checkAnswer(curLev) {
    if (userChosenPattern[curLev] === generatedPattern[curLev]) {
        if (generatedPattern.length === userChosenPattern.length) {
            $("h1").text("Success");
            setTimeout(function () {
                userSequence();
            }, 500)
        }
    }
    else {
        let audio = new Audio("wrong.mp3");
        audio.play();
        $("h1").text("Game Over ! Press any key to restart");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 100)
        startOver();
    }
}

function userSequence() {
    userChosenPattern = []
    level++;
    $("h1").text("Level " + level);

    let randNum = Math.floor(Math.random() * 4);
    let randColor = codes[randNum];

    let audio = new Audio(randColor + ".mp3");
    audio.play();
    $("#" + codes[randNum]).fadeOut(100).fadeIn(100);


    generatedPattern.push(randColor);
}

function startOver() {
    level = 0;
    started = false;
    generatedPattern = [];
}