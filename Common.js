var Common = (function () {

    function updateCharacterPosition(character) {

        character.posX += character.speedX;
        character.posY += character.speedY;

        if (character.posX <= Constants.LOWER_X_BOUND || character.posX >= Canvas.canvas.width - Constants.UPPER_X_BOUNDING_PADDING)
            character.speedX = -character.speedX;
        else if (character.posY <= Constants.LOWER_Y_BOUND || character.posY >=  Canvas.canvas.height)
            character.speedY = -character.speedY;
    }

    function drawCharacter(character, canvasContext) {
        canvasContext.save();
        canvasContext.fillStyle = character.color;
        canvasContext.fillRect(character.posX - character.width / 2, character.posY - character.height / 2, character.width, character.height);
        canvasContext.restore();
    }

    function updateCharacterPositionAndDraw(enemy, canvasContext) {
        updateCharacterPosition(enemy);
        drawCharacter(enemy, canvasContext);
    }

    return {
        drawCharacter: drawCharacter,
        updateCharacterPosition: updateCharacterPosition,
        updateCharacterPositionAndDraw: updateCharacterPositionAndDraw
    }
}())