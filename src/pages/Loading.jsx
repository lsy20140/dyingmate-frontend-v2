import React from 'react'
import styled from 'styled-components'

export default function Loading() {
  return (
    <LoadingContainer>
      <svg viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
    </LoadingContainer>  
)
}


const LoadingContainer = styled.div`
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

  svg {
    width: 4rem;
    transform-origin: center;
    animation: rotate4 2s linear infinite;
  }
  
  circle {
    fill: none;
    stroke: var(--main-color);
    stroke-width: 3;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash4 1.5s ease-in-out infinite;
  }
  
  @keyframes rotate4 {
    100% {
    transform: rotate(360deg);
    }
  }
  
  @keyframes dash4 {
    0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    }
  
    50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
    }
  
    100% {
    stroke-dashoffset: -125px;
    }
  }
 
`