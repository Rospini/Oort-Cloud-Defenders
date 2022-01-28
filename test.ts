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
            enemies[i].drawDeath()
            const findEnemiesVerticalIndex = enemiesPosition.indexOf(enemies[i].y);
            enemiesPosition.splice(findEnemiesVerticalIndex, 1);
            deadEnemies.push(enemies[i])
            console.log(deadEnemies)
            enemies.splice(i, 1);
            i--;
        }  
        if(frame % enemiesInterval === 0){
            let verticalPosition = Math.floor(Math.random()* 6 + 1) * cellSize;
            enemies.push(new Enemy(verticalPosition));
            enemiesPosition.push(verticalPosition)
            if(enemiesInterval > 120) {
                enemiesInterval -= 50
        };
        }
        for(let i =0; i< deadEnemies.length;i++){
        deadEnemies[i].draw();
            deadEnemies[i].update()
            if(deadEnemies[i].this.maxFrame =8){
                deadEnemies.splice(deadEnemies[i], 1)
                i--
            }
        }
    }
}