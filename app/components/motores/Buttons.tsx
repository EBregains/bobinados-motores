import { arrowRight, check, edit, eye } from "@/app/utils/icons";
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