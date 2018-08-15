(function () {

    var canvas = document.getElementById("ctx");
    var ctx = canvas.getContext("2d");
    ctx.font = "40px Arial";
    var frameCount = 0;
    var score = 0;

    var enemiesList = {};
    var timeGameStarted = Date.now();

    function randomEnemyGenerator() {
        let Id = Math.random();
        enemiesList[Id] = {
            id: Math.random(),
            speedX: Constants.MIN_SPEED_X + Math.random() * Constants.MIN_SPEED_X,
            speedY: Constants.MIN_SPEED_Y + Math.random() * Constants.MIN_SPEED_Y,
            posX: Math.random() * canvas.width,
            posY: Math.random() * canvas.height,
            width: Constants.MIN_ENEMY_WIDTH + Math.random() * Constants.ENEMY_WIDTH,
            height: Constants.MIN_ENEMY_HEIGHT + Math.random() * Constants.ENEMY_HEIGHT,
            color: "red"
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
        height: Constants.PLAYER_WIDTH,
        color: "green"
    };

    function createEnemies() {
        randomEnemyGenerator();
        randomEnemyGenerator();
        randomEnemyGenerator();
    }


    function drawCharacter(character) {
        ctx.save();
        ctx.fillStyle = character.color;
        ctx.fillRect(character.posX - character.width / 2, character.posY - character.height / 2, character.width, character.height);
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
        drawCharacter(character);
    }

    createEnemies();

    function startNewGame() {
        frameCount = 0;
        score = 0;
        player.health = 10;
        enemiesList = {};
        timeGameStarted = Date.now();
        createEnemies();
    }


    function updateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var enemy in enemiesList) {
            updateCharacter(enemiesList[enemy]);
            if (Physics.arePlayerAndEnemyColliding(player, enemiesList[enemy])) {
                player.health -= 1;
            }
        }

        if (player.health <= 0) {
            let timeSurvived = Date.now() - timeGameStarted;
            console.log("You Lost after " + timeSurvived / 1000 + " sec");
            startNewGame(); 
        }

        drawCharacter(player);
        ctx.fillText(player.health + " HP", 0, 30);
        ctx.fillText(score + " HP", 390, 30);


        // add enemy after 10 seconds
        ++frameCount;
        ++score;
        if (frameCount % 340 === 0)
            randomEnemyGenerator();
    }

    document.onmousemove = function (e) {
        let newPosX = e.clientX - canvas.getBoundingClientRect().left /*To have cursor in middle of player's box */ ;
        let newPosY = e.clientY - canvas.getBoundingClientRect().top /*To have cursor in middle of player's box */ ;

        if (newPosX < player.width / 2)
            newPosX = player.width / 2;
        else if (newPosX > canvas.width - player.width / 2)
            newPosX = canvas.width - player.width / 2;
        if (newPosY < player.height / 2)
            newPosY = player.height / 2;
        else if (newPosY > canvas.height - player.height / 2)
            newPosY = canvas.height - player.height / 2;


        player.posX = newPosX;
        player.posY = newPosY;
    }


    setInterval(updateCanvas, 34); // to make it 30 FPS

}())