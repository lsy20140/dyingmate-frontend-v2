import React from 'react'
import styled from 'styled-components'
import DialogBox from './DialogBox'

export default function CharMainDialog({messageArr, stageNum}) {

  return (
    <DialogBoxWrapper>
      <CharMainDialogBox>
        <DialogBox messageArr={messageArr} stageNum={stageNum} />
      </CharMainDialogBox>
    </DialogBoxWrapper>
  )
}

const DialogBoxWrapper = styled.div`
  position: absolute;
  bottom: 4rem;
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
`

const CharMainDialogBox = styled.div` 
  width: 50%;
  // background-image : url(${''});
  box-sizing: border-box;
  background: linear-gradient(237deg, rgba(0, 0, 0, 0.2) -23.03%, rgba(0, 0, 0, 0.05) 119.63%);
  outline: 3px solid white; 
  border-radius: 2.5rem;  
  backdrop-filter: blur(60px);
  box-sizing: border-box;

  align-items: center;
  justify-content: center;
  display: flex;
  p{
    font-size: 1.25rem;
    color: white;
    font-weight: 500;
    text-align: center;
  }
`