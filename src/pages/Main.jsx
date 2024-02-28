import React, {useState} from 'react'
import MainExperience from '../components/MainExperience';
import { usePlay } from '../contexts/Play';
import { Canvas } from "@react-three/fiber";
import { ScrollControls, useProgress } from "@react-three/drei";
import MapOverlay from '../components/MapOverlay';
import SettingModal from '../components/SetUp/SettingModal';
import { Overlay } from './Overlay';
import {ReactComponent as SettingIcon} from '../assets/icons/SetUp/setting_modal.svg'
import {ReactComponent as MapModalButton} from '../assets/img/map_modal_btn.svg'
import styled from 'styled-components';
import EnterRoomDialog from '../components/ui/EnterRoomDialog';
import OnBoardingLoading from './OnBoardingLoading';

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
    <Canvas>
      {/* <axesHelper args={[1000, 1000, 1000]} /> */}
      <color attach="background" arg={["#f59f9f"]} />
      <ScrollControls
        pages={play && !end ? 36 : 0}
        damping={0.5}
      >
        <MainExperience setShowEnterDialog={setShowEnterDialog} />
      </ScrollControls>
    </Canvas>
    {isFirst && <Overlay/>}

    <MapOverlay showMap={showMap} setShowMap={setShowMap} />
    <SettingModal showSetup={showSetup} setShowSetup={setShowSetup} />
    {progress === 100 &&
      <>
        <Header onClick={() => setShowSetup(!showSetup)}>
          <SettingIcon/>
        </Header>
        <MapButtonWrapper>
          <MapModalButton onClick={() => setShowMap(true)}/>
        </MapButtonWrapper> 
      </>
    }
    {showEnterDialog !== 0 && <EnterRoomDialog stageNum={showEnterDialog}/>}
    { progress !== 100 &&
      <OnBoardingLoading text={"마을로 이동 중..."} />
    }
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