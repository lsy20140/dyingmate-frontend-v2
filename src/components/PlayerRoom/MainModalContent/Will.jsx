import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {ReactComponent as MainIcon} from '../../../assets/icons/PlayerRoom/Will/main_icon.svg'
import willPaper from '../../../assets/img/PlayerRoom/will_paper.png'
import StyledButton from '../../ui/StyledButton';
import axios from 'axios'  
import { useAuthContext } from '../../../contexts/AuthContext';
import {ToastContainer} from 'react-toastify'
import { editSuccess, nullWarning, saveSuccess } from '../../ui/ToastMessage';


export default function Will() {
  let [inputData, setInputData] = useState('');
  const [data, setData] = useState('')
  const hasData = data && (data !== '')
  const {token} = useAuthContext();
  const textarea = useRef();

  const baseUrl = 'https://dying-mate-server.link'

  const handleChange = (e) => {
    setInputData(e.target.value)
    textarea.current.style.height = '42rem'
    // textarea.current.style.height = textarea.current.scrollHeight + 'px';
  }

  const handleSubmit = (e) => {   
    if(inputData === '') {
      nullWarning()
      return 
    }
    axios
    .post(`${baseUrl}/will/write`, {content: inputData}, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true,
    })
    .then((response) => {
      console.log(response)
      saveSuccess()
    }).catch(function (error) {
        // 오류발생시 실행
        console.log(error.message)
    })
  }

  const handleEdit = (e) => {
    axios.patch(
      `${baseUrl}/will/modify`, 
      {content: inputData}, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true,
      })
    .then((response) => {
      console.log(response)
      editSuccess()
        
    }).catch(function (error) {
        // 오류발생시 실행
        console.log(error.message)
    })
  }

  useEffect(() => {
    axios.get(`${baseUrl}/will/load`, {
      headers: {Authorization: 'Bearer ' + token},
    }, )
    .then(function (response) {
      setInputData(response.data.data.content ?? '')
      setData(response.data.data.content ?? '')
    })
    .catch(function (error) {
      console.log(error);
    });
  },[])

  return (
    <>
      <Container>
        <TextArea>
          <MainIcon/>
          <div>다음 질문을 통해, </div>
          <p>나의 삶에 대해 신중히 고민해보고 <br/> 유언장을 써내려가 보아요. </p>
          <p>나는 어떤 사람이었나요? <br/>
              나의 삶에서 가장 행복한 기억이 있다면 
              무엇인가요?</p>
          <p>죽기 전, 가장 떠오르는 사람은 누구인가요? </p>
        </TextArea>
        {/* form 태그에 onSubmit 추가 */}
        <WillContainer method='POST'>
          <FormInput 
            ref={textarea}
            type={"text"}
            id='content' 
            name='content' 
            value={inputData ?? ''}
            onChange={handleChange}
            placeholder='내용을 입력해주세요.' 
            spellCheck="false"
            required
          />
          { hasData ?
            <StyledButton width={'8rem'} handleOnClick={handleEdit} text={"수정하기"} textColor={`var(--font-gray-3)`} btnColor={'#F0EAE0'} />
            :
            <StyledButton type="submit" width={'8rem'} handleOnClick={handleSubmit} text={"저장하기"} textColor={'white'} btnColor={`var(--main-color)`} />
          }
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