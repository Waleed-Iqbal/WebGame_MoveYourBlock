var Common = (function () {

    function updateCharacterPosition(Character) {

        Character.posX += Character.speedX;
        Character.posY += Character.speedY;

        if (Character.posX <= Constants.LOWER_X_BOUND || Character.posX >= Canvas.canvas.width - Constants.UPPER_X_BOUNDING_PADDING)
            Character.speedX = -Character.speedX;
        else if (Character.posY <= Constants.LOWER_Y_BOUND || Character.posY >=  Canvas.canvas.height)
            Character.speedY = -Character.speedY;
    }

    function drawCharacter(Character, CanvasContext) {
        CanvasContext.save();
        CanvasContext.fillStyle = Character.color;
        CanvasContext.fillRect(Character.posX - Character.width / 2, Character.posY - Character.height / 2, Character.width, Character.height);
        CanvasContext.restore();
    }

    function updateCharacterPositionAndDraw(Enemy, CanvasContext) {
        updateCharacterPosition(Enemy);
        drawCharacter(Enemy, CanvasContext);
    }

    return {
        drawCharacter: drawCharacter,
        updateCharacterPosition: updateCharacterPosition,
        updateCharacterPositionAndDraw: updateCharacterPositionAndDraw
    }
}())