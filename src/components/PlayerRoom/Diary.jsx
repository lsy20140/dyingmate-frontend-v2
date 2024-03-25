import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import StepOne from './Diary/StepOne'
import StepTwo from './Diary/StepTwo'
import StepThree from './Diary/StepThree'
import StepFinal from './Diary/StepFinal'
import { ArrowLeftIcon, ArrowRightIcon } from 'assets/icons'
import ProgressBar from './Diary/ProgressBar'
import { useGetDiary } from 'hooks/useDiary'

export default function Diary() {
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
        setComp(<StepOne/>)
        break;
      case 2:
        setComp(<StepTwo/>)
        break;
      case 3:
        setComp(<StepThree/>)
        break;
      case 4:
        setComp(<StepFinal/>)
        break;
    }
  },[curIdx])


  return (
    <>
      <Container>
        <MainComponent>
          <Button onClick={(e)=>{handleIndex('prev', e)}} style={(curIdx === 1) ? {opacity: 0} : {}}><ArrowLeftIcon/></Button>
          {comp}
          <Button onClick={(e)=>{handleIndex('next', e)}} style={(curIdx === 4) ? {opacity: 0} : {}}><ArrowRightIcon/></Button>
        </MainComponent>
        <ProgressBar curIdx={curIdx}/>
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
  justify-content: space-around;
  box-sizing: border-box;
  border-radius: 2.5rem;  
  padding: 2rem 8rem 2.5rem 8rem;
  color: white;
  gap: 4rem;
`

const MainComponent = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;  

 & > * {
  flex-shrink: 0;
 }
`


const Button = styled.div`
  width: fit-content;
  display: flex;
  justify-content: center;
  width: 8.5rem;
  cursor: pointer;
`
