import EtchCanvas from './EtchCanvas';
import EtchFeedback from './EtchFeedback';
import EtchRenderer from './EtchRenderer';
import BrushProvider from './provider/BrushProvider';
import CanvasProvider from './provider/CanvasProvider';
import MouseProvider from './provider/MouseProvider';

export interface EtchKitParams {
  width?: number;
  height?: number;
  feedback?: boolean;
}

const EtchKit = ({ width, height, feedback }: EtchKitParams) => {
  return (
    <CanvasProvider>
      <MouseProvider>
        <BrushProvider>
          {feedback && <EtchFeedback />}
          <EtchCanvas>
            <EtchRenderer />
          </EtchCanvas>
        </BrushProvider>
      </MouseProvider>
    </CanvasProvider>
  );
};

export default EtchKit;
