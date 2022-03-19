import React from 'react';
import { EtchCanvasProvider } from './EtchCanvasProvider';
import { EtchInputProvider } from './EtchInputProvider';
import { EtchToolProvider } from './EtchToolProvider';

export interface IEtchProviderTrainProps {}

export const EtchProviderTrain: React.FunctionComponent<
  IEtchProviderTrainProps
> = (props) => {
  const { children } = props;

  return (
    <EtchCanvasProvider>
      <EtchInputProvider>
        <EtchToolProvider>{children}</EtchToolProvider>
      </EtchInputProvider>
    </EtchCanvasProvider>
  );
};
