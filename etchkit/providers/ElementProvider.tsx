import { createContext, Dispatch, useContext, useState } from 'react';
import EtchElement from '../classes/EtchElement';
import useAnimationFrame from '../hooks/AnimationFrame';
import { useInputProvider } from './InputProvider';

export interface ElementContextProps {
  temporaryElement: EtchElement;
  setTemporaryElement: Dispatch<React.SetStateAction<EtchElement>>;
  elements: EtchElement[];
}

const ElementContext = createContext<ElementContextProps>(null);

const ElementProvider = ({ children }) => {
  const [temporaryElement, setTemporaryElement] = useState<EtchElement>(null);
  const [elements, setElements] = useState<EtchElement[]>([]);
  const { isDown } = useInputProvider();
  useAnimationFrame(() => {
    if (temporaryElement && !isDown) {
      elements.push(temporaryElement);
      setTemporaryElement(null);
    }
  });
  return (
    <ElementContext.Provider
      value={{ temporaryElement, setTemporaryElement, elements }}
    >
      {children}
    </ElementContext.Provider>
  );
};

export default ElementProvider;

export const useElementProvider = () => useContext(ElementContext);
