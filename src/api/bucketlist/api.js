import { authInstance } from "api/instance"

const bucketListApi = {
  // 모든 버킷리스트 조회
  getBucketlist: async () => {
    const {data} =  await authInstance.get('/bucketlist/load')
    return [...data.data.fileResponseList, ...data.data.titleResponseList]
  },

  // 파일, 텍스트를 포함하는 버킷리스트 추가
  postFileBucketlist: async (formData) => {
    const {data} = await authInstance.post('/bucketlist/add/file', formData, {
      headers: {
        'Content-Type' : 'multipart/form-data',
      }
    })
    return data
  },

  // 텍스트만 입력 가능한 버킷리스트 추가
  postTextBucketlist: async (post) => {
    const {data} = await authInstance.post('/bucketlist/add/content', post)
    return data
  },

  // 버킷리스트 달성
  completeBucketlist: async (id) => {
    const {data} = await authInstance.patch(`/bucketlist/complete/${id}`)
    return data
  },

  // 버킷리스트 메모지 위치 이동
  movePosition: async (id, x, y) => {
    console.log(id, x, y)
    const {data} = await authInstance.patch(`/bucketlist/move/${id}?x=${x}&y=${y}`)
    return data
  },

  // 버킷리스트 삭제
  removeBucketlist: async(id) => {
    const {data} = await authInstance.delete(`/bucketlist/${id}`)
    return data
  }
}

export default bucketListApi