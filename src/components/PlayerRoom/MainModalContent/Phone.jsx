import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {ReactComponent as MainIcon} from '../../../assets/icons/PlayerRoom/Phone/main_icon.svg'
import {ReactComponent as IconWrapper} from '../../../assets/icons/PlayerRoom/Phone/header_wrapper.svg'
import axios from 'axios'  
import StyledButton from '../../ui/StyledButton'
import {ReactComponent as SendIcon} from '../../../assets/icons/PlayerRoom/Phone/send_icon.svg'
import { ReactComponent as BubbleVector } from '../../../assets/img/PlayerRoom/message_bubble_vec.svg'
import { useAuthContext } from '../../../contexts/AuthContext'
import {IoMdAlert} from 'react-icons/io'

export default function Phone() {
  const [inputData, setInputData] = useState('')
  const [data, setData] = useState('')
  const [isSend, setIsSend] = useState(false);
  const [isMaxLength, setIsMaxLength] = useState(false)

  const baseUrl = 'https://dying-mate-server.link'
  const {token} = useAuthContext();

  // 날짜 구하기
  const date = new Date();
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  const textarea = useRef();


  const handleChange = (e) => {
    const {value, maxLength} = e.target
    setInputData(value);
    textarea.current.style.height = textarea.current.scrollHeight + 'px';
    setIsMaxLength(value.length === maxLength)
  }

  const handleSubmit = async (e) => {
    setIsSend(true);
    setInputData('')
    setData(inputData)
    textarea.current.style.height = '4rem'
    setIsMaxLength(false)
    axios.post(`${baseUrl}/message/send`, {message: inputData}, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true,
    })
    .then((response) => {
      console.log(response)        
    }).catch(function (error) {
        // 오류발생시 실행
        console.log(error.message)  
    })
  }

  useEffect(() => {
    axios.get(`${baseUrl}/message/load`, {
      headers: {Authorization: 'Bearer ' + token},
    }, )
    .then(function (response) {
      setData(response.data.data.message)    
    })
    .catch(function (error) {
      console.log(error);
    });
 
  },[])


  return (
    <>
      <Container>
        <PhoneWrapper>
          <Header>
            <p>{date.getHours()}:{String(date.getMinutes()).padStart(2, "0")}</p>
            <IconWrapper/>
          </Header>
          <Main>
            <p>부고문자는 한번만 작성할 수 있으니 신중하게 작성해야 합니다. <br/>
              {date.getMonth()+1}월 {date.getDate()}일 ({week[date.getDay()]}) {date.getHours()}:{String(date.getMinutes()).padStart(2, "0")}
            </p>
            {(isSend || data.length>0) && 
            <MessageArea>
              <Bubble>
                <p>{data}</p>
                <BubbleVector/>
              </Bubble>
            </MessageArea>
            }

          </Main>
          <Footer method='POST'>
            <TextAreaWrapper>
              {isMaxLength && 
                <ValidText>
                  <IoMdAlert/>
                  <p>200자까지만 작성 가능합니다.</p>
                </ValidText>
              }

              <FormInput 
                ref={textarea}
                type={"text"}
                id='message' 
                name='message' 
                value={inputData ?? ''}
                onChange={handleChange}
                placeholder='부고 문자에 들어갈 내용을 작성해주세요.' 
                spellCheck="false"
                required
                maxLength={200}
                isMaxLength={isMaxLength}
              />

            </TextAreaWrapper>

            <StyledButton width={'7rem'} handleOnClick={handleSubmit} text={<SendIcon/>} btnColor={`var(--main-color)`} />
          </Footer>
        </PhoneWrapper>
        <TextArea>
          <MainIcon/>
          <div>부고 문자를 작성해요</div>
          <p>나의 죽음을 어떻게 전해야 할 지 나의 주변인들을 <br/> 생각하면서 신중하게 고민해보세요.  </p>
          <p>실제 부고 문자 작성 에서는 상주, 고인과의 관계, 장례식장,<br/> 발인 일시 등이 들어가야 해요.</p>
          <p>나만의 특별한 부고 문자를 작성해 전달해도 좋아요.</p>
        </TextArea>
      </Container>
    </>
  )
}

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 11rem); 
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 2.5rem;  
  padding: 2.5rem 2.5rem 0 2.5rem;
  gap: 6rem;

`

const PhoneWrapper = styled.div`
  width: 24rem;
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
    word-break: break-all;
  }
`

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  text-align: left;
  gap: 1.5rem;
  font-size: 1.125rem;
  color: white;

  div{
    font-size: 1.5rem;
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

const ValidText = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: var(--main-color);
  font-size: 0.875rem;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
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

