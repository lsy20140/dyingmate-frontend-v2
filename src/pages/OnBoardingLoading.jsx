import React from 'react'
import styled from 'styled-components'
import {Oval} from 'react-loader-spinner'

export default function OnBoardingLoading({text}) {
  return (
    <LoaderContainer>
      <Spinner>
        <Oval
          color='var(--main-color)'
          secondaryColor='white'
          height={120}
          width={120}
          strokeWidth={4}
          strokeOpacity={1}
        />
        {text && <p>{text}</p>}
      </Spinner>
    </LoaderContainer>
  )
}

const LoaderContainer = styled.div`
  position: absolute;
  height: 100%;
  top:0;
  bottom:0;
  left:0;
  right:0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.30);
`

const Spinner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  p{
    color: white;
    font-size: 1.25rem;
    font-weight: 500;
  }
`