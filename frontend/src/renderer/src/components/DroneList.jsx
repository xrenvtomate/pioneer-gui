import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { MdBlock } from "react-icons/md";
import { connectClient } from "../utils/connection";
import AvailableDrone from "./AvailableDrone";

export default function({drones, dronesToConnect, setDronesToConnect, connectedDrones}) {
  const [availableDrones, setAvailableDrones] = useState([])
  const fetchDrones = async () => {
    const response = await fetch("http://localhost:8000/list/");
    const items = await response.json();
    const pioneers = items.filter(str => str.startsWith("Pio") && !connectedDrones.includes(str));
    setAvailableDrones(pioneers)
  }
  useEffect(() => {
    const interval = setInterval(fetchDrones, 10000);
    return () => clearInterval(interval);
  }, [])



  return <div className="p-4 rounded-xl bg-zinc-700 shadow-xl border border-white/10">
    <p className="tex-xl mb-2">Подключенные дроны</p>
    <div className="flex flex-col gap-1">
      {drones.map((drone, i) => (
        <div className="bg-zinc-500 rounded px-2 flex justify-between items-center" key={[drone.ip, i]}>
          {drone.ip}
          <button onClick={() => (1)}>
            <MdBlock size={'1.1em'} color="#cbd5e1"/>
          </button>
        </div>
      ))}
    </div>
    <p className="tex-xl mb-2 mt-4">Доступные для подключения</p>
    <div className="flex flex-col gap-1">
      {availableDrones.map(drone => (
        <AvailableDrone drone={drone} {...{setDronesToConnect}} status={dronesToConnect.includes(drone)} />
      ))}
    </div>
  </div>
}