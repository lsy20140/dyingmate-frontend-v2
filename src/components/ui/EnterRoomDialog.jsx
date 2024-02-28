import React, { useState } from 'react'
import styled from 'styled-components'
import StyledButton from './StyledButton'
import {useNavigate} from 'react-router-dom'
import { useStageContext } from '../../contexts/StageContext'
import { EnterRoomMsg } from '../../data/enter_room_dialog'

export default function EnterRoomDialog({stageNum, setShowEndingBox}) {
  const navigate = useNavigate()
  const {stage} = useStageContext()
  const [enterFail, setEnterFail] = useState(false)

  const handleOnClick = (close) => {
    switch(stageNum) {
      case 1:
        navigate('/gmroom')
        break;
      case 2:
        if(stage.stage2 === true){
          navigate('/manroom')
        }else{
          setEnterFail(true)
        }
        break;
      case 3:
        if(stage.stage3 === true){
          navigate('/womanroom')
        }else{
          setEnterFail(true)
        }
        break;
      case 4:
        if(stage.stage4 === true){
          navigate('/playerroom')
        }else{
          setEnterFail(true)
        }
        break;
      case 5:
        if(close) {
          setShowEndingBox((prev) => !prev)
          return;
        }
        navigate('/final')
        break;
    } 
    
  }

  return (
    <>
      <DialogBoxWrapper>
        <DialogBox>
          {!enterFail ? 
            <>
              <p>{EnterRoomMsg[stageNum].text}</p>
              {stageNum !== 5
                ? <StyledButton width={'7.5rem'} text={'입장하기'} textColor={'white'} btnColor={'var(--main-color)'} handleOnClick={() => handleOnClick()}/> 
                : <ButtonWrapper>
                    <StyledButton width={'7.5rem'} text={'나중에'} textColor={'white'} btnColor={'#DEDEDE'} handleOnClick={() => handleOnClick(close)}/> 
                    <StyledButton width={'7.5rem'} text={'이동하기'} textColor={'white'} btnColor={'var(--main-color)'} handleOnClick={() => handleOnClick()}/> 
                  </ButtonWrapper>
                
              }
            </>
            :
            <p>{EnterRoomMsg[0].text}</p>
          }

        </DialogBox>
      </DialogBoxWrapper>
    </> 
  )
}

const DialogBoxWrapper = styled.div`
  position: absolute;
  bottom: 5rem;
  width: 100%;
  display: flex;
  justify-content: center;
`
const DialogBox = styled.div` 
  width: 55%;
  min-width: 53rem;
  height: 18%;
  background: linear-gradient(237deg, rgba(0, 0, 0, 0.2) -23.03%, rgba(0, 0, 0, 0.05) 119.63%);
  outline: 2px solid white; 
  border-radius: 2rem;  
  backdrop-filter: blur(60px);
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  padding: 3.5rem 5rem 3.5rem 5rem;

  p{
    font-size: 1.25rem;
    color: white;
    font-weight: 500;
    text-align: center;
    flex-shrink: 0;
  }
`
const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`