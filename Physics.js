var Physics = (function(){

    function getDistanceBetweenTwoPlayers(Player, Enemy) {
        let disX = Player.posX - Enemy.posX;
        let disY = Player.posY - Enemy.posY;
        let distance = Math.sqrt(Math.pow(disX, 2)+Math.pow(disY, 2));
        return distance;
    }

    function arePlayerAndEnemyColliding(Player, Enemy) {
        //let areColliding = Player.posX <= Enemy.posX + Enemy.width && 
        //                   Enemy.posX <= Player.posX + Player.width && 
        //                   Player.posX <= Enemy.posY + Enemy.height && 
        //                   Enemy.posY <= Player.posY + Player.height;

        let areColliding = getDistanceBetweenTwoPlayers(Player, Enemy) < 10;
        return areColliding;
    }

    return {
        arePlayerAndEnemyColliding: arePlayerAndEnemyColliding
    };
}())
