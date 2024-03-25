import React from 'react'
import styled from 'styled-components'
import GraveStoneSrc from 'assets/img/PlayerRoom/gravestone.webp'
import UploadFrameSrc from 'assets/img/PlayerRoom/upload_frame.webp'
import Loading from './Loading'
import NoRecord from './NoRecord'
import { useGetFriendDiary } from 'hooks/useFriendRecord'

export default function Diary({email}) {
  const {data: diary, isLoading} = useGetFriendDiary(email)
  const data= [
    { id: 1, itemText: "화장 후 봉안", explain: `화장을 통해 향기로운 아름다움을 간직해볼 수 있습니다. \n \n 화장은 당신의 존재와 흔적을 살아있는 불꽃으로 옮기며, \n 당신의 애도와 사랑을 함께 전달할 수 있습니다. \n 이것은 고인을 위로하고, 그들이 향하는 곳에서 편안함과 평화를 느낄 수 있는 방법으로 알려져 있습니다. `},
    { id: 2, itemText: "화장 후 자연장", explain: `수목장 방식은 자연과 하나되어 남아있는 하나의 장례방식 인데요, \n  자연속에 둘러쌓여 푸른 잎사귀와 향기로운 꽃들로 아름답게 꾸며질 수 있습니다. \n 당신의 많은 추억들이 자연과 하나가 되어 남겨진 사람들을 향해 흘러나올 수 있는 방법입니다. `},
    { id: 3, itemText: "매장", explain: `매장 방신은 공간에서 사랑하는 이들과 함께하는 장례방법입니다. \n \n 사랑하는 사람들이 편안하고 평화로운 곳에서 쉬어갈 수 있도록 고정적인 장소를 마련해 장례를 진행하는 하나의 방식입니다. `},
  ]

  return (
    <>
      { isLoading ? <Loading />
      :
      diary ?
        <Container> 
        <TextArea>
          <MoonIcon/>
          <Text>
            <p>@{email} 님은 {data[diary.method-1].itemText}</p>
            <p>{data[diary.method-1].explain}</p>
          </Text>
        </TextArea>
        <Result>
          <GraveStone><p>{diary.epitaph}</p></GraveStone>
          <UploadBox>
            <img src={UploadFrameSrc}/>
            <img src={diary.portrait_photo} />
          </UploadBox>
        </Result>
      </Container>
      :
      <NoRecord email={email} text={"죽음준비"}/>
      }
    </>
  )
}

const Container = styled.div`
  width: 60rem;
  height: calc(100vh - 15rem); 
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  flex-shrink: 0;
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
    font-size: 1.5rem;
    margin-bottom: 0.4rem;
    font-weight: 600;
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