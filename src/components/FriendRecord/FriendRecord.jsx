import React, { useEffect, useState } from 'react'
import Will from './Will';
import Phone from './Phone';
import Diary from './Diary';
import Board from './Board';
import styled from 'styled-components';
import { ArrowLeftIcon, ArrowRightIcon } from 'assets/icons';

export default function FriendRecord({email}) {
  const [comp, setComp] = useState()
  const [curIdx, setCurIdx] = useState(1)

  const handleIndex = (side, e) => {
    if(side === 'prev'){
      if(curIdx === 1) {
        setCurIdx(1);
        return;
      }
      setCurIdx(curIdx - 1)
    }
    else if(side === 'next') {
      if(curIdx === 4) {
        setCurIdx(4)
        return;
      }
      setCurIdx(curIdx + 1)
    }
  }

  useEffect(() => {
    switch(curIdx) {
      case 1:
        setComp(<Will email={email}/>)
        break;
      case 2:
        setComp(<Phone email={email}/>)
        break;
      case 3:
        setComp(<Diary email={email}/>)
        break;
      case 4:
        setComp(<Board email={email}/>)
        break;
    }
  },[curIdx])


  return (
    <>
      <Container>
        <Main>
          <Button onClick={(e)=>{handleIndex('prev', e)}} style={(curIdx === 1) ? {opacity: 0} : {}}><ArrowLeftIcon/></Button>
          <MainComponent>
            {comp}
          </MainComponent>
          <Button onClick={(e)=>{handleIndex('next', e)}} style={(curIdx === 4) ? {opacity: 0} : {}}><ArrowRightIcon/></Button>
        </Main>
      </Container>
    </>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-height: calc(100% - 11rem);
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 2.5rem;  
  padding: 0 8rem 2.5rem 8rem;
  color: white;
  gap: 4rem;
`

const Main = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;  
 height: 100%;

 & > * {
  flex-shrink: 0;
 }
`

const MainComponent = styled.div`
  width: 80rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`


const Button = styled.div`
  width: fit-content;
  display: flex;
  justify-content: center;
  width: 8.5rem;
  cursor: pointer;
`
