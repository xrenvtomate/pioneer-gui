const canvas = document.getElementById('drone-map');
const ctx = canvas.getContext('2d');

const width = 500, height = 400


function clearCanvas() {
    ctx.beginPath()
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#222'
    ctx.lineWidth = 2
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
}

async function getDroneCoordinates() {

    const response = await (await fetch(`http://127.0.0.1:8000/drone_coordinates/`)).json()
    return response;
}



async function updateCanvas() {
    clearCanvas();
    coords = await getDroneCoordinates();
    let x = coords.x, y = coords.y;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'green';
    ctx.fill();
    
}

async function update() {
    updateCanvas();
    // updating stats about a drone
}

window.setInterval(update, 500, )
