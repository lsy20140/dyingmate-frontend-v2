import React from 'react'
import styled from 'styled-components'
import { ReactComponent as BubbleVector } from 'assets/img/PlayerRoom/message_bubble_vec.svg'
import NoRecord from './NoRecord'
import Loading from './Loading'
import { ChatBubbleIcon, PhoneHeaderIcon, SendMessageIcon } from 'assets/icons'
import { useGetFriendMessage } from 'hooks/useFriendRecord'
import { getCurrentTime, getDetailDate } from 'utils/getDate'
import Button from 'components/common/Button/Button'

export default function Phone({email}) {
  const {data, isLoading} = useGetFriendMessage(email)

  return (
    <>
      { isLoading ? <Loading />
      :
      data && data.message ?
      <Container>
        <PhoneWrapper>
          <Header>
            <p>{getCurrentTime()}</p>
            <PhoneHeaderIcon/>
          </Header>
          <Main>
            <p>{getDetailDate()}
            </p>
            <MessageArea>
              <Bubble>
                <p>{data.message}</p>
                <BubbleVector/>
              </Bubble>
            </MessageArea>
          </Main>
          <Footer>
            <TextAreaWrapper>
              <FormInput 
                type={"text"}
                id='message' 
                name='message' 
                value={''}
                placeholder='' 
                spellCheck="false"
                required
              />
            </TextAreaWrapper>
            <StyledButton disabled><SendMessageIcon/></StyledButton>
          </Footer>
        </PhoneWrapper>
        <TextArea>
          <ChatBubbleIcon/>
          <div>@{email} 님의 부고문자를 열람해요</div>
          <p>친구의 부고문자를 통해 남겨진 사람들에게 어떤 말을<br/>전달하고 싶었을까 생각해보아요.</p>
        </TextArea>
      </Container>
      :
      <NoRecord email={email} text={"부고문자"}/>
    }
    </>
  )
}


const Container = styled.div`
  width: 100%;
  max-width: 45rem;
  height: calc(100vh - 11rem); 
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3.3rem;
  flex-shrink: 0;
`

const PhoneWrapper = styled.div`
  min-width: 24rem;
  height: 95%;
  background-color: white;
  border-radius: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  *{
    display: block;
  }
  p{
    color: black;
    font-weight: 600;
    font-size: 0.875rem;
  }
`

const Main = styled.div`
  padding: 1.4rem;
  box-sizing: border-box;
  height: 100%;
  font-size: 0.85rem;
  display: flex;
  flex-direction: column;
  position: relative;
  p{
    color: var(--font-gray-3);
  }

`

const MessageArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;

  svg {
    position: absolute;
    right: -0.78rem;
    bottom:0;
  }
`

const Bubble = styled.div`
  background-color: var(--main-color);
  height: fit-content;
  width: 17.25rem;
  text-align: left;
  border-radius: 1.25rem;
  position: relative;
  p{
    color: white;
    padding: 1rem;
    box-sizing: border-box;
  }
`

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 1.5rem;
  font-size: 1.125rem;
  color: white;
  flex-shrink: 0;


  div{
    font-size: 1.5rem;
    font-weight: 600;
  }
  p{
    font-size: 1.125rem;
  }
`

const Footer = styled.form`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  align-items: flex-end;
`

const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;

`

const FormInput = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  border: none;
  outline: 2px solid ${(props) => props.isMaxLength ? 'var(--main-color)' : 'transparent'};
  border-radius: 1.25rem;
  color: var(--font-gray-2);
  background-color: #f3f3f3;
  resize: none;

  &:focus {
    border: none;
  }
  &::placeholder {
    color: var(--font-gray-1);
  }

`

const StyledButton = styled(Button)`
  width: 7rem;
  background-color: #FFCABA;
`

