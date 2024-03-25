import { authInstance } from "api/instance"

const stageApi = {
  // stage 1~5 달성 여부 조회
  getStage: async () => {
    const {data} =  await authInstance.get('/map')
    return data.data
  },

  // stage 통과(달성)
  openStage: async(stage) => {
    const {data} = await authInstance.patch(`/map/open/${stage}`)
    return data
  }
}

export default stageApi

