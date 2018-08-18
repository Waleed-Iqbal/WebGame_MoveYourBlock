var EventHandlers = (function () {


    document.onmousemove = function (e) {

        /*To have cursor in middle of player's box */
        let newPosX = e.clientX - Canvas.canvas.getBoundingClientRect().left;
        let newPosY = e.clientY - Canvas.canvas.getBoundingClientRect().top;

        if (newPosX < Player.width / 2)
            newPosX = Player.width / 2;
        else if (newPosX > Canvas.canvas.width - Player.width / 2)
            newPosX = Canvas.canvas.width - Player.width / 2;
        if (newPosY < Player.height / 2)
            newPosY = Player.height / 2;
        else if (newPosY > Canvas.canvas.height - Player.height / 2)
            newPosY = Canvas.canvas.height - Player.height / 2;


        Player.posX = newPosX;
        Player.posY = newPosY;
    }

    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 68: // d
            case 39: // right
                Player.pressingRight = true;
                break;

            case 83: // s,
            case 40: // down,
                Player.pressingDown = true;
                break;

            case 65: // a
            case 37: // left
                Player.pressingLeft = true;
                break;

            case 87: // w
            case 38: // up
                Player.pressingUp = true;
                break;

            default:
                break;
        }
    }

    document.onkeyup = function (e) {
        switch (e.keyCode) {
            case 68: // d
            case 39: // right
                Player.pressingRight = false;
                break;

            case 83: // s,
            case 40: // down,
                Player.pressingDown = false;
                break;

            case 65: // a
            case 37: // left
                Player.pressingLeft = false;
                break;

            case 87: // w
            case 38: // up
                Player.pressingUp = false;
                break;

            default:
                break;
        }
    }

}())