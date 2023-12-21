import { MdAdd } from "react-icons/md";
import { MdOutlineCheck } from "react-icons/md";
import { useState } from "react"

export default ({drone, setDronesToConnect}) => {
  const [status, setStatus] = useState('')
  const connect = () => {
    if (status != '') return
    setStatus('added')
    setDronesToConnect(drones => [...drones, drone])
  }
  return <div className="bg-zinc-500 rounded px-2 flex justify-between items-center">
    {drone}
    <button onClick={connect}>
      {status == '' ? (
        <MdAdd size={'1.3em'} color="#cbd5e1" />
      ) : (
        <MdOutlineCheck size={'1.3em'} color="#cbd5e1" />
      )}
    </button>
  </div>
}