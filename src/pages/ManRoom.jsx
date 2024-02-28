import React, {useEffect, useState } from 'react'
import { Canvas } from "@react-three/fiber";
import { Man_Room } from '../components/models/ManRoom/ManRoom';
import {OrbitControls, useProgress} from '@react-three/drei'
import { CameraControls } from '../Camera';
import { useRoomFocus } from '../contexts/RoomFocus';
import { Man } from '../components/models/ManRoom/Man';
import CharMainDialog from '../components/ui/CharMainDialog';
import { MessageArr } from '../data/man_script';
import { usePlay } from '../contexts/Play';
import Loading from './Loading';

export default function ManRoom() {
  const {focus} = useRoomFocus();
  const {setIsFirst} = usePlay()
  const [position, setPosition] = useState({ x: 12, y: 8, z: 0 });
  const [target, setTarget] = useState({ x: 0, y: -5, z: 0 });
  const { progress } = useProgress();

  useEffect(() => {
    if(focus) {
      setPosition({ x: 2, y: 4.5, z: -4 });
      setTarget({ x: -2, y: 3, z: -4 });
    }
    else {
      setPosition({ x: 12, y: 8, z: 0 });
      setTarget({ x: 0, y: 5, z: 0});
    }
    setIsFirst(false)
  },[focus])


  return (
    <>
      <audio id="musicplayer" autoPlay>
        <source src="/audio/manroom.mp3" />
      </audio>
      <Canvas camera={{position:[12,8,0]}} colorManagement>
        <OrbitControls/>
        {/* <LightHelper /> */}
        {/* <axesHelper args={[200, 200, 200]} /> */}
        <ambientLight intensity={1} />
        <directionalLight intensity={8}  decay={1} color="#ffffff" position={[ 20, 3, -2]} target-position={[-5, 2, 2]} />
        <directionalLight intensity={10} castShadow decay={2} color="#ffffff" position={[20, 5, -5]} target-position={[2, 2, 0]} />
        <CameraControls position={position} target={target} />
        <group rotation-y={-Math.PI} rotation-z={-Math.PI/10} position-y={-3}>
          <Man_Room/>
          <Man/>
        </group>
      </Canvas>
      {progress === 100 &&
        <CharMainDialog messageArr={MessageArr} stageNum={2} />
      }
      { progress !== 100 && <Loading /> }

    </>
  )
}
