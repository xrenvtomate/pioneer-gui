const disconnect_btn = document.getElementById("disconnect-btn");
const motorOn_btn = document.getElementById("motorOn-btn");
const takeoff_all_btn = document.getElementById("takeoff-all-btn");
const land_btn = document.getElementById("land-btn")
const motorOff_btn = document.getElementById("motorOff-btn");



takeoff_all_btn.addEventListener("click", async () => {
  if (!window.current_drone) {
    generateAlert('danger', 'Отстутствуют подключенные дроны')
    return
  }
  await fetch(
    'http://localhost:8000/takeoff_all/', {
      method: 'POST',
    }
  )
})

motorOn_btn.addEventListener("click", async () =>{
  if (!window.current_drone) {
    generateAlert('danger', 'Отстутствуют подключенные дроны')
    return
  }
  await fetch(
    'http://localhost:8000/motor_on/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({drone_ip: window.current_drone})
    }
  )
})

motorOff_btn.addEventListener("click", async () => {
  if (!window.current_drone) {
    generateAlert('danger', 'Отстутствуют подключенные дроны')
    return
  }
  await fetch(
    'http://localhost:8000/motor_off/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({drone_ip: window.current_drone})
    }
  )
})

disconnect_btn.addEventListener("click", async () => {
  if (!window.current_drone) {
    generateAlert('danger', 'Отстутствуют подключенные дроны')
    return
  }
  console.log(window.current_drone)
  await fetch(
    'http://localhost:8000/disconnect/', {
      method: 'POST',
      body: JSON.stringify({drone_ip: window.current_drone})
    }
  )
  // const response = await fetch('http://localhost:8000/disconnect', {
  //   method: 'POST',
  //   body: JSON.stringify(data)
  // });
})
