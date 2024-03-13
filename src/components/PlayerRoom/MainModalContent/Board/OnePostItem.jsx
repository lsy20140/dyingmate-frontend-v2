import React from 'react'
import {ReactComponent as Pin} from '../../../../assets/img/PlayerRoom/pin.svg'
import styled from 'styled-components'
import Draggable from 'react-draggable';
import axios from 'axios'
import { useAuthContext } from '../../../../contexts/AuthContext';

export default function OnePostItem({memo, memo:{content, photo, memoX, memoY, isComplete}}) {
  const baseUrl = 'https://dying-mate-server.link'
  const {token} = useAuthContext();

  const trackPos = (data) => {    
    axios.patch(
      `${baseUrl}/bucketlist/move/1?x=${memoX+data.lastX}&y=${memoY+data.lastY}`, {}, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true,
      })
    .then((res) => {
      console.log(res)        
    })
    .catch((error) => {
      console.log(error)
    })
  }



  return (
    <>
      
      <Draggable onStop={(e, data) => trackPos(data)}>
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