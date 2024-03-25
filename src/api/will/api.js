import { authInstance } from "api/instance"

const willApi = {
  // 유언장 조회
  getWill: async () => {
    const {data} =  await authInstance.get('/will/load')
    return data.data
  },

  // 유언장 저장(최초)
  saveWill: async(content) => {
    const {data} = await authInstance.post('/will/write', {
      content: content
    })
    return data
  },

  // 유언장 수정
  editWill : async (content) => {
    const {data} = await authInstance.patch('/will/modify', {
      content: content
    })
    return data
  }
}

export default willApi
