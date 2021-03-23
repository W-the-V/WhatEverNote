import React, { createContext, useContext, useState } from 'react';

export const SplashContext = createContext();
export const useSplash = () => useContext(SplashContext);

export default function SplashProvider({ children }) {
  const [quote, setQuote] = useState('forbes');
 

  return (
    <SplashContext.Provider
      value={{
        quote,
        setQuote
      }}
    >
      {children}
    </SplashContext.Provider>
  );
}
