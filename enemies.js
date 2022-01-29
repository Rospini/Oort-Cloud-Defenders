//enemies
const enemyArmy = [];
const rexato = new Image()
rexato.src = "./images/rexato.png"
const oneEye = new Image()
oneEye.src = "./images/walkingEye.png"
enemyArmy.push(rexato);//242
enemyArmy.push(oneEye)// 
const oneEyeDying = new Image()
oneEyeDying.src = "./images/oneEyeDying.png"
const rexatoDying = new Image()
rexatoDying.src = "./images/rexatoDying.png"

class Enemy {
    constructor(verticalPosition){
        this.x = canvas.width;
        this.y = verticalPosition;
        this.width = cellSize - cellGap * 2;
        this.height = cellSize -cellGap *2;
        this.health = enemiesHealth;
        this.speed = Math.random()* 0.2 + 0.4;
        this.movement = this.speed;
        this.maxHealth = this.health;
        this.enemyArmy = enemyArmy [Math.floor(Math.random()* enemyArmy.length)];
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 7;
        this.spriteWidth = 130;
        this.spriteHeight =130;

    }
    update (){
        this.x -= this.movement;
        if(frame % 6 === 0){
            if(this.frameX < this.maxFrame) this.frameX ++;
            else this.frameX = this.minFrame;
        }
    }
    updateDying(){
        if(frame % 12 === 0){
            if(this.frameX <= 8) this.frameX ++;
        }
    }
    draw(){
        //ctx.fillStyle = 'red',
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        //  ctx.fillStyle = 'gold';
        //  ctx.font = "30px Arial";
        //  ctx.fillText(Math.floor(this.health), this.x + 20, this.y);
        ctx.drawImage(this.enemyArmy, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
    // draw Death currently isnt working uses handleDeath line 91
    drawDeath(){
        if(deadEnemies == oneEye){
            ctx.drawImage(oneEyeDying, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
        }
        else if(deadEnemies == rexato){
            ctx.drawImage(rexatoDying, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
        }
    }
}
function handleEnemies(){
    for (let i = 0; i< enemies.length; i++){
        enemies[i].update();
        enemies[i].draw();
    if(enemies[i].x < 0){
        gameOver = true;
    }
    if(enemies[i].health <= 0){
        let earningMoney = enemies[i].maxHealth/4;
        amountOfMoney += earningMoney;
        score += earningMoney;
        const findEnemiesVerticalIndex = enemiesPosition.indexOf(enemies[i].y);
        enemiesPosition.splice(findEnemiesVerticalIndex, 1);
        deadEnemies.push(enemies[i])
        enemies.splice(i, 1);
        i--;
    }
    }   
    if(frame % enemiesInterval === 0){
        let verticalPosition = Math.floor(Math.random()* 6 + 1) * cellSize;
        enemies.push(new Enemy(verticalPosition));
        enemiesPosition.push(verticalPosition)
        if(enemiesInterval > 120) {
            enemiesInterval -= 50
        };
    }
    
}
function handleDeath(){
    for(let i =0; i< deadEnemies.length;i++){
        deadEnemies[i].drawDeath();
        deadEnemies[i].updateDying()
        if(deadEnemies[i].maxFrame == 8){
            deadEnemies.splice(deadEnemies[i], 1)
            i--
        }
    }
}
