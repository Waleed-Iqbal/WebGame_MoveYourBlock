var Physics = (function () {

    function getDistanceBetweenTwoCharacters(Player, Enemy) {
        let disX = Player.posX - Enemy.posX;
        let disY = Player.posY - Enemy.posY;
        let distance = Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2));
        return distance;
    }

    function arePlayerAndCharacterColliding(Player, Character) {
        let areColliding = getDistanceBetweenTwoCharacters(Player, Character) < 10;
        return areColliding;
    }

    return {
        arePlayerAndCharacterColliding: arePlayerAndCharacterColliding
    };
}())