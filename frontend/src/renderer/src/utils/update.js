export const updateDroneInfo = async (currentDrone, setDroneInfo) => {
  if (!currentDrone) return
  const response = await fetch(`http://localhost:8000/info?drone_ip=${currentDrone.ip}`)
  const data = await response.json();
  console.log('drone info', data)
  setDroneInfo(data)
} 
