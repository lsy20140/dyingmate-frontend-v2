import React from 'react'
import styled from 'styled-components'

export default function Loading() {
  return (
    <Container>
      <p>불러오는 중입니다.</p>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 11rem); 
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
`