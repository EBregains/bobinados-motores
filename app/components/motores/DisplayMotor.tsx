import { FetchMotor } from "@/app/lib/data"
import { Motor } from "@/app/lib/definitions"

export default async function DisplayMotor( {id} : {id: String}) {

  const motor: Motor = await FetchMotor(id)

  return (
    <div>
    {motor &&
    <div>
      <h4>Hello, este es {motor.motor.titulo} y es un motor {motor.motor.tipo}</h4>
      <p>El condensador es {motor.motor.condensador}</p>
    </div>
    }
    </div>
  )
}