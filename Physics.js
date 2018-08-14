var Physics = (function(){

    function getDistanceBetweenTwoPlayers(PlayerA, PlayerB) {
        let disX = PlayerA.posX - PlayerB.posX;
        let disY = PlayerA.posY - PlayerB.posY;
        let distance = Math.sqrt(Math.pow(disX, 2)+Math.pow(disY, 2));
        return distance;
    }

    function arePlayerAndEnemyColliding(Player, Enemy){
        let areColliding = getDistanceBetweenTwoPlayers(Player, Enemy) < Constants.COLLISION_THRESHOLD;
        return areColliding;
    }

    return {
        arePlayerAndEnemyColliding: arePlayerAndEnemyColliding
    };
}())
