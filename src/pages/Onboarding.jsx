import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { NextDialogIcon } from 'assets/icons'
import {useNavigate} from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { DiaglogArr } from '../data/onboarding'
import userApi from 'api/auth/user'
import { useAuthContext } from 'contexts/AuthContext'
import Button from 'components/common/Button/Button'

export default function Onboarding() {
  const navigate = useNavigate()
  const [curIdx, setCurIdx] = useState(0);
  const [nameInput, setNameInput] = useState('')
  const {setLogin} = useAuthContext()

  const location = useLocation();
  const {isSocialLogin} = location.state
  const {email, pwd} = !isSocialLogin && location.state

  useEffect(async () => {
    if(!isSocialLogin) {
      const {data} = await userApi.userLogin(email, pwd)
      localStorage.setItem('login-token', data.accessToken);
      setLogin(true)
    }
  },[])

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    await userApi.saveUsername()
    navigate('/main')
  }

  return (
    <>
      <audio id="musicplayer" autoPlay>
        <source src="/audio/onboarding.aac" />
      </audio>
      <Container>
        <VideoWrapper>
          <video width="100%" height="100%" min-width="100%" autoPlay muted playsInline loop>
            <source src={'/videos/onboardingVideo.mp4'} type="video/mp4" />
          </video>
        </VideoWrapper>

        <ContentBox>
          {/* dialog 스크립트 출력되는 부분 */}
          <p>{DiaglogArr[curIdx].text.toString()}</p>

          {/* 마지막 dialog 부분 제외하고 다음 스크립트로 넘어가기 위한 버튼을 보여줌 */}
          {(curIdx === 0 || curIdx === 1) &&
            <span onClick={() => setCurIdx(curIdx+1)}>
              <NextDialogIcon/>
            </span>
          }

          {/* 마지막 dialog 도달 시에만 이름 저장하는 input 보여짐 */}
          { curIdx === 2 && 
          <Footer>
            <form onSubmit={handleOnSubmit}>
              <FormInput 
                type='text' 
                id='userName' 
                name='userName' 
                value={nameInput ?? ''}
                placeholder='이름을 입력해주세요.' 
                onChange={(e) => setNameInput(e.target.value)}
                required/>
              <SaveButton type='submit' variant={nameInput ? 'primary': 'empty'} disabled={!nameInput}>저장하기</SaveButton>
            </form>
          </Footer>
          }
        </ContentBox>
      </Container>
    </>
  )
}

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

const VideoWrapper = styled.div`
  width: 100vw; 
  height: 100vh;

  video{
    object-fit: cover;
  }
`

const ContentBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 45%;
  padding: 4rem 11rem;
  background: linear-gradient(237deg, rgba(0, 0, 0, 0.2) -23.03%, rgba(0, 0, 0, 0.05) 119.63%);
  backdrop-filter: blur(60px);
  outline: solid 2px #ffffff;
  border-radius: 2.5rem;  
  text-align: center;
  justify-content: center;

  p{
    font-size: 1.25rem;
    color: white;
    white-space: pre-line
  }

  span{
    cursor: pointer;
    position: absolute;
    bottom: 1.5rem;
    right: 2.25rem;
  }

`

const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1.75rem;

  form{
    display: flex;
    justify-content: flex-end;
  }
`

const SaveButton = styled(Button)`
  display: block;
  width: 11rem;
  height: 3rem;
  padding: 0.75rem 1.5rem;
  border-radius: 1.25rem;
  position: absolute;
  font-weight: 700;
`

const FormInput = styled.input`
  position: relative;
  box-sizing: border-box;
  border-radius: 1.25rem;
  width: 30rem;
  height: 3rem;
  color: var(--font-gray-1);
  background-color: #F3F3F3;
  padding: 0.75rem 1.25rem;
  &:focus {
    outline: 1px solid #999999;
  }
  &::placeholder {
    color: var(--font-gray-1);
  }
  
`