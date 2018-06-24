var width = 1500;
var height = 700;

function printChar() { // :D

    if (x >= width) {
        spdx = -spdx;
    } else if (x <= 0)
        spdx = Math.abs(spdx);
    else if (y >= height) {
        spdy = -spdy;
    } else if (y <= 0)
        spdy = Math.abs(spdy);

    x += spdx;
    y += spdy;
    ctx.fillText("!", x, y);
    //if (x >= width) clearInterval(printChar);
}


var ctx = document.getElementById("ctx").getContext("2d");
var x = 50;
var y = 50;
var spdx = 10;
var spdy = 20;



ctx.font = "30px Arial";

setInterval(printChar, 1);