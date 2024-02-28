import React, { useEffect } from 'react'
import styled from 'styled-components'
import {ReactComponent as MainIcon} from '../../../../assets/icons/PlayerRoom/Diary/main_icon.svg'
import axios from 'axios'  
import { useAuthContext } from '../../../../contexts/AuthContext'
import { useDiaryContext } from '../../../../contexts/DiaryContext'
import { saveSuccess } from '../../../ui/ToastMessage'
import GraveStoneSrc from '../../../../assets/img/PlayerRoom/gravestone.png'
import UploadFrameSrc from '../../../../assets/img/PlayerRoom/upload_frame.png'

export default function StepFinal() {
  const formData = new FormData()
  const {token} = useAuthContext()
  const {diary} = useDiaryContext()
  const baseUrl = 'https://dying-mate-server.link'

  useEffect(() => {
    for ( const key in diary ) {
      formData.append(key, diary[key]);
    }
    axios
    .post(`${baseUrl}/funeral/save`, formData, {
      headers: {
        'Content-Type' : 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      console.log(res)
      saveSuccess()
        
    }).catch(function (error) {
        // 오류발생시 실행
        console.log(error.message)
    })
  },[])

  return (
    <Content>
      <TextArea>
        <MainIcon/>
        <Text>
          <p>나의 죽음이 모두 준비되었어요.</p>
          <p>직접 작성한 묘비명과 영정사진을 확인하고 나의 죽음에 대해 <br/>
            고민해보는 시간을 가져보아요. 현재 삶에 대한 미련은 없는지,<br/>
            죽음이 당장 나에게 다가온다면 어떤 기분일지에 대해 깊게 고민할 수 있을 거예요.<br/>
          </p>
        </Text>
      </TextArea>
      <Result>
        <GraveStone><p>{diary.epitaph}</p></GraveStone>
        <UploadBox>
          <img src={UploadFrameSrc}/>
          <img src={diary && URL.createObjectURL(diary.portrait_photo) } />
        </UploadBox>
      </Result>


    </Content>
  )
}

const Content = styled.div`
  width: 60rem;
  height: 30rem;
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  margin: 0 4.25rem;
  align-items: center;
  justify-content: center;
`

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 55rem;
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

const Result = styled.div`
  display: flex;
  width: 20rem;
`

const GraveStone = styled.div`
  background-image: url(${GraveStoneSrc});
  width: 13rem;
  height: 20rem;
  background-repeat:no-repeat;
  flex-shrink: 0;
  display: flex;
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

const UploadBox = styled.div`
  background-repeat:no-repeat;
  align-items: center;
  justify-content: center;
  display: flex;
  position: relative;
  transform: rotate( -5deg ) translate(-30%, 20%) scale(0.8);

  img:nth-child(2){
    position: absolute;
    width: 10.8rem;
    height: 15rem;
    border-radius: 0.25rem;
  }
`