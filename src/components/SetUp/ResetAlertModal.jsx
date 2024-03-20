import React, { useRef } from 'react'
import styled from 'styled-components'
import {IoMdAlert} from 'react-icons/io'
import userApi from 'api/auth/user'
import { useToast } from 'hooks/useToast'
import { TOAST_MESSAGES } from 'constants/toastMessages'

export default function ResetAlertModal({setAlertOpen}) {
  const modalRef = useRef()

  const handleOutsideClick = (e) => {
    if(modalRef.current === e.target) {
      setAlertOpen(false)
    }
  }

  const handleReset = async () => {
    const data = await userApi.resetData()
    
    if(data.message === "성공"){
      useToast('success', TOAST_MESSAGES.RESET_SUCCESS)
      setAlertOpen(false)
    }else{
      useToast('error', TOAST_MESSAGES.RESET_FAIL)
    }
  }

  
  return (
    <>
      <Overlay>
          <Container ref={modalRef} onClick={handleOutsideClick}>
            <ContentWrapper>
              <TextWrapper>
                <div><IoMdAlert fontSize={'1.5rem'}/> 초기화 시, 모든 데이터가 사라져요.</div>
                <p>정말로 다잉메이트를 초기화 하시겠습니까?</p>
              </TextWrapper>
              <ResetButton onClick={handleReset}>초기화</ResetButton>
            </ContentWrapper>
          </Container>
      </Overlay>
      
    </>
  )
}

const Overlay = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.70);
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ContentWrapper = styled.div`
  width: 27%;
  min-width: 28rem;
  height: fit-content;
  background: linear-gradient(237deg, rgba(255, 255, 255, 0.51) -23.03%, rgba(255, 255, 255, 0.30) 119.63%);
  backdrop-filter: blur(60px);
  outline: 2px solid white;
  padding: 1.5rem;
  box-sizing: content-box;
  display: flex;
  border-radius: 1rem;
  justify-content: space-around;
  align-items: center;
  z-index: 999;
`

const TextWrapper = styled.div`
  flex-shrink: 0;
  z-index:999;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  
  div{
    color: var(--main-color-2);
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  p{
    color: white;
    font-size: 0.875rem;
    margin-left: 2.25rem;
  }
`

const ResetButton = styled.button`
  width: 6.75rem;
  min-width: 6rem;
  height: 3rem;
  background-color: var(--main-color-2);
  color: white;
  font-weight: 700;
  text-align: center;
  padding: 0.75rem 0;
  border-radius: 0.75rem;
  border: none;
`