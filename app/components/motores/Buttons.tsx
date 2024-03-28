import { arrowRight, edit, plus } from "@/app/utils/icons";
import Link from "next/link";

export function ViewMotor({id}: {id: number}) {
  return (
    <Link 
      className="flex justify-center items-center h-9 w-9 text-neutral-300 rounded-full hover:text-amber-600"
      href={`motores/${id}`}
    >
      {arrowRight}
    </Link>
  )
}

export function EditMotor({id}: {id: number}) {
  return (
    <Link 
      className="flex justify-center items-center h-9 w-9 text-neutral-600 rounded-full hover:text-neutral-400"
      href={`motores/${id}/edit`}
    >
      {edit}
    </Link>
  )
}

export function AddMotor() {
  return (
    <Link
      className=" flex items-center justify-center rounded-full bg-amber-600 px-4 py-4 hover:bg-amber-700 hover:animate-pulse"
      href="/motores/create">
        {plus}
    </Link>
  )
}