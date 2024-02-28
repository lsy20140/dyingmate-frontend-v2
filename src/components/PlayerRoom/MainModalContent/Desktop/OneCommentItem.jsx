import React, { useState } from 'react'
import styled from 'styled-components'
import {AiOutlineLike, AiTwotoneLike} from 'react-icons/ai'
import UserProfile from '../../../ui/UserProfile'

export default function OneCommentItem({name, profile, content, likeCount, date}) {  
  const [isClicked, setIsClicked] = useState() 
  const [count, setCount] = useState(likeCount)
  const handleLikeCount = () => {
    setIsClicked(!isClicked)
    setCount(isClicked ? count-1 : count+1);  
    // likecount api 연동
    //
  }

  return (
    <>
      <CommentItem>
        <WriterInfo>
          <ProfileWrapper>
            <UserProfile photoNum={profile} />
          </ProfileWrapper>
          <p>{name}</p>
        </WriterInfo>
        <MainContent>
          <p>{content}</p>
        </MainContent>
        <Footer>
          <Like>
            {isClicked ? <AiTwotoneLike color={'var(--main-color)'} onClick={handleLikeCount}/> :<AiOutlineLike onClick={handleLikeCount}/>}
            <p>{count}개</p>
          </Like>
          <p>{date} 작성됨</p>
        </Footer>
      </CommentItem>
    </>
  )
}

const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ProfileWrapper = styled.div`
  width: 2rem;
  height: 2rem;
`

const WriterInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  p{
    font-size: 1.125rem;
    font-weight: 700;
    color: #f3f3f3;
  }
`

const MainContent = styled.p`
  text-align: left;
  font-weight: 500;
  color: white;
  line-height: 150%;

`

const Footer = styled.div`
  display: flex;
  align-items: center;  
  gap: 1rem;
  font-size: 0.875rem;
  color: #dedede;
`

const Like = styled.div`
  display: flex;
  gap: 0.5rem;

  svg{
    width: 1.25rem;
    height: 1.25rem;
    cursor: pointer;
  }
`