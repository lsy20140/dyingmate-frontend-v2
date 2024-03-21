import { authInstance } from "api/instance"

const willApi = {
  getWill: async () => {
    const {data} =  await authInstance.get('/will/load')
    return data.data
  },

  saveWill: async(content) => {
    const {data} = await authInstance.post('/will/write', {
      content: content
    })
    return data
  },

  editWill : async (content) => {
    const {data} = await authInstance.patch('/will/modify', {
      content: content
    })
    return data
  }
}

export default willApi
