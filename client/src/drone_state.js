const stateElement = document.getElementById('drone-state');

async function updateDroneState() {
    if (!window.current_drone) {
        stateElement.innerHTML = 'Подключитесь к дрону'
        return
    }
    try {
        let req = await fetch(`http://127.0.0.1:8000/get_state?ip=${window.current_drone}`);
        let state = await req.json();
        stateElement.innerHTML = state.info;
    }
    catch {
        stateElement.innerHTML = 'Произошла ошибка при попытке получения информации'
    }
}
