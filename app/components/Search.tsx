'use client'

import styled from "styled-components"
import { useGlobalState } from "@/app/context/globalProvider"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

  const { theme } = useGlobalState();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  // TODO:: Use a debouncer if this works
  const handleSearch = (term: string) => {

    console.log(term);
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');  // So if the search query changes goes back to page 1
    if (term)
      params.set(attribute, term);
    else
      params.delete(attribute);

    replace(`${pathname}?${params.toString()}`); // Dynamicly changes de URL without refreshing the whole page 
  }

  return (
    <SearchStyled theme={theme}>
      <label 
        className="label"
        htmlFor={attribute}>
        {labelText}
      </label>
      <input
        className="input"
        placeholder={placeholder}
        type={type}
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get(attribute)?.toString()}
      />
    </SearchStyled>
  )
}

const SearchStyled = styled.div`
  .label {
    padding-left: .5rem
  }
  .input {
    display: block;
    padding: .2rem;
    padding-left: .8rem;
    margin-top: 4px;
    background-color: transparent;
    border-radius: 12px;
    border: 1px solid ${(props) => props.theme.borderColor2};
    background-color: ${(props) => props.theme.colorBg}; 
    color: ${(props) => props.theme.colorFontPrimary};
  }
`