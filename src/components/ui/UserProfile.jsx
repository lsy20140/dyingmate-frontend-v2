import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

export default function UserProfile({photoNum}) {
  const [profile, setProfile] = useState()

  useEffect(() => {
    switch (photoNum) {
      case 0:
        setProfile('/static/media/profile_1.png')
        break;
      case 1:
        setProfile('/static/media/profile_2.png');
        break;
      case 2:
        setProfile('/static/media/profile_3.png');
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