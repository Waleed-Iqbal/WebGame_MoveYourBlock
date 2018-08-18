

var Enemies = (function () {

    var enemiesList = {};

    function generateRandom() {
        let Id = Math.random();
        enemiesList[Id] = {
            id: Math.random(),
            speedX: Constants.MIN_SPEED_X + Math.random() * Constants.MIN_SPEED_X,
            speedY: Constants.MIN_SPEED_Y + Math.random() * Constants.MIN_SPEED_Y,
            posX: Math.random() * Canvas.canvas.width,
            posY: Math.random() * Canvas.canvas.height,
            width: Constants.MIN_ENEMY_WIDTH + Math.random() * Constants.ENEMY_WIDTH,
            height: Constants.MIN_ENEMY_HEIGHT + Math.random() * Constants.ENEMY_HEIGHT,
            color: "red"
        };
    }


    function createEnemies() {
        generateRandom();
        generateRandom();
        generateRandom();
    }

    return {
        enemiesList: enemiesList,
        createEnemies: createEnemies,
        generateRandom: generateRandom
    }

}())