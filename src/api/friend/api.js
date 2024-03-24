import { authInstance } from "api/instance"

const friendApi = {
  // 친구 조회(맺어진 친구, 요청 들어온 친구)
  getFriendList: async () => {
    const {data} =  await authInstance.get('/friend/list')
    return data.data
  },

  // 사용자 검색
  getAllUsers: async() => {
    const {data} = await authInstance.get('/friend/search')
    return data.data
  },

  // 친구 추가 요청 보내기
  sendRequest : async (friendData) => {
    const {data} = await authInstance.post('/friend/add', friendData)
    return data
  },

  // 친구 요청 수락
  acceptRequest : async (email) => {
    const {data} = await authInstance.post(`/friend/accept?acceptEmail=${email}`,{})
    return data
  },

  // 친구 요청 거절
  refuseRequest : async (email) => {
    const {data} = await authInstance.delete(`/friend/refuse?refuseEmail=${email}`,{})
    return data
  },
}

export default friendApi
