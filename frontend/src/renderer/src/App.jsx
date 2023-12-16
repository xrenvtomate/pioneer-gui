import Button from './components/Button'
import Map from './components/Map'
import { useEffect, useState } from 'react'
import DroneList from './components/DroneList'
import DroneInfo from './components/DroneInfo'
import HostDialog from './components/HostDialog'
import FunctionButtons from './components/FunctionButtons'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import useAutoSelectDrone from './hooks/useAutoSelectDrone'
import ConnectSaved from './components/ConnectSaved'
import { updateDroneInfo } from './utils/update'

function App() {
  const [drones, setDrones] = useState([])
  const [currentDrone, setCurrentDrone] = useState(null)
  const [dronesToConnect, setDronesToConnect] = useState([])
  const [droneInfo, setDroneInfo] = useState(null);

  useAutoSelectDrone(drones, currentDrone, setCurrentDrone)

  // useEffect(() => setDrones([
  //   {ip: '22.123.123.123'},
  //   {ip: '123.64.123.123'},
  //   {ip: '123.123.34.123'},
  //   {ip: '123.98.123.123'},
  // ]), [])
  useEffect(() => {
    const interval = setInterval(() => updateDroneInfo(currentDrone, setDroneInfo), 2000);
    return () => clearInterval(interval);
  }, [currentDrone]);

  return (<>
    <ToastContainer theme="dark" />
    <div className='p-8 h-full relative box-border'>
      <div className='flex justify-between gap-4'>
        <Map {...{drones}} />
        <DroneInfo {...{ currentDrone, droneInfo }} />
        <DroneList {...{ drones, dronesToConnect, setDronesToConnect, currentDrone, setCurrentDrone }} />
      </div>
      <FunctionButtons />
    </div>
    <div className='absolute bottom-0 flex justify-between w-full p-8'>
      <Button>Запустить скрипт</Button>
      <div className='flex gap-2'>
        <HostDialog {...{ dronesToConnect, setDronesToConnect, setDrones }} />
        <ConnectSaved {...{ dronesToConnect, setDronesToConnect, setDrones }} />
      </div>
    </div>
  </>)
}

export default App
