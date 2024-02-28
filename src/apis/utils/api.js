import axios from 'axios'

// 인증이 필요하지 않은 경우
const axiosApi = () => {
  const instance = axios.create({baseURL: 'https://dying-mate-server.link/', withCredentials: true})
  return instance;
}

// 인증이 필요한 경우
const axiosAuthApi = () => {
  const token = localStorage.getItem('login-token')

  const instance =  axios.create({
    baseURL: 'https://dying-mate-server.link/',
    headers: {Authorization: 'Bearer ' + token},
    withCredentials: true
  })
  return instance
}

export const defaultInstance = axiosApi();
export const authInstance = axiosAuthApi();