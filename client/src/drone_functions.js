
const disconnection_btn = document.getElementById("disconnect-btn");
const motorOn_btn = document.getElementById("motorOn-btn");
const takeoff_all_btn = document.getElementById("takeoff-all-btn")



takeoff_all_btn.addEventListener("click", async () =>{
  await fetch(
    'http://localhost:8000/takeoff_all/', {
      method: 'POST',
    }
  )
})

motorOn_btn.addEventListener("click", async () =>{
  console.log(window.current_drone)
  await fetch(
    'http://localhost:8000/motor_on/', {
      method: 'POST',
      body: JSON.stringify({drone_ip: window.current_drone})
    }
  )
})

disconnection_btn.addEventListener("click", async () => {
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
