import React, { useEffect, useMemo, useRef } from 'react'
import { useFrame } from "@react-three/fiber";
import {PerspectiveCamera, useScroll, OrbitControls} from "@react-three/drei";
import * as THREE from "three";
import { usePlay } from 'contexts/Play';
import { useStageContext } from 'contexts/StageContext';
import { MainBackground } from './MainBackground';
import { OutsideModel } from './models';

// 상수 선언
const CURVE_AHEAD_CAMERA = 0.1
const LINE_NB_POINTS = 50 // 경로 확인용

const comeOutValue = [
  {"add_offset": 0, "position": [126,7,-27]},
  {"add_offset": 0.17, "position": [61.5,7,-8]},
  {"add_offset": 0.42, "position": [-31,8,-28.5]},
  {"add_offset": 0.7, "position": [-77,9,-120]},
  {"add_offset": 0.96, "position": [-11,10,-211]}
]


export default function MainExperience({setShowEnterDialog}) {
  const cameraRef = useRef();
  const scroll = useScroll();
  const lastScroll = useRef(0)

  const {play, setHasScroll, end, setIsFirst} = usePlay()
  const {comeOutRoom} = useStageContext()

  // 경로 생성에 필요한(경로를 이루는) points 배열
  const curvePoints = useMemo(
    () => [
      new THREE.Vector3(126,3,-27),
      new THREE.Vector3(90,3,-15),
      new THREE.Vector3(61.5,3,-8.8), // stage1
      new THREE.Vector3(20,4,-7),
      new THREE.Vector3(0,4,-12),
      new THREE.Vector3(-31,4,-28.5), // stage2
      new THREE.Vector3(-55,5,-50),
      new THREE.Vector3(-65,5,-75),
      new THREE.Vector3(-77,5,-120), // stage3
      new THREE.Vector3(-80,5,-145),
      new THREE.Vector3(-60,5,-185),
      new THREE.Vector3(-40,5,-203),
      new THREE.Vector3(-11,5,-211), // stage4
      new THREE.Vector3(0,5,-215),
    ],
    []
  );

  // 경로 생성
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      curvePoints,
      false, 
      "catmullrom",
      0.5
    )
  },[])

  const backgroundColors = useRef({
    colorA: "#a8daff",
    colorB: "white",
  });

  // 경로 확인용 도형 생성에 필요한 변수
  // const linePoints = useMemo(() => {
  //   return curve.getPoints(LINE_NB_POINTS)
  // }, [curve])

  // const shape = useMemo(() => {
  //   const shape = new THREE.Shape();
  //   shape.moveTo(0, -2)
  //   shape.lineTo(0, 0.2)
    
  //   return shape
  // }, [curve])



  // delta: 이전 프레임과 현재 프레임 사이의 경과시간 ms
  useFrame((_state, delta) => {
    if (lastScroll.current <= 0 && scroll.offset > 0) {
      setHasScroll(true);
      setIsFirst(false)
    }

    if (end) {
      return;
    }

    const scrollOffset = Math.max(0, scroll.offset + comeOutValue[comeOutRoom].add_offset);

    let friction = 1;

    // lastScroll.current와 scrollOffset 사이 부드러운 transition/연결 생성을 위한 코드
    let lerpedScrollOffset = THREE.MathUtils.lerp(
      lastScroll.current,
      scrollOffset,
      delta * friction * 48
    );
    // 0~1 범위 제한
    lerpedScrollOffset = Math.min(lerpedScrollOffset, 1);
    lerpedScrollOffset = Math.max(lerpedScrollOffset, 0);

    lastScroll.current = lerpedScrollOffset;

    // lerpedScrollOffset 수치에 맞는 curve의 vector 반환
    const curPoint = curve.getPoint(lerpedScrollOffset);

    // curPoints 카메라가 따라가도록
    cameraRef.current.position.lerp(curPoint, delta);
    // cameraRef.current.position.clone().add(curPoint)
    

      // 경로 방향과 camera 시점에서 바라보는 방향 일치시킴
      // 전달된 lerpedScrollOffset(스크롤 정도)에 해당하는 curve 경로 내의 vector(위치 return)
    const lookAtPoint = curve.getPoint(
      Math.min(lerpedScrollOffset + CURVE_AHEAD_CAMERA, 1)
    );

    const currentLookAt = cameraRef.current.getWorldDirection(
      // (0,0,0)로 초기화됨
      new THREE.Vector3()
    );
    const targetLookAt = new THREE.Vector3()
      .subVectors(curPoint, lookAtPoint)
      .normalize() // vector -> 단위 vector로 정규화

    const lookAt = currentLookAt.lerp(targetLookAt, delta);

    cameraRef.current.lookAt(
      cameraRef.current.position.clone().add(lookAt)
    );
  
    // 집 접근 시 입장 dialogBox 보여주기 위한 코드
    if(scroll.offset > 0.13 - comeOutValue[comeOutRoom].add_offset && scroll.offset < 0.16 - comeOutValue[comeOutRoom].add_offset){
      setShowEnterDialog(1)
    }else if(scroll.offset > 0.355 - comeOutValue[comeOutRoom].add_offset && scroll.offset < 0.375 - comeOutValue[comeOutRoom].add_offset){
      setShowEnterDialog(2)
    }else if(scroll.offset > 0.6 - comeOutValue[comeOutRoom].add_offset && scroll.offset < 0.65   - comeOutValue[comeOutRoom].add_offset){
      setShowEnterDialog(3)
    }else if(scroll.offset > 0.90 - comeOutValue[comeOutRoom].add_offset && scroll.offset < 0.93 - comeOutValue[comeOutRoom].add_offset){
      setShowEnterDialog(4)
    }else{
      setShowEnterDialog(0) // dialog 박스 보이지 않게
    }
  })

  useEffect(() => {
    // 방문한 집(stage)에 따라 스크롤 offset 조정하여 마지막 위치로 복구된 것과 같은 효과 나타내기 위한 코드
    lastScroll.current = comeOutValue[comeOutRoom].add_offset
  },[])

  return useMemo(() =>
  (
    <>
      <directionalLight position={[0, 3, 1]} intensity={1} />
      <group ref={cameraRef} position={comeOutValue[comeOutRoom].position}>
        <MainBackground backgroundColors={backgroundColors} />
        <PerspectiveCamera position={[0,-1,0]} fov={60} makeDefault />
      </group>
      <group position={[0,-22,0]}>
        <OutsideModel />
      </group>

      {/* 경로 확인용 코드(기능에 영향 X) */}
      {/* <OrbitControls/>
      <group position={[0, -2, 0]}>
        <mesh>
          <extrudeGeometry
            args={[
              shape, 
              {
                steps: LINE_NB_POINTS,
                bevelEnabled: false,
                extrudePath: curve,
              }
            ]} />
            <meshStandardMaterial color={"red"} opacity={1} transparent/>
        </mesh>
      </group> */}

    </>
  )
  ) 
}
