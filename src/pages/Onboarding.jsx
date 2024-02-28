import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as DialogNextIcon } from '../assets/icons/dialog_next_icon.svg'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'  
import { useLocation } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import { DiaglogArr } from '../data/onboarding'

export default function Onboarding() {
  const navigate = useNavigate()
  const [curIdx, setCurIdx] = useState(0);
  const [userName, setUserName] = useState('')
  const location = useLocation();
  const {isSocialLogin} = location.state
  const {email, pwd} = !isSocialLogin && location.state
  const {token, setToken, setLogin} = useAuthContext()
  const baseUrl = 'https://dying-mate-server.link'

  useEffect(() => {
    if(!isSocialLogin) {
      axios.post(
        `${baseUrl}/user/login`,
        {
          email: email,
          pwd: pwd  
        },
        {withCredentials: true},
      )
      .then((response) => {
        localStorage.setItem('login-token', response.data.data.accessToken);
        setToken(localStorage.getItem('login-token'));
      })
      .then(() => {
        setLogin(true)
      })
      .catch(function (error) {
          // 오류발생시 실행
        console.log(error.message)
      })
    }
  },[])
  
  const handleDiaglogBox = () => {
    setCurIdx(curIdx+1);
  }

  const handleChange = (e) => {
    setUserName(e.target.value);
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    await axios
    .post(`${baseUrl}/user/${userName}/save`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true,
    })
    .then(() => {
      navigate('/main')       
    }).catch(function (error) {
        // 오류발생시 실행
        console.log(error.message)
    })
  }

  return (
    <>
      <audio id="musicplayer" autoPlay>
        <source src="/audio/onboarding.aac" />
      </audio>
      <Container>
        <VideoWrapper>
          <video width="100%" height="100%" min-width="100%"  autoPlay muted playsInline loop>
            <source src={'/videos/onboardingVideo.mp4'} type="video/mp4" />
          </video>
        </VideoWrapper>

        <ContentBox>
          <p>{DiaglogArr[curIdx].text.toString()}</p>
          {(curIdx === 0 || curIdx === 1) &&
            <span onClick={handleDiaglogBox}>
              <DialogNextIcon/>
            </span>
          }
          { curIdx === 2 && 
          <Footer>
            <InputBox>
              <FormInput 
                type='text' 
                id='userName' 
                name='userName' 
                value={userName ?? ''}
                placeholder='이름을 입력해주세요.' 
                onChange={handleChange}
                required/>
              <Button onClick={handleOnSubmit}>저장하기</Button>
            </InputBox>
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
`

const Button = styled.button`
  display: block;
  width: 11rem;
  height: 3rem;
  border: none;
  background-color: var(--main-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 1.25rem;
  position: absolute;
  font-weight: 700;

`


const InputBox= styled.div`
  display: flex;
  justify-content: flex-end;
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