import { MdAdd } from "react-icons/md";
import { MdBlock } from "react-icons/md";

export default function({drones}) {
  const availableDrones = ['pioneer-gh29gh2g', 'pioneer-gh29gh21g']
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
        <div className="bg-zinc-500 rounded px-2 flex justify-between items-center" key={drone}>
          {drone}
          <button onClick={() => (1)}>
            <MdAdd size={'1.3em'} color="#cbd5e1"/>
          </button>
        </div>
      ))}
    </div>
  </div>
}