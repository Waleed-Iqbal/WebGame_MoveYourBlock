const WIDTH = 1500;
const HEIGHT = 700;

function printChar() { // :D

    if (x <= 0 || x >= WIDTH) {
        spdx = -spdx;
    else if ( y <= 0 || y >= HEIGHT) {
        spdy = -spdy;

    x += spdx;
    y += spdy;
    ctx.fillText("!", x, y);
}


var ctx = document.getElementById("ctx").getContext("2d");
var x = 50;
var y = 50;
var spdx = 10;
var spdy = 20;



ctx.font = "30px Arial";

setInterval(printChar, 1);