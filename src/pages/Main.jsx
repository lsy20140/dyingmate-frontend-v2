import React, {useState} from 'react'
import { Canvas } from "@react-three/fiber";
import { ScrollControls, useProgress } from "@react-three/drei";
import styled from 'styled-components';
import { usePlay } from 'contexts/Play';
import MainExperience from 'components/MainExperience';
import MapOverlay from 'components/MapOverlay';
import SettingModal from 'components/SetUp/SettingModal';
import { Overlay } from './Overlay';
import { SettingBtnIcon } from 'assets/icons';
import {ReactComponent as MapModalButton} from 'assets/img/map_modal_btn.svg'
import OnBoardingLoading from './OnBoardingLoading';
import EnterRoomDialog from 'components/ui/EnterRoomDialog';

export default function Main() {
  const [showSetup, setShowSetup] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const {play, end, isFirst} = usePlay();
  const { progress } = useProgress()
  const [showEnterDialog, setShowEnterDialog] = useState(0) // 0인 경우 dialog box 보이지 않음. 1~5까지 각 stage 의미

  return (
  <>
    <audio id="musicplayer" autoPlay>
      <source src="/audio/main.aac" />
    </audio>
    { progress !== 100 &&
      <OnBoardingLoading text={"마을로 이동 중..."} />
    }
    <Canvas>
      {/* <axesHelper args={[1000, 1000, 1000]} /> */}
      <color attach="background" arg={["#f59f9f"]} />
      <ScrollControls
        pages={play && !end ? 36 : 0}
        damping={0.5}
        maxSpeed={0.3}
      >
        <MainExperience setShowEnterDialog={setShowEnterDialog} />
      </ScrollControls>
    </Canvas>

    {/* 초기 지점에 위치한 경우 하단 메세지 보여주는 overlay */}
    {isFirst && <Overlay/>}

    {progress === 100 &&
      <>
        <Header onClick={() => setShowSetup(!showSetup)}>
          <SettingBtnIcon/>
        </Header>
        <MapButtonWrapper>
          <MapModalButton onClick={() => setShowMap(true)}/>
        </MapButtonWrapper> 
      </>
    }

    <MapOverlay showMap={showMap} setShowMap={setShowMap} />
    <SettingModal showSetup={showSetup} setShowSetup={setShowSetup} />

    {showEnterDialog !== 0 && <EnterRoomDialog stageNum={showEnterDialog}/>}
  </>
  );
}

const Header = styled.div`
  position: absolute;
  top: 3.75rem;
  right: 3rem;
  z-index: 1;

  svg {
    cursor: pointer;
  }
`

const MapButtonWrapper = styled.div`
  position: absolute;
  cursor: pointer;
  display: flex;
  align-items: center;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);

  &:hover{
    filter: brightness(1.1);
  }
`