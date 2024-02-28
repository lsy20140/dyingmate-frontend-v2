import React, { useEffect } from 'react'
import styled from 'styled-components'
import { ReactComponent as CloseModal } from '../assets/icons/close_modal.svg'
import MapItem from './Map/MapItem'
import Map1 from '../assets/img/Map/map_1.png'
import Map2 from '../assets/img/Map/map_2.png'
import Map3 from '../assets/img/Map/map_3.png'
import Map4 from '../assets/img/Map/map_4.png'
import Map5 from '../assets/img/Map/map_5.png'

import { useStageContext } from '../contexts/StageContext'
import axios from 'axios'
import { useAuthContext } from '../contexts/AuthContext'

export default function MapOverlay({showMap, setShowMap}) {
  const {stage, setStage} = useStageContext()
  const {token} = useAuthContext()

  // stageImg 수정 필요
  const StageInfo = [
    {id: 0, isClear: stage && stage.stage1, stageTitle: '주인 할머니의 방', stageImg: Map1, path: '/gmroom'},
    {id: 1,  isClear: stage && stage.stage2, stageTitle: '첫 번째 메이트의 방', stageImg: Map2, path: '/manroom'},
    {id: 2,  isClear: stage && stage.stage3, stageTitle: '두 번째 메이트의 방', stageImg: Map3, path: '/womanroom'},
    {id: 3,  isClear: stage && stage.stage4, stageTitle: '나의 방', stageImg: Map4, path: '/playerroom'},
    {id: 4,  isClear: stage && stage.stage5, stageTitle: '마지막 이야기', stageImg: Map5, path: '/final'},
  ]

  useEffect(() => {
    axios.get(`https://dying-mate-server.link/map`, {
      headers: {Authorization: 'Bearer ' + token},
    }, )
    .then(function (res) {
      if(res) {
        setStage(() => ({...res.data.data}))
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  },[])


  return (
    <>
      {showMap && (
        <Overlay>
          <Header>
            <CloseModal onClick={() => setShowMap(!showMap)}/>
          </Header>
          <Main>
            <MapItemWrapper>
              <Line/>
              {StageInfo.map(({id, isClear, stageTitle, stageImg, path}) => (
                <MapItem key={id} isClear={isClear} stageTitle={stageTitle} stageImg={stageImg} path={path}/>
              ))}              
            </MapItemWrapper>
          </Main>
        </Overlay>
        )
      }
    </>
  )
}

const Overlay = styled.div`
  position: absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
  background-color: #1C1717B2;
  z-index:999;
`

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 3.75rem 6.25rem;

`
const Main = styled.div`
  width: 100vw;
  height: calc(100% - 22rem);
  display: flex;
  align-items: center;

`
const MapItemWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 23rem;
  margin: 0 8rem;
  box-sizing: border-box;
  display: flex;
  gap: 2.5rem;
`

const Line = styled.div`
  position: absolute;
  width: 100%;
  height: 6px;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`