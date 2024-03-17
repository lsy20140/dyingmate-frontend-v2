import axios from 'axios'

const BASE_URL= process.env.REACT_APP_BASE_URL
const ACCESS_TOKEN = localStorage.getItem('login-token')


// 인증이 필요하지 않은 경우
export const defaultInstance = axios.create({
  baseURL: BASE_URL,
  headers:{
    "Content-Type": "application/json"
  }
});

export const authInstance = axios.create({
  baseURL: BASE_URL,
  headers:{
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`
  }
})
