import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components';
import {ReactComponent as GoogleIcon} from '../../assets/icons/Splash/google_icon.svg'
import {ReactComponent as KakaoIcon} from '../../assets/icons/Splash/kakao_icon.svg'
import {ReactComponent as HidePwdIcon} from '../../assets/icons/Splash/hide_pwd_icon.svg'
import axios from 'axios'  
import {GoCheckCircleFill} from 'react-icons/go'
import {IoMdAlert} from 'react-icons/io'

export default function SignUpForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [checkPwd, setCheckPwd] = useState('')
  const [showPwd, setShowPwd] = useState([])

  const [emailCheckText, setEmailCheckText ] = useState(false)
  const [pwdCheckText, setPwdCheckText ] = useState(false)

  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isPwdCorrect, setPwdCorrect] = useState(false)

  const isAllValid = isEmailValid && isPwdCorrect


  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handlePwd = (e) => {
    setPwd(e.target.value)
  }

  const handleCheckPwd = (e) => {
    const {value} = e.target
    setCheckPwd(value)
    setPwdCheckText(true)
    setPwdCorrect(false)

    if(value === pwd) {
      setPwdCorrect(true)
    }
  }

  const handleCheckEmail = () => {
    axios.get(`https://dying-mate-server.link/user/email/exists/${email}`,{}
    ) 
    .then(function (res) {
      setEmailCheckText(true)
      // 이미 존재하면 isEmailValid에 false
      setIsEmailValid(!res.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  const handleSubmit = (e) => {
    e.preventDefault()  

    axios.post(
      'https://dying-mate-server.link/user/join',
      {
        email: email,
        pwd: pwd
      },
      {withCredentials: true},
    )
    .then((res) => {
      if(!res.data){
        return;
      }
      else{
        navigate('/onboarding',{state: {isSocialLogin: false, email: email, pwd: pwd}})
      }
        
    }).catch(function (error) {
        console.log(error)
    })
  }

  const handlePwdHide = (idx) => {
    showPwd[idx] = !showPwd[idx]
    setShowPwd([...showPwd])
  }

  return (
    <>
        <EmailInputWrapper isShow={emailCheckText}>
          <FormInput 
            type='text' 
            id='email' 
            name='email' 
            value={email ?? ''}
            placeholder='아이디를 입력해주세요' 
            onChange={handleEmail}
            required
            showOutline={emailCheckText}
            />
          <EmailCheckBtn isFill={email !== ''} onClick={handleCheckEmail}>중복확인</EmailCheckBtn>
        </EmailInputWrapper>
        <ValidText isShow={emailCheckText}>
          {
            isEmailValid ? <GoCheckCircleFill /> : <IoMdAlert/>
          }
          {
            isEmailValid ? <p>사용 가능한 아이디 입니다. </p> : <p>중복된 아이디 입니다! 다시 한번 입력해주세요.</p>
          }
        </ValidText>
        <PasswordInput>
          <FormInput 
            type={showPwd[0] ? "text" : "password"}
            id='pwd' 
            name='pwd' 
            value={pwd ?? ''}
            placeholder='비밀번호를 입력해주세요' 
            onChange={handlePwd}
            required
          />
          <HidePwdIcon onClick={() => handlePwdHide(0)}/>
        </PasswordInput>

        <PasswordInput>
          <FormInput 
            type={showPwd[1] ? "text" : "password"}
            id='checkPwd' 
            name='checkPwd' 
            value={checkPwd ?? ''}
            placeholder='비밀번호를 재입력해주세요' 
            onChange={handleCheckPwd}
            required
          />
          <HidePwdIcon onClick={() => handlePwdHide(1)}/>
        </PasswordInput>
        <ValidText isShow={pwdCheckText}>
          {
            isPwdCorrect ? <GoCheckCircleFill /> : <IoMdAlert/>
          }
          {
            isPwdCorrect ? <p>비밀번호가 일치합니다. </p> : <p>비밀번호가 일치하지 않습니다! 다시 입력해주세요.</p>
          }
        </ValidText>
        <LoginButton onClick={handleSubmit} disabled={!isAllValid}>회원가입</LoginButton>
        <SocialLogin>
          <p>간편하게 로그인하기</p>
          <SocialLoginIcons>
            <GoogleIcon />
            <KakaoIcon />
          </SocialLoginIcons>
        </SocialLogin>

    </>
  )
}

// styled-components
const PasswordInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  verticle-align: middle;
  margin-bottom: 1rem;
  cursor: pointer;

  svg {
    height: 100%;
    width: 1rem;
    position: absolute;
    right: 1rem;
  }

`

const EmailInputWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  height: 3rem;
  margin-bottom: 1rem;
`

const EmailCheckBtn = styled.button`
  width: 7rem;
  padding: 0.5rem 1.5rem;
  background-color: ${props => props.isFill ? 'var(--main-color)' : 'var(--font-gray-1)'};
  color: white;
  border: none;
  border-radius: 1rem;
  flex-shrink: 0;
`

const ValidText = styled.div` 
  display: ${props => props.isShow ? 'flex' : 'none'};
  gap: 0.5rem;
  margin: -0.5rem 0 0.5rem 0;
  color: var(--main-color);
  align-items: center;

  svg {
    font-size: 1.25rem;
  }
`

const FormInput = styled.input`
  border-radius: 1.25rem;
  width: 100%;
  height: 3rem;
  color: var(--font-gray-3);
  background-color: #F3F3F3;
  padding: 0 1.25rem;

  &:focus {
    outline: 1.5px solid black;
  }
  &::placeholder {
    color: var(--font-gray-1);
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

  svg {
    cursor: pointer;
  }
`

const SocialLoginIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`

const LoginButton = styled.button`
  width: 100%;
  height: 3rem;
  border: none;
  background-color: var(--main-color);
  color: white;
  margin-top: 2rem;
  padding: 12px 0;
  border-radius: 20px;
`