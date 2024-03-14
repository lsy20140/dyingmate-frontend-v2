import { authInstance, defaultInstance } from "../instance"

const userApi = {
  // 아이디 중복 여부
  checkEmail: async (email) => {
    const {data} = await defaultInstance.get(`/user/email/exists/${email}`)
    return data
  },

  // 사용자 이름 저장
  createUsername: async (username) => {
    const {data} =  await authInstance.post('/onboarding/username/post', {username: username})
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
  }
}

export default userApi