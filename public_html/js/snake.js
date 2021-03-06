var snake;
var snakeLength;
var snakeSize;
var snakeDirection;

var food;

var context;
var screenWidth;
var screenHeight;

gameInitialize();
snakeInitialize();
foodInitalize();
setInterval(gameLoop, 1000/30);

function gameInitialize() {
    var canvas = document.getElementById("game-screen");
    context = canvas.getContext("2d");
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    
    document.addEventListener("keydown", keyboardHandler );
    }

function gameLoop() {
    gameDraw();
    snakeUpdate();
    snakeDraw();
    foodDraw();
}

function gameDraw() {
   context.fillStyle = "rgb(97, 255, 0\n\
)";
   context.fillRect(0, 0, screenWidth, screenHeight);
}

function snakeInitialize(){
    snake = [];
    snakeLength = 1;
    snakeSize = 20;
    snakeDirection = "down";
    
    
    for(var index = snakeLength - 1; index >=0; index--) {
        snake.push( {
            x: index,
            y: 0
        });
    }
}

function snakeDraw(){
 for(var index = 0; index <snake.length; index++) {
     context.fillStyle = "red";      
     context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
 }   
}

function snakeUpdate(){
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;
    
     if(snakeDirection == "down") {
        snakeHeadY++;
    }
    else if(snakeDirection == "right"){
        snakeHeadX++;
    }
    checkFoodCollisions(snakeHeadX, snakeHeadY);
    checkWallColisions(snakeHeadX, snakeHeadY)
    var snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
}

function foodInitalize() {
    food = {
        x: 0,
        y: 0
    };
    setFoodPosition();
}

function foodDraw() {
    context.fillStyle = "purple";
    context.fillRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);
}

function setFoodPosition() {
    var randomX = Math.floor(Math.random() * screenWidth);
    var randomY = Math.floor(Math.random() * screenHeight);
    
    food.x = Math.floor(randomX / snakeSize);
    food.y = Math.floor(randomY / snakeSize);
}

function keyboardHandler(event) {
    console.log(event);
    
    if(event.keyCode == "39" && snakeDirection != "left") {
     snakeDirection = "right";   
    }
    else if(event.keyCode == "40" && snakeDirection != "up") {
        snakeDirection = "down";
    }
}

function checkFoodCollisions(snakeHeadX, snakeHeadY) {
    if(snakeHeadX == food.x && snakeHeadY == food.y) {
        console.log ("foodPosition");
        snake.push({
            x:0,
            y:0
        });
        snakeLength++;
    }
}

function checkWallCollisiions(snakeHeadX, snakeHeadY) {
    if(snakeHeadX * snakeSize >= screenWidth || snakeHeadX * snakeSize < 0) {
        console.log("Wall Collision");
    }
}