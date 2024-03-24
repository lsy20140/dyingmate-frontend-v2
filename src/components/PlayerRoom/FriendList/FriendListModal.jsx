import React, { useState } from 'react'
import styled from 'styled-components'
import { FriendIcon } from 'assets/icons'
import {IoIosClose} from 'react-icons/io'
import OneFriendItem from './OneFriendItem'
import OneRequestItem from './OneRequestItem'
import OneSearchItem from './OneSearchItem'
import { useAcceptFriend, useGetFriendList, useGetSearchUsers, useRefuseFriend, useRequestFriend } from 'hooks/useFriend'
import ModalOverlay from 'components/FriendRecord/ModalOverlay'


export default function FriendListModal({setFriendListModal}) {
  const [searchInput, setSearchInput] = useState('')  
  const [open, setOpen] = useState(false)
  const [friendId, setFriendId] = useState('')
  const [filtered, setFiltered] = useState([])

  const {data: friends} = useGetFriendList()
  const {data: users} = useGetSearchUsers()
  const {mutate: requestFriend} = useRequestFriend()
  const {mutate: acceptRequest} = useAcceptFriend()
  const {mutate: refuseRequest} = useRefuseFriend()


  const handleOnChange = (e) => {
    setSearchInput(e.target.value)
  }

  const getFiltered = () => {
    if(users) {
      setFiltered(users.filter((item) => {
        if(searchInput !== '' && item.friendEmail && item.friendEmail.toLowerCase().includes(searchInput.toLowerCase())){ 
          return item
        }
      }))
      console.log(filtered)
    }
  }

  const handleAddFriend = async (friendEmail, friendName, friendProfile) => {
    await requestFriend({
      "friendEmail": friendEmail,
      "friendName": friendName,
      "friendProfile": friendProfile,
    })
    setSearchInput('')
  }

  const handleAcceptFriend = (acceptEmail) => {
    acceptRequest(acceptEmail)
  }

  const handleRefuseFriend = (refuseEmail) => {
    refuseRequest(refuseEmail)
  }

  return (
    <>
      <Overlay>
      <Container>
        <Header>
          <HeaderTitle>
            <FriendIcon/>
            <p>친구 목록</p>
          </HeaderTitle>
          <IoIosClose onClick={() => setFriendListModal()}/>
        </Header>  
        <SearchContainer>
          <InputWrapper>
            <SearchInput onChange={handleOnChange} onKeyDown={getFiltered} onKeyUp={getFiltered} placeholder='사용자의 이름을 입력하세요.' value={searchInput ?? ''}/>
          </InputWrapper>
          {searchInput !== '' &&
            <SearchList>
              {filtered && filtered.length > 0 ?
                filtered.map(data => {
                  const {friendEmail, friendName, friendProfile} = data
                  return <OneSearchItem isExist={true} email={friendEmail} name={friendName} photo={friendProfile} handleAddFriend={() => handleAddFriend(friendEmail, friendName, friendProfile)}/>
                })    
                :<OneSearchItem isExist={false}/>
              }
            </SearchList>
          }
        </SearchContainer>
        <ListContainer>
          <ListWrapper>
            <p>친구 목록</p>
            {friends && friends.friendListResponseList.map((data, idx) => {
              const {email, name, photo} = data
              return <OneFriendItem key={idx} userId={email} username={name} photoNum={photo} setOpen={() => setOpen(true)} setFriendId={() => setFriendId(email)}/>
              }
            )}
          </ListWrapper>
          <ListWrapper>
            <p>친구 요청</p>
            {friends && friends.friendRequestResponseList.map((data, idx) => {
              const {email, name, photo} = data
              return <OneRequestItem 
                        key={idx} 
                        userId={email} 
                        username={name} 
                        photoNum={photo}
                        handleAcceptFriend={() =>handleAcceptFriend(data.email)} 
                        handleRefuseFriend={() =>handleRefuseFriend(data.email)}
                      />
            })}
          </ListWrapper>
        </ListContainer>
      </Container>
      </Overlay>
    {open && <ModalOverlay setOpen={() => setOpen()} email={friendId}/>}
    </>
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
  width: 60rem;
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

const SearchContainer = styled.div`
  margin: 2.25rem 3.75rem 3rem 3.75rem;
  position: relative;
`



const InputWrapper = styled.div`
  display: flex;
  gap: 0.75rem;
  height: 3rem;
  box-sizing: border-box;
  align-items: center;
`

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #BDBDBD;
  border-radius: 0.75rem;
  background-color: white;
  box-sizing: border-box;

  &::placeholder {
    color: #ccc;
  }
`

const SearchList = styled.div`
  position: absolute;
  top: 3.2rem;
  width: 100%;
  height: fit-content;
  max-height: 30rem;
  overflow: auto;  
  border-radius: 0.75rem;
  background-color: white;
  box-sizing: border-box;
`

const ListContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 5.2rem;
  margin: 3rem 3.75rem 0 3.75rem;
  color: white;

`
const ListWrapper = styled.div`
  flex: 50%;
  
  & > p {
    margin-bottom: 1rem;
    font-weight: 400;

  }
`
