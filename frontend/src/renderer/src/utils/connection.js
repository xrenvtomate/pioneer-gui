import { toast } from "react-toastify";

export const connect_host = async (ssid, dronesToConnect) => {
  const data = { ssid: ssid, drones: dronesToConnect };
  const response = await fetch("http://localhost:8000/connect_host/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const res = await response.json()
  if (res.res == "error") {
    toast.error('Не получилось подключиться')
  }
  else {
    toast.success("Подключено")
  }
}
