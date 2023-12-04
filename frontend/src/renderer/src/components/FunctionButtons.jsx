import Button from "./Button"
import { takeOffAll } from "../utils/commands"
export default () => {

  return (
    <div className='flex flex-col justify-between gap-2 mt-8 w-56'>
      <Button>Включение моторов</Button>
      <Button onClick={takeOffAll}>Взлет всех дронов</Button>
      <Button>Посадка всех дронов</Button>
    </div>
  )
}