import { authInstance, defaultInstance } from "../instance"

const userApi = {
  // 아이디 중복 여부
  checkEmail: async (email) => {
    const {data} = await defaultInstance.get(`/user/email/exists/${email}`)
    return data
  },

  // 사용자 이름 저장
  saveUsername: async (username) => {
    const {data} = await authInstance.post(`/user/${username}/save`, {})
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

}

export default userApi