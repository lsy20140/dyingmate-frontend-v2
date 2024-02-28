import { authInstance } from "../utils/api"

// 로그인

// 회원가입

// 사용자 이름 저장
export const createUsername = async (username) => {
  try {
    const {data} =  await authInstance.post('/onboarding/username/post', {username: username})
    return data
  } 
  catch (error) {
    console.log(error)
  }
}
