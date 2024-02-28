import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import {ReactComponent as MainIcon} from '../../../../assets/icons/PlayerRoom/Diary/main_icon.svg'
import UploadFrameSrc from '../../../../assets/img/PlayerRoom/upload_frame.png'
import { useDiaryContext } from '../../../../contexts/DiaryContext'
import {FiFolderPlus} from 'react-icons/fi'
import { useAuthContext } from '../../../../contexts/AuthContext'
import axios from 'axios'
import { editSuccess } from '../../../ui/ToastMessage'

export default function StepThree({photo}) {
  const fileInput = useRef(null)
  const [selectImg, setSelectImg] = useState()
  const {diary, setDiary} = useDiaryContext()
  const {token} = useAuthContext()
  const baseUrl = 'https://dying-mate-server.link'
  const formData = new FormData()

  const handleChange = async (e) => {
    const {name, files} = e.target;

    if(name === 'file') {
      setSelectImg(files && files[0]);
      setDiary((data) => ({...data, 'portrait_photo': files[0]}))
      return;
    }

    if(photo){
      formData.append('portrait_photo', files[0])
      formData.append('_method', 'PATCH');

      axios
      .post(`${baseUrl}/funeral/modify`, formData, {
        headers: {
          'Content-Type' : 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res)
        editSuccess()
          
      }).catch(function (error) {
          // 오류발생시 실행
          console.log(error)
      })
    }
  };

  useEffect(() => {
    setSelectImg(photo)
  },[])

  return (
    <Content>
      <UploadBox>
        <img src={UploadFrameSrc}/>
        {selectImg ? 
          <img src={selectImg && URL.createObjectURL(selectImg) } />
          :
          <SelectFileBox>
            <FiFolderPlus/>
          </SelectFileBox>
        }
        
        <input type="file" name='file' ref={fileInput} accept='.png, .jpg,image/*' onChange={handleChange}/>
      </UploadBox>
      <TextArea>
        <MainIcon/>
        <Text>
          <p>영정사진은, </p>
          <p>나의 품격과 소중함을 남겨진 사람들에게 알리는 중요한 메세지 입니다. <br/>
              당신의 이야기를 간직하고 영원히 기억할 이 묘비를 아름답게 꾸며주세요. 
          </p>
        </Text>
      </TextArea>
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
`

const UploadBox = styled.div`
  width: 15rem;
  height: 20rem;
  background-repeat:no-repeat;
  align-items: center;
  justify-content: center;
  display: flex;
  position: relative;
  img:nth-child(1){
    position: absolute;
    width: 14.4375rem;
    height: 20rem;
  }
  img:nth-child(2){
    position: absolute;
    width: 10.8rem;
    height: 16.5rem;
    border-radius: 0.25rem;
  }

  input[type="file"] {
    width: 10rem;
    height: 100%;
    position: absolute;
    padding: 0;
    overflow: hidden;
    border: 0;
    z-index: 999;
    opacity: 0;
    cursor: pointer;
  }
`

const SelectFileBox = styled.div`
  position: absolute;
  width: 10.8rem;
  height: 16.5rem;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    color: #CCC;
    width: 2.25rem;
    height: 2.25rem;
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