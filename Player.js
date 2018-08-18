var Player = (function () {

    var id = 0;
    var posY = -2;
    var posX = -3;
    var text = "P";
    var health = 10;
    var speedY = 50;
    var speedX = 110;
    var color = "green";
    var pressingUp = false;
    var hasCollided = false;
    var pressingDown = false;
    var pressingLeft = false;
    var pressingRight = false;
    var height = Constants.PLAYER_WIDTH;
    var width = Constants.PLAYER_HEIGHT;

    function collisionHandler(frameCount) {
        if (frameCount % 10 === 0 && hasCollided) {
            health -= 1;
            hasCollided = false;
        }
    }

    function updatePosition() {
        if (pressingUp)
            posY -= 5;
        if (pressingDown)
            posY += 5;
        if (pressingLeft)
            posX -= 5;
        if (pressingRight)
            posX += 5;
    }

    return {
        id: id,
        posX: posX,
        posY: posY,
        text: text,
        width: width,
        color: color,
        speedX: speedX,
        speedY: speedY,
        health: health,
        height: height,
        pressingUp: pressingUp,
        hasCollided: hasCollided,
        pressingLeft: pressingLeft,
        pressingDown: pressingDown,
        pressingRight: pressingRight,
        updatePosition: updatePosition,
        collisionHandler: collisionHandler
    }
}())