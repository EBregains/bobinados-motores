export function TableRowSkeleton() {
  return (
    <tr className="group w-full border-b border-zinc-800 py-3 text-sm last-of-type:border-b-4 hover:bg-neutral-800">
      {/* Customer Name and Image */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-6 rounded-full bg-neutral-700 animate-pulse">
        </div>
      </td>
      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-36 rounded bg-neutral-700 animate-pulse"></div>
      </td>
      {/* Amount */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 rounded bg-neutral-700 animate-pulse"></div>
      </td>
      {/* Date */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 rounded bg-neutral-700 animate-pulse"></div>
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap py-1 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-9 w-9 rounded-full bg-neutral-700 animate-pulse"></div>
          <div className="h-9 w-9 rounded-full bg-neutral-700 animate-pulse"></div>
        </div>
      </td>
    </tr>
  );
}

export function MotoresTableSkeleton() {
  return (
    <div 
      className="w-full h-full overflow-hidden flow-root"
    >
    <table className="table w-full">
        <thead>
          <tr className='border-b-4 border-zinc-800 font-medium text-neutral-500 hover:bg-neutral-800' >
            <th className="w-[5%] px-4 py-3" scope="col">N°</th>
            <th className="w-auto px-3 py-3 text-left" scope="col">Marca</th>
            <th className="w-[15%] px-3 py-3" scope="col">N Ranuras</th>
            <th className="w-[15%] px-3 py-3" scope="col">Potencia</th>
            <th className="w-[5%] relative py-3 pr-3 font-normal"scope="col">Opciones</th>
          </tr>
        </thead>
    <tbody>
      <TableRowSkeleton />
      <TableRowSkeleton />
      <TableRowSkeleton />
      <TableRowSkeleton />
      <TableRowSkeleton />
      <TableRowSkeleton />
    </tbody>
  </table>
  </div>
  )
}