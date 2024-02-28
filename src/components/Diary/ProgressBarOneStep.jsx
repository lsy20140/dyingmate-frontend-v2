import React from 'react'
import styled from 'styled-components'
import {GoCheckCircleFill} from 'react-icons/go'

export default function ProgressBarOneStep({curStep, text}) {

  return (
    <StepBox curStep={curStep}>
      <GoCheckCircleFill/>
      <p>{text}</p>
    </StepBox>
  )
}

const StepBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  svg{
    width: 2rem;
    height: 2rem;
    color: white;
    stroke-width: 1.5px;
    stroke: white;
    fill: ${(props) => props.curStep ? '#FFB748' : 'none'};
  }
  p{
    font-size: 0.75rem;
    font-weight: 400;
  }

`