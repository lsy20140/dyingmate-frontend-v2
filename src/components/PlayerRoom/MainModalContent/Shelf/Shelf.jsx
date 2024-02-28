import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ColumnItem from './ColumnItem'
import {ReactComponent as MainIcon} from '../../../../assets/icons/PlayerRoom/Shelf/main_icon.svg'
import {CgClose} from 'react-icons/cg'
import {ReactComponent as PrevButton} from '../../../../assets/icons/PlayerRoom/Shelf/prev_btn.svg'
import {ReactComponent as NextButton} from '../../../../assets/icons/PlayerRoom/Shelf/next_btn.svg'
import ColumnData from '../../../../data/column'

export default function Shelf() {
  const [scrollPage, setScrollPage]=useState(0);
  const slideListRef = useRef()
  const slideWrapperRef = useRef()
  const [widthSize, setWidthSize] = useState()
  const [heightSize, setHeightSize] = useState()


  useEffect(() => {
    setWidthSize(slideWrapperRef.current && slideWrapperRef.current.clientWidth)
    setHeightSize(slideWrapperRef.current && slideWrapperRef.current.clientHeight)
  },[])

const handleScrollLeft = () => {
  setScrollPage(scrollPage - widthSize - 48)
}

const handleScrollRight = () => {
  setScrollPage(scrollPage + widthSize - 48)
}

useEffect(() => {
  slideListRef.current.scrollLeft = scrollPage

},[scrollPage])

  return (  
    <Container>
      <Header>
        <HeaderTitle>
          <MainIcon/>
          <p>웰다잉 칼럼</p>
        </HeaderTitle>
        {/* <CgClose fontSize={'1.5rem'}/> */}
      </Header>
      <SlideWrapper ref={slideWrapperRef}>
        <SlideList ref={slideListRef} style={{scrollLeft:scrollPage}}>
          {ColumnData && ColumnData.map(data => {
            const {title, content, link} = data
            return <ColumnItem title={title} content={content} link={link} />
          })}
        </SlideList>
      </SlideWrapper>
      <PrevButtonWrapper onClick={(e) => handleScrollLeft(e)} style={scrollPage === 0 ? {opacity: 0, cursor: 'default'} : {}}><PrevButton /></PrevButtonWrapper>
      <NextButtonWrapper onClick={(e) => handleScrollRight(e)} style={(scrollPage === 10) ? {opacity: 0, cursor: 'default'} : {}}><NextButton/></NextButtonWrapper>
    </Container>
  )
}

const Container = styled.div`
  width: 60%;
  height: calc(100vh - 10rem);
  min-height: 36.5rem;
  display: flex;
  position: relative;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: 2.5rem;  
  margin: 0 auto;
  outline: 3px solid white;
  color: white;
  background: linear-gradient(237deg, rgba(0, 0, 0, 0.2) -23.03%, rgba(0, 0, 0, 0.05) 119.63%);
`
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.44rem 2.5rem 0 4.04rem;
  p{
    font-size: 1.5rem;
    font-weight: 700;
  }

`

const HeaderTitle = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

`
const SlideWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 2.25rem 2.25rem 2.75rem 2.25rem;
  box-sizing: border-box;
  overflow: hidden;
`

const SlideList = styled.div`
  overflow-x:scroll;
  scroll-behavior: smooth;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(2,  calc((100% - 1.5rem)/2));
  grid-template-columns: repeat(10, calc((100% - 1.5rem)/2));
  grid-gap: 1.5rem;

  &::-webkit-scrollbar{
    display: none;
  }
`



const PrevButtonWrapper = styled.div`
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;
  left: 0;
  transform: translate(-50%, 0%);
`

const NextButtonWrapper = styled.div`
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;
  right: 0;
  transform: translate(50%, 0%);
`