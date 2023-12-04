import { useEffect } from "react"

export default (drones, currentDrone, setCurrentDrone) => {
  useEffect(() => {
    if (!currentDrone && drones.length) setCurrentDrone(drones[0])
  }, [drones])
}