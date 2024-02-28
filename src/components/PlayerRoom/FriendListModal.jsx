import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as MainIcon } from '../../assets/icons/PlayerRoom//Friend/friend_list.svg'
import {IoIosClose} from 'react-icons/io'
import OneFriendItem from './FriendList/OneFriendItem'
import OneRequestItem from './FriendList/OneRequestItem'
import axios from 'axios'
import OneSearchItem from './FriendList/OneSearchItem'
import { useAuthContext } from '../../contexts/AuthContext'
import { addFriendSuccess } from '../ui/ToastMessage'
import {ToastContainer} from 'react-toastify'
import { getFriendList } from '../../apis/api/PlayerRoom/friendList'


export default function FriendListModal({setFriendListModal}) {
  const [searchInput, setSearchInput] = useState('')  
  const [friendList, setFriendList] = useState([])
  const [requestList, setRequestList] = useState([])
  const [searchList, setSearchList] = useState([])
  const [update, setUpdate] = useState(false)
  
  const baseUrl = 'https://dying-mate-server.link'
  const {token} = useAuthContext()


  const handleOnChange = (e) => {
    setSearchInput(e.target.value)
  }


  useEffect(() => {
    axios.get(`${baseUrl}/friend/search`,{
      headers: {Authorization: 'Bearer ' + token},
    }, )
    .then((res) => {
      setSearchList(prev => [...prev, ...res.data.data])
    })
  },[])

  useEffect(() => {
    getFriendList().then((res) => {
      setFriendList([...res.data.friendListResponseList])
      setRequestList([...res.data.friendRequestResponseList])
    })
  },[update])

  const filteredList = searchList && searchList.filter((item) => {
    if(searchInput !== '' && item.friendEmail && item.friendEmail.toLowerCase().includes(searchInput.toLowerCase())){ 
      return item
    }
  })

  const handleAddFriend = (friendEmail, friendName, friendProfile) => {
    axios
    .post(`${baseUrl}/friend/add`, {
      "friendEmail": friendEmail,
      "friendName": friendName,
      "friendProfile": friendProfile,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true,
    })
    .then((response) => {
      addFriendSuccess()   
      setSearchInput('')
      setUpdate((prev) => !prev)
    }).catch(function (error) {
        // 오류발생시 실행
        console.log(error)
    })
  }

  const handleAcceptFriend = (acceptEmail) => {
    axios
    .post(`${baseUrl}/friend/accept?acceptEmail=${acceptEmail}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true,
    })
    .then((response) => {
      setUpdate((prev) => !prev)     
    }).catch(function (error) {
        // 오류발생시 실행
      console.log(error.message)
    })
  }

  const handleRefuseFriend = (refuseEmail) => {
    axios
    .delete(`${baseUrl}/friend/refuse?refuseEmail=${refuseEmail}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true,
    })
    .then((response) => {
      setUpdate((prev) => !prev)
    }).catch(function (error) {
        // 오류발생시 실행
      console.log(error.message)
    })
  }


  return (
    <>
      <Overlay>
      <Container>
        <Header>
          <HeaderTitle>
            <MainIcon/>
            <p>친구 목록</p>
          </HeaderTitle>
          <IoIosClose onClick={() => setFriendListModal()}/>
        </Header>  
        <SearchContainer>
          <InputWrapper>
            <SearchInput onChange={handleOnChange} placeholder='사용자의 이름을 입력하세요.' value={searchInput ?? ''}/>
          </InputWrapper>
          {searchInput !== '' &&
            <SearchList>
              {filteredList && filteredList.length > 0 ?
                filteredList.map(data => {
                  console.log("data",data)
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
            {friendList && friendList.map((data, idx) => {
              const {email, name, photo} = data
              return <OneFriendItem key={idx} userId={email} username={name} photoNum={photo}/>
            }
          )}
          </ListWrapper>
          <ListWrapper>
            <p>친구 요청</p>
            {requestList && requestList.map((data, idx) => {
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
    <ToastContainer />
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
