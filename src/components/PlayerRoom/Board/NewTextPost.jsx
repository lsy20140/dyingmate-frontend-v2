import React from 'react'
import styled from 'styled-components'
import {ReactComponent as Pin} from 'assets/img/PlayerRoom/pin.svg'

export default function NewTextPost({handleOnClick}) {

  return (
    <PostItem onClick={handleOnClick}>
      <HeaderPin><Pin/></HeaderPin>
    </PostItem>
  )
}

const PostItem = styled.div`
  position: relative;
  width: 5rem;
  height: 5rem;
  flex-shrink: 0;
  background-color: #FFF9F0;
`
const HeaderPin = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
`