import { useState, useEffect, useRef, RefObject } from 'react'
import {Renderer, Object3D, Camera} from 'three'

import {getNewScene, getNewCamera, getNewRenderer, getNewCube} from './utils'
import {drawShape} from './useView.types'

const defaultValues = {
  width: 800,
  height: 600,
  cameraPosition: 3
}

type Props = {
  canvasRef: RefObject<HTMLCanvasElement>
  cameraPosition?: number,
  width?: number
  height?: number
}
const useView = (options:Props) =>{
  const [scene, setScene] = useState<Object3D | null>(null)
  const [camera, setCamera] = useState<Camera | null>(null)
  const renderer = useRef<Renderer | null>(null)

   useEffect(() => {
    if (scene) return

    const newScene = getNewScene()
    setScene(newScene)
  }, [])

   useEffect(() => {
    if (!scene) return

    const newCamera = getNewCamera()
    newCamera.position.z = options.cameraPosition || defaultValues.cameraPosition
    scene.add(newCamera)
    setCamera(newCamera)
  }, [scene])

   useEffect(() => {
     if (!camera || !scene || !options.canvasRef.current) return
     
    const newRenderer = getNewRenderer(options.canvasRef.current)
    newRenderer.setSize(
      options.width || defaultValues.width,
      options.height || defaultValues.height
    )
    newRenderer.render(scene, camera)
    renderer.current = newRenderer
  }, [camera])

  const drawShape = (options:drawShape = {}) => {
    if (!scene) return

    let shape
    switch (options.type) {
      case 'line':
        shape = getNewCube({color: '#D5E2BC'})
        break
      default:
        shape = getNewCube()
        break
    }

    scene.add(shape)
    rerender()
  }
 
  const rerender =  () => {
    if (!renderer.current || !scene || !camera) return 

    renderer.current.render( scene, camera );
  }

  return {
    draw: drawShape
  }
}

export default useView
