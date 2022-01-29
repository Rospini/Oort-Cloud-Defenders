
//defenders
const defender1 = new Image()
defender1.src = './images/defender.png'
const defender2 = new Image()
defender2.src = './images/defender2.png'
class Defender{
    constructor(x, y, power){
        this.x = x;
        this.y = y;
        this.width = cellSize - cellGap *2;
        this.height = cellSize - cellGap *2;
        this.health = 100;
        this.projectiles = [];
        this.timer = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 9;
        this.spriteWidth = 130;
        this.spriteHeight = 130;
        this.pickedDefender = pickDefender;
        this.power1 = 15
        this.power2 = 50
    }
    draw(){
        //ctx.fillStyle = 'blue',
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'green';
        ctx.font = "30px space2";
        ctx.fillText(Math.floor(this.health), this.x + 20, this.y);
        //ctx.drawImage(img, sourceX, sourceY ,sourceW , sourceH, destinationX, destinationY, destinationH)
        if(this.pickedDefender === 1){
            ctx.drawImage(defender1,this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)}
        else if(this.pickedDefender === 2){
            ctx.drawImage(defender2,this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)}
    }
    update(){
        this.timer++;
        if(this.pickedDefender ===1){
            if(this.timer % 100 === 0){
                projectiles.push(new Projectile(this.x +60, this.y+60, this.power1))           
            }
        }
        if(this.pickedDefender ===2){
            if(this.timer % 100 === 0){
                projectiles.push(new Projectile(this.x +60, this.y+60, this.power2))           
            }
        }
        if(frame % 10 === 0){
            if(this.frameX < this.maxFrame) this.frameX ++;
            else this.frameX = this.minFrame;
        }
    }
}


function handleDefenders(){
    for(let i = 0; i< defenders.length; i++){
        defenders[i].draw();
        defenders[i].update();
            for(let j = 0; j< enemies.length; j++){
            if(defenders[i] && collision(defenders[i], enemies[j])){
                enemies[j].movement = 0;
                defenders[i].health -= 1;
            }
            if(defenders[i] && defenders[i].health <= 0){
                defenders.splice(i, 1);
                i--;
                enemies[j].movement = enemies[j].speed;
            }
        }
        for(let j = 0; j< boss.length; j++){
            if(defenders[i] && collision(defenders[i], boss[j])){
                boss[j].movement = 0;
                defenders[i].health -= 1;
            }
            if(defenders[i] && defenders[i].health <= 0){
                defenders.splice(i, 1);
                i--;
                boss[j].movement = boss[j].speed;
            }
        }
    }
}
const rooting = new Image()
rooting.src = './images/roots.png'
class Roots{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = cellSize -cellGap *2;
        this.height = cellSize -cellGap *2;
        this.health = 500;
        this.timer = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 7;
        this.spriteWidth = 130;
        this.spriteHeight =130;
        this.generateMoney = 25;
    }
    draw(){
        //ctx.fillStyle = 'blue',
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'green';
        ctx.font = "30px space2";
        ctx.fillText(Math.floor(this.health), this.x + 20, this.y);
        //ctx.drawImage(img, sourceX, sourceY ,sourceW , sourceH, destinationX, destinationY, destinationH)
        ctx.drawImage(rooting,this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
    update(){
        this.timer++;
        if(this.timer % 100 === 0){
            amountOfMoney += this.generateMoney;    
            floatingMessages.push(new FloatingMessage(this.generateMoney+'$', this.x+15 ,this.y+50 ,25,'rgba(205, 250, 6, 0.973)',1))
        }
        if(frame % 10 === 0){
            if(this.frameX < this.maxFrame) this.frameX ++;
            else this.frameX = this.minFrame;
        }
    }
}


function handleRoots(){
    for(let i = 0; i< rooots.length; i++){
        rooots[i].draw();
        rooots[i].update();
            for(let j = 0; j< enemies.length; j++){
            if(rooots[i] && collision(rooots[i], enemies[j])){
                enemies[j].movement = 0;
                rooots[i].health -= 1;
            }
            if(rooots[i] && rooots[i].health <= 0){
                rooots.splice(i, 1);
                i--;
                enemies[j].movement = enemies[j].speed;
                
            }
            for(let j = 0; j< boss.length; j++){
                if(rooots[i] && collision(rooots[i], boss[j])){
                    boss[j].movement = 0;
                    rooots[i].health -= 1;
                }
                if(rooots[i] && rooots[i].health <= 0){
                    rooots.splice(i, 1);
                    i--;
                    boss[j].movement = boss[j].speed;
                }
            }
        }
    }
}
const choose1 = {
    x:700,y:10,width:70,height:70
}
const choose2 = {
    x:800,y:10,width:70,height:70
}
const choose3 = {
    x:900,y:10,width:70,height:70
}
function chooseDefender(){
    let choose1stroke = 'red'
    let choose2stroke = 'red'
    let choose3stroke = 'red'
    if (collision(mouse, choose1)&& mouse.clicked){
        pickDefender = 1;
    }
    else if(collision(mouse, choose2)&& mouse.clicked){
        pickDefender = 2;
    }
    else if(collision(mouse, choose3)&& mouse.clicked){
        pickDefender = 3;
    }
    if(pickDefender ===1){
        choose1stroke = 'rgba(205, 250, 6, 0.973)'
        choose2stroke = 'red'
        choose3stroke = 'red'
    }
    else if(pickDefender === 2){
        choose1stroke = 'red'
        choose2stroke = 'rgba(205, 250, 6, 0.973)'
        choose3stroke = 'red'
    }
    else if(pickDefender === 3){
        choose1stroke = 'red'
        choose2stroke = 'red'
        choose3stroke = 'rgba(205, 250, 6, 0.973)'
    }
    else{
            choose1stroke = 'red'
            choose2stroke = 'red'
            choose3stroke = 'red'
    }
    
    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(205, 250, 6, 0.973)';
    ctx.font = "20px space2";
    ctx.fillText('100$', choose1.x+15, choose1.y+90)
    ctx.fillStyle = 'green';
    ctx.font = "15px space2";
    ctx.fillText('100HP', choose1.x+10, choose1.y+12)
    ctx.fillStyle = 'rgba(0,0,0,0)'
    ctx.fillRect(choose1.x, choose1.y, choose1.width, choose1.width);
    ctx.strokeStyle = choose1stroke;
    ctx.strokeRect(choose1.x,choose1.y,choose1.width,choose1.height)
    ctx.drawImage(defender1, 0, 0, 130, 130,choose1.x,choose1.y+4,130/2,130/2);

    
    ctx.fillRect(choose2.x, choose2.y, choose2.width, choose2.width);
    ctx.strokeStyle = choose2stroke;
    ctx.fillStyle = 'rgba(205, 250, 6, 0.973)'
    ctx.font = "20px space2";
    ctx.fillText('400$', choose2.x+15, choose2.y+90)
    ctx.fillStyle = 'green';
    ctx.font = "15px space2";
    ctx.fillText('100HP', choose2.x+10, choose2.y+12)
    ctx.fillStyle = 'rgba(0,0,0,0)'
    ctx.strokeRect(choose2.x,choose2.y,choose2.width,choose2.height)
    
    ctx.drawImage(defender2, 0, 0, 130, 130,choose2.x,choose2.y+4,130/2,130/2);
    
    ctx.fillRect(choose3.x, choose3.y, choose3.width, choose3.width);
    ctx.strokeStyle = choose3stroke;
    ctx.fillStyle = 'rgba(205, 250, 6, 0.973)'
    ctx.font = "20px space2";
    ctx.fillText('150$', choose3.x+15, choose3.y+90)
    ctx.fillStyle = 'green';
    ctx.font = "15px space2";
    ctx.fillText('500HP', choose3.x+10, choose3.y+12)
    ctx.fillStyle = 'rgba(0,0,0,0)'
    ctx.strokeRect(choose3.x,choose3.y,choose3.width,choose3.height)
    
    ctx.drawImage(rooting, choose3.x, 0, 130, 130,choose3.x-4,choose3.y+8,130/2,130/2);
}