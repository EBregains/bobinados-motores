import { arrowLeft } from "@/app/utils/icons";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Detalle de Motor',
};

export default function MotorPage({params} : {params: {id: string}}) {
  return (
    <main className="flex h-max gap-6 items-center justify-center">
      <Link
        href='/motores'
      >{arrowLeft}</Link>
      <h1>Displaying Motor {params.id}</h1>
    </main>
  )
}