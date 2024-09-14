import React, { useEffect, useRef, useState } from 'react'
import { Canvas } from "@react-three/fiber";
import { DirectionalLightHelper } from "three";
import { useHelper, useProgress } from "@react-three/drei";
import { CameraControls } from '../Camera';
import { usePlay } from 'contexts/Play';
import ModalOverlay from 'components/PlayerRoom/ModalOverlay';
import FriendListModal from 'components/PlayerRoom/FriendList/FriendListModal';
import ModalButton from 'components/PlayerRoom/FriendList/ModalButton';
import { PlayerRoomModel, WillModel, BoardModel, PhoneModel, DiaryModel, ShelfModel, DesktopModel } from 'components/models';
import Loading from './Loading';
import EnterRoomDialog from 'components/ui/EnterRoomDialog';
import { useGetFriendList } from 'hooks/useFriend';

export default function PlayerRoom() {
  const light1 = useRef()
  const light2 = useRef()
  const { progress } = useProgress()
  const {focus, setFocus} = usePlay();
  const [friendListModal, setFriendListModal] = useState(false)

  const [curIdx, setCurIdx] = useState(0);

  const [position, setPosition] = useState({ x: 12, y: 8, z: 0 });
  const [target, setTarget] = useState({ x: 0, y: 5, z: 0 });
  const [hovered, setHovered] = useState(false)

  const [showEndingBox, setShowEndingBox] = useState(false)
  const {data: requestCount} = useGetFriendList()

  const setCamera = () => {
    setPosition({ x: 12, y: 8, z: 0 })
    setTarget({ x: 0, y: 5, z: 0 })
    setCurIdx(0)

    // isAllDone().then((res) => {
    //   if(res) {
    //     setShowEndingBox(res.data)
    //   }
    // }).catch((error) => {
    //   console.log(error)
    // })
  }
  
  // 오브젝트 클릭시 카메라 pos, target 설정
  const handleClick = (idx) => {
    let position = { x: 0, y: 0, z: 0 };
    let target = { x: 0, y: 0, z: 0 };
    setCurIdx(idx)

    if (idx === 1) {
      position = { x: -5, y: 9, z: 3 };
      target = { x: -10, y: 4, z: 5 };
    } else if (idx === 2) {
      position = { x: 0, y: 9, z: 8 };
      target = { x: 0, y: 9, z: 10 };
    } else if (idx === 3) {
      position = { x: 7, y: 8, z: -8 };
      target = { x: 5, y: 5, z: -10 };
    } else if ( idx === 4) {
      position = { x: 6, y: 3, z: 9 };
      target = { x: 4, y: 0, z: 7 };
    } else if ( idx ===5) {
      position = { x: -8, y: 5, z: 11.5 };
      target = { x: -12, y: 5, z: 12 };
    } else if ( idx ===6) {
      position = { x: -8, y: 9, z: 3 };
      target = { x: -10, y: 8, z: 3 };
    }
    if(curIdx === idx) {
      setCamera()
    }

    if(idx!==10){
      setPosition(position)
      setTarget(target)
    }
  }

  useEffect(() => {
    if(curIdx !== 0 && curIdx !==10) {
      const delayFunc = setTimeout(() => {
        setFocus(true)
      }, 2500)
      return () => clearTimeout(delayFunc)
    }
  },[curIdx])

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'default'
  },[hovered])

  return (
    <>
      <audio id="musicplayer" autoPlay>
        <source src="/audio/playerroom.mp3" />
      </audio>
      <Canvas camera={{position:[12,8,0]}} colorManagement>
        {/* <axesHelper args={[200, 200, 200]} /> */}
        <ambientLight intensity={2} />
        <directionalLight ref={light1} intensity={5}  decay={2} color="#eca864" position={[ 17, 12.421, 2]} target-position={[0, 9, 0]} />
        <directionalLight ref={light2} intensity={5} castShadow decay={2} color="#d8b58d" position={[22, 15.344, -5]} target-position={[2, 10, 0]} />
        <CameraControls position={position} target={target} />
        <group rotation-y={-Math.PI} >
          <PlayerRoomModel/>
          <group onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} onClick={() => handleClick(1)}>
            <WillModel/>
          </group>
          <group onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} onClick={() => handleClick(2)}>
            <BoardModel/>  
          </group>
          <group onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} onClick={() => handleClick(3)}>
            <PhoneModel/>
          </group>
          <group onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} onClick={() => handleClick(4)}>
            <DiaryModel/>
          </group>
          <group onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} onClick={() => handleClick(5)}>
            <ShelfModel/>
          </group>
          <group onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} onClick={() => handleClick(6)}>
            <DesktopModel/>
          </group>
        </group>
      </Canvas>
      { focus && <ModalOverlay setCamera={setCamera} curIdx={curIdx} />}

      {/* 친구 목록 */}
      { progress === 100 &&
        <div onClick={() => {handleClick(10); setFriendListModal(true)}}>
          <ModalButton requestCount={requestCount && requestCount.friendRequestResponseList.length} />
        </div>
      }
      { showEndingBox && <EnterRoomDialog stageNum={5} setShowEndingBox={setShowEndingBox}/>}
      { friendListModal && <FriendListModal setFriendListModal={setFriendListModal}/>}
      { progress !== 100 && <Loading /> }
      
    </>
  )
}
