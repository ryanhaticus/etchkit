import EtchCanvas from './EtchCanvas';
import EtchFeedback from './EtchFeedback';
import EtchRenderer from './EtchRenderer';
import BrushProvider from './providers/BrushProvider';
import CanvasProvider from './providers/CanvasProvider';
import ElementProvider from './providers/ElementProvider';
import InputProvider from './providers/InputProvider';

export interface EtchKitParams {
  width?: number;
  height?: number;
  feedback?: boolean;
}

const EtchKit = ({ width, height, feedback }: EtchKitParams) => {
  return (
    <CanvasProvider>
      <InputProvider>
        <ElementProvider>
          <BrushProvider>
            {feedback && <EtchFeedback />}
            <EtchCanvas width={width} height={height}>
              <EtchRenderer />
            </EtchCanvas>
          </BrushProvider>
        </ElementProvider>
      </InputProvider>
    </CanvasProvider>
  );
};

export default EtchKit;
