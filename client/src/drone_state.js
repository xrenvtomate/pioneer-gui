const stateElement = document.getElementById('drone-state');

async function updateDroneState() {
    let req = await fetch(`http://127.0.0.1:8000/get_state/`);
    let state = await req.json();
    stateElement.innerHTML = state.info;
}
