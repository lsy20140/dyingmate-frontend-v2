import React from 'react'
import styled from 'styled-components'
import {BsCheckLg} from 'react-icons/bs'

export default function MethodItem({isSelected, itemText, handleOnClick}) {

  return (
    <>
      <ItemBox isSelected={isSelected} onClick={handleOnClick}>
        <p>{itemText}</p>
        {isSelected && <BsCheckLg fontSize='1.75rem'/>}
      </ItemBox>
    </>
  )
}

const ItemBox = styled.div`
  display: flex;
  justify-content: space-between;
  height: 4.375rem;
  border-radius: 1rem;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 700;
  background: ${props => props.isSelected ? '#F0EAE0' : 'rgba(240, 234, 224, 0.40)'};
  color: ${props => props.isSelected ? `var(--main-color)` : 'white'};
  padding: 0 1.5rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
  
  &:hover {
    background-color: #F0EAE0;
    color: var(--main-color);
  }
`