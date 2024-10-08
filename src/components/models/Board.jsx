/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 5_3_Board.gltf 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Board(props) {
  const { nodes, materials } = useGLTF('/models/5_3_Board.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Cube099.geometry} material={materials['Material.082']} position={[-0.222, 9.199, -14.162]} scale={[5.177, 3.066, 0.147]} />
    </group>
  )
}

useGLTF.preload('/models/5_3_Board.gltf')
