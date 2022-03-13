import { useBrushProvider } from './provider/BrushProvider';
import { useMouseProvider } from './provider/MouseProvider';

const EtchFeedback = () => {
  const { isDown, mouseX, mouseY, canvasX, canvasY } = useMouseProvider();
  const { brushX, brushY, oldBrushX, oldBrushY, brushRadius } =
    useBrushProvider();
  return (
    <div className='top-2 left-2 absolute z-10'>
      <div className='w-96 rounded-md bg-yellow-50 p-4'>
        <div className='flex'>
          <div>
            <h3 className='text-sm font-medium text-yellow-800'>
              EtchKit Feedback
            </h3>
            <div className='mt-2 text-sm text-yellow-700'>
              <p>
                <span className='font-bold'>Mouse:</span>
                <span className='ml-2'>
                  isDown: {'' + isDown}, x: {mouseX}, y: {mouseY}
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
                  oldX: {Math.floor(oldBrushX)}, oldY: {Math.floor(oldBrushY)},
                  x: {Math.floor(brushX)}, y: {Math.floor(brushY)}, radius:{' '}
                  {brushRadius}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EtchFeedback;
