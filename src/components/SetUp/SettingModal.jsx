import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import { SettingBtnIcon } from 'assets/icons'
import {IoIosClose} from 'react-icons/io'
import {LuPencilLine, LuLogIn, LuRotateCcw} from 'react-icons/lu'
import IconStyledButton from '../ui/IconStyledButton'
import UserProfile from '../ui/UserProfile'
import { useGetUser } from 'hooks/useAuth'

export default function SettingModal({showSetup, setShowSetup}) {
  const {data, isSuccess} = useGetUser()
  const {name, photoNum} = data.data
  const [input, setInput] = useState(name && name)

  // const handleChangeName = () => {

  // }

  // const handleLogout = () => {

  // }

  return (
    <>
    {showSetup && (
      <Overlay>
        <Container>
          <Header>
            <HeaderTitle>
              <SettingBtnIcon/>
              <p>환경설정</p>
            </HeaderTitle>
            <IoIosClose onClick={() => setShowSetup(!showSetup)}/>
          </Header>
          <ContentWrapper>
          <ProfileBox>
              <ProfileWrapper>
                <UserProfile photoNum={photoNum} />
              </ProfileWrapper>
              <NameWrapper>
                <p>닉네임</p>
                <NameInput 
                  onChange={(e) => setInput(e.target.value)} 
                  value={input ?? ""} />
              </NameWrapper>
              <SaveButton isFill={input !== name} onClick={handleChangeName}>저장하기</SaveButton>
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
              handleOnClick={() => setOpen(true)}
            />
          </ContentWrapper>
        </Container>
      </Overlay>
    )}
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
  height: 44rem;
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
  gap: 3.75rem;

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
  
  button{
    margin-top: 0.5rem;
  }
`

const ProfileWrapper = styled.div`
  width: 6rem;
  height: 6rem;
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
`