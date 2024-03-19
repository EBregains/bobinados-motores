import { arrowLeft } from "@/app/utils/icons";
import Link from "next/link";

export default function MotorPage({params} : {params: {id: string}}) {
  return (
    <div className="flex h-max gap-6 items-center justify-center">
      <Link
        href='/motores'
      >{arrowLeft}</Link>
      <h1>Displaying Motor {params.id}</h1>
    </div>
  )
}