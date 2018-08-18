var Canvas = (function () {
    var canvas = document.getElementById("ctx");
    var context = canvas.getContext("2d");
    context.font = "40px Arial";


    return {
        canvas: canvas,
        context: context
    }

}())