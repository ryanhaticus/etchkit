import React from 'react';
import { EtchCanvasProvider } from './EtchCanvasProvider';
import { EtchElementProvider } from './EtchElementProvider';
import { EtchInputProvider } from './EtchInputProvider';
import { EtchRendererProvider } from './EtchRendererProvider';
import { EtchToolProvider } from './EtchToolProvider';

export interface IEtchProviderTrainProps {}

export const EtchProviderTrain: React.FunctionComponent<
  IEtchProviderTrainProps
> = (props) => {
  const { children } = props;

  return (
    <EtchCanvasProvider>
      <EtchInputProvider>
        <EtchElementProvider>
          <EtchToolProvider>
            <EtchRendererProvider>{children}</EtchRendererProvider>
          </EtchToolProvider>
        </EtchElementProvider>
      </EtchInputProvider>
    </EtchCanvasProvider>
  );
};
