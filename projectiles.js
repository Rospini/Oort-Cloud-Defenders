//projectiles
let projectilePic = new Image()
projectilePic.src = "./images/projectile.png"
class Projectile{
    constructor(x, y,power){
        this.x = x,
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.frameWidth = cellSize;
        this.frameHeight = cellSize;
        this.speed = 5;
        this.damage = power;
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 3;
        this.spriteWidth = 130;
        this.spriteHeight =130;
    }
    update(){
        this.x += this.speed;
        if(frame % 6 === 0){
            if(this.frameX < this.maxFrame) this.frameX ++;
            else this.frameX = this.minFrame;
        }
    }
    draw(){
        // ctx.fillStyle = '#2dea15'
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.width, 0, Math.PI *2);
        // ctx.fill();
        ctx.drawImage(projectilePic, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y-45, this.frameWidth, this.frameHeight)
    }
}
function handleProjectiles(){
    for(let i= 0; i<projectiles.length; i++){
        projectiles[i].update();
        projectiles[i].draw();

        for(let j = 0; j < enemies.length; j++){
            if(enemies[j] && projectiles[i] && collision(projectiles[i], enemies[j])){
                enemies[j].health -= projectiles[i].damage;
                projectiles.splice(i, 1);
                i--;
            }
        }
        for(let j = 0; j < boss.length; j++){
            if(boss[j] && projectiles[i] && collision(projectiles[i], boss[j])){
                boss[j].health -= projectiles[i].damage;
                projectiles.splice(i, 1);
                i--;
            }
        }

        if(projectiles[i] && projectiles[i].x > canvas.width - cellSize){
            projectiles.splice(i, 1);
            i--;
        }
    }
}