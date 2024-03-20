import React from 'react'
import styled from 'styled-components'
import { GoogleIcon, KakaoIcon } from 'assets/icons'

export default function SocialLogin() {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`
  const handleKakaoLogin = ()=>{
      window.location.href = kakaoURL;
  }

  return (
    <SocialLoginBox>
      <p>간편하게 로그인하기</p>
      <SocialLoginIcons>
        <GoogleIcon />
        <KakaoIcon onClick={handleKakaoLogin} />
      </SocialLoginIcons>
    </SocialLoginBox>
  )
}

const SocialLoginBox = styled.div`
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