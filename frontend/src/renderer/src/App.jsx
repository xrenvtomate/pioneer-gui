import Button from './components/Button'
import Map from './components/Map'
import { useEffect, useState } from 'react'
import DroneList from './components/DroneList'
import DroneInfo from './components/DroneInfo'
import HostDialog from './components/HostDialog'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [state, setState] = useState(1)
  const [drones, setDrones] = useState([])
  const [currentDrone, setCurrentDrone] = useState('123')
  const [dronesToConnect, setDronesToConnect] = useState([])

  // for test
  useEffect(() => setDrones([
    {ip: '123.123.123.123'},
    {ip: '123.123.123.123'},
    {ip: '123.123.123.123'},
    {ip: '123.123.123.123'},
  ]), [])

  return (<>
    <ToastContainer theme="dark" />
    <div className='p-8 h-full relative box-border'>
      <div className='flex justify-between'>
        <Map />
        <DroneInfo {...{currentDrone}}/>
        <DroneList {...{drones}} {...{dronesToConnect, setDronesToConnect}} />
      </div>
      <div className='flex flex-col justify-between gap-2 mt-8 w-56'>
        <Button>Включение моторов</Button>
        <Button>Взлет всех дронов</Button>
        <Button>Посадка всех дронов</Button>
      </div>
    </div>
    <div className='absolute bottom-0 flex justify-between w-full p-8'>
      <Button>Запустить скрипт</Button>
      <div className='flex gap-2'>
        <HostDialog {...{dronesToConnect}} />
        <Button>Подключить всех к хосту</Button>
      </div>
    </div>
  </>)
}

export default App
