export function takeOffAll() {
  fetch(
    'http://localhost:8000/takeoff_all/', {
      method: 'POST',
    }
  )
}


export function flyToXYZ(drone, x, y, z) {
  fetch('http://localhost:8000/goto/', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({drone_ip: drone, x, y, z})
  })
}

export function takeOff(drone) {
  fetch('http://localhost:8000/takeoff/', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({drone_ip: drone})
  })
}

export function land(drone) {
  fetch('http://localhost:8000/land/', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({drone_ip: drone})
  })
  
}