import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {ReactComponent as MainIcon} from '../../../assets/icons/PlayerRoom/Desktop/main_icon.svg'
import OneCommentItem from './Desktop/OneCommentItem'
import { useAuthContext } from '../../../contexts/AuthContext'
import axios from 'axios'
import { getCommentList } from '../../../apis/api/PlayerRoom/community'
import { nullWarning } from '../../ui/ToastMessage'

export default function Desktop() {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState('')
  const {token} = useAuthContext()
  const baseUrl = 'https://dying-mate-server.link'
  const [update, setUpdate] = useState(false)
  const [commentList, setCommentList] = useState([])

  const handleChange = (e) => {
    setContent(e.target.value)
  }

  const handleSubmit = (e) => {   
    if(content === '') {
      nullWarning()
      return 
    }
    axios
    .post(`${baseUrl}/community/register`, {content: content}, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true,
    })
    .then((response) => {
      console.log(response)
      setIsOpen(false)
      setContent('')
      setUpdate((prev) => !prev)
    }).catch(function (error) {
        // 오류발생시 실행
        console.log(error.message)
    })
  }

  useEffect(() => {
    getCommentList().then((res) => {
      console.log("res", res)
      setCommentList([...res.data])
    })
  },[update])

  return (
    <Overlay>
      <Container>
        <Header>
          <HeaderTitle>
            <MainIcon/>
            <p>죽음에 대해 토론해봐요!</p>
          </HeaderTitle>
          {/* <IoIosClose/> */}
        </Header>
        <ScrollSection>
          <TopicWrapper>
            <p>2023 11월 넷째주</p>
            <p>이번 주 대화 주제</p>
            <TopicBox>
              <TopicContent>"인생에서 우리가 경험하는 모든 것은 결국에는 무엇을 위한 것인지, 그리고 인생의 근본적인 의미는 어떤 것일까요? 어떤 방식으로 우리는 존재하고 경험하는 것이 의미 있는 것으로 여겨질 수 있을까요?"</TopicContent>
              <hr/>
              {isOpen && 
                <FormInput 
                type={"text"}
                id='content' 
                name='content' 
                value={content ?? ''}
                onChange={handleChange}
                placeholder='내용을 입력하세요.' 
                spellCheck="false"
                required
                />
              }
              <CommentInputWrapper>
                {!isOpen ? 
                  <OpenInputButton onClick={() => setIsOpen(true)}>
                    댓글 달기
                  </OpenInputButton>
                  :
                  <AddCommentButton disabled={content===''} isFill={content!==''} onClick={handleSubmit}>댓글 달기</AddCommentButton>
                }
              </CommentInputWrapper>
            </TopicBox>
          </TopicWrapper>
          <CommentWrapper>
            {commentList && commentList.length > 0 &&
            commentList.map(data => {
              const {commentId, profile, name, content, creationTime, likeNum} = data
              return <OneCommentItem key={commentId} commentId={commentId} profile={profile} name={name} content={content} likeCount={likeNum} date={creationTime}/>
            })  
          }
          </CommentWrapper>
        </ScrollSection>
      </Container>
    </Overlay>

  )
}

const Overlay = styled.div`
  position: absolute;
  display: flex;
  box-sizing: border-box;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Container = styled.div`
  width: 45rem;
  height: 42rem;
  background: linear-gradient(237deg, rgba(0, 0, 0, 0.2) -23.03%, rgba(0, 0, 0, 0.05) 119.63%);
  outline: 2px solid white; 
  border-radius: 2.5rem;  
  backdrop-filter: blur(60px);
  box-sizing: border-box;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2.25rem 2.25rem 0 3.75rem;  

  svg {
    color: white;
    font-size: 2.5rem;
    cursor: pointer;
  }

`

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1.3rem;

  p{
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
  }
`

const ScrollSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem 3.75rem 3.75rem 3.75rem;
  overflow: auto;
  height: calc(100% - 14rem);
`

const TopicWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  & > p:nth-child(1){
    font-size: 0.875rem;
    color: #DEDEDE;
    margin-bottom: 0.25rem;
  }

  & > p:nth-child(2){
    font-size: 1.5rem;
    font-weight: 700;
    color: #F3F3F3;
    margin-bottom: 1rem;
  }
`

const TopicBox = styled.div`
  width: 100%;
  height: fit-content;
  background-color: white;
  border-radius: 1.25rem;
  outline: 1px solid var(--main-color);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  box-sizing: border-box;
  hr{
    width: 100%;
    border-top: 1px solid rgba(0, 0, 0, 0.10);    ;
  }
  
`

const TopicContent = styled.p`
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.75rem;
  color: var(--font-gray-3);
  text-align: left;
  font-weight: 400;
`

const OpenInputButton = styled.button`
  padding: 0.5rem 1.25rem;
  background-color: var(--main-color);
  color: white;
  border-radius: 0.75rem;
  font-weight: 600;
  line-height: 1.75rem;
  border: none; 
`

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const CommentInputWrapper = styled.div`
  width: 100%;
`

const FormInput = styled.textarea`
  width: 100%;
  height: 10rem;
  padding: 1rem;
  border: none;
  outline: none;
  box-sizing: border-box;
  border-radius: 0.75rem;
  color: var(--font-gray-3);
  background-color: #f3f3f3;
  font-size: 1rem;  
  resize: none;

  &::placeholder {
    color: var(--font-gray-1);
  }
  // animation: slideDown 0.2s ease-in-out forwards;
  // transform-origin: 0%, 50%;
`

const AddCommentButton = styled.button`
  width: 100%;
  font-size: 1.25rem;
  font-weight: 500;
  background-color: ${(props) => props.isFill ? 'var(--main-color)' : '#DEDEDE'};
  color: ${(props) => props.isFill ? 'white' : '#999'};
  border-radius: 0.75rem;
  padding: 1rem 0;
  border: none;
`