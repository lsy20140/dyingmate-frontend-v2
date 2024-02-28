import React from 'react'
import styled from 'styled-components'
import {ReactComponent as FriendModalIcon} from '../../../assets/icons/PlayerRoom/Friend/friend_modal.svg'

export default function ModalButton({requestCount}) {
  return (
    <ButtonWrapper>
      <CircleWrapper>
        <FriendModalIcon/>
      </CircleWrapper>
      <RequestCount>
        {requestCount}
      </RequestCount>
    </ButtonWrapper>
  )
}


const ButtonWrapper = styled.div`
  position: absolute;
  right: 4rem;
  bottom: 3rem;
`

const CircleWrapper = styled.div`
  background-color: #FD835F;
  outline: 2px solid white; 
  position: relative;
  padding: 1.2rem;
  border-radius: 100%;
  cursor: pointer;
  
  &:hover{
    filter: brightness(1.1);
  }

  svg {
    width: 3rem;
    height: 3rem;
  }
`

const RequestCount = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 100%;
  background-color: #39375C;
  position: absolute;
  top: -0.5rem;
  right: 0;
  font-size: 1.25rem;
  color: white;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  `