import React from 'react';
import { createContext, useContext, useState } from 'react';
import { EtchElement } from '../classes/EtchElement';

export interface IEtchElementContextProps {
  elements: EtchElement[];
  selectedElements: EtchElement[];
}

const EtchElementContext = createContext<IEtchElementContextProps>({
  elements: [],
  selectedElements: [],
});

export interface IEtchElementProviderProps {}

export const EtchElementProvider: React.FunctionComponent<
  IEtchElementProviderProps
> = (props) => {
  const { children } = props;
  const [elements] = useState<EtchElement[]>([]);
  const [selectedElements] = useState<EtchElement[]>([]);
  return (
    <EtchElementContext.Provider value={{ elements, selectedElements }}>
      {children}
    </EtchElementContext.Provider>
  );
};

export const useEtchElementProvider = () => useContext(EtchElementContext);
