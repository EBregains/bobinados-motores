
import AddMotorForm from "@/app/components/motores/create/CreateForm";
import { arrowLeft } from "@/app/utils/icons";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: 'Añadir motor',
};

export default function CreateMotorPage() {
  return (
    <main className="relative flex flex-col h-full w-full px-12 py-12 rounded-2xl overflow-y-scroll ">
      <div className="flex h-max gap-4 pb-4 items-center border-b-4 border-neutral-700">
        <Link
          href='/motores'
          className="opacity-80 hover:opacity-100 hover:animate-pulse hover:text-amber-600 text-lg pr-4"
        >{arrowLeft}</Link>
        <h1 className="font-medium text-3xl">Añadir motor</h1>
      </div>
      <AddMotorForm />
    </main>
  )
}