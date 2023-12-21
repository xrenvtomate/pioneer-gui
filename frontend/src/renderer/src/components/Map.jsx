import { useEffect, useState } from "react"

export default function Map({drones}) {
  const [coordinates, setCoordinates] = useState([
    // { x: 10, y: 10 },
    // { x: 20, y: 52 },
  ]);


  useEffect(() => {
    const interval = setInterval(async () => {
      if (!drones.length) return
      const response = await fetch(`http://localhost:8000/coordinates`)
      const data = await response.json();
      setCoordinates(data)
    }, 1000); 

    return () => clearInterval(interval);
  }, [drones]);

  return (
    <div className="w-60 h-60 rounded-xl bg-slate-700 shadow-xl">
      <svg className="w-full h-full">
        <line x1="0" y1="120" x2="240" y2="120" stroke="#64748b" />
        <line x1="120" y1="0" x2="120" y2="240" stroke="#64748b" />

        {coordinates.map((coord, index) => (
          <circle key={index} cx={coord.x*20 + 120} cy={coord.y*20 + 120} r="5" fill="white" />
        ))}
      </svg>
    </div>
  );
}