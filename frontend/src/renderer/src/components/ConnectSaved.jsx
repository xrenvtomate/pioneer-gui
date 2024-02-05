import { connect_host } from "../utils/connection"
import Button from "./Button"

export default ({dronesToConnect, setDronesToConnect, setDrones}) => {
  const connect = async () => {
    connect_host(dronesToConnect, setDrones, setDronesToConnect)
  }
  return <Button onClick={connect}>Подключить всех к хосту</Button>
}
