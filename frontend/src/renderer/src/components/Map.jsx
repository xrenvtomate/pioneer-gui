import { useEffect } from "react"

export default function() {
  const a = {asdf: 123}
  useEffect(() => {
    console.log(a)
  }, [])
  return <div className="w-60 h-60 rounded-xl bg-slate-700 shadow-xl">

  </div>
}