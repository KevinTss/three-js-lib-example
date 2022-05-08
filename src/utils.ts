import * as THREE from 'three';

export const getNewScene = () => new THREE.Scene()

export const getNewCamera = () => new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000)

export const getNewRenderer = (canvasRef:HTMLCanvasElement) => new THREE.WebGLRenderer({ canvas: canvasRef })

type getNewCubeOptions = {
  color?: string
}
export const getNewCube = (options?:getNewCubeOptions) => {
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
  const cubeMaterial = new THREE.MeshBasicMaterial({
      color: options?.color || '#ff0000'
  })
  const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)

  return cubeMesh
}
