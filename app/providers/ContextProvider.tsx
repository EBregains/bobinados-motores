"use client"

import React, { useEffect, useState } from "react"
import { GlobalProvider } from "@/app/context/globalProvider";

interface Props {
  children: React.ReactNode;
}

function ContextProvider({children}: Props) {

  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 10);
  }, []);

  if (!isReady)
    return null;

  return <GlobalProvider>{children}</GlobalProvider>
}

export default ContextProvider;