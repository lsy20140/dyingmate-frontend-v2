import React from 'react'
import styled from 'styled-components'
import {ReactComponent as TitleSrc} from 'assets/img/logo.svg'
import FriendRecord from './FriendRecord'
import { CloseIcon } from 'assets/icons'


export default function ModalOverlay({setOpen, email}) {
  return (
    <Overlay>
      <Header>
        <TitleSrc />
        <CloseIcon onClick={() => setOpen(false)}/>
      </Header>
      <FriendRecord email={email}/>
    </Overlay>
  )
}

const Overlay = styled.div`
  position: absolute;
  height: 100vh;
  top:0;
  bottom:0;
  left:0;
  right:0;
  text-align: center;
  background-color: #1C1717B2;
  overflow: hidden;
  &{
    z-index: 999;
  }

`

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 3.75rem 6.25rem 1rem 6.25rem;
  box-sizing: border-box;
  svg:first-child{
    width: 11.25rem;
    height: 3.5rem;
  }

  svg:last-child{
    width: 3rem;
    height: 3rem;
    z-index:999;
    cursor: pointer;
    
    &:hover{
      filter: brightness(1.1)
    }
  }
`
