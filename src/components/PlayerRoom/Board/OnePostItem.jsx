import React, { useState } from 'react'
import {ReactComponent as Pin} from 'assets/img/PlayerRoom/pin.svg'
import styled from 'styled-components'
import Draggable from 'react-draggable';
import { useMovePosition } from 'hooks/useBucketlist';

export default function OnePostItem({memo, memo:{bucketlistId:id, content, photo, memoX, memoY, isComplete}}) {
  const [pos, setPos] = useState({x : memoX, y : memoY})
  const {mutate: movePosition} = useMovePosition()


  const trackPos = (data) => {    
    setPos({x: data.x, y: data.y})
    const x = pos.x
    const y = pos.y
    movePosition({id, x, y})
  }
  
  return (
    <>
      
      <Draggable position={{x: pos.x, y: pos.y}} onStop={(_, data) => trackPos(data)}>
        <PostItem hasPhoto={photo !== null} memoX={memoX} memoY={memoY}>
          <HeaderPin><Pin/></HeaderPin>
          { photo &&
            <PhotoWrapper>
              {/* <img src={photo && URL.createObjectURL(photo) } /> */}
              <img src={photo} />
            </PhotoWrapper>
          }
          <ContentWrapper iscomplete={isComplete}>
            <p>{content}</p>
          </ContentWrapper>
        </PostItem>
      </Draggable>
    </>
  )
}

const PostItem = styled.div`
  position: absolute;
  width: 7.5rem;
  height: 10rem;
  padding: 1rem 0.75rem;
  box-sizing: border-box;
  flex-shrink: 0;
  background-color: ${(props) => props.hasPhoto ? '#EDEDED' : '#FFF9F0'} ;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: center;
  top: ${(props) => props.memoY}px;
  left: ${(props) => props.memoX}px;
`

const HeaderPin = styled.div`
  position: absolute;
  top: -0.4rem;
  width: 100%;
`

const PhotoWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 5rem;

  img{
    width: 100%;
  }
`

const ContentWrapper = styled.div`
  width: 100%;  
  box-sizing: border-box;

  p{
    width: 100%;
    color: black;
    font-size: 1.25rem;
    word-wrap: break-word;  
    font-family: 'NanumGangBuJangNimCe';
    text-decoration: ${(props) => props.iscomplete === "true" ? 'line-through': 'none'};
    line-height: 100%;
  }
`