import DisplayMotor from "@/app/components/motores/DisplayMotor";
import { arrowLeft } from "@/app/utils/icons";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Detalle de Motor',
};

export default function MotorPage({params} : {params: {id: string}}) {
  return (
    <main className="relative flex flex-col gap-4 h-auto w-full px-12 py-12 overflow-y-scroll">
      <div className="flex h-max gap-4 pb-4 items-center border-b-4 border-neutral-700">
        <Link
          href='/motores'
          className="opacity-80 hover:opacity-100 hover:animate-pulse hover:text-amber-600 text-lg pr-4"
        >{arrowLeft}</Link>
        <h1 className="font-medium text-3xl">Detalle de Motor</h1>
      </div>
      <Suspense key={params.id} fallback={<h4>cargando</h4>}>
        <DisplayMotor
          id={params.id}
        ></DisplayMotor>
      </Suspense>
    </main>
  )
}