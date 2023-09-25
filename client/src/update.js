async function update() {
    updateCanvas();
    updateDroneState();
}

let updateInterval = window.setInterval(update, 500)
setTimeout(() => clearInterval(updateInterval), 10000)
