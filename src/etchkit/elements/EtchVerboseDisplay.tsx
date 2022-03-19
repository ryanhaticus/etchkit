import React from 'react';

export interface IEtchVerboseDisplay {
  name: string;
  value: string;
}

export const EtchVerboseDisplay: React.FunctionComponent<
  IEtchVerboseDisplay
> = (props) => {
  const { name, value } = props;

  return (
    <p style={{ margin: '0.5rem' }}>
      <span>{name}: </span>
      {value}
    </p>
  );
};
