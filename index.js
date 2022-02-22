// Game Constants & Variables
let input = {x: 0, y: 0}; 
let speed = 20;
let score = 0;
let last = 0;
let snakeArr = [
    {x: 10, y: 10}
];

food = {x: 6, y: 7};

function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - last)/1000 < 1/speed){
        return;
    }
    last = ctime;
    Game();
}

function isGameOver(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x >= 19 || snake[0].x <=0 || snake[0].y >= 19 || snake[0].y <=0){
        return true;
    }  
    return false;
}

function Game(){
    if(isGameOver(snakeArr)){
        input =  {x: 0, y: 0}; 
        score = 0; 
        scoreBox.innerHTML = "Score: " + score;
        alert("Game Over!!");
        snakeArr = [{x: 10, y: 10}];
    }
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        score += 1;
        if(score>highscoreval){
            highscoreval = score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            highscoreBox.innerHTML = "High Score: " + highscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + input.x, y: snakeArr[0].y + input.y});
        let a = 2;
        let b = 17;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }
    for (let i = snakeArr.length - 2; i>=0; i--)
        snakeArr[i+1] = {...snakeArr[i]};
    snakeArr[0].x += input.x;
    snakeArr[0].y += input.y;
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0)
            snakeElement.classList.add('head');
        else
            snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}


// Main logic starts here
let highscore = localStorage.getItem("highscore");
if(highscore === null){
    highscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval))
}
else{
    highscoreval = JSON.parse(highscore);
    highscoreBox.innerHTML = "High Score: " + highscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    input = {x: 0, y: 1} // Start the game
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            input.x = 0;
            input.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            input.x = 0;
            input.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            input.x = -1;
            input.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            input.x = 1;
            input.y = 0;
            break;
        default:
            break;
    }

});