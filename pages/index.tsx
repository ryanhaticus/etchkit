import { useEffect, useRef, useState } from 'react';

import dynamic from 'next/dynamic';
const EtchKit = dynamic(() => import('../etchkit/EtchKit'), { ssr: false });

const Index = () => {
  return <EtchKit width={500} height={500} feedback={true} />;
};

export default Index;
