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


export const connect_host = async (dronesToConnect) => {
  const ws = new WebSocket("ws://localhost:8000/ws");
  const id = toast.info('Подключение к серверу', { autoClose: false, isLoading: true })
  const data = { drones: dronesToConnect };
  ws.onopen = () => {
    ws.send(JSON.stringify(data));
  };
  ws.onmessage = (event) => {
    toast.update(id, { render: event.data, type: "info", isLoading: true, autoClose: false })
  }
  ws.onclose = () => {
    toast.update(id, { isLoading: false, autoClose: 3000 })
  }
  // const data = { ssid: ssid, drones: dronesToConnect };
  // const response = await fetch("http://localhost:8000/connect_host", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // });
  // const res = await response.json()
  // if (res.res == "error") {
  //   toast.error('Не получилось подключиться')
  //   return null
  // }
  // else {
  //   toast.success(`Подключено к ${ssid}`)
  //   return res.list
  // }
}
