import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components';
import {useForm, Controller} from 'react-hook-form'
import userApi from 'api/auth/user';
import { ReactComponent as HidePwdIcon } from 'assets/icons/Splash/hide_pwd_icon.svg'
import {IoMdAlert} from 'react-icons/io'
import SocialLogin from './SocialLogin';

export default function LoginForm() {
  const navigate = useNavigate()
  const [showPwd, setShowPwd] = useState()
  const [isValid, setIsValid] = useState(true)
  const {control, handleSubmit} = useForm()

  const handlePwdHide = () => {
    setShowPwd(!showPwd)
  }

  const onSubmit = async (data) => {
    const {email, pwd} = data
    const res = await userApi.userLogin(email, pwd)
    console.log(res)

    if(res.status !== 'OK'){
      setIsValid(false)
      return
    }else{
      localStorage.setItem('login-token', res.data.accessToken)
      navigate('/main')
    }
  }
  
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ValidText isError={!isValid}>
          <IoMdAlert/>
          <p>아이디/비밀번호가 틀렸습니다. 다시 입력하세요.</p>
        </ValidText>
        <Controller
          control={control}
          name="email"
          render={({field}) => (
            <>
              <FormInput
                value={field.value}
                required
                placeholder='아이디를 입력해주세요' 
                onChange={e=> field.onChange(e.target.value)}
              />
            </>            
          )}
        />
        <PasswordInput>
          <Controller 
            control={control}
            name="pwd"
            render={({field}) => (
              <FormInput 
                type={showPwd ? "text" : "password"}
                value={field.value}
                placeholder='비밀번호를 입력해주세요' 
                onChange={e=> field.onChange(e.target.value)}
                required
              />
            )}
          />
          <HidePwdIcon onClick={handlePwdHide}/>
        </PasswordInput>
        <LoginButton>로그인</LoginButton>
      </form>
      <SocialLogin />
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
