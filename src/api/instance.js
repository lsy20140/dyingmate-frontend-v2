import axios from 'axios'

const BASE_URL= process.env.REACT_APP_BASE_URL

// 인증이 필요하지 않은 경우
export const defaultInstance = axios.create({
  baseURL: BASE_URL,
  headers:{
    "Content-Type": "application/json"
  }
});


// 인증이 필요한 경우
export const authInstance = (headers={}) => {
  const ACCESS_TOKEN = localStorage.getItem('login-token')

  if(ACCESS_TOKEN){
    headers.Authorization = `Bearer ${ACCESS_TOKEN}`
  }

  const instance = axios.create({
    baseURL: BASE_URL,
    headers
  })

  return instance
}

