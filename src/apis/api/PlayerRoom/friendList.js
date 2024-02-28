import axios from 'axios'
import { useState } from 'react'

const baseUrl = 'https://dying-mate-server.link'
const token = localStorage.getItem('login-token')

export const getFriendList = async () => {
  try {
    const {data} = await axios.get(`${baseUrl}/friend/list`, {
      headers: {Authorization: 'Bearer ' + token},
    }, )
    return data
  }
  catch(error) {
    console.log(error)
  }
}