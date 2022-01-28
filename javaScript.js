const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = 1000;
canvas.height = 700;
// working on canvas adding the sound
// let backgroundSound = new Audio("./images/sound.mp3")
// backgroundSound.volume = 0.2
// backgroundSound.play ()
// global variables
const cellSize = 100;
const cellGap = 3;
const gameGrid=[];
const defenders = [];
let amountOfMoney = 650;
const enemies = [];
const enemiesPosition = [];
const boss = [];
let enemiesInterval = 600;
let frame = 0;
let gameOver = false;
const projectiles = [];
let score = 0;
const rooots= [];
let pickDefender = 0;
const deadEnemies = []


//mouse
const mouse = {
    x: undefined,
    y: undefined,
    width: 0.1,
    height: 0.1,
    clicked: false
}
canvas.addEventListener('mousedown', function(){
mouse.clicked = true;
});
canvas.addEventListener('mouseup', function(){
    mouse.clicked = false;
    });
let canvasPosition = canvas.getBoundingClientRect();
canvas.addEventListener("mousemove", function(e){
    mouse.x = e.x - canvasPosition.left;
    mouse.y = e.y - canvasPosition.top;
});
    canvas.addEventListener('mouseleave', function(){
        mouse.x = undefined;
        mouse.y = undefined;
});

//game board
const controlsBar = {
    width: canvas.width,
    height: cellSize,
}

class Cell {
    constructor(x, y){
        this.x = x;//projectiles
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
    }
    draw (){        
        if (mouse.x && mouse.y && collision(this, mouse)){
            ctx.strokeStyle = 'rgba(205, 250, 6, 0.973)';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }       
    }   
}
function createGrid(){
    for(let y = cellSize; y < canvas.height; y += cellSize){
        for(let x = 0; x < canvas.width; x += cellSize){
            gameGrid.push(new Cell(x, y));
        }
    }
}
createGrid()
function handleGameGrid(){
    for(let i = 0; i< gameGrid.length; i++){
        gameGrid[i].draw();
    }
}





//utilities
const floatingMessages = [];
class FloatingMessage{
    constructor(input, x, y, size, color, speed){
        this.input = input;
        this.x = x;
        this.y = y;
        this. size = size;
        this.color = color;
        this.timer = 0;
        this.fading = 2;     
        this.speed = speed
    } 
    update (){
            this.y -= 0.3;
            this.timer += this.speed;
            if(this.fading > 0.3) this.fading -= 0.05;
    }
    draw(){
        ctx.globalAlpha= this.fading;
        ctx.fillStyle = this.color;
        ctx.font = this.size +'Arial';
        ctx.fillText(this.input, this.x, this.y)
        ctx.globalAlpha = 1
    }
}
function handleFloatingMessages(){
    for(let i = 0; i < floatingMessages.length; i++){
        floatingMessages[i].update();
        floatingMessages[i].draw();
        if(floatingMessages[i].timer >= 50){
            floatingMessages.splice(i, 1);
            i--;
        }
    }
}
if(frame % 12 === 0){
    if(this.frameX <= 8) this.frameX ++;
    }
let moneySack= false
function easter(){
    if (amountOfMoney*6 > score){
        moneySack=true
    }
}
function handleGameStatus(){
    ctx.fillStyle = 'rgba(205, 250, 6, 0.973)';
    ctx.font = '30 px Arial';
    ctx.fillText('Cash:' + amountOfMoney + '$', 20, 55);
    ctx.fillText('Score' + score , 350, 55);
    if (gameOver == true){
        console.log("Game Over")
        ctx.fillStyle = 'rgba(205, 250, 6, 0.973)';
        ctx.font = "90px Arial";
        ctx.fillText('GAME OVER', 135, 330);
    }
    else if(amountOfMoney  > score+1000){
        //easter Egg gif
    } 
}

canvas.addEventListener("click", function(){
    const gridPositionX = mouse.x - (mouse.x % cellSize) + cellGap;
    const gridPositionY = mouse.y -(mouse.y % cellSize) + cellGap;
    if(gridPositionY < cellSize) return;
    for (let i =0; i<defenders.length; i++){
        if(defenders[i].x === gridPositionX && defenders[i].y === gridPositionY) 
        return;
    }
    if(pickDefender === 1){
        let defenderCost = 100;
        if(amountOfMoney >= defenderCost){
            defenders.push(new Defender(gridPositionX, gridPositionY,pickDefender,));
            amountOfMoney -= defenderCost;
        }
        else{
            floatingMessages.push(new FloatingMessage('need more Cash $$$', mouse.x ,mouse.y ,25,'rgba(205, 250, 6, 0.973)',1))
        }
    }
    if(pickDefender === 2){
        let defenderCost = 400;
        if(amountOfMoney >= defenderCost){
            defenders.push(new Defender(gridPositionX, gridPositionY,pickDefender));
            amountOfMoney -= defenderCost;
        }else{
            floatingMessages.push(new FloatingMessage('need more Cash $$$', mouse.x ,mouse.y ,25,'rgba(205, 250, 6, 0.973)',1))
        }
    }
    if(pickDefender === 3){
        let rootsCost = 150;
        if(amountOfMoney >= rootsCost){
            defenders.push(new Roots(gridPositionX, gridPositionY));
            amountOfMoney -= rootsCost;
        }else{
            floatingMessages.push(new FloatingMessage('need more Cash $$$', mouse.x ,mouse.y ,25,'rgba(205, 250, 6, 0.973)',1))
        }
    }
})

let rich = new Image()
rich.src = "images/rich-easter-egg.gif"
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle ='';
    // ctx.fillRect(0, 0, controlsBar.width, controlsBar.height);
    handleGameGrid(); 
    handleDefenders();
    handleProjectiles();
    handleEnemies();
    handleDeath()
    chooseDefender();
    if((score+25) % 800 === 0 && boss.length <1  ){
        floatingMessages.push(new FloatingMessage('BOSS INCOMING', 450, 300, 50, 'red',0.2))
        boss.push(new Boss(score*4, 0.4,));
    }
    if((score+25) % 2200 === 0 && boss.length <1 ){
        floatingMessages.push(new FloatingMessage('FAST BOSS INCOMING', 450, 300, 50, 'red',0.2))
        boss.push(new Boss(score*2, 1));   
    }
    spawnBoss()
    handleGameStatus();
    handleFloatingMessages();
    easter()
    frame ++;
    if (!gameOver)requestAnimationFrame(animate);        
    
}
animate();

function collision(first, second){
    if(   !(first.x > second.x + second.width||
            first.x + first.width < second.x||
            first.y > second.y + second.height||
            first.y + first.height< second.y)
    ){
        return true;
    }
}
window.addEventListener('resize', function(){
canvasPosition = canvas.getBoundingClientRect();
})

