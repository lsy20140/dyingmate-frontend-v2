import { authInstance } from "api/instance"

const messageApi = {
  getMessage: async () => {
    const {data} =  await authInstance.get('/message/load')
    return data.data
  },

  saveMessage: async (message) => {
    const {data} = await authInstance.post('/message/send', {
      message: message
    })
    return data
  }
}

export default messageApi