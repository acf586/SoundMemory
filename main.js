var numberOfXFields = 5;

var buttonArray = null;

/* var chickenCurrentPosition=43;
var chickenPositionEndField; */

var chickenSpeed;

// var listenerPositionField=42;

var gameFieldWidth;
var gameFieldHeight;

var xDelta;
var yDelta;

var positionArray;

var game,
    menu,
    control,
    wrapper;



window.onload = function () {
    initializeWebsite();

    newGame = new Game(5);

    initializeStartButton();

    fieldButtonsAddEventListener();

    createTestButtons();

}

function initializeWebsite(){

    document.body.style.backgroundImage = "url('Assets/Background.png')";

    createGameField();

    updateSize();

    initializePositionArray();
}

function createGameField() {

    for (var i = 0; i < numberOfXFields * numberOfXFields; i++) {
        fieldButton = document.createElement("div");
        fieldButton.className = "fieldButton";
        var fieldId = parseInt(i / numberOfXFields) + "" + i % numberOfXFields;
        fieldButton.setAttribute("id", fieldId);
        document.getElementById("game-grid").appendChild(fieldButton);

    }
    buttonArray = document.getElementsByClassName("fieldButton");

}

function updateSize() {
    game = document.getElementById("game");
    menu = document.getElementById("menu");
    control = document.getElementById("controlContainer");
    wrapper = document.getElementById("wrapper");

    var winHeight = window.innerHeight;
    var winWidth = window.innerWidth;
    var margin = 0;
    
    if (winHeight > winWidth / 2 || winHeight == winWidth / 2) {
        game.style.height = winWidth / 2;
        game.style.width = winWidth / 2;

        menu.style.height = winWidth / 2;
        control.style.height = winWidth / 2;

        margin = (winHeight - winWidth / 2) / 2;
        wrapper.style.marginTop = margin;
    }

    if (winHeight < winWidth / 2) {
        game.style.height = winHeight;
        game.style.width = winHeight;

        menu.style.height = winHeight;
        control.style.height = winHeight;

        margin = 0;
        wrapper.style.marginTop = margin;

    }
    
    var height = game.clientHeight;
    var width = game.clientWidth;
}

function initializePositionArray() {
    positionArray = new Array(5);
    for (var i = 0; i < 5; i++) {
        positionArray[i] = new Array(5);
    }
    var actualField;
    for (var y = 0; y < 5; y++) {
        for (var x = 0; x < 5; x++) {
            actualField = document.getElementById(y + "" + x);
            positionArray[y][x] = [actualField.offsetLeft + actualField.clientWidth / 2, actualField.offsetTop + actualField.clientHeight / 2];
        }
    }
}

function resetGameField() {
    for (var i = 0; i < buttonArray.length; i++) {
        buttonArray[i].style.backgroundColor = "transparent";
        buttonArray[i].style.backgroundImage = "none";
        buttonArray[i].style.borderColor = "black";
        buttonArray[i].style.border = "2px solid";

    }

    displayChicken();
    displayListener();
}

function initializeStartButton() {
    document.getElementById("startButton").addEventListener('click', function () {
        newGame.startPressed();
    });
}

function fieldButtonsAddEventListener() {
    for (var i = 0; i < buttonArray.length; i++) {
        buttonArray[i].id;
        buttonArray[i].addEventListener('click', function (e) {
                listenerPositionField = e.target.id;
                newGame.fieldPressed();
        });

    }
}

function createTestButtons(){
          
    document.getElementById("setRandomChickenPosition").addEventListener('click', function (e) {
        newGame.setRandomChickenPosition();
        resetGameField();
        displayChicken();
    });

    document.getElementById("switchChickenPosition").addEventListener('click', function (e) {
        switchChickenPositionNumberOfTimes(10);
    });

    document.getElementById("runAround").addEventListener('click', function (e) {
        runArroundField();
    });

}

window.onresize = function () {
    updateSize();
    initializePositionArray();
}




function displayChicken() {
    
    document.getElementById(newGame.chickenCurrentPosition).style.backgroundImage = "url('Assets/Player.png')";
    document.getElementById(newGame.chickenCurrentPosition).style.border = "none";
}

function displayListener() {
    document.getElementById(newGame.listenerPositionField).style.backgroundImage = "url('Assets/Listener.png')";
    document.getElementById(newGame.listenerPositionField).style.border = "none";
}

function runArroundField() {
    chickenPositionEndField = "41";
    var x = 3;
    var xFinal = 1;
    var y = 4;
    for (let i = 0; i < 15; i++) {
        setTimeout(function () {
            if (i == 1 || i == 14) {
                x++;
            }
            if (i > 1 && i < 6) {
                y--;
            }
            if (i > 5 && i < 10) {
                x--;
            }
            if (i > 9 && i < 14) {
                y++;
            }
            chickenCurrentPosition = y + "" + x;
            resetGameField();
            displayChicken();
            //console.log(i + " x: " + x + " y: " + y);
        }, 200 * i + 2)

    }
}

function switchChickenPositionNumberOfTimes(number) {
    chickenCurrentPosition = ""
    for (let i = 0; i < number; i++) {
        setTimeout(function () {
            
            newGame.setRandomChickenPosition();
            resetGameField();

        }, 200 * i)

    }

}

function moveChicken(startPosition, EndPosition) {
    playSound(chickenCurrentPosition);
}

function playSound(position) {

}
