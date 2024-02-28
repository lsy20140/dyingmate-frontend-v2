import React from 'react'
import styled from 'styled-components'

export default function MethodExplain({explain}) {
  return (
    <ExplainBox>
      <p>· 전달메세지</p>
      <p>{explain}</p>
    </ExplainBox>
  )
}


const ExplainBox = styled.div`
  display: flex;
  flex: 50%;
  flex-direction: column;
  gap: 0.75rem;
  align-items: flex-start;
  text-align: left;
  background-color: #F0EAE0;
  padding: 3rem 1.8rem;
  color: var(--font-gray-3);
  font-size: 1.125rem;
  border-radius: 1.5rem;

  p:nth-child(1) {
    color: var(--main-color);
    font-size: 1rem;
  }
`