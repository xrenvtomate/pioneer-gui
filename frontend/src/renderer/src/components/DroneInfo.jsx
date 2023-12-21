import Button from "./Button"
import { flyToXYZ, land, takeOff } from "../utils/commands"
import { useEffect, useState } from "react"

export default function ({currentDrone, droneInfo}) {
  const [coords, setCoords] = useState([0, 0, 0])

  
  // droneInfo = {
  //   ip: currentDrone?.ip,
  //   height: '0.4m',
  //   x: '0.3m',
  //   y: '0.5m',
  //   z: '0.6m',
  //   battery: '42%',
  // }
  return <div className="p-4 rounded-xl bg-zinc-700 flex flex-col gap-4 shadow-xl border border-white/10 flex-1">
    {currentDrone && droneInfo ? (
      <>
        <p className="text-xl">ip: {currentDrone.ip}</p>
        <div>
          <p>Высота: {droneInfo.height}</p>
          <p>Заряд аккумулятора: {droneInfo.battery}</p>
          <p>x: {droneInfo.x} y: {droneInfo.y} z: {droneInfo.z}</p>
        </div>
        <div className="flex justify-between">
          <Button onClick={()=>(takeOff(currentDrone.ip))}>Взлет</Button>
          <Button onClick={()=>(land(currentDrone.ip))}>Посадка</Button>
        </div>
        <div>
          <div className="mb-2">
            x: <input value={coords[0]} onChange={e => setCoords([e.target.value, ...coords.slice(1, 3)])} type="text" className="w-8 bg-zinc-500 rounded mr-1" />
            y: <input value={coords[1]} onChange={e => setCoords([coords[0], e.target.value, coords[2]])} type="text" className="w-8 bg-zinc-500 rounded mr-1" />
            z: <input value={coords[2]} onChange={e => setCoords([...coords.slice(0, 2), e.target.value])} type="text" className="w-8 bg-zinc-500 rounded" />
          </div>
          <Button onClick={()=>flyToXYZ(currentDrone.ip, ...coords)}>Лететь в координаты</Button>
        </div>
      </>) : (
        <p>Выберите дрона</p>
      )}
  </div>
}