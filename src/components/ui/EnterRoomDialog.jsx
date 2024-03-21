import React, { useState } from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import { EnterRoomMsg } from 'data/enter_room_dialog'
import { useGetStage } from 'hooks/useStage'
import { STAGE_INFO } from 'constants/stage'
import Button from 'components/common/Button/Button'

export default function EnterRoomDialog({stageNum, setShowEndingBox}) {
  const navigate = useNavigate()
  const {data: stage} = useGetStage()
  const [enterFail, setEnterFail] = useState(false)

  const handleOnClick = () => {
    if(stage['stage'+stageNum] === true || stageNum === 5){
      navigate(STAGE_INFO[stageNum-1].path)
    }else{
      setEnterFail(true)
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
                ? <StyledButton onClick={() => handleOnClick()}>입장하기</StyledButton> 
                : <ButtonWrapper>
                    <StyledButton variant='light' onClick={() => setShowEndingBox((prev) => !prev)}>나중에</StyledButton>
                    <StyledButton onClick={() => handleOnClick()}>이동하기</StyledButton>
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

const StyledButton = styled(Button)`
  width: 7.5rem;
  padding: 0.75rem 0;
  border-radius: 1.25rem;
`