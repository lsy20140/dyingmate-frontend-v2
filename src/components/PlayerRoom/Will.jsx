import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { PencilIcon } from 'assets/icons';
import willPaper from 'assets/img/PlayerRoom/will_paper.webp'
import {ToastContainer} from 'react-toastify'
import { useToast } from 'hooks/useToast';
import { TOAST_MESSAGES } from 'constants/toastMessages';
import { useGetWill, useSaveWill, useUpdateWill } from 'hooks/useWill';
import Button from 'components/common/Button/Button';


export default function Will() {
  let [input, setInput] = useState('');
  const textarea = useRef();
  const {data: will} = useGetWill()
  const {mutate: saveWill} = useSaveWill()
  const {mutate: editWill} = useUpdateWill()
  const hasData = will && will.content

  const handleChange = (e) => {
    setInput(e.target.value)
    textarea.current.style.height = '42rem'
    // textarea.current.style.height = textarea.current.scrollHeight + 'px';
  }

  const handleSubmit = (e) => {   
    e.preventDefault()
    if(input === '') {
      useToast('warning', TOAST_MESSAGES.INPUT_REQUIRED)
      return 
    }
    saveWill(input)
  }

  const handleEdit = (e) => {
    e.preventDefault()
    editWill(input)
  }

  useEffect(() => {
    setInput(will && will.content)
  },[will])

  return (
    <>
      <Container>
        <TextArea>
          <PencilIcon/>
          <div>다음 질문을 통해, </div>
          <p>나의 삶에 대해 신중히 고민해보고 <br/> 유언장을 써내려가 보아요. </p>
          <p>나는 어떤 사람이었나요? <br/>
              나의 삶에서 가장 행복한 기억이 있다면 
              무엇인가요?</p>
          <p>죽기 전, 가장 떠오르는 사람은 누구인가요? </p>
        </TextArea>
        <WillContainer onSubmit={hasData ? handleEdit : handleSubmit}>
          <FormInput 
            ref={textarea}
            type={"text"}
            id='content' 
            name='content' 
            value={input ?? ''}
            onChange={handleChange}
            placeholder='내용을 입력해주세요.' 
            spellCheck="false"
            required
          />
          <StyledButton type="submit" variant={hasData ? 'light' : !input ? 'empty' : 'primary'}>{hasData ? '수정하기' : '저장하기'}</StyledButton>
        </WillContainer>
      </Container>
      <ToastContainer />
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
  padding: 3.75rem 2.5rem 2.5rem 2.5rem;
  gap: 6rem;
  color: white;
`
const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  text-align: left;
  gap: 1.5rem;
  font-size: 1.125rem;
  
  div{
    font-size: 1.5rem;
  }
`

const WillContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1.25rem;
`

const FormInput = styled.textarea`
  width: 45rem;
  height: 42rem;
  padding: 3rem 8rem;
  box-sizing: border-box;
  font-family: 'UnPilgi';
  font-size: 1.2rem;
  background-image: url(${willPaper});
  border: none;
  border-radius: 1.25rem;
  color: var(--font-gray-3);
  resize: none;

  &:focus {
    border: none;
    outline: none;
  }
  &::placeholder {
    color: var(--font-gray-1);
    font-family: 'UnPilgi';
  }
  caret-color: transparent
`

const StyledButton = styled(Button)`
  width: 8rem;
  border-radius: 1.25rem;
  padding: 0.75rem 0;
`