import React from 'react'
import styled from 'styled-components'
import UserProfile from '../../ui/UserProfile'

export default function OneRequestItem({userId, photoNum, username, handleAcceptFriend, handleRefuseFriend}) {
  return (
    <ItemBox>
      <UserInfo>
        <ProfileWrapper>
          <UserProfile photoNum={photoNum}/>
        </ProfileWrapper>
        <IdNameText>
          <p>@{userId}</p>
          <p>{username}</p>
        </IdNameText>
      </UserInfo>
      <ButtonWrapper>
        <button onClick={() => handleAcceptFriend(userId)}>수락</button>
        <button onClick={() => handleRefuseFriend(userId)}>거절</button>
      </ButtonWrapper>
    </ItemBox>
  )
}


const ItemBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`

const UserInfo = styled.div`
  display: flex;
  gap: 0.7rem;
  align-items: center;
`

const ProfileWrapper = styled.div`
  width: 2.5rem;
  height: 2.5rem;
`

const IdNameText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p{
    &:first-child{
      font-weight: 600;
    }
  
    &:last-child {
      font-weight: 400;
      font-size: 0.875rem;
    }
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;

  button {
    height: 2.5rem;
    padding: 0.56rem 2.3rem;
    border-radius: 0.75rem;
    font-weight: 700;
    border: none;

    &:first-child {
      background-color: var(--main-color-2);
      color: white;
    }

    &:last-child{
      background-color: #FFF9F0;
      color: #7E8489;
    }
  }
`