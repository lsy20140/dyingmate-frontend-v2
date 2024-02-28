import React from 'react'
import styled from 'styled-components'

export default function ColumnItem({title, content, link}) {
  return (
    <ItemBox>
      <Title>{title}</Title>
      <Content>{content}</Content>
      <a href={link} target='_blank'>{link}</a>
    </ItemBox>
  )
}

const ItemBox = styled.div`
  height: 100%;
  background-color: white;
  border-radius: 1.25rem;
  color: var(--font-gray-3);
  box-sizing: border-box;
  text-align: left;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 0.75rem;

  a{
    color: var(--font-gray-3);
    font-weight: 400;
    word-break: break-all;
  }
`

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
`

const Content = styled.p`
  width: 100%;
  word-break: break-all;
  font-weight: 400;

`



