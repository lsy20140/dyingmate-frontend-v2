import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { MoonIcon } from 'assets/icons';
import { useDiaryContext } from 'contexts/DiaryContext';
import GraveStoneSrc from 'assets/img/PlayerRoom/gravestone.webp'
import { useGetDiary, useUpdateDiary } from 'hooks/useDiary';
import Button from 'components/common/Button/Button';

export default function StepTwo() {
  const [stoneTextInput, setStoneTextInput] = useState('');
  const [stoneText, setStoneText] = useState('')
  const {diary, setDiary} = useDiaryContext()
  const formData = new FormData()
  const {data} = useGetDiary()
  const {mutate: updateDiary} = useUpdateDiary()

  const handleChange = (e) => {
    setStoneTextInput(e.target.value)
  }

  const handleClick = () => {
    setStoneText(stoneTextInput)
    if(data && data.epitaph){
      for ( const key in data ) {
        formData.append(key, data[key]);
      }
      formData.set('epitaph', stoneTextInput)
      updateDiary(formData)
      setStoneTextInput('')
    }else{
      setDiary((diary) => ({...diary, 'epitaph': stoneTextInput}))
    }
  }

  useEffect(() => {
    if(data && data.epitaph){
      setStoneText(data && data.epitaph)
    }else{
      setStoneText(diary && diary.epitaph)
    }
  },[])

  return (
    <Content>
      <GraveStone><p>{stoneText}</p></GraveStone>
      <div>
        <TextArea>
          <MoonIcon/>
          <Text>
            <p>묘비명</p>
            <p>나의 품격과 소중함을 남겨진 사람들에게 알리는 중요한 메세지 입니다. <br/>
              당신의 이야기를 간직하고 영원히 기억할 이 묘비를 아름답게 꾸며주세요. 
            </p>
          </Text>
        </TextArea>
        <InputBox>
          <FormInput 
            type='text' 
            id='stoneText' 
            name='stoneText' 
            value={stoneTextInput ?? ''}
            placeholder='묘비명을 입력해주세요.' 
            onChange={handleChange}
            required/>
            <SaveButton variant={stoneTextInput === '' ? 'empty' : 'primary'} disabled={stoneTextInput === ''} onClick={handleClick}>확인</SaveButton>
        </InputBox>
      </div>
    </Content>
  )
}


const Content = styled.div`
  width: 60rem;
  height: 30rem;
  display: flex;
  flex-direction: row;
  gap: 3.75rem;
  margin: 0 4.25rem;
  align-items: center;
  justify-content: center;
  flex-shrink:0;

  & > div{
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 3rem;
  }
`

const GraveStone = styled.div`
  background-image: url(${GraveStoneSrc});
  width: 13rem;
  height: 20rem;
  background-repeat:no-repeat;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  font-family: Perpetua Titling MT;  
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.33125rem;

  p {
    width: 9rem;
    word-break: break-all;
    text-align: center;
  }
`

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50rem;
  width: fit-content;
  gap: 1.8rem;
`

const Text = styled.div`
  text-align: left;
  font-size: 1.125rem;
  p:nth-child(1){
    font-size: 1.25rem;
    margin-bottom: 0.4rem;
  }
`


const InputBox= styled.div`
  display: flex;
  width: 32rem;
  justify-content: flex-end;
`

const FormInput = styled.input`
  box-sizing: border-box;
  border-radius: 1.25rem;
  width: 100%;
  height: 3.5rem;
  color: var(--font-gray-1);
  background-color: #F3F3F3;
  padding: 0.75rem 1.25rem;
  &:focus {
    outline: 1px solid #999999;
  }
  &::placeholder {
    color: var(--font-gray-1);
  }
  
`

const SaveButton = styled(Button)`
  width: 8rem;
  height: 3.5rem;
  padding: 0.75rem 1.5rem;
  font-weight: 700;
  position: absolute;
`