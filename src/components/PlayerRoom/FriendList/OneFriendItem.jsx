import React from 'react'
import styled from 'styled-components'
import UserProfile from '../../ui/UserProfile'

export default function OneFriendItem({userId, username, photoNum}) {
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
      <VisitButton>방문하기</VisitButton>
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

const VisitButton = styled.button`
  height: 2.5rem;
  padding: 0.56rem 2.3rem;
  border-radius: 1rem;
  background-color: var(--main-color);
  font-weight: 700;
  border: none;
  color: white;

`

