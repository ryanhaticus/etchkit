import React, { createContext, useContext } from 'react';
import { EtchVerbose } from './elements/EtchVerbose';
import { EtchProviderTrain } from './providers/EtchProviderTrain';

export interface IEtchKitProps {
  api?: React.MutableRefObject<any>;
  width?: number;
  height?: number;
  bindControlsToWindow?: boolean;
  verboseModeEnabled?: boolean;
}

const EtchConfigurationContext = createContext<IEtchKitProps>({});

export const EtchKit: React.FunctionComponent<IEtchKitProps> = (props) => {
  const { verboseModeEnabled } = props;

  return (
    <EtchConfigurationContext.Provider value={props}>
      <div
        style={{
          display: 'relative',
        }}
      >
        <EtchProviderTrain>
          {verboseModeEnabled && <EtchVerbose />}
        </EtchProviderTrain>
      </div>
    </EtchConfigurationContext.Provider>
  );
};

export default EtchKit;

export const useEtchConfigurationProvider = () =>
  useContext(EtchConfigurationContext);
