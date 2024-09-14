import { authInstance } from "api/instance"

const friendRecordApi = {
  getFriendWill: async (email) => {
    const {data} =  await authInstance.get(`/friendroom/${email}/will`)
    return data.data
  },

  getFriendMessage: async (email) => {
    const {data} =  await authInstance.get(`/friendroom/${email}/message`)
    return data.data
  },

  getFriendDiary: async (email) => {
    const {data} =  await authInstance.get(`/friendroom/${email}/funeral`)
    return data.data
  },

  getFriendBucketlist: async (email) => {
    const {data} =  await authInstance.get(`/friendroom/${email}/bucketlist`)
    return data.data
  },
}

export default friendRecordApi
