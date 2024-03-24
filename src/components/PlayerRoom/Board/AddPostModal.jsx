import React, { useState } from 'react'
import styled from 'styled-components'
import {IoIosClose} from 'react-icons/io'
import {PiImageSquareBold} from 'react-icons/pi'
import { getRandomXPos, getRandomYPos } from 'utils/generateRandomPosition'
import { useAddFileBucketlist, useAddTextBucketlist } from 'hooks/useBucketlist'
import Button from 'components/common/Button/Button'

export default function AddPostModal({isImagePost, setOpenModal}) {
  const [post, setPost] = useState({})
  const [photo, setPhoto] = useState()
  const formData = new FormData()

  const {mutate: addFileBucketlist} = useAddFileBucketlist()
  const {mutate: addTextBucketlist} = useAddTextBucketlist()

  const handleChange = (e) => {
    const {name, value, files} = e.target

    if(name === 'photo') {
      setPhoto(files && files[0])
      setPost((post) => ({...post, 'photo': files[0]}))
      return
    }
    setPost((post) => ({...post, 'content': value, 'memoX': getRandomXPos(), 'memoY': getRandomYPos()}))
  }

  const handleFileSubmit = () => {
    for ( const key in post ) {
      formData.append(key, post[key]);
    }
    addFileBucketlist(formData)
    setOpenModal(false)
  }

  const handleContentSubmit = () => {
    addTextBucketlist(post)
    setOpenModal(false)
  }

  return (
    <>
      <Overlay>
        <ModalContainer>
          <CloseHeader>
            <IoIosClose onClick={() => setOpenModal()}/>
          </CloseHeader>  
          <Wrapper>
            <Header>
              <p>버킷리스트 내용을 작성하세요.</p>
              <p>해야하는 목록에 대한 내용을 작성하고 보드에 붙여보세요.</p>
            </Header>
            <Main onSubmit={isImagePost ? handleFileSubmit : handleContentSubmit}>
              <FormInput 
                type={"text"}
                id='content' 
                name='content' 
                value={post.content ?? ''}
                onChange={handleChange}
                placeholder='내용을 입력하세요.' 
                spellCheck="false"
                required
              />
              <ButtonWrapper>
                {photo &&
                  <PhotoNameBox>
                    <PiImageSquareBold/>
                    <p>{photo.name}</p>
                  </PhotoNameBox>
                }
                {isImagePost && 
                  <UploadButton variant='secondary'>
                    <p>+ 파일 추가하기</p>
                    <input type="file" name='photo' accept='.png, .jpg,image/*' onChange={handleChange}/>
                  </UploadButton>
                }
                <SubmitButton type='submit' variant='primary'>생성하기</SubmitButton>
              </ButtonWrapper>
            </Main>
          </Wrapper>
        </ModalContainer>
      </Overlay>
    </>
  )
}


const Overlay = styled.div`
  position: absolute;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  z-index:999;
`

const ModalContainer = styled.div`
  width: 40%;
  height: fit-content;
  outline: 2px solid white;
  filter: drop-shadow(0px 4px 45px rgba(0, 0, 0, 0.10));
  background: linear-gradient(237deg, rgba(0, 0, 0, 0.2) -23.03%, rgba(0, 0, 0, 0.05) 119.63%);
  backdrop-filter: blur(60px);
  border-radius: 2.5rem;
`

const CloseHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1.75rem 2.25rem 0 2.25rem;  

  svg {
    color: white;
    font-size: 2rem;
    cursor: pointer;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const Header = styled.div`
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  p:first-child {
    font-size: 1.5rem;
    font-weight: 600;
  }

  p:last-child {
    font-size: 1.25rem;
    font-weight: 400;
  }
`

const Main = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 2rem 3.75rem 2rem;
  gap: 1rem;
`

const FormInput = styled.textarea`
  width: 100%;
  height: 8rem;
  box-sizing: border-box;
  padding: 1rem;
  outline: none;
  border-radius: 0.75rem;
  color: var(--font-gray-3);
  background-color: #f3f3f3;
  font-size: 1rem;  

  &::placeholder {
    color: var(--font-gray-1);
  }

`
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const PhotoNameBox = styled.div`
  width: 100%;
  background-color: #CCC;
  border-radius: 0.75rem;
  padding: 1.25rem 1.88rem;
  display: flex;
  color: #666;
  font-weight: 500;
  font-size: 1.25rem;  
  box-sizing: border-box;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`

const UploadButton = styled(Button)`
  height: 3.75rem;
  padding: 0.75rem 0;
  font-size: 1.25rem; 
  justify-content: center;
  display: flex;
  align-items: center;
  position: relative;

  input[type="file"] {
    width: 100%;
    position: absolute; 
    padding: 0;
    overflow: hidden;
    border: 0;
    z-index: 999;
    opacity: 0;
    cursor: pointer;
  }
`

const SubmitButton = styled(Button)`
  font-weight: 700;
  font-size: 1.25rem;
  padding: 0.75rem;
  border-radius: 0.75rem;
`