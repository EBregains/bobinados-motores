import Search from "../components/Search";
import { magnifying_glass } from "../utils/icons";
import Table from "../components/motores/Table";
import Pagination from "../components/motores/Pagination";
import { Suspense } from "react";

export default function MotoresPage({
  searchParams
} : {
  searchParams?: {
    query?: string,
    page?: string,
  }
}) {

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return <div 
    className="flex flex-col gap-4 h-full w-full px-8 py-6 border-2 border-solid border-zinc-800 rounded-2xl"
  >
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
    <Suspense>
      <Table 
        query=""
        currentPage={currentPage}
      />
    </Suspense>
    <Pagination 
     totalPages={9}
    />
  </div>;
}