import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {ReactComponent as MainIcon} from '../../../../assets/icons/PlayerRoom/Diary/main_icon.svg'
import MethodItem from '../../../Diary/MethodItem'
import MethodExplain from '../../../Diary/MethodExplain';
import { useDiaryContext } from '../../../../contexts/DiaryContext';
import axios from 'axios'
import { useAuthContext } from '../../../../contexts/AuthContext';
import { editSuccess } from '../../../ui/ToastMessage';

export default function StepOne({method}) {
  const {diary, setDiary} = useDiaryContext()
  const [curIdx, setCurIdx] = useState();
  const {token} = useAuthContext()
  const baseUrl = 'https://dying-mate-server.link'
  const formData = new FormData()

  const data= [
    { id: 1, itemText: "화장 후 봉안", explain: `화장을 통해 향기로운 아름다움을 간직해볼 수 있습니다. \n \n 화장은 당신의 존재와 흔적을 살아있는 불꽃으로 옮기며, \n 당신의 애도와 사랑을 함께 전달할 수 있습니다. \n 이것은 고인을 위로하고, 그들이 향하는 곳에서 편안함과 평화를 느낄 수 있는 방법으로 알려져 있습니다. `},
    { id: 2, itemText: "화장 후 자연장", explain: `수목장 방식은 자연과 하나되어 남아있는 하나의 장례방식 인데요, \n  자연속에 둘러쌓여 푸른 잎사귀와 향기로운 꽃들로 아름답게 꾸며질 수 있습니다. \n 당신의 많은 추억들이 자연과 하나가 되어 남겨진 사람들을 향해 흘러나올 수 있는 방법입니다. `},
    { id: 3, itemText: "매장", explain: `매장 방신은 공간에서 사랑하는 이들과 함께하는 장례방법입니다. \n \n 사랑하는 사람들이 편안하고 평화로운 곳에서 쉬어갈 수 있도록 고정적인 장소를 마련해 장례를 진행하는 하나의 방식입니다. `},
  ]

  useEffect(() => {
    setCurIdx(method ? method : 1)
  },[])

  useEffect(() => {
    setDiary((data) => ({...data, 'method': curIdx}))
    if(method){
      formData.append('method', curIdx)
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

  },[curIdx])


  return (
    <Content>
      <TextArea>
        <MainIcon/>
        <Text>
          <p>장례방식은,</p>
          <p>당신의 존재와 가치를 빛내는 소중한 결정입니다.<br/>
            당신의 흔적을 남길 장례방식을 고민하며, 감정과 세심함을 담아 정해보세요. 
          </p>
        </Text>
      </TextArea>
      <Main>
        <ul>
          {
            data && data.map((item, i) => (
              <MethodItem isSelected={(curIdx === i+1) ? true: false} handleOnClick={() => setCurIdx(i+1)} itemText={item.itemText} />
            ))
          }
        </ul>
        <MethodExplain explain={curIdx && data[curIdx-1].explain} />
      </Main>
    </Content>

  )
}

const Content = styled.div`
  width: 60rem;
  height: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 4.25rem;
  flex-shrink: 0;

`

const TextArea = styled.div`
  display: flex;
  width: 100%;
  gap: 1.8rem;
  margin-bottom: 3.75rem;
`

const Text = styled.div`
  flex-direction: column;
  text-align: left;
  gap: 0.75rem;
  font-size: 0.9rem;
  p:nth-child(1){
    font-size: 1.25rem;
  }

`

const Main = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  ul {
    flex: 60%;
  }
`