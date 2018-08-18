(function () {
    var score = 0;
    var frameCount = 0;
    var timeGameStarted = Date.now();
    
    Enemies.createEnemies();

    function startNewGame() {
        score = 0;
        frameCount = 0;
        Player.health = 10;
        Bullets.bulletList = {};
        Enemies.enemiesList = {};
        Upgrades.upgradeList = {};
        
        Enemies.createEnemies();
        timeGameStarted = Date.now();
    }   

    function updateGame() {
        Canvas.context.clearRect(0, 0, Canvas.canvas.width, Canvas.canvas.height);

        for (var upgradeKey in Upgrades.upgradeList) {
            let toRemove = false;
            Upgrades.upgradeList[upgradeKey].timer++;

            if (Upgrades.upgradeList[upgradeKey].timer >= 200)
                toRemove = true;

            Common.drawCharacter(Upgrades.upgradeList[upgradeKey], Canvas.context);

            if (Physics.arePlayerAndCharacterColliding(Player, Upgrades.upgradeList[upgradeKey])) {
                Player.health += 1;
                delete Upgrades.upgradeList[upgradeKey];
            }

            if (toRemove)
                delete Upgrades.upgradeList[upgradeKey];
        }

        for (var bulletKey in Bullets.bulletList) {

            let toRemove = false;

            Common.updateCharacterPositionAndDraw(Bullets.bulletList[bulletKey], Canvas.context);
            Bullets.bulletList[bulletKey].timer++;
            if (Bullets.bulletList[bulletKey].timer > 70) {
                toRemove = true;
            }

            for (var enemyKey in Enemies.enemiesList) {
                if (Physics.arePlayerAndCharacterColliding(Bullets.bulletList[bulletKey], Enemies.enemiesList[enemyKey])) {
                    delete Bullets.bulletList[bulletKey];
                    delete Enemies.enemiesList[enemyKey];
                    break;
                }
            }

            if (toRemove) {
                delete Bullets.bulletList[bulletKey];
            }
        }

        for (var enemyKey in Enemies.enemiesList) {
            Common.updateCharacterPositionAndDraw(Enemies.enemiesList[enemyKey], Canvas.context);
            if (Physics.arePlayerAndCharacterColliding(Player, Enemies.enemiesList[enemyKey]) && !Player.hasCollided) {
                Player.hasCollided = true;
                Player.collisionHandler(frameCount);
            }
        }

        Player.collisionHandler(frameCount);

        if (Player.health <= 0) {
            let timeSurvived = Date.now() - timeGameStarted;
            console.log("You Lost after " + timeSurvived / 1000 + " sec");
            startNewGame();
        }

        ++frameCount;
        ++score;

        // add an upgradeKey and enemyKey after 10 seconds
        if (frameCount % 340 === 0) {
            Enemies.generateRandom();
            Upgrades.generateRandom();
        }

        if (frameCount % 34 === 0) {
            Bullets.randomBulletGenerator();
        }

        Player.updatePosition();
        Common.drawCharacter(Player, Canvas.context);
        Canvas.context.fillText(Player.health + " HP", 0, 30);
        Canvas.context.fillText(Math.floor(score/5) + " HP", 390, 30);
    }

    setInterval(updateGame, 34); // to make it 30 FPS

}())