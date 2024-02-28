import React, { useEffect, useState } from 'react'
import { Canvas } from "@react-three/fiber";
import { GMHome } from '../components/models/GrandmaRoom/GrandmaRoom';
import {OrbitControls, useProgress} from '@react-three/drei'
import { CameraControls } from '../Camera';
import { useRoomFocus } from '../contexts/RoomFocus';
import { Grandmother } from '../components/models/GrandmaRoom/Grandmother';
import { MessageArr } from '../data/grandma_script';
import CharMainDialog from '../components/ui/CharMainDialog';
import { usePlay } from '../contexts/Play';
import Loading from './Loading';

export default function GrandmaRoom() {
  const {focus} = useRoomFocus();
  const {setIsFirst} = usePlay()
  const [position, setPosition] = useState({ x: 10, y: 9, z: 0 });
  const [target, setTarget] = useState({ x: 0, y: -5, z: 0 });
  const { progress } = useProgress();

  useEffect(() => { 
    if(focus) {
      setPosition({ x: -5, y: 4, z: 0.5 });
      setTarget({ x: -10, y: 2, z: 0 });
    }
    else {
      setPosition({ x: 10, y: 9, z: 0 });
      setTarget({ x: 0, y: 5, z: 0});
    }
    setIsFirst(false)
  },[focus])

  return (
    <>
      <audio id="musicplayer" autoPlay>
        <source src="/audio/grandmaRoom.mp3" />
      </audio>
      <>
        <Canvas camera={{position:[10,9,0]}}>
        <OrbitControls/>
        {/* <LightHelper /> */}
        {/* <axesHelper args={[200, 200, 200]} /> */}
        <ambientLight intensity={5} />
        <directionalLight intensity={8}  decay={1} color="#daae73" position={[ 5, 8, -2]} target-position={[-5, 8, 2]} />
        <directionalLight intensity={3} castShadow decay={2} color="#d8b58d" position={[5, 8, -5]} target-position={[2, 10, 0]} />
        <CameraControls position={position} target={target} />
        <group rotation-y={-Math.PI} rotation-z={-Math.PI/10} position-y={-1}>
          <GMHome/>
          <Grandmother/>
        </group>        
        </Canvas>

      </>
      {progress === 100 &&
        <CharMainDialog messageArr={MessageArr} stageNum={1} />
      }
      { progress !== 100 && <Loading /> }
    </>
  )
}

