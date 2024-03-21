import { authInstance } from "api/instance"

const stageApi = {
  getStage: async () => {
    const {data} =  await authInstance.get('/map')
    return data.data
  },

  openStage: async(stage) => {
    const {data} = await authInstance.patch(`/map/open/${stage}`)
    return data
  }
}

export default stageApi

