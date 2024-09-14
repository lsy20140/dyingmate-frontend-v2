import { authInstance } from "api/instance"

const diaryApi = {
  // 장례준비 조회
  getDiary: async () => {
    const {data} =  await authInstance.get('/funeral/select')
    return data.data
  },

  // 장례준비 저장
  saveDiary: async (formData) => {
    const {data} = await authInstance.post('/funeral/save', formData, {
      headers: {
        'Content-Type' : 'multipart/form-data',
      }
    })
    return data
  },

  // 장례준비 수정
  updateDiary: async (formData) => {
    const {data} = await authInstance.patch('/funeral/modify', formData, {
      headers: {
        'Content-Type' : 'multipart/form-data',
      }
    })
    return data
  }
}

export default diaryApi