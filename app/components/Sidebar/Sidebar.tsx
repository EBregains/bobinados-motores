"use client"

import React from "react";
import styled from "styled-components";
import { useGlobalState } from "@/app/context/globalProvider"
import menu from "@/app/utils/menu"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Krona_One } from "next/font/google";

const kronaOne = Krona_One({ 
  weight:["400"],
  subsets: ["latin"],
  variable: '--font-krona',
});

function Sidebar() {

  const { theme } = useGlobalState();
  const pathname = usePathname();

  return(
    <SidebarStyled theme={theme}>
      <div className="profile">
        <div className="profile-overlay"></div>
        <h1 style={kronaOne.style}>
          ODRIOZOLA
        </h1>
      </div>
      <ul className="nav-items">
        {menu.map(({link, title, icon}, i) => {
          const isActive = link === pathname;
          return <li
            className={`nav-item ${ isActive ? "active" : ""}`}
            key={i}
          >
            {icon}
            <Link href={link}>{title}</Link>
          </li>
        })
        }
      </ul>
      <button></button>
    </SidebarStyled>
  )
}

const SidebarStyled = styled.nav`
  position: relative;
  width: ${(props) => props.theme.sidebarWidth};
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  color: ${(props) => props.theme.colorGrey3};

  .profile {
    margin: 1.5rem;
    padding: 1rem .8rem;
    position: relative;

    border-radius: 1rem;
    cursor: pointer;

    font-weight: 500;
    color: ${(props) => props.theme.colorGrey0};

    display: flex;
    justify-content: center;

    h1 {
      font-size: 1.2rem;
      font-family: var(--font-krona);
      letter-spacing: -1px;
    }
  }

  .nav-item {
      position: relative;
      padding: 0.6rem 1.0rem;
      padding-left: 1.5rem;

      display: grid;
      grid-template-columns: 40px 1fr;
      cursor: pointer;

      &::after{
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
        background-color: ${(props) => props.theme.activeNavLinkHover};
        z-index: 1;
        transition: all 300ms ease-in-out;
      }

      &::before {
        position: absolute;
        content: "";
        top: 0;
        right: 0;
        width: 0%;
        height: 100%;
        background-color: ${(props) => props.theme.colorCopper};
      }
      
      a {
        font-weight: 500;
        transition: all 0.3s ease-in-out;
        z-index: 2;
      }

      i {
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${(props) => props.theme.colorIcons};
      }

      &:hover:not(.active) {
        &::after {
          width: 100%;
        }
      }
    }

  .active {
    background-color: ${(props) => props.theme.activeNavLink};

    i,
    a {
      color: ${(props) => props.theme.colorIcons2};
    }
  }

  .active::before {
    width: 0.3rem;
  }

  > button {
    margin: 1.5rem;
  }
`;

export default Sidebar