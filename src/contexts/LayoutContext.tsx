import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type LayoutContextData = {
  toggleHeightAsideMobile: () => void,
  heightAsideMobile?: any,
};

type LayoutProviderProps = {
  children: ReactNode;
};

export const LayoutContext = createContext({} as LayoutContextData);

export function LayoutProvider({children}: LayoutProviderProps ) {
  const [heightAsideMobile, setHeightAsideMobile] = useState('0');

  function toggleHeightAsideMobile() {
    heightAsideMobile === '100%' 
    ? setHeightAsideMobile('0') 
    : setHeightAsideMobile('100%')
  }

  return(
    <LayoutContext.Provider
      value={{
        toggleHeightAsideMobile,
        heightAsideMobile
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}

export const useLayout = () => useContext(LayoutContext);