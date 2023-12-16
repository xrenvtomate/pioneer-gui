export const updateDroneInfo = async (currentDrone, setDroneInfo) => {
  if (!currentDrone) return
  const response = await fetch(`http://localhost:8000/droneInfo?drone_ip=${currentDrone.ip}`)
  const data = await response.json();
  setDroneInfo(data)
} 
