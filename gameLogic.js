(function () {

    var canvas = document.getElementById("ctx");
    var ctx = canvas.getContext("2d");
    var playersList = {};

    function playerFactory(Id, PositionX, PositionY, SpeedX, SpeedY, Content) {
        playersList[Id] = {
            id: Id,
            text: Content,
            speedX: SpeedX,
            speedY: SpeedY,
            posX: PositionX,
            posY: PositionY,
        };
    }

    function createPlayers() {
        playerFactory(1, 50, 50, 2, -2, "0");
        playerFactory(2, 300, 540, 2, 3, "1");
        playerFactory(3, 300, 140, 2, 3, "2");
    }
    
    ctx.font = "40px Arial";

    function updateCharacter(character) {

        if (character.posX <= Constants.LOWER_X_BOUND || character.posX >= canvas.width - Constants.UPPER_X_BOUNDING_PADDING)
            character.speedX = -character.speedX;
        else if (character.posY <= Constants.LOWER_Y_BOUND || character.posY >= canvas.height)
            character.speedY = -character.speedY;

        character.posX += character.speedX;
        character.posY += character.speedY;
        ctx.fillText(character.text, character.posX, character.posY);
    }

    createPlayers();
    function updateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var player in playersList) {
            updateCharacter(playersList[player]);
            
        }
    }

    setInterval(updateCanvas, 1);
}())