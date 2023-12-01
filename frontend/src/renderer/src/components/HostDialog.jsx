import React, { useEffect, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog'
import { ImConnection } from "react-icons/im";
import { connect_host } from '../utils/connection';
import { MdOutlineClose } from "react-icons/md";

export default ({dronesToConnect, setDronesToConnect}) => {
  const [nets, setNets] = useState([])
  const [open, setOpen] = useState(false)
  const fetchNets = async () => {
    const response = await fetch("http://localhost:8000/list/");
    const items = await response.json();
    setNets(items)
  }
  useEffect(() => {
    const interval = setInterval(fetchNets, 10000);
    return () => clearInterval(interval);
  }, [])

  return <Dialog.Root open={open} onOpenChange={setOpen}>
    <Dialog.Trigger asChild>
      <button onClick={fetchNets} className='bg-zinc-600 px-4 font-semibold py-0.5 rounded transition-all hover:bg-slate-600 active:bg-slate-700 shadow hover:shadow-lg border border-white/10'>Выбрать хост</button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed bg-black/50 inset-0" />
      <Dialog.Content className="rounded-xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-800 p-8 w-96 border border-white/10">
        <Dialog.Title className="text-xl mb-4">Доступные сети</Dialog.Title>
        <div className='flex flex-col gap-2'>
          {nets.map(net => <div key={net} className="rounded bg-zinc-700 px-2 flex items-center">
          <ImConnection className='mr-2'/>
          {net}
          <button className='ml-auto' onClick={()=>{connect_host(net, dronesToConnect); setDronesToConnect([])}}>Подключиться</button>
          </div>)}
        </div>

        <Dialog.Close asChild>
          <button className="absolute top-2 right-2" aria-label="Close">
            <MdOutlineClose />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
}
