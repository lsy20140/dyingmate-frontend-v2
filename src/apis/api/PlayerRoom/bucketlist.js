import { authInstance } from "../../utils/api"

// 버킷리스트 추가
export const addBucketlist = async (content, pos) => {
  try {
    const {data} =  await authInstance.post('/bucketlist/add', {content: content, pos:pos})
    return data
  } 
  catch (error) {
    console.log(error)
  }
}

// 버킷리스트 가져오기
export const getAllBucketlist = async () => {
  try {
    const {data} = await authInstance.get('/bucketlist/load')
    return data
  } 
  catch (error) {
    console.log(error)
  }
}