import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import { SettingIcon } from 'assets/icons'
import {IoIosClose} from 'react-icons/io'
import { LuRotateCcw} from 'react-icons/lu'
import IconStyledButton from '../ui/IconStyledButton'
import UserProfile from '../ui/UserProfile'
import { useEditUsername, useGetUser } from 'hooks/useAuth'
import ResetAlertModal from './ResetAlertModal'

export default function SettingModal({showSetup, setShowSetup}) {
  const {data} = useGetUser()
  const {mutate: editUsername} = useEditUsername()
  const [input, setInput] = useState('')
  const navigate = useNavigate()
  const [alertOpen, setAlertOpen] = useState(false)

  const handleEditUsername = () => {
    editUsername(input)
  }

  const handleLogout = () => {
    navigate('/main')
    localStorage.removeItem('login-token')
  }

  useEffect(() => {
    setInput(data && data.name.toString())
  },[data, showSetup])

  return (
    <>
    {showSetup && (
      <Overlay>
        <Container>
          <Header>
            <HeaderTitle>
              <SettingIcon/>
              <p>환경설정</p>
            </HeaderTitle>
            <IoIosClose onClick={() => setShowSetup(!showSetup)}/>
          </Header>
          <ContentWrapper>
          <ProfileBox>
              <ProfileWrapper>
                <UserProfile photoNum={data.photoNum} />
              </ProfileWrapper>
              <NameWrapper>
                <p>닉네임</p>
                <NameInput 
                  onChange={(e) => setInput(e.target.value)} 
                  value={input ?? ""} />
              </NameWrapper>
              <SaveButton isFill={input !== data.name} onClick={handleEditUsername}>저장하기</SaveButton>
              <ButtonWrapper>
                <p onClick={handleLogout}>로그아웃</p>
                <p>회원탈퇴</p>
              </ButtonWrapper>
            </ProfileBox>
            <IconStyledButton 
              width={"100%"} 
              text={"초기화하기"} 
              fontSize={'1.25rem'} 
              fontWeight={500} 
              color={`var(--font-gray-3)`} 
              btnColor={"#F0EAE0"} 
              icon={<LuRotateCcw />} 
              handleOnClick={() => setAlertOpen(true)}
            />
          </ContentWrapper>
        </Container>
      </Overlay>
    )}
    {alertOpen && <ResetAlertModal setAlertOpen={setAlertOpen}/>}
    </>

  )
}

const Overlay = styled.div`
  position: absolute;
  display: flex;
  box-sizing: border-box;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Container = styled.div`
  width: 32rem;
  height: fit-content;
  background: linear-gradient(237deg, rgba(0, 0, 0, 0.2) -23.03%, rgba(0, 0, 0, 0.05) 119.63%);
  outline: 2px solid white;
  border-radius: 2.5rem;  
  backdrop-filter: blur(60px);
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2.25rem 2.25rem 0 5rem;  

  svg {
    color: white;
    font-size: 2.5rem;
  }

  svg:last-child{
    cursor: pointer;
  }

`

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1.3rem;

  p{
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
  }
`

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 3rem 5.2rem 7rem 5.2rem;
  box-sizing: border-box;
  gap: 1rem;

`

const ProfileBox = styled.div`
  background-color: #FFF9F0;
  width: 100%;
  border-radius: 0.75rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 2rem;
  box-sizing: border-box;
  gap: 0.5rem;

  & > p{
    font-weight: 700;
    color: var(--font-gray-3);
  }
`

const ProfileWrapper = styled.div`
  width: 6rem;
  height: 6rem;
`

const NameWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  p{
    color: var(--font-gray-3);
    font-size: 0.875rem;
    font-weight: 500;
  }
`

const NameInput = styled.input`
  width: 100%;
  padding: 0.69rem 1.25rem;
  color: var(--font-gray-3);
  background-color: #f3f3f3;
  outline: 0.5px solid #999;
  box-sizing: border-box;
  border-radius: 0.75rem;
`

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 2.62rem;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 150%;
  margin-top: 0.25rem;

  p{
    cursor: pointer;
    text-decoration-line: underline;
  }

  p:first-child{
    color: #EA0000;
    text-decoration-color: #EA0000;
  }
  p:last-child{
    color: var(--font-gray-3);
    text-decoration-color: var(--font-gray-3);
  }
`

const SaveButton = styled.button`
  width: 100%;
  background-color: ${props => props.isFill ? 'var(--main-color-2)' : 'var(--font-gray-1)'};
  color: white;
  font-weight: 700;
  text-align: center;
  padding: 0.75rem 0;
  border-radius: 0.75rem;
  border: none;
`