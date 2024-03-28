'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({
  placeholder,
  attribute,
  labelText,
  type = "text",
} : {
  placeholder: string,
  attribute: string,
  labelText: string,
  type?: 'number' | 'text',
}) {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  // TODO:: Use a debouncer if this works
  const handleSearch = useDebouncedCallback((term: string) => {

    const params = new URLSearchParams(searchParams);
    params.set('page', '1');  // So if the search query changes goes back to page 1
    if (term)
      params.set(attribute, term);
    else
      params.delete(attribute);

    replace(`${pathname}?${params.toString()}`); // Dynamicly changes de URL without refreshing the whole page 
  }, 400);

  return (
    <div>
      <label 
        className="block text-sm font-light"
        htmlFor={attribute}>
        {labelText}
      </label>
      <input
        className="peer inline-block w-full cursor-pointer rounded-md border border-gray-200 py-1 pl-4 text-sm outline-2 placeholder:text-gray-500 text-stone-800 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-amber-600"
        placeholder={placeholder}
        type={type}
        id={attribute}
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get(attribute)?.toString()}
      />
    </div>
  )
}
