import Button from "./Button"
import { flyToXYZ } from "../utils/commands"
import { useState } from "react"

export default function ({currentDrone}) {
  const [coords, setCoords] = useState([0, 0, 0])
  const info = {
    ip: currentDrone.ip,
    height: '0.4m',
    x: '0.3m',
    y: '0.5m',
    z: '0.6m',
    battery: '42%',
  }
  return <div className="p-4 rounded-xl bg-zinc-700 flex flex-col gap-4 shadow-xl border border-white/10">
    <p className="text-xl">ip: {info.ip}</p>
    <div>
      <p>Высота: {info.height}</p>
      <p>Заряд аккумулятора: {info.battery}</p>
      <p>x: {info.x} y: {info.y} z: {info.z}</p>
    </div>
    <div className="flex justify-between">
      <Button onClick={()=>(1)}>Взлет</Button>
      <Button onClick={()=>(1)}>Посадка</Button>
    </div>
    <div>
      <div className="mb-2">
        x: <input value={coords[0]} onChange={e => setCoords([e.target.value, ...coords.slice(1, 3)])} type="text" className="w-8 bg-zinc-500 rounded mr-1" />
        y: <input value={coords[1]} onChange={e => setCoords([coords[0], e.target.value, coords[2]])} type="text" className="w-8 bg-zinc-500 rounded mr-1" />
        z: <input value={coords[2]} onChange={e => setCoords([...coords.slice(0, 2), e.target.value])} type="text" className="w-8 bg-zinc-500 rounded" />
      </div>
      <Button onClick={()=>flyToXYZ(currentDrone, ...coords)}>Лететь в координаты</Button>
    </div>
  </div>
}