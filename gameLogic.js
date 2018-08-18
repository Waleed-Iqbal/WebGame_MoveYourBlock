(function () {

    var canvas = document.getElementById("ctx");
    var ctx = canvas.getContext("2d");
    ctx.font = "40px Arial";
    var frameCount = 0;
    var hasPlayerCollided = false;
    var score = 0;

    var enemiesList = {};
    var upgradeList = {};
    var bulletList = {};

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

    function randomUpgradeGenerator() {
        let Id = Math.random();
        upgradeList[Id] = {
            id: Math.random(),
            speedX: Constants.UPGRADE_SPEED_X,
            speedY: Constants.UPGRADE_SPEED_Y,
            posX: Math.random() * canvas.width,
            posY: Math.random() * canvas.height,
            width: Constants.UPGRADE_HEIGHT,
            height: Constants.UPGRADE_WIDTH,
            color: "orange",
            timer: 0
        };
    }

    function randomBulletGenerator() {
        let Id = Math.random();
        let angle = Math.random() * 360;
        angle = (angle / 180) * Math.PI;
        bulletList[Id] = {
            id: Math.random(),
            speedX: Math.cos(angle) * 5,
            speedY: Math.sin(angle) * 5,
            posX: player.posX,
            posY: player.posY,
            width: Constants.BULLET_HEIGHT,
            height: Constants.BULLET_WIDTH,
            color: "black",
            timer: 0
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
        color: "green",
        pressingUp: false,
        pressingDown: false,
        pressingLeft: false,
        pressingRight: false,
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

    function updateEnemyPosition(character) {
        character.posX += character.speedX;
        character.posY += character.speedY;

        if (character.posX <= Constants.LOWER_X_BOUND || character.posX >= canvas.width - Constants.UPPER_X_BOUNDING_PADDING)
            character.speedX = -character.speedX;
        else if (character.posY <= Constants.LOWER_Y_BOUND || character.posY >= canvas.height)
            character.speedY = -character.speedY;
    }

    function updateEnemy(enemy) {
        updateEnemyPosition(enemy);
        drawCharacter(enemy);
    }

    createEnemies();

    function startNewGame() {
        frameCount = 0;
        score = 0;
        player.health = 10;
        enemiesList = {};
        upgradeList = {};
        bulletList = {};
        timeGameStarted = Date.now();
        createEnemies();
    }

    function handlePlayerCollision() {
        if (frameCount % 10 === 0 && hasPlayerCollided) {
            player.health -= 1;
            hasPlayerCollided = false;
        }
    }


    function updatePlayerPosition() {
        if (player.pressingRight)
            player.posX += 5;
        if (player.pressingLeft)
            player.posX -= 5;
        if (player.pressingDown)
            player.posY += 5;
        if (player.pressingUp)
            player.posY -= 5;
    }

    function updateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        



        for (var upgrade in upgradeList) {
            let toRemove = false;
            upgradeList[upgrade].timer++;

            if (upgradeList[upgrade].timer >= 200)
                toRemove = true;

            drawCharacter(upgradeList[upgrade]);

            if (Physics.arePlayerAndEnemyColliding(player, upgradeList[upgrade])) {
                player.health += 1;
                delete upgradeList[upgrade];
            }

            if (toRemove)
                delete upgradeList[upgrade];
        }

        for (var bullet in bulletList) {

            let toRemove = false;

            updateEnemy(bulletList[bullet]);
            bulletList[bullet].timer++;
            if (bulletList[bullet].timer > 70) {
                toRemove = true;
            }

            for (var enemy in enemiesList) {
                if (Physics.arePlayerAndEnemyColliding(bulletList[bullet], enemiesList[enemy])) {
                    delete bulletList[bullet];
                    delete enemiesList[enemy];
                    break;
                }
            }

            if (toRemove) {
                delete bulletList[bullet];
            }
        }

        for (var enemy in enemiesList) {
            updateEnemy(enemiesList[enemy]);
            if (Physics.arePlayerAndEnemyColliding(player, enemiesList[enemy]) && !hasPlayerCollided) {
                hasPlayerCollided = true;
                handlePlayerCollision();
            }
        }
        handlePlayerCollision();

        if (player.health <= 0) {
            let timeSurvived = Date.now() - timeGameStarted;
            console.log("You Lost after " + timeSurvived / 1000 + " sec");
            startNewGame();
        }

        ++frameCount;
        ++score;

        // add an upgrade and enemy after 10 seconds
        if (frameCount % 340 === 0) {
            randomEnemyGenerator();
            randomUpgradeGenerator();
        }

        if (frameCount % 34 === 0) {
            randomBulletGenerator();
        }

        updatePlayerPosition();
        drawCharacter(player);
        ctx.fillText(player.health + " HP", 0, 30);
        ctx.fillText(Math.floor(score/5) + " HP", 390, 30);
        
    }

    document.onmousemove = function (e) {

        /*To have cursor in middle of player's box */
        let newPosX = e.clientX - canvas.getBoundingClientRect().left;
        let newPosY = e.clientY - canvas.getBoundingClientRect().top;

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

    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 68: // d
            case 39: // right
                player.pressingRight = true;
                break;

            case 83: // s,
            case 40: // down,
                player.pressingDown = true;
                break;

            case 65: // a
            case 37: // left
                player.pressingLeft = true;
                break;

            case 87: // w
            case 38: // up
                player.pressingUp = true;
                break;

            default:
                break;
        }
    }

    document.onkeyup = function (e) {
        switch (e.keyCode) {
            case 68: // d
            case 39: // right
                player.pressingRight = false;
                break;

            case 83: // s,
            case 40: // down,
                player.pressingDown = false;
                break;

            case 65: // a
            case 37: // left
                player.pressingLeft = false;
                break;

            case 87: // w
            case 38: // up
                player.pressingUp = false;
                break;

            default:
                break;
        }
    }





    setInterval(updateCanvas, 34); // to make it 30 FPS

}())