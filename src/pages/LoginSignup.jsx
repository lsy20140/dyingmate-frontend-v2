import React, { useState } from 'react'
import LoginForm from '../components/LoginSignup/LoginForm'
import SignUpForm from '../components/LoginSignup/SignUpForm'
import styled from 'styled-components'

export default function LoginSignup() {
  const [curIdx, setCurIdx] = useState(0)

  const tabArr = [
    { tabName: '로그인'},
    { tabName: '회원가입'},
  ]

  const handleSelectTab = (idx) => {
    setCurIdx(idx);
  }

  return (
    <Container>
      <FormBox>
        <TabWrapper>
          {tabArr.map((tab, idx) => (
            <li key={idx} className={`tabMenu ${idx === curIdx ? "selected" : ""}` }
              onClick={() => handleSelectTab(idx)}>{tab.tabName}</li>
          ))}
        </TabWrapper>
        {curIdx === 0 ? (
          <LoginForm />
        ) : <SignUpForm/>}
      </FormBox>
    </Container>
  )
}

// styled-components
const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`

const FormBox = styled.div`
  width: 30rem;
  height: fit-content;
  padding: 4rem 3.5rem;
  background: linear-gradient(237deg, rgba(0, 0, 0, 0.2) -23.03%, rgba(0, 0, 0, 0.05) 119.63%);
  outline: solid 2px white;
  border-radius: 2.5rem;  
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  backdrop-filter: blur(60px);
  label{
    margin-left: 1rem;
  }
  opacity: 0;
  animation: fadeIn 1.5s 1.5s ease-in-out;
  animation-fill-mode: forwards;
`;

const TabWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
  li {
    cursor: pointer;
    padding: 0px 6px;
    color: #DEDEDE;
    font-size: 1.25rem;
  }

  li.selected{
    font-weight: 500;
    border-bottom: 2px solid var(--main-color);
    color: white;
  }
`;


