import { ViewMotor, EditMotor } from './Buttons';
import { FetchMotores } from '@/app/lib/data';
import { Motor } from '@/app/lib/definitions';


export default async function Table({
  query,
  currentPage,
} : {
  query: string,
  currentPage: number,
} ) {

  const motores = await FetchMotores();
  
  return (
    <div 
      className="w-full h-full "
    >
      <table className="table w-full">
        <thead>
          <tr className='border-b-4 border-zinc-800 font-medium text-neutral-500 hover:bg-neutral-800' >
            <th className="w-[5%] px-4 py-3" scope="col">N°</th>
            <th className="w-auto px-3 py-3 text-left" scope="col">Marca</th>
            <th className="w-[15%] px-3 py-3" scope="col">Potencia</th>
            <th className="w-[15%] px-3 py-3" scope="col">Ranuras</th>
            <th className="w-[15%] px-3 py-3" scope="col">Polos</th>
            <th className="w-[15%] px-3 py-3" scope="col">Diametro E.</th>
            <th className="w-[15%] px-3 py-3" scope="col">Largo E.</th>
            <th className="w-[6%] relative py-3 pr-3 font-normal"scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {motores && motores?.map((motor: Motor, i: number) => (
            <tr key={i+1+currentPage*10}
            className="group w-full border-b border-zinc-800 py-3 text-sm last-of-type:border-b-4 hover:bg-neutral-800
            ">
              <th scope="row"
                className="whitespace-nowrap py-3 text-center text-zinc-600"
              >
                {i + 1 + (currentPage-1)*10}
              </th>
              <td className="whitespace-nowrap py-3 px-3 text-left">
                <p>{motor.motor.marca}</p>
              </td>
              <td className="whitespace-nowrap py-3 text-center">
                <p>{motor.motor.potencia} <span className='text-neutral-600'>{motor.motor.unidad_potencia}</span></p>
              </td>
              <td className="whitespace-nowrap py-3 text-center">
                <p>{motor.motor.num_ranuras}</p>
              </td>
              <td className="whitespace-nowrap py-3 text-center">
                <p>{motor.motor.num_polos}</p>
              </td>
              <td className="whitespace-nowrap py-3 text-center">
                <p>{motor.estator.diametro} <span className='text-neutral-600'>mm</span></p>
              </td>
              <td className="whitespace-nowrap py-3 text-center">
                <p>{motor.estator.largo} <span className='text-neutral-600'>mm</span></p>
              </td>
              <td className="whitespace-nowrap py-1 text-center">
                <div className='hidden group-hover:flex'>
                  {/* TODO === PUT REAL ID */}
                  <ViewMotor 
                    id={motor._id}
                  />
                </div>
              </td>
            </tr>
          ))}   
        </tbody>
      </table>
      {motores?.length < 1 && 
      <div className='flex w-full justify-center h-40 items-center'>
        <h4>No se encontraron resultados.</h4>
      </div>
      }
    </div>
  )
}
