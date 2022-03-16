import { useBrushProvider } from './providers/BrushProvider';
import { useInputProvider } from './providers/InputProvider';

const EtchFeedback = () => {
  const { isDown, inputX, inputY, canvasX, canvasY } = useInputProvider();
  const { brush } = useBrushProvider();
  return (
    <div className='top-2 left-2 absolute z-10'>
      <div className='w-96 rounded-md bg-yellow-50 p-4'>
        <div className='flex'>
          <div>
            <h3 className='text-sm font-medium text-yellow-800'>
              EtchKit Feedback
            </h3>
            {brush && (
              <div className='mt-2 text-sm text-yellow-700'>
                <p>
                  <span className='font-bold'>Mouse:</span>
                  <span className='ml-2'>
                    isDown: {'' + isDown}, x: {inputX}, y: {inputY}
                  </span>
                </p>
                <p>
                  <span className='font-bold'>Canvas:</span>
                  <span className='ml-2'>
                    x: {canvasX}, y: {canvasY}
                  </span>
                </p>
                <p>
                  <span className='font-bold'>Brush:</span>
                  <span className='ml-2'>
                    x: {Math.floor(brush.getX())}, y: {Math.floor(brush.getY())}
                    , radius: {brush.getRadius()}
                  </span>
                </p>
              </div>
            )}
            {!brush && (
              <div className='mt-2 text-sm text-yellow-700'>
                <p>Loading...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EtchFeedback;
