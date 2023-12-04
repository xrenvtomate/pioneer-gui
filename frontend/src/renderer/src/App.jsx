import Button from './components/Button'
import Map from './components/Map'
import { useEffect, useState } from 'react'
import DroneList from './components/DroneList'
import DroneInfo from './components/DroneInfo'
import HostDialog from './components/HostDialog'
import FunctionButtons from './components/FunctionButtons'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [drones, setDrones] = useState([])
  const [currentDrone, setCurrentDrone] = useState('123')
  const [connectedDrones, setConnectedDrones] = useState([])
  const [dronesToConnect, setDronesToConnect] = useState([])


  useEffect(() => setDrones([
    {ip: '22.123.123.123'},
    {ip: '123.64.123.123'},
    {ip: '123.123.34.123'},
    {ip: '123.98.123.123'},
  ]), [])

  return (<>
    <ToastContainer theme="dark" />
    <div className='p-8 h-full relative box-border'>
      <div className='flex justify-between'>
        <Map />
        <DroneInfo {...{currentDrone}}/>
        <DroneList {...{drones, dronesToConnect, setDronesToConnect, connectedDrones, currentDrone, setCurrentDrone}} />
      </div>
      <FunctionButtons />
    </div>
    <div className='absolute bottom-0 flex justify-between w-full p-8'>
      <Button>Запустить скрипт</Button>
      <div className='flex gap-2'>
        <HostDialog {...{dronesToConnect, setDronesToConnect, setDrones}} />
        <Button>Подключить всех к хосту</Button>
      </div>
    </div>
  </>)
}

export default App
