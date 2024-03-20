import { authInstance, defaultInstance } from "../instance"

const userApi = {
  // 아이디 중복 여부
  checkEmail: async (email) => {
    const {data} = await defaultInstance.get(`/user/email/exists/${email}`)
    return data
  },

  // 로그인
  userLogin : async (email, pwd) => {
    const {data} = await defaultInstance.post('/user/login',
      {
        email: email,
        pwd: pwd
      }
    )
    return data
  },

  // 회원가입
  userJoin: async (email, pwd) => {
    const {data} = await defaultInstance.post('/user/join', 
      {
        email: email,
        pwd: pwd
      }
    )
    return data
  },

  // 사용자 이름 저장
  saveUsername: async (username) => {
    const {data} = await authInstance.post(`/user/${username}/save`, {})
    return data
  },

  // 사용자 정보(username, photoNum) 받아오기
  getUserInfo : async () => {
    const {data} = await authInstance.get('/user')
    return data.data
  },

  // 사용자 이름 변경(setting modal)
  editUsername : async (username) => {
    const {data} = await authInstance.patch(`/user/${username}/modify`)
    return data
  },

  // 초기화하기(Playerroom에서의 모든 기록)
  resetData : async () => {
    const {data} = await authInstance.delete('/user/reset')
    return data
  }
}

export default userApi