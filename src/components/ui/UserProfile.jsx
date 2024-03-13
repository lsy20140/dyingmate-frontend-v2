import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Profile_1, Profile_2, Profile_3 } from 'assets/img'

export default function UserProfile({photoNum}) {
  const [profile, setProfile] = useState()

  useEffect(() => {
    switch (photoNum) {
      case 0:
        setProfile(Profile_1)
        break;
      case 1:
        setProfile(Profile_2);
        break;
      case 2:
        setProfile(Profile_3);
        break;
    }
  },[])

  return (
    <Profile src={profile}/>
  )
}

const Profile = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 100%;s
`