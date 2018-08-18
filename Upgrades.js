var Upgrades = (function () {

    var upgradeList = {};

    function generateRandom() {

        let Id = Math.random();

        upgradeList[Id] = {
            id: Math.random(),
            speedX: Constants.UPGRADE_SPEED_X,
            speedY: Constants.UPGRADE_SPEED_Y,
            posX: Math.random() * Canvas.canvas.width,
            posY: Math.random() * Canvas.canvas.height,
            width: Constants.UPGRADE_HEIGHT,
            height: Constants.UPGRADE_WIDTH,
            color: "orange",
            timer: 0
        };
    }

    return {
        upgradeList: upgradeList,
        generateRandom: generateRandom
    }

}())