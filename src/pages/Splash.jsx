import React from 'react'
import styled from 'styled-components'
import {ReactComponent as Logo} from 'assets/img/logo.svg'
import splashBg from 'assets/img/splash.webp'
import LoginSignup from './LoginSignup'

export default function Splash() {
  return (
    <>
      <audio id="musicplayer" autoPlay>
        <source src="/audio/splash.mp3" />
      </audio>
      <SplashContainer>
        <ContentBox>
          <Description>
            <Logo/>
            <p>다잉메이트에 방문하신 걸 환영합니다!<br/>
              웰다잉하우스에서 다잉메이트들을 만나<br/>
              당신만의 특별한 웰다잉을 경험하고 설계해보세요.</p>
          </Description>
          <LoginSignup/>
        </ContentBox>
      </SplashContainer>
    </>
  )
}

const SplashContainer = styled.div`
  width: fit-content;
  height: 100%;
  background-image: url(${splashBg});
  background-size: cover;
  display: flex;
  justify-content: center;
  
  @media all and (min-width:768px) {
    width: 100%;
  }

`
const ContentBox = styled.div`  
  display: flex;
  gap: 18rem;
  margin: 0 auto;
`

const Description = styled.div`
  transform: translateX(75%);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;  

  svg{
    animation: fadeIn 2s, fadeInDown 1.5s 1s ease-in-out;
    animation-fill-mode: forwards;
  }
  p{
    transform: translateX(-50%);
    will-change: transform;
    opacity: 0;
    color: white;
    font-size: 1.25rem;
    line-height: 2;
    animation: fadeIn 2s 1.5s; 
    animation-fill-mode: forwards;
  }
`


