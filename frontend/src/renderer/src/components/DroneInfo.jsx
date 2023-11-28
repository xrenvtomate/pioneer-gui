import Button from "./Button"

export default function ({currentDrone}) {
  const info = {
    ip: '123231',
    height: '0.4m',
    x: '0.3m',
    y: '0.5m',
    z: '0.6m',
    battery: '42%',
  }
  return <div className="p-4 rounded-xl bg-zinc-700 flex flex-col gap-4 shadow-xl">
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
        x: <input type="text" className="w-8 bg-zinc-500 rounded mr-1" />
        y: <input type="text" className="w-8 bg-zinc-500 rounded mr-1" />
        z: <input type="text" className="w-8 bg-zinc-500 rounded" />
      </div>
      <Button>Лететь в координаты</Button>
    </div>
  </div>
}