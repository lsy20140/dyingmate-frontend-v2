import { authInstance } from "api/instance"

const messageApi = {
  // 부고문자 조회
  getMessage: async () => {
    const {data} =  await authInstance.get('/message/load')
    return data.data
  },

  // 부고문자 전송
  saveMessage: async (message) => {
    const {data} = await authInstance.post('/message/send', {
      message: message
    })
    return data
  }
}

export default messageApi