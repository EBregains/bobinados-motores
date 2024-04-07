import Search from "../components/Search";
import { magnifying_glass } from "../utils/icons";
import Table from "../components/motores/Table";
import Pagination from "../components/motores/Pagination";
import { Suspense } from "react";
import { MotoresTableSkeleton } from "../components/Skeletons";
import { AddMotor } from "../components/motores/Buttons";
import { Metadata } from "next";
import { FetchMotores } from "../lib/data";


export const metadata: Metadata = {
  title: 'Lista de Motores',
};

export default async function MotoresPage({
  searchParams
} : {
  searchParams?: {
    marca?: string,
    potencia?: string,
    num_ranuras?: string,
    page?: string,
  }
}) {

  const query = `
    ${searchParams?.marca || ''}&
    ${searchParams?.potencia || ''}&
    ${searchParams?.num_ranuras || ''}&
  `;

  const currentPage = Number(searchParams?.page) || 1;

  return <main className="relative flex flex-col gap-4 h-auto w-full px-12 py-12 overflow-y-scroll">
    <div>
      <div 
        className="relative flex gap-[1rem] w-full items-end "
      >
        <Search
          attribute="marca"
          placeholder="Ingrese una marca..."
          labelText="Marca" 
        />
        <Search
          attribute="num_ranuras"
          placeholder="Ingrese un n°..."
          labelText="N° Ranuras"
          type="number"
        />
        <Search
          attribute="potencia"
          placeholder="Ingrese potencia..."
          labelText="Potencia"
          type="number"
        />
        <div className="pb-1">
        {magnifying_glass}
        </div>
      </div>
    </div>
    <Suspense key={query + currentPage} fallback={<MotoresTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
    </Suspense>
    <Pagination 
     totalPages={9}
    />
    <div className="absolute top-8 right-10">
      <AddMotor/>
    </div>
    
  </main>;
}