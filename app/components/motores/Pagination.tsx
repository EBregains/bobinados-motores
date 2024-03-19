"use client"

import { generatePageNumbers } from "@/app/utils/functions";
import { caretLeft, caretRight } from "@/app/utils/icons";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ 
  totalPages
} : {
  totalPages: number;
}) {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  // To be used on Page Change for hrefs
  const createPageURL = (pageNumber : number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`
  }

  const paginationNumbers = generatePageNumbers(currentPage, totalPages);
  
  return (
    <div className="flex self-center place-self-end gap-2">
      <PageArrow
        direction="left"
        isDisabled={currentPage <= 1}
        href={createPageURL(currentPage - 1)} 
      />
      <div className="flex -space-x-px">
        {paginationNumbers.map((page, index) => {
          let position: 'first' | 'last' | 'single' | 'middle' | undefined;

          if (index === 0) position = 'first';
          if (index === paginationNumbers.length - 1) position = 'last';
          if (paginationNumbers.length === 1) position = 'single';
          if (page === '...') position = 'middle';

          return (
            <PageNumber
              key={index}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          );
        })}
      </div>
      <PageArrow
        direction="right"
        isDisabled={currentPage >= totalPages}
        href={createPageURL(currentPage + 1)} 
      />
    </div>
  )
}

function PageArrow({
  direction,
  isDisabled,
  href
} : {
  direction: 'right' | 'left',
  isDisabled?: boolean,
  href: string
}) {

  const icon = direction === 'left' ? caretLeft : caretRight;

  return isDisabled ? (
    <div 
      className="flex h-10 w-10 bg-neutral-900 items-center justify-center rounded-md border border-neutral-800 pointer-events-none text-neutral-700"
    >{icon}</div>
  ) : (
    <Link
      className="flex h-10 w-10 bg-neutral-800 items-center justify-center rounded-md border border-neutral-700 hover:bg-gray-100 hover:text-gray-700"
      href={href}
    >
      {icon}
    </Link>
  )
  
}

function PageNumber({  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center text-sm border border-neutral-800 bg-neutral-900',
    {
      'rounded-l-md': position === 'first' || position === 'single',
      'rounded-r-md': position === 'last' || position === 'single',
      'z-10 bg-zinc-800 border-b-4 border-b-amber-600 text-white': isActive,
      'hover:bg-neutral-800 hover:text': !isActive && position !== 'middle',
      'text-gray-300': position === 'middle',
    },
  );

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}