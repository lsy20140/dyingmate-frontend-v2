import React from 'react'
import styled from 'styled-components'
import {BiLock}  from 'react-icons/bi'
import {useNavigate} from 'react-router-dom'

export default function MapItem({isClear, stageTitle, stageImg, path}) {
  const navigate = useNavigate();

  const handleOnClick = (isClear) => {
    {isClear && navigate(path)}
    
  }
  
  return (
    <ItemBox isClear={isClear} onClick={() => handleOnClick(isClear)}>
      <Content>
        <ImageWrapper>
          {!isClear && 
            <LockCover>
              <BiLock fontSize='2.5rem'/>
            </LockCover>
          }
          <StageImage image={stageImg} /> 
        </ImageWrapper> 
        <StageTitle>{stageTitle}</StageTitle>
      </Content>
    </ItemBox>
  )
}

const ItemBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  &, & *{
    border-radius: 1.875rem;
    width: 100%;  
  }
  box-shadow: ${props => props.isClear ? '10px 20px 200px 0px rgba(255, 255, 255, 0.50)' : '0px 4px 45px 0px rgba(0, 0, 0, 0.10)'};
  background: ${props => props.isClear ? 'linear-gradient(237deg, rgba(253, 131, 95, 0.51) -23.03%, rgba(253, 131, 95, 0.51) 119.63%)' : 'linear-gradient(237deg, rgba(0, 0, 0, 0.2) -23.03%, rgba(0, 0, 0, 0.05) 119.63%)'};
  border: 2px solid white;
  backdrop-filter: blur(60px);
`


const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.69rem;
  box-sizing: border-box;
  align-items: center;
  padding: 2.8rem 0;
`

const ImageWrapper = styled.div`
  width: 11rem;
  height: 14rem;
  border-radius: 1.88rem;
  position: relative;
`

const LockCover = styled.div`
  z-index: 999;
  height: 100%;
  position: absolute;
  background: rgba(16, 12, 12, 0.71);
  display: flex;
  align-items: center;
  border: 2px solid white;
  box-sizing: border-box;

  svg {
    z-index: 999;
    color: white;
  }
`

const StageImage = styled.div`
  background-image: url(${props => props.image});
  height: 100%;
  position: absolute;
  border: 2px solid white;
  box-sizing: border-box;
  background-size: contain;
`

const StageTitle = styled.div`
  font-size: 1.25rem;
  color: white;
  font-weight: 500;
  flex-shrink: 0;
  text-align: center;
`