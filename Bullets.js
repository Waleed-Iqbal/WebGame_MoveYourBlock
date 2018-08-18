var Bullets = (function(){

    var bulletList = {};

    function randomBulletGenerator() {
        let Id = Math.random();
        let angle = Math.random() * 360;

        angle = (angle / 180) * Math.PI;

        bulletList[Id] = {
            id: Math.random(),
            speedX: Math.cos(angle) * 5,
            speedY: Math.sin(angle) * 5,
            posX: Player.posX,
            posY: Player.posY,
            width: Constants.BULLET_HEIGHT,
            height: Constants.BULLET_WIDTH,
            color: "black",
            timer: 0
        };
    }

    return {
        bulletList: bulletList,
        randomBulletGenerator: randomBulletGenerator
    }

}())