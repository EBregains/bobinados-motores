'use client'

import TablaBobinas from "@/app/components/motores/create/TablaBobinas";
import { crearMotor } from "@/app/lib/actions";
import { getMotores } from "@/app/utils/fakeDB";
import { plus } from "@/app/utils/icons";

import React, { useState } from "react";

const MAX_BOBINAS = 3;

export default function AddMotorForm() {

  const [cantBobinas, setCantBobinas] = useState(1)

  const AddBobina = () => {
    setCantBobinas((prev) => (prev+1))
  }

  // TODO === SERVER ACTION 
  const dispatch = ""
  // TODO === USE FORM STATUS;
  const pending = true;

  let inputClass = "peer inline-block cursor-pointer rounded-md border border-gray-200 py-1 pl-4 text-sm outline-2 placeholder:text-gray-500 text-stone-800 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-amber-600"

  return (
    <form action={crearMotor} className="h-full">
      <section className="flex pr-0 flex-col items-center h-auto w-full border-b-2 border-neutral-700 p-6 pt-4 md:flex-row">
        <h2 className="w-48 my-4 self-start text-medium text-xl lg:w-1/3 lg:text-center">Datos Generales</h2>
        <div className="flex flex-col gap-2 gap-x-4">
          {/* MARCA FIELD */}
          <div className="w-72">
            <label htmlFor="marca" className="block text-sm font-light">Marca</label>
            <input type="text" name="marca" id="marca" className={`${inputClass} w-[256px]`} placeholder="Marca"/>
          </div>
          <div>
            {/* POTENCIA FIELD */}
            <div className="inline-block w-[136px]">
              <label htmlFor="potencia" className="block text-sm font-light">Potencia</label>
              <input type="number" name="potencia" id="potencia" className={`${inputClass} w-[108px]`} placeholder="Numero"/>
              <p className="inline-block pl-2 text-stone-500 text-sm">Hp</p>
            </div>
            {/* {CONDENSADOR FIELD } */}
            <div className="inline-block w-[136px] ml-3">
              <label htmlFor="condensador" className="block text-sm font-light">Condensador</label>
              <input type="number" name="condensador" id="condensador" className={`${inputClass} w-[108px]`} placeholder="Numero"/>
              <p className="inline-block pl-2 text-stone-500 text-sm">µF</p>
            </div>
          </div>
          <div>
            {/* NUM POLOS */}
            <div className="inline-block w-[136px]">
              <label htmlFor="num-polos" className="block text-sm font-light">Polos</label>
              <input type="number" name="num-polos" id="num-polos" className={`${inputClass} w-[108px]`} placeholder="Numero"/>
              <p className="inline-block pl-2 text-stone-500 text-sm">N°</p>
            </div>
            {/* NUM RANURAS */}
            <div className="inline-block w-[136px] ml-3">
              <label htmlFor="num-ranuras" className="block text-sm font-light">Ranuras</label>
              <input type="number" name="num-ranuras" id="num-ranuras" className={`${inputClass} w-[108px]`} placeholder="Numero"/>
              <p className="inline-block pl-2 text-stone-500 text-sm">N°</p>
            </div>
          </div>
          <fieldset>
          <legend className="block text-sm font-light mb-1">
            Tipo
          </legend>
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="monofasico"
                  name="tipo"
                  type="radio"
                  value="monofasico"
                  className="peer hidden"
                  aria-describedby='status-error'
                  defaultChecked
                />
                <label
                  htmlFor="monofasico"
                  className="peer-checked:bg-amber-700 flex cursor-pointer items-center gap-1.5 rounded-full bg-neutral-600 px-3 py-1.5 text-xs font-medium text-gray-100"
                >
                  Monofasico
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="trifasico"
                  name="tipo"
                  type="radio"
                  value="trifasico"
                  className="peer hidden"
                  aria-describedby='status-error'
                />
                <label
                  htmlFor="trifasico"
                  className="peer-checked:bg-amber-700 flex cursor-pointer items-center gap-1.5 rounded-full bg-neutral-600 px-3 py-1.5 text-xs font-medium text-gray-100"
                >
                  Trifasico
                </label>
              </div>
            </div>
          </fieldset>
        </div>
      </section>
      <section className="flex flex-col pr-0  items-center h-auto w-full border-b-2 border-neutral-700 p-6 pt-4 md:flex-row">
        <h2 className="w-48 my-4 self-start text-medium text-xl lg:w-1/3 lg:text-center">Estator</h2>
        <div className="flex flex-col gap-2 gap-x-4">
          <div>
            {/* DIAMETRO */}
            <div className="inline-block w-[136px]">
              <label htmlFor="diametro" className="block text-sm font-light">Diametro</label>
              <input type="number" name="diametro" id="diametro" className={`${inputClass} w-[100px]`} placeholder="⌀"/>
              <p className="inline-block pl-2 text-stone-500 text-sm">mm</p>
            </div>
            {/* LARGO */}
            <div className="inline-block w-[136px] ml-3">
              <label htmlFor="largo" className="block text-sm font-light">Largo</label>
              <input type="number" name="largo" id="largo" className={`${inputClass} w-[100px]`} placeholder="Numero"/>
              <p className="inline-block pl-2 text-stone-500 text-sm">mm</p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col pr-0  items-center h-auto w-full border-b-2 border-neutral-700 p-6 pt-4 md:flex-row">
        <h2 className="w-48 my-4 self-start text-medium text-xl lg:w-1/3 lg:text-center">Bobinas</h2>
        <div className="flex gap-1 gap-x-4 overflow-x-scroll">
          {/* BOBINA 1 */}
          {[...Array(cantBobinas)].map((x, i) => (
              <TablaBobinas bobinaID={i} key={i}/>
          ))}
          { cantBobinas < MAX_BOBINAS &&
            <AddBobinaButton addBobina={AddBobina}/>
          }
        </div>
      </section>
      <section className="flex flex-col pr-0  items-center h-auto w-full border-b-2 border-neutral-700 p-6 pt-4 md:flex-row">
        <h2 className="w-48 my-4 self-start text-medium text-xl lg:w-1/3 lg:text-center">Molde</h2>
        <div className="flex flex-col gap-2 gap-x-4">
          {/* BOBINA 1 */}
            <fieldset>
              <legend className="block text-sm font-light">
                Separacion
              </legend>
              <div className="flex gap-4 mt-1">
                <div className="flex items-center">
                  <input
                    id="interior"
                    name="separacion"
                    type="radio"
                    value="interior"
                    className="peer hidden"
                    aria-describedby='status-error'
                    defaultChecked
                  />
                  <label
                    htmlFor="interior"
                    className="peer-checked:bg-amber-700 flex cursor-pointer items-center gap-1.5 rounded-full bg-neutral-600 px-3 py-1.5 text-xs font-medium text-gray-100"
                  >
                    Interior
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="exterior"
                    name="separacion"
                    type="radio"
                    value="exterior"
                    className="peer hidden"
                    aria-describedby='status-error'
                  />
                  <label
                    htmlFor="exterior"
                    className="peer-checked:bg-amber-700 flex cursor-pointer items-center gap-1.5 rounded-full bg-neutral-600 px-3 py-1.5 text-xs font-medium text-gray-100"
                  >
                    Exterior
                  </label>
                </div>
              </div>
            </fieldset>
            <div>
              <div className="inline-block w-[136px]">
                <label htmlFor="largo" className="block text-sm font-light">Largo</label>
                <input type="number" name="largo" id="largo" className={`${inputClass} mt-1 w-[100px]`} placeholder="Numero"/>
                <p className="inline-block pl-2 text-stone-500 text-sm">mm</p>
              </div>
              <div className="inline-block w-[136px] ml-3">
                <label htmlFor="ancho" className="block text-sm font-light">Ancho</label>
                <input type="number" name="ancho" id="ancho" className={`${inputClass}  w-[100px]`} placeholder="Numero"/>
                <p className="inline-block pl-2 text-stone-500 text-sm">mm</p>
              </div>
            </div>
        </div>
      </section>
      <div className="flex justify-center w-full p-4">
        <button className="bg-amber-600 flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 font-medium text-base text-gray-100 hover:bg-amber-700 hover:text-gray-200">Agregar</button>
      </div>
    </form>
  )
}

export function AddBobinaButton( { addBobina }: {addBobina: () => void}) {
  return (
    <button 
      type="button"
      className="peer w-48 cursor-pointer rounded-lg text-sm py-0 pl-0 text-center inline-block bg-neutral-900 text-neutral-700 border border-neutral-700 hover:bg-neutral-800"
      onClick={addBobina}>
        {plus}
    </button>
  )
}