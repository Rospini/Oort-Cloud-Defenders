let bossEncounter1 = new Image()
bossEncounter1.src = './images/boss1.png'//228
let bossEncounter2 = new Image()
bossEncounter2.src = './images/boss2.png'//305
class Boss {
    constructor(health, speed,){
        this.x = canvas.width;
        this.y = 100;
        this.width = cellSize * 2;
        this.height = cellSize *5;
        this.health = health;
        this.speed = speed;
        this.movement = this.speed;
        this.maxHealth = this.health;
        this.bossEncounter = bossEncounter1;
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 7;
        this.spriteWidth = 228;
        this.spriteHeight =228;
    }
    update (){
        this.x -= this.movement;
        if(frame % 8 === 0){
            if(this.frameX < this.maxFrame) this.frameX ++;
            else this.frameX = this.minFrame;
        }
    }
    draw(){
        // ctx.fillStyle = '#ba26d9',
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'red';
        ctx.font = "30px Arial";
        ctx.fillText(Math.floor(this.health), this.x + 70, this.y+30);
        if(score < 1200 ){
            ctx.drawImage(bossEncounter1,this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight+50, this.x, this.y-40, this.width+60, this.height)
        }
        else if(score > 1200 ){
            ctx.drawImage(bossEncounter2,this.frameX * (this.spriteWidth+77), 0, this.spriteWidth+77 , this.spriteHeight+77, this.x, this.y, this.width, this.height)
        }
    }
        
}
    

function spawnBoss(){
    for (let i = 0; i< boss.length; i++){
        boss[i].update();
        boss[i].draw();
    if(boss[i].x < 0){boss
        gameOver = true;
    }
    if(boss[i].health <= 0){
        let earningMoney = boss[i].maxHealth/4;
        amountOfMoney += earningMoney;
        score += earningMoney;
        boss.splice(i, 1);
        i--;
        }
    
    }   
}    