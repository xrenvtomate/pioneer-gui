import { toast } from "react-toastify";


export const save_host = async (ssid) => {
  await fetch("http://localhost:8000/save_host", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ssid: ssid }),
  });
  toast.success(`Сохранено ${ssid}`)
}


export const connect_host = (dronesToConnect, setDrones, setDronesToConnect) => {
  const ws = new WebSocket("ws://localhost:8000/ws");
  const id = toast.info('Подключение к хосту', { autoClose: false, isLoading: true })
  const data = { drones: dronesToConnect };
  ws.onopen = () => {
    ws.send(JSON.stringify(data));
  };
  ws.onmessage = (event) => {
    try {
      let data = JSON.parse(event.data);
      if (Array.isArray(data)) {
        console.log(data)
        setDronesToConnect([])
        setDrones(Array.from(data, el => ({ip: el})))
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }
    toast.update(id, { render: event.data, type: "info", isLoading: true, autoClose: false })
  }
  ws.onclose = () => {
    toast.update(id, { isLoading: false, autoClose: 3000 })
  }

}
