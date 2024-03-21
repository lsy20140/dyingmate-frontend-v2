import React from 'react'
import styled from 'styled-components'
import ProgressBarOneStep from './ProgressBarOneStep'

export default function ProgressBar({curIdx}) {
  const arrIdx = new Array(4).fill(0);

  return (
    <ProgressBarWrapper>
      {arrIdx.map((item, i) => (
        <OneStepWrapper>
          <ProgressBarOneStep key={i} curStep={(i+1 <= curIdx) ? true: false} text={(i+1 !== 4) ? `Step ${i+1}` : 'Finish'}/>
          {i!==3 && <Line curStep={(i+1 < curIdx) ? true: false}/>}
        </OneStepWrapper>
      ))}
    </ProgressBarWrapper>
  )
}

const ProgressBarWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  color: white;
`

const OneStepWrapper= styled.div`
  display: flex;
  align-items: flex-start;
`

const Line = styled.div`
  width: 3.75rem;
  border-top: 2px solid ${props => props.curStep ? '#FFB748' : 'white' };
  margin: 1rem 0.75rem 0 0.75rem;

`