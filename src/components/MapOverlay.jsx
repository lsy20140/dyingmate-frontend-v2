import React from 'react'
import styled from 'styled-components'
import { ReactComponent as CloseModal } from 'assets/icons/close_modal.svg'
import MapItem from './Map/MapItem'
import { STAGE_INFO } from 'constants/stage'
import { useGetStage } from 'hooks/useStage'

export default function MapOverlay({showMap, setShowMap}) {
  const {data: stage} = useGetStage()

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
              {STAGE_INFO.map(({id, stageTitle, stageImg, path}) => (
                <MapItem key={id} isClear={Object.values(stage.data)[id]} stageTitle={stageTitle} stageImg={stageImg} path={path}/>
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