var Physics = (function(){

    // function getDistanceBetweenTwoPlayers(Player, Enemy) {
    //     let disX = Player.posX - Enemy.posX;
    //     let disY = Player.posY - Enemy.posY;
    //     let distance = Math.sqrt(Math.pow(disX, 2)+Math.pow(disY, 2));
    //     return distance;
    // }

    function arePlayerAndEnemyColliding(Player, Enemy) {
        let playerRect = {
            posX: Player.posX - (Player.width/2),
            posY: Player.posY - (Player.height/2),
            width: Player.width,
            height: Player.height
        };

        let enemyRect = {
            posX: Enemy.posX - (Enemy.width/2),
            posY: Enemy.posY - (Enemy.height/2),
            width: Enemy.width,
            height: Enemy.height
        };

        let areColliding = playerRect.posX <= enemyRect.posX + enemyRect.width
                        && enemyRect.posX <= playerRect.posX + playerRect.innerWidth
                        && playerRect.posX <= enemyRect.posY + enemyRect.height
                        && playerRect.posY <= playerRect.posY + playerRect.height
        return areColliding;
    }

    return {
        arePlayerAndEnemyColliding: arePlayerAndEnemyColliding
    };
}())
