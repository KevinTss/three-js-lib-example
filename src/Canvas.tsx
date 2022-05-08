import { useRef } from 'react';

import useView from './useView';

const CanvasExample = ()=> {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const {draw} = useView({
    canvasRef,
  })

  return (
    <div>
    <canvas ref={canvasRef} />
    <button onClick={() => draw()}>add cube</button>
    <button onClick={() => draw({type: 'line'})}>add greeen</button>
    </div>
  )
}

export default CanvasExample
