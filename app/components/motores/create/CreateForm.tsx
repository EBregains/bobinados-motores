'use client'

import { minus, plus, spinner } from "@/app/utils/icons";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

const MAX_BOBINAS = 3;
const MAX_ALAMBRES = 3;
const MAX_INSTRUCCIONES = 8;

export default function AddMotorForm() {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    motor: {
      titulo: "",
      marca: "",
      potencia: "",
      unidad_potencia: "",
      condensador: "",
      num_polos: "",
      num_ranuras: "",
      tipo: "monofasico"
    },
    conexion: {
      a_linea: "",
      entre_polos: "",
      disposicion: "",
      resistencia_bornes: "",
      cant_alambre: "",
    },
    bobinas: [
      {
        tipo: "trabajo",
        alambres: [""],
        instrucciones: [
          {pasos:"", vueltas:""}
        ]
      },
    ],
    estator: {
      largo: "",
      diametro: "",
    },
    molde: {
      tamanho: "",
      separacion: {
        tipo: "",
        ancho: "",
        largo: ""
      }
    },
    extras: {
      observaciones: "",
    }
  })

  // CSS ONLY
  let inputClass = "peer inline-block cursor-pointer rounded-md border border-gray-200 py-1 pl-4 text-sm outline-2 placeholder:text-gray-500 text-stone-800 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-amber-600"

  // ADD AND REMOVE FUNCTIONS
  const AddBobina = () => {
    let newBobina = formData.bobinas
    newBobina.push({
      tipo: "trabajo",
      alambres: [],
      instrucciones: [{
        pasos: "",
        vueltas: "",
      }]
    })
    setFormData((prev) => ({
      ...prev,
      bobinas: newBobina
    }))
  }
  const RemoveBobina = () => {
    let newBobinas = formData.bobinas
    newBobinas.pop();
    setFormData((prev) => ({
      ...prev,
      bobinas: newBobinas
    }))
  }
  function AddInstruccion(bobina_i: number) {
    let newBobinas = formData.bobinas;
    newBobinas[bobina_i].instrucciones.push({ pasos: "", vueltas: ""});
    setFormData((prev) => ({
      ...prev,
      bobinas: newBobinas
    }))
  }
  function RemoveInstruccion(bobina_i: number) {
    let newBobinas = formData.bobinas;
    newBobinas[bobina_i].instrucciones.pop();
    setFormData((prev) => ({
      ...prev,
      bobinas: newBobinas
    }))
  }
  function AddAlambre(bobina_i: number) {
    let newBobinas = formData.bobinas;
    newBobinas[bobina_i].alambres.push("");
    setFormData((prev) => ({
      ...prev,
      bobinas: newBobinas
    }))
  }
  function RemoveAlambre(bobina_i: number) {
    let newBobinas = formData.bobinas;
    newBobinas[bobina_i].alambres.pop();
    setFormData((prev) => ({
      ...prev,
      bobinas: newBobinas
    }))
  }

  // HANDLING FUNCTIONS
  function handleChangeMotor(e: any) {
    let name = e.target.name;
    let value = e.target.value;

    let newMotor = formData.motor;
    //@ts-ignore
    newMotor[name] = value;

    setFormData((prev) => ({
      ...prev,
      motor: newMotor
    }))
  }
  function handleChangeConexion(e: any) {
    let name = e.target.name;
    let value = e.target.value;

    let newConexion = formData.conexion;
    //@ts-ignore
    newConexion[name] = value;

    setFormData((prev) => ({
      ...prev,
      conexion: newConexion
    }))

    console.log(formData.conexion);
    
  }
  function handleChangeEstator(e: React.ChangeEvent<HTMLInputElement>) {
    let name = e.target.name;
    let value = e.target.value;

    let newEstator = formData.estator;
    //@ts-ignore
    newEstator[name] = value;

    setFormData((prev) => ({
      ...prev,
      estator: newEstator
    }))
  }
  function handleChangeAlambres(e: React.ChangeEvent<HTMLInputElement>, bobina_i: number, alambre_i: number) {
    let value = e.target.value;

    let newBobinas = formData.bobinas;
    //@ts-ignore
    newBobinas[bobina_i].alambres[alambre_i] = value;

    setFormData((prev) => ({
      ...prev,
      bobinas: newBobinas
    }))
  }
  function handleChangeInstruccion(e: React.ChangeEvent<HTMLInputElement>, bobina_i: number, instruccion_i: number) {
    let name = e.target.name;
    let value = e.target.value;

    let newBobinas = formData.bobinas;
    //@ts-ignore
    newBobinas[bobina_i].instrucciones[instruccion_i][name] = value;

    setFormData((prev) => ({
      ...prev,
      bobinas: newBobinas
    }))
  }
  function handleChangeBobina(e: React.ChangeEvent<HTMLSelectElement>, bobina_i: number) {
    let value = e.target.value;

    let newBobinas = formData.bobinas;
    //@ts-ignore
    newBobinas[bobina_i].tipo = value;

    setFormData((prev) => ({
      ...prev,
      bobinas: newBobinas
    }))
    console.log(newBobinas[bobina_i]);
    
  }
  function handleChangeMolde(e: React.ChangeEvent<HTMLInputElement>) {
    let name = e.target.name;
    let value = e.target.value;

    let newMolde = formData.molde;
    if (name === "tamanho") {
      newMolde[name] = value;
    } else if ( name === "mtipo" ) {
      newMolde.separacion.tipo = value
    } else {
      //@ts-expect-error
      newMolde.separacion[name] = value 
    }
    setFormData((prev) => ({
      ...prev,
      molde: newMolde
    }))
  }
  function handleChangeExtras(e: React.ChangeEvent<HTMLTextAreaElement>) {
    let name = e.target.name;
    let value = e.target.value;

    let newExtras = formData.extras;
    //@ts-ignore
    newExtras[name] = value;

    setFormData((prev) => ({
      ...prev,
      extras: newExtras
    }))
  }

  // SUBMIT EVENT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await fetch('/api/motores', 
    {
      method: "POST",
      body: JSON.stringify({formData}),
      //@ts-expect-error
      "Content-Type": "application/json"
    })

    if (!res.ok) 
      throw new Error("Failed to create Motor.")

    router.refresh()
    router.push("/motores")
  }

  return (
    <form method="POST" onSubmit={handleSubmit} className="h-full">
      <section className="flex pr-0 flex-col items-center h-auto w-full border-b-2 border-neutral-700 p-6 pt-4 md:flex-row">
        <h2 className="w-48 my-4 self-start text-medium text-xl lg:w-1/3 lg:text-center">Datos Generales</h2>
        <div className="flex flex-col gap-2 gap-x-4 my-3">
          {/* TITULO FIELD */}
          <div className="w-72">
            <label htmlFor="titulo" className="block text-sm font-light">Titulo</label>
            <input onChange={handleChangeMotor} type="text" name="titulo" id="titulo" value={formData.motor.titulo} className={`${inputClass} w-[256px]`} placeholder="Titulo"/>
          </div>
          {/* MARCA FIELD */}
          <div className="w-72">
            <label htmlFor="marca" className="block text-sm font-light">Marca</label>
            <input required onChange={handleChangeMotor} type="text" name="marca" id="marca" value={formData.motor.marca} className={`${inputClass} w-[256px]`} placeholder="Marca"/>
          </div>
          {/* TIPO */}
          <fieldset>
          <legend className="block text-sm font-light mb-1">
            Tipo
          </legend>
            <div className="flex gap-4">
              <div className="flex items-center">
                <input required
                  id="monofasico"
                  onChange={handleChangeMotor}
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
                <input required
                  id="trifasico"
                  onChange={handleChangeMotor}
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
          <div>
            {/* NUM POLOS */}
            <div className="inline-block w-[136px]">
              <label htmlFor="num_polos" className="block text-sm font-light">Polos</label>
              <input required onChange={handleChangeMotor} type="number" name="num_polos" id="num_polos" value={formData.motor.num_polos} className={`${inputClass} w-[108px]`} placeholder="Numero"/>
              <p className="inline-block pl-2 text-stone-500 text-sm">N°</p>
            </div>
            {/* NUM RANURAS */}
            <div className="inline-block w-[136px] ml-3">
              <label htmlFor="num-ranuras" className="block text-sm font-light">Ranuras</label>
              <input required onChange={handleChangeMotor} type="number" name="num_ranuras" id="num-ranuras" value={formData.motor.num_ranuras} className={`${inputClass} w-[108px]`} placeholder="Numero"/>
              <p className="inline-block pl-2 text-stone-500 text-sm">N°</p>
            </div>
          </div>
          <div>
            {/* POTENCIA FIELD */}
            <div className="inline-block w-[136px]">
              <label htmlFor="potencia" className="block text-sm font-light">Potencia</label>
              <input required onChange={handleChangeMotor} type="text" name="potencia" id="potencia" value={formData.motor.potencia} className={`${inputClass} w-14 rounded-e-none`} placeholder="N°"/>
              <select required defaultValue={""} onChange={handleChangeMotor} name="unidad_potencia" className="inline-block cursor-pointer w-16 bg-neutral-600 text-xs py-1 pl-1 rounded-e-lg border-neutral-600 border-2">
                <option value="HP">HP</option>
                <option value="CV">CV</option>
                <option value="WATT">WATT</option>
                <option value="WATT">AMP</option>
              </select>
            </div>
            {/* {CONDENSADOR FIELD } */}
            {formData.motor.tipo === "monofasico" &&
              <div className="inline-block w-[136px] ml-3">
                <label htmlFor="condensador" className="block text-sm font-light disabled:hidden">Condensador</label>
                <input required onChange={handleChangeMotor} type="number" name="condensador" id="condensador" value={formData.motor.condensador} className={`${inputClass} w-[108px]`} placeholder="Numero"/>
                <p className="inline-block pl-2 text-stone-500 text-sm">µF</p>
              </div>
            }
          </div>
        </div>
      </section>
      { formData.motor.tipo === "trifasico" &&
      <section className="flex pr-0 flex-col items-center h-auto w-full border-b-2 border-neutral-700 p-6 pt-4 md:flex-row">
        <h2 className="w-48 my-4 self-start text-medium text-xl lg:w-1/3 lg:text-center">Conexion</h2>
        <div className="w-72 flex flex-col gap-2 gap-x-4 my-3">
          <div>
            <label htmlFor="a_linea" className="block text-sm font-light">A linea</label>
            <select required defaultValue={""} onChange={handleChangeConexion} className="w-64 cursor-pointer inline-block bg-transparent text-base py-1 border-neutral-600 border-b "  name="a_linea" id="a_linea">
              <option value="" disabled>Seleccione Tipo...</option>
              <option className="text-neutral-900 text-base" value="estrella">Estrella</option>
              <option className="text-neutral-900 text-base" value="estrella doble">Estrella Doble</option>
              <option className="text-neutral-900 text-base" value="triangulo">Triangulo</option>  
              <option className="text-neutral-900 text-base" value="triangulo doble">Triangulo Doble</option>
            </select>
          </div>
          <div>
            <label htmlFor="entre_polos" className="block text-sm font-light">Entre Polos</label>
            <select required defaultValue={""} onChange={handleChangeConexion} className="w-64 cursor-pointer inline-block bg-transparent text-base py-1 border-neutral-600 border-b "  name="entre_polos" id="entre_polos">
              <option value="" disabled>Seleccione Tipo...</option>
              <option className="text-neutral-900 text-base" value="serie">Serie</option>
              <option className="text-neutral-900 text-base" value="paralelos">Paralelos</option>
              <option className="text-neutral-900 text-base" value="consecuentes">Consecuentes</option>  
            </select>
          </div>
          <div>
            <label htmlFor="disposicion" className="block text-sm font-light">Disposicion</label>
            <select required defaultValue={""} onChange={handleChangeConexion} className="w-64 cursor-pointer inline-block bg-transparent text-base py-1 border-neutral-600 border-b "  name="disposicion" id="disposicion">
              <option value="" disabled>Seleccione Tipo...</option>   
              <option className="text-neutral-900 text-base" value="imbricados">Imbricados</option>
              <option className="text-neutral-900 text-base" value="dos planos">Dos Planos</option>
              <option className="text-neutral-900 text-base" value="tres planos">Tres Planos</option>  
              <option className="text-neutral-900 text-base" value="caracol">Caracol</option>  
            </select>
          </div>
          <div className="mt-2">
            {/* RESISTENCIA DE BORNES */}
            <div className="inline-block w-[136px]">
              <label htmlFor="resistencia_bornes" className="block text-sm font-light">Res. de Bornes</label>
              <input required onChange={handleChangeConexion} type="number" name="resistencia_bornes" id="resistencia_bornes" value={formData.conexion.resistencia_bornes} className={`${inputClass} w-[108px]`} placeholder="Numero"/>
              <p className="inline-block pl-2 text-stone-500 text-sm">Ω</p>
            </div>
            {/* CANT DE ALAMBRE */}
            <div className="inline-block w-[136px] ml-3">
              <label htmlFor="cant_alambre" className="block text-sm font-light">Cant. de Alambre</label>
              <input required onChange={handleChangeConexion} type="number" name="cant_alambre" id="cant_alambre" value={formData.conexion.cant_alambre} className={`${inputClass} w-[108px]`} placeholder="Numero"/>
              <p className="inline-block pl-2 text-stone-500 text-sm">Kg</p>
            </div>
          </div>
        </div>
      </section>
      }
      <section className="flex flex-col pr-0 items-center h-auto w-full border-b-2 border-neutral-700 p-6 pt-4 md:flex-row">
        <h2 className="w-48 my-4 self-start text-medium text-xl lg:w-1/3 lg:text-center">Estator</h2>
        <div className="flex flex-col gap-2 gap-x-4 my-3">
          <div>
            {/* DIAMETRO */}
            <div className="inline-block w-[144px]">
              <label htmlFor="diametro" className="block text-sm font-light">Diametro</label>
              <input required 
                onChange={handleChangeEstator} type="number" name="diametro" id="diametro" value={formData.estator.diametro} className={`${inputClass} w-[108px]`} placeholder="⌀"/>
              <p className="inline-block pl-2 text-stone-500 text-sm">mm</p>
            </div>
            {/* LARGO */}
            <div className="inline-block w-[144px] ml-1">
              <label htmlFor="largo" className="block text-sm font-light">Largo</label>
              <input required 
                onChange={handleChangeEstator} type="number" name="largo" id="largo-estator" value={formData.estator.largo} className={`${inputClass} w-[108px]`} placeholder="Numero"/>
              <p className="inline-block pl-2 text-stone-500 text-sm">mm</p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col pr-0 items-center h-auto w-full border-b-2 border-neutral-700 p-6 pt-4 md:flex-row">
        <h2 className="w-48 my-4 self-start text-medium text-xl lg:w-1/3 lg:text-center">Bobinas</h2>
        <div className="flex gap-1 gap-x-4 overflow-x-scroll">
          
          {/* BOBINA 1 */}
          {formData.bobinas.map((bobina, bobina_i) => (
              <div key={bobina_i} className="w-52 h-max rounded-xl px-3 pb-2 bg-neutral-800 my-3">
              { formData.motor.tipo === "monofasico" && 
              <div className="pt-2">
                <label htmlFor="bobina_tipo" className="text-sm pr-4 mt-3">Tipo:</label>
                <select required defaultValue={""} name="bobina_tipo" className="w-full cursor-pointer inline-block bg-neutral-600 text-sm py-1 rounded-lg border-neutral-600 border-2 " onChange={(e) => handleChangeBobina(e, bobina_i)}>
                  <option value="" disabled>Seleccione Tipo...</option>
                  <option value="trabajo">Trabajo</option>
                  <option value="arranque">Arranque</option>
                </select>
              </div>
              }
              <fieldset id={`bobina-`} className="border-b border-neutral-600 py-3">
                <div className="flex justify-between items-center mb-2">
                  <legend className="inline-block text-sm align-text-bottom w-auto font-light pb-[">Alambres</legend>
                  <div className="inline-flex w-max gap-1">
                    <BobinaButton 
                      OnClick={() => AddAlambre(bobina_i)}
                      disabled={bobina.alambres.length >= MAX_ALAMBRES}
                    >
                      {plus}
                    </BobinaButton>
                    <BobinaButton 
                      OnClick={() => RemoveAlambre(bobina_i)}
                      disabled={bobina.alambres.length <= 1}
                    >
                      {minus}
                    </BobinaButton>
                  </div>
                </div>
                <div className=" flex items-center w-44 gap-2 mb-3">
                  {/* INPUT DE ALAMBRES */}
                  {bobina.alambres.map((alambre, i) => (
                    <input required 
                      onChange={(e) => handleChangeAlambres(e, bobina_i, i)} key={i} type="number" name={`-alambre-${i}`} min="0" max="5" step="0.05" className={`peer inline-block cursor-pointer rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500 text-stone-800 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-amber-600 text-center py-1 pl-0 w-[50px]`} placeholder="⌀ mm" value={formData.bobinas[bobina_i].alambres[i]}/>
                  ))}
                </div>
              </fieldset>

              <div className="flex w-full">
                <div className="flex flex-col w-full">
                  <div className="flex justify-around py-1">
                    <h4 className="block text-sm text-center font-light">Pasos</h4>
                    <h4 className="block text-sm text-center font-light">Vueltas</h4>
                  </div>
                {bobina.instrucciones.map((instruccion, i) => (
                  <div key={i} className="flex justify-around pb-1 hover:bg-neutral-700 rounded-md">
                      <input required
                        onChange={(e) => handleChangeInstruccion(e, bobina_i, i)} type="number" name="pasos" className={`peer cursor-pointer text-sm placeholder:text-neutral-500 bg-transparent text-gray-200 focus:outline-none focus:border-b-2 focus:border-amber-600 text-center py-0 pl-0 inline-block w-[30px]`} placeholder="0" value={formData.bobinas[bobina_i].instrucciones[i].pasos}/>
                      <input required
                        onChange={(e) => handleChangeInstruccion(e, bobina_i, i)} type="number" name="vueltas" className="peer cursor-pointer text-sm placeholder:text-neutral-500 bg-transparent text-gray-200 focus:outline-none focus:border-b-2 focus:border-amber-600 text-center py-0 pl-0 inline-block w-[30px]" placeholder="0" value={formData.bobinas[bobina_i].instrucciones[i].vueltas}/>
                  </div>
                ))}
                </div>
                <div className="flex flex-col gap-1 justify-start mt-2">
                  <BobinaButton 
                    OnClick={() => RemoveInstruccion(bobina_i)}
                    disabled={bobina.instrucciones.length <= 1}
                  >
                    {minus}
                  </BobinaButton>
                  <BobinaButton 
                    OnClick={() => AddInstruccion(bobina_i)}
                    disabled={bobina.instrucciones.length >= MAX_INSTRUCCIONES}
                  >
                    {plus}
                  </BobinaButton>
                </div>
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-1 justify-center">
            <BobinaButton 
              OnClick={RemoveBobina}
              disabled={formData.bobinas.length <= 1}
            >
              {minus}
            </BobinaButton>
            <BobinaButton 
              OnClick={AddBobina}
              disabled={formData.bobinas.length >= MAX_BOBINAS}
            >
              {plus}
            </BobinaButton>
          </div>
        </div>
      </section>
      <section className="flex flex-col pr-0 items-center h-auto w-full border-b-2 border-neutral-700 p-6 pt-4 md:flex-row">
        <h2 className="w-48 my-4 self-start text-medium text-xl lg:w-1/3 lg:text-center">Molde</h2>
        <div className="flex flex-col gap-2 gap-x-4 my-3">
          <div className="inline-block w-[136px]">
            {/* <label htmlFor="tamanho" className="block text-sm font-light">Tamaño</label> */}
            <input required 
              onChange={handleChangeMolde}
              type="text" name="tamanho" id="tamanho" value={formData.molde.tamanho} className={`${inputClass} mt-1 w-[256px]`} placeholder="Ingrese tamaño"/>
          </div>
          <div>
            <div className="inline-block w-[144px]">
              <label htmlFor="ancho" className="block text-sm font-light">Ancho</label>
              <input required 
                onChange={handleChangeMolde} type="number" name="ancho" id="ancho" value={formData.molde.separacion.ancho} className={`${inputClass}  w-[108px]`} placeholder="Numero"/>
              <p className="inline-block pl-2 text-stone-500 text-sm">mm</p>
            </div>
            <div className="inline-block w-[144px] ml-1">
              <label htmlFor="largo" className="block text-sm font-light">Largo</label>
              <input required 
                onChange={handleChangeMolde}
                type="number" name="largo" id="largo" value={formData.molde.separacion.largo} className={`${inputClass} mt-1 w-[108px]`} placeholder="Numero"/>
              <p className="inline-block pl-2 text-stone-500 text-sm">mm</p>
            </div>
          </div>
          <fieldset>
            <legend className="sr-only block text-sm font-light">
              Separacion
            </legend>
            <div className="flex gap-4 mt-1">
              <div className="flex items-center">
                <input required
                  id="interior"
                  name="mtipo"
                  type="radio"
                  value="interior"
                  onChange={handleChangeMolde}
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
                <input required
                  id="exterior"
                  name="mtipo"
                  type="radio"
                  value="exterior"
                  onChange={handleChangeMolde}
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
        </div>
      </section>
      <section className="flex flex-col pr-0 items-center h-auto w-full border-b-2 border-neutral-700 p-6 pt-4 md:flex-row">
        <h2 className="w-48 my-4 self-start text-medium text-xl lg:w-1/3 lg:text-center">Extras</h2>
        <div className="flex flex-col gap-2 gap-x-4 my-3">
          <div className="w-72">
            <label htmlFor="marca" className="block text-sm font-light">Observaciones</label>
            <textarea onChange={(e) => handleChangeExtras(e)} value={formData.extras.observaciones} name="observaciones" className={`${inputClass} pl-0 w-[256px]`} placeholder="Ingrese texto..."></textarea>
          </div>
        </div>
      </section>
      <div className="flex justify-center w-full p-4">
        <button 
          type="submit"
          className="bg-amber-700 w-24 h-10 flex cursor-pointer items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 font-medium text-base text-gray-100 hover:animate-pulse hover:text-gray-200 disabled:bg-neutral-700 disabled:text-neutral-400"
          disabled={isLoading}
        >
          {isLoading ? <span className="animate-spin">{spinner}</span> : "Agregar"}
        </button>
      </div>
    </form>
  )
}

export function BobinaButton( 
  { OnClick, children, disabled }
: 
  {
    OnClick: () => void,
    children: React.ReactNode,
    disabled: boolean
  }) {
  return (
    <button 
      type="button"
      className="peer w-6 h-6 cursor-pointer rounded-lg text-sm py-0 pl-0 text-center block bg-neutral-900 text-neutral-700 border border-neutral-700 hover:bg-neutral-800 disabled:text-neutral-800 disabled:border-neutral-800"
      onClick={OnClick}
      disabled={disabled}>
        {children}
    </button>
  )
}

