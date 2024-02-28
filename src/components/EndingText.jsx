import React from 'react'
import styled from 'styled-components'

export default function EndingText() {
  return (
    <>
      <TextWrapper>
        <p>
          모든 웰다잉 경험이 끝이 났습니다.
        </p> 
        <br/>
        <p>
          여러분의 소중한 이야기들은 웰다잉 하우스를 빛내주었어요. <br/>
          웰다잉 하우스에서의 경험은 어떠셨나요?  <br/><br/>
          좋은 죽음 준비는 좋은 삶을 살아가게 해주는 원동력이 될 수 있습니다.<br/>
          언제나 충실한 오늘을 살아가며 하루하루 의미있게 살아가는 당신이 되길 바랄게요.<br/><br/>
          이제 여러분의 빛나는 인생을 살아가세요!
        </p>
      </TextWrapper>
    </>
  )
}

const TextWrapper = styled.div`
  position: absolute;
  top: 8rem;
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  animation: fadeIn 3s;

  p{
    font-size: 1.25rem;
    color: white;
    letter-spacing: 0.01rem;
    white-space: pre-line;
    flex-shrink: 0;
  }

  p:first-child{
    font-size: 1.5rem;
    font-weight: 700;
  }
`