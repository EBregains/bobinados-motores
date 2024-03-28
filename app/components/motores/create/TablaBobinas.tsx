'use client'

import { plus } from "@/app/utils/icons";
import React, { useState } from "react";

const MAX_INSTRUCCIONES=8;
const MAX_ALAMBRES=3;

export default function TablaBobinas({ bobinaID } : { bobinaID: number}) {

  const [alambres, setAlambres] = useState([ 0, ]);
  const [instrucciones, setInstrucciones]  = useState([ { pasos: 0, vueltas: 0}, ]);
 
  const AddAlambre = () => {
    setAlambres((prev) => [...prev, 0])
  }

  const AddInstruccion = () => {
    setInstrucciones((prev) => [...prev, { pasos: 0, vueltas: 0}])
  }

  return (
    <div className="w-auto h-max rounded-xl p-3 bg-neutral-800" key={bobinaID}>
      <fieldset id={`bobina-${bobinaID}`} className="border-b border-neutral-600">
        <legend className="inline-block text-sm font-light">Alambres</legend>
        <div className=" flex items-center w-44 gap-2 mb-2">
          {/* INPUT DE ALAMBRES */}
          {alambres.map((alambre, i) => (
            <input key={`${bobinaID}${i}-a`} type="number" name={`${bobinaID}-alambre-${i}`} min="1" max="5" step="0.05" className={`peer inline-block cursor-pointer rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500 text-stone-800 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-amber-600 text-center py-0 pl-0 w-[50px]`} placeholder="⌀ mm" defaultValue={0}/>
          ))}
          {alambres.length < MAX_ALAMBRES && 
            <AddAlambreButton addAlambre={AddAlambre}/>
          }
        </div>
      </fieldset>
      <div className="flex justify-around py-1">
        <h4 className="block text-sm text-center font-light">Pasos</h4>
        <h4 className="block text-sm text-center font-light">Vueltas</h4>
      </div>
      {instrucciones.map((instruccion, i) => (
        <div className="flex justify-around pb-1 hover:bg-neutral-700 rounded-md">
            <input key={`${bobinaID}${i}-b`} type="number" name={`${bobinaID}-paso-${i}`} className={`peer cursor-pointer text-sm placeholder:text-neutral-500 bg-transparent text-gray-200 focus:outline-none focus:border-b-2 focus:border-amber-600 text-center py-0 pl-0 inline-block w-[30px]`} placeholder="0" defaultValue={0}/>
            <input key={`${bobinaID}${i}-c`} type="number" name={`${bobinaID}-vueltas-${i}`} className="peer cursor-pointer text-sm placeholder:text-neutral-500 bg-transparent text-gray-200 focus:outline-none focus:border-b-2 focus:border-amber-600 text-center py-0 pl-0 inline-block w-[30px]" defaultValue={0}/>
        </div>
      ))}
      {instrucciones.length < MAX_INSTRUCCIONES && 
        <AddInstruccionButton addInstruccion={AddInstruccion}/>
      }
    </div>
  )
}

function AddAlambreButton({ addAlambre } : { addAlambre: () => void}) {
  return (
    <button 
      type="button"
      className="peer cursor-pointer rounded-md text-sm py-0 pl-0 text-center inline-block bg-neutral-900 text-neutral-700 border border-neutral-700 hover:bg-neutral-800 w-[30px]"
      onClick={addAlambre}>
      {plus}
    </button>
  )
}

function AddInstruccionButton({ addInstruccion } : { addInstruccion: () => void}) {
  return (
    <button 
      type="button"
      className="peer w-full cursor-pointer rounded-md text-sm py-0 pl-0 text-center inline-block bg-neutral-900 text-neutral-700 border border-neutral-700 hover:bg-neutral-800"
      onClick={addInstruccion}>
      {plus}
    </button>
  )
}