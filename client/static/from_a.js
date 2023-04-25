const myPics = document.getElementById('myPics');
const context = myPics.getContext('2d');


let isDrawing = false;
let x = 0;
let y = 0;
let r = 10;
let oldX = 0;
let oldY = 0;


context.clearRect(0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight);
drawCoord(context);

myPics.addEventListener('mouseup', e => {
    if (isDrawing === true) {
        oldX = x;
        oldY = y;
        x = 0;
        y = 0;
        isDrawing = false;
    }
    e.preventDefault();
});

myPics.addEventListener('mousedown', e => {
    cleanCircle(context, oldX, oldY)
    x = e.offsetX;
    y = e.offsetY;
    isDrawing = true;
    drawCircle(context, e.offsetX, e.offsetY, x, y);
    e.preventDefault();
});

myPics.addEventListener('mousemove', e => {
    if (isDrawing === true) {
        drawCircle(context, e.offsetX, e.offsetY, x, y);
        x = e.offsetX;
        y = e.offsetY;
    }
    e.preventDefault();
});




function cleanCircle(context, x0, y0) {
    context.beginPath();
    context.arc(x0, y0, r + 1, 0, 2 * Math.PI);
    context.strokeStyle = '#ffffff';
    context.fillStyle = '#ffffff';
    context.stroke();
    context.fill();
    context.closePath();
    context.stroke();
    drawCoord(context)
}
function drawCircle(context, x_d, y_d, x0, y0) {
    cleanCircle(context, x0, y0)
    context.beginPath();
    context.arc(x_d, y_d, r, 0, 2 * Math.PI);
    context.strokeStyle = '#aa0995';
    context.fillStyle = '#aa0995';
    context.stroke();
    context.fill();
    context.closePath();
}
function drawCoord(context) {
    context.beginPath();
    context.moveTo(0, 400 / 2);
    context.lineTo(500, 400 / 2);
    context.strokeStyle = "black"; //цвет линии
    context.lineWidth = "1"; //толщина линии
    context.stroke(); // обводка линии

    context.moveTo(500 / 2, 0);
    context.lineTo(500 / 2, 400);
    context.stroke();
    context.fill();
    context.closePath();
}