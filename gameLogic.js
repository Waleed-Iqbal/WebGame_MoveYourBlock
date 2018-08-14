(function () {

    var canvas = document.getElementById("ctx");
    var ctx = canvas.getContext("2d");
    var enemiesList = {};

    function enemyFactory(Id, PositionX, PositionY, SpeedX, SpeedY, Content) {
        enemiesList[Id] = {
            id: Id,
            text: Content,
            speedX: SpeedX,
            speedY: SpeedY,
            posX: PositionX,
            posY: PositionY,
        };
    }

    var player = {
        id: 0,
        text: "P",
        speedX: 110,
        speedY: 50,
        posX: -3,
        posY: -2,
        health: 10
    };

    function createPlayers() {
        playerFactory(1, 50, 50, 2, -2, "E0");
        playerFactory(2, 300, 540, 2, 3, "E1");
        playerFactory(3, 300, 140, 2, 3, "E2");
    }

    ctx.font = "40px Arial";


    function drawCharacter(character) {
        ctx.fillText(character.text, character.posX, character.posY);
    }

    function updateCharacterPosition(character) {
        character.posX += character.speedX;
        character.posY += character.speedY;

        if (character.posX <= Constants.LOWER_X_BOUND || character.posX >= canvas.width - Constants.UPPER_X_BOUNDING_PADDING)
            character.speedX = -character.speedX;
        else if (character.posY <= Constants.LOWER_Y_BOUND || character.posY >= canvas.height)
            character.speedY = -character.speedY;
    }

    function updateCharacter(character) {
        updateCharacterPosition(character);
        drawCharacter(character);
    }

    createPlayers();

    function updateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var enemy in enemiesList) {
            updateCharacter(enemiesList[enemy]);
            if (Physics.arePlayerAndEnemyColliding(player, enemiesList[enemy]))
                player.health -= 1;
        }

        drawCharacter(player);

    }
    setInterval(updateCanvas, 1);

    document.onmousemove = function (e) {
        player.posX = e.clientX - Constants.CURSOR_OFFSET_X;
        player.posY = e.clientY - Constants.CURSOR_OFFSET_Y;
    }

}())