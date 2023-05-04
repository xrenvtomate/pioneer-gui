
const disconnection_btn = document.getElementById("disconnect-btn");
const motorOn_btn = document.getElementById("motorOn-btn");

disconnection_btn.addEventListener("click", async () => {
  const data = {object: window.result.object}
  const response = await fetch('http://localhost:8000/disconnect', {
    method: 'POST',
    body: JSON.stringify(data)
  });
})

motorOn_btn.addEventListener("click", async () =>{
  const data = {object: window.result.object}
  const response = await fetch('http://localhost:8000/disconnect', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
})

disconnection_btn.addEventListener("click", async () => {
  const data = {object: window.result.object}
  const response = await fetch('http://localhost:8000/disconnect', {
    method: 'POST',
    body: JSON.stringify(data)
  });
})

motorOn_btn.addEventListener("click", async () =>{
  const data = {object: window.result.object}
  const response = await fetch('http://localhost:8000/disconnect', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
})
