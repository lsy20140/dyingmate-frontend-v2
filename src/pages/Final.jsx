import React, { useState } from 'react'
import { Canvas } from "@react-three/fiber";
import {useProgress} from '@react-three/drei'
import { Ending } from '../components/models/Ending';
import { CameraControls } from '../EndingCamera';
import EndingText from '../components/EndingText';
import Loading from './Loading';

export default function Final() {
  const [position, setPosition] = useState({x: 210, y: 120, z: 105});
  const [target, setTarget] = useState({ x: 100, y: 150, z: 50 });
  const [showText, setShowText] = useState(false)
  const { progress } = useProgress();

  const handleShowText = () => {
    setShowText(!showText)
  }

  return (
    <>
      <audio id="musicplayer" autoPlay>
        <source src="/audio/ending.mp3" />
      </audio>
      <Canvas camera={{position:[200,30,100]}} colorManagement>
        {/* <axesHelper args={[500, 500, 500]} /> */}
        {/* <LightHelper /> */}
        <ambientLight intensity={0.2} />
        {/* <directionalLight intensity={1}  decay={1} color="#ffffff" position={[ 20, 3, -2]} target-position={[-5, 2, 2]} /> */}
        <directionalLight intensity={1} castShadow decay={2} color="#ffffff" position={[20, 5, -5]} target-position={[2, 2, 0]} />
        <CameraControls position={position} target={target} handleShowText={handleShowText}/>
        <group rotation-y={-Math.PI} position-y={-25}>
          <Ending/>
        </group>
      </Canvas> 
      {showText &&
        <EndingText />
      }
      { progress !== 100 && <Loading /> }

    </>
  )
}
