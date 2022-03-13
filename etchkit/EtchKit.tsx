import EtchCanvas from './EtchCanvas';
import EtchFeedback from './EtchFeedback';
import EtchRenderer from './EtchRenderer';
import BrushProvider from './provider/BrushProvider';
import CanvasProvider from './provider/CanvasProvider';
import InputProvider from './provider/InputProvider';

export interface EtchKitParams {
  width?: number;
  height?: number;
  feedback?: boolean;
}

const EtchKit = ({ width, height, feedback }: EtchKitParams) => {
  return (
    <CanvasProvider>
      <InputProvider>
        <BrushProvider>
          {feedback && <EtchFeedback />}
          <EtchCanvas>
            <EtchRenderer />
          </EtchCanvas>
        </BrushProvider>
      </InputProvider>
    </CanvasProvider>
  );
};

export default EtchKit;
