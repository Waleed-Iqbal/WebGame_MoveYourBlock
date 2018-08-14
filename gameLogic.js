(function () {

    var canvas = document.getElementById("ctx");
    var ctx = canvas.getContext("2d");
    ctx.font = "40px Arial";

    var enemiesList = {};
    var timeGameStarted = Date.now();

    function enemyFactory(Id, PositionX, PositionY, SpeedX, SpeedY, Content, Width, Height) {
        enemiesList[Id] = {
            id: Id,
            text: Content,
            speedX: SpeedX,
            speedY: SpeedY,
            posX: PositionX,
            posY: PositionY,
            width: Width,
            height: Height
        };
    }

    var player = {
        id: 0,
        text: "P",
        speedX: 110,
        speedY: 50,
        posX: -3,
        posY: -2,
        health: 10,
        width: Constants.PLAYER_HEIGHT,
        height: Constants.PLAYER_WIDTH
    };

    function createPlayers() {
        enemyFactory(1, 50, 50, 2, -2, "E0", 30, 30);
        enemyFactory(2, 300, 540, 2, 3, "E1", 30, 30);
        enemyFactory(3, 300, 140, 2, 3, "E2", 30, 30);
    }


    function drawPlayer(character) {
        ctx.save();
        ctx.fillStyle = 'green';
        ctx.fillRect(character.posX - 10, character.posY - 10, 20, 20);
        ctx.restore();
    }

    function drawEnemy(character) {
        ctx.save();
        ctx.fillStyle = 'red';
        ctx.fillRect(character.posX - 15, character.posY - 15, 30, 30);
        ctx.restore();
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
        drawEnemy(character);
    }

    createPlayers();

    function updateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var enemy in enemiesList) {
            updateCharacter(enemiesList[enemy]);
            if (Physics.arePlayerAndEnemyColliding(player, enemiesList[enemy])) {
                player.health -= 1;
                if (player.health <= 0) {
                    let timeSurvived = Date.now() - timeGameStarted;
                    console.log("You Lost after " + timeSurvived / 1000 + " sec");
                    player.health = 10;
                }
            }
        }

        drawPlayer(player);
        ctx.fillText(player.health + " HP", 0, 30);
    }
    setInterval(updateCanvas, 1);

    document.onmousemove = function (e) {
        player.posX = e.clientX;
        player.posY = e.clientY;
    }

}())