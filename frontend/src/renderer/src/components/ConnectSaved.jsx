import { connect_host } from "../utils/connection"
import Button from "./Button"

export default ({dronesToConnect, setDronesToConnect, setDrones}) => {
  const connect = async () => {
    const res = await connect_host(dronesToConnect)
    if (res) {
      setDrones(res.map(el => ({ip: el})))
      setDronesToConnect([])
    }
  }
  return <Button onClick={connect}>Подключить всех к хосту</Button>
}
