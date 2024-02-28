import React, { useEffect, useState } from 'react'
import { Canvas } from "@react-three/fiber";
import { Woman_Room } from '../components/models/WomanRoom/WomanRoom';
import {OrbitControls, useProgress} from '@react-three/drei'
import { CameraControls } from '../Camera';
import { useRoomFocus } from '../contexts/RoomFocus';
import CharMainDialog from '../components/ui/CharMainDialog';
import { MessageArr } from '../data/woman_script';
import { Woman } from '../components/models/WomanRoom/Woman';
import { usePlay } from '../contexts/Play';
import Loading from './Loading';

export default function WomanRoom() {
  const {focus} = useRoomFocus();
  const {setIsFirst} = usePlay()
  const [position, setPosition] = useState({ x: 12, y: 9, z: 0 });
  const [target, setTarget] = useState({ x: 0, y: -5, z: 0 });
  const { progress } = useProgress();

  useEffect(() => {
    if(focus) {
      setPosition({ x: 2, y: 7, z: 3 });
      setTarget({ x: -2, y: 5, z:  4});
    }
    else {
      setPosition({ x: 12, y: 9, z: 0 });
      setTarget({ x: 0, y: 5, z: 0});
    }
    setIsFirst(false)
  },[focus])

  return (
    <>
      <audio id="musicplayer" autoPlay>
        <source src="/audio/womanroom.mp3" />
      </audio>
      <Canvas camera={{position:[12,9,0]}} colorManagement>
        <OrbitControls/>
        {/* <LightHelper /> */}
        {/* <axesHelper args={[200, 200, 200]} /> */}
        <ambientLight intensity={0.1} />
        <directionalLight intensity={1}  decay={2} color="#eca864" position={[ 17, 12.421, -2]} target-position={[0, 9, 2]} />
        <directionalLight intensity={1.2} castShadow decay={2} color="#d8b58d" position={[22, 15.344, -5]} target-position={[2, 10, 0]} />
        <CameraControls position={position} target={target} />
        <group rotation-y={-Math.PI} rotation-z={-Math.PI/10} position-y={-1}>
          <Woman_Room/>
          <Woman/>
        </group>
      </Canvas>
      {progress === 100 &&
        <CharMainDialog messageArr={MessageArr} stageNum={3} />
      }
      { progress !== 100 && <Loading /> }

    </>
  )
}
