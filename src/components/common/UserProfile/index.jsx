import React from 'react'
import styled from 'styled-components'
import { Profile_1, Profile_2, Profile_3 } from 'assets/img/Profile'

export default function UserProfile({size, photoNum}) {
  return (
    <Profile size={getProfileStyle(size)}>
      <img src={getProfileImage(photoNum)} alt='프로필 이미지' />
    </Profile>
  )
}

function getProfileImage(photoNum) {
  let profile = ''
  switch (photoNum) {
    case 0:
      profile = Profile_1
      break;
    case 1:
      profile = Profile_2
      break;
    case 2:
      profile = Profile_3
      break;
  }
  return profile
}

function getProfileStyle(size) {
  let width = ''
  let height = ''

  switch(size) {
    case 'small':
      width = '2rem'
      height= '2rem'
      break
    case 'normal':
      width = '2.5rem'
      height= '2.5rem'
      break
    case 'large':
      width= '6rem'
      height= '6rem'
      break
  }
  return {width: width, height: height}
}


const Profile = styled.div`
  width: ${props => props.size.width};
  height: ${props => props.size.height};
  border-radius: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
`