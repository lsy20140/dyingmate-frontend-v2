import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import {useForm, Controller} from 'react-hook-form'
import { ReactComponent as BubbleVector } from 'assets/img/PlayerRoom/message_bubble_vec.svg'
import { ChatBubbleIcon, PhoneHeaderIcon, SendMessageIcon } from 'assets/icons'
import {IoMdAlert} from 'react-icons/io'
import { useGetMessage, useSaveMessage } from 'hooks/useMessage'
import { getCurrentTime, getDetailDate } from 'utils/getDate'
import Button from 'components/common/Button/Button'
import { FORM_RESPONSES } from 'constants/formMessages'

export default function Phone() {
  const textarea = useRef();
  const {control, handleSubmit} = useForm()
  const [isSend, setIsSend] = useState(false);
  const {data} = useGetMessage()
  const {mutate: sendMessage} = useSaveMessage()

  const handleResizeHeight = () => {
    if(textarea){
      textarea.current.style.height = 'auto';
      textarea.current.style.height = textarea.current.scrollHeight + "px";
    }
  }

  const onSubmit = async (data) => {
    setIsSend(true);
    sendMessage(data.message)
  }

  return (
    <>
      <Container>
        <PhoneWrapper>
          <Header>
            <p>{getCurrentTime()}</p>
            <PhoneHeaderIcon/>
          </Header>
          <Main>
            <p>부고문자는 한번만 작성할 수 있으니 신중하게 작성해야 합니다. <br/>
              {getDetailDate()}
            </p>
            {(isSend || (data && data.message.length>0)) && 
              <MessageArea>
                <Bubble>
                  <p>{data && data.message}</p>
                  <BubbleVector/>
                </Bubble>
              </MessageArea>
            }

          </Main>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                control={control}
                name="message"
                render={({field}) => (
                  <>
                    {field.value && field.value.length >=200 &&
                      <ValidText>
                        <IoMdAlert/>
                        <p>{FORM_RESPONSES.MAX_200_LENGTH}</p>
                      </ValidText>
                    }
                    <InputWrapper>
                      <FormInput
                        ref={textarea}
                        value={isSend ? '' : field.value}
                        placeholder='부고 문자에 들어갈 내용을 작성해주세요.'
                        maxLength={200}
                        spellCheck='false'
                        onKeyDown={handleResizeHeight}
                        onKeyUp={handleResizeHeight}
                        isMaxLength={field.value && field.value.length>=200}
                        onChange={e=> {field.onChange(e.target.value); textarea.current.style.height = textarea.current.scrollHeight + 'px';}} 
                      />
                      <SendButton type='submit' variant={field.value ? 'primary' : 'empty'} disabled={!field.value || !data}><SendMessageIcon/></SendButton>
                    </InputWrapper>
                  </>
                )}
              />
          </form>
        </PhoneWrapper>
        <TextArea>
          <ChatBubbleIcon/>
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

  form{
    padding: 1rem;
  }
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

const InputWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.25rem;
  align-items: flex-end;
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
  height: fit-content;
  min-height: 4rem;
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

const SendButton = styled(Button)`
  width: 7rem;
  padding: 0.75rem 0;
`