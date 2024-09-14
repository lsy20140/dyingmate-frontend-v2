import React from 'react'
import styled from 'styled-components'

export default function NoRecord({email, text}) {
  return (
    <Container>
      <p>@{email} 님이 아직 {text}를 기록하지 않았습니다.</p>
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