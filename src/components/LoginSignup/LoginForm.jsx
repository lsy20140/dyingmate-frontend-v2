import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components';
import { ReactComponent as GoogleIcon } from '../../assets/icons/Splash/google_icon.svg'
import { ReactComponent as KakaoIcon } from '../../assets/icons/Splash/kakao_icon.svg'
import { ReactComponent as HidePwdIcon } from '../../assets/icons/Splash/hide_pwd_icon.svg'
import {IoMdAlert} from 'react-icons/io'
import axios from 'axios'  
import { useAuthContext } from '../../contexts/AuthContext';

export default function LoginForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [showPwd, setShowPwd] = useState()
  const [isValid, setIsValid] = useState(true)
  const {user, setUser, setLogin} = useAuthContext()

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`
  const handleKakaoLogin = ()=>{
      window.location.href = kakaoURL;
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handlePwd = (e) => {
    setPwd(e.target.value)
  }


  const handleSubmit = async (e) => {
    e.preventDefault()  
    if(!isValid) {
      return
    }

    await axios.post(
      'https://dying-mate-server.link/user/login',
      {
        email: email,
        pwd: pwd  
      },
      {withCredentials: true},
    )
    .then((response) => {
      console.log(response)
      if(response.data.message !== '성공'){
        setIsValid(false)
        return;
      }
      localStorage.setItem('login-token', response.data.data.accessToken);
      setUser({...response.data.data})
    })
    .then(() => {
      setLogin(true)
      navigate('/main')
    })
    .catch(function (error) {
        // 오류발생시 실행
        console.log(error)
    })
  }

  const handlePwdHide = () => {
    setShowPwd(!showPwd)
  }
  

  return (
    <>
      <form>
        <ValidText isError={!isValid}>
          <IoMdAlert/>
          <p>아이디/비밀번호가 틀렸습니다. 다시 입력하세요.</p>
        </ValidText>
        <FormInput 
          type='text' 
          id='userId' 
          name='userId' 
          value={email ?? ''}
          placeholder='아이디를 입력해주세요' 
          onChange={handleEmail}
          required
          isError={!isValid}
          /><br/>  

        <PasswordInput>
          <FormInput 
            type={showPwd ? "text" : "password"}
            id='userPwd' 
            name='userPwd' 
            value={pwd ?? ''}
            placeholder='비밀번호를 입력해주세요' 
            onChange={handlePwd}
            required
          />
          <HidePwdIcon onClick={handlePwdHide}/>
        </PasswordInput>

        <FindInfoText>아이디 / 비밀번호를 잊으셨나요?</FindInfoText>

        <LoginButton onClick={handleSubmit}>로그인</LoginButton>
        <SocialLogin>
          <p>간편하게 로그인하기</p>
          <SocialLoginIcons>
            <GoogleIcon />
            <KakaoIcon onClick={handleKakaoLogin}/>
          </SocialLoginIcons>
        </SocialLogin>
      </form>
    </>
  )
}

// styled-components
const PasswordInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 1rem 0;
  cursor: pointer;

  svg {
    height: 100%;
    width: 1rem;
    position: absolute;
    right: 1rem;
  }

`

const FormInput = styled.input`
  box-sizing: border-box;
  border-radius: 1.25rem;
  width: 100%;
  height: 3rem;
  color: var(--font-gray-3);
  background-color: #F3F3F3;
  padding: 0.75rem 1.25rem;
  outline: ${props => props.isError && '1px solid var(--main-color)'}
  &:focus {
    outline: 1px solid #999999;
  }
  &::placeholder {
    color: var(--font-gray-1);
  }
  
`

const ValidText = styled.div` 
  display: ${props => props.isError ? 'flex': 'none'};
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: var(--main-color);
  align-items: center;

  svg {
    font-size: 1.25rem;
  }
`

const SocialLogin = styled.div`
  p {
    display: flex;
    margin-top: 2rem;
    text-align: center;
    color: white;
    margin-bottom: 1.25rem;
  }

  p:before,
  p:after {
      height: 1px;
      content: "  ";
      flex: 1 1;
      border-bottom: 1px solid white;
      margin: auto;

  }
  p:before {
    margin-right: 1.25rem;
  }

  p:after {
    margin-left: 1.25rem;

  }

`


const SocialLoginIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  svg {
    cursor: pointer;
  }
`

const FindInfoText = styled.p`
  display: flex;
  justify-content: flex-end;
  font-size: 0.9rem;
  color: white;
  font-weight: 300;
  cursor: pointer;
`


const LoginButton = styled.button`
  width: 100%;
  height: 3rem;
  border: none;
  background-color: var(--main-color);
  color: white;
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  border-radius: 20px;

`
