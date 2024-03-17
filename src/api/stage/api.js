import { authInstance } from "api/instance"

const stageApi = {
  getStage: async () => {
    const {data} =  await authInstance.get('/map')
    return data
  }
}

export default stageApi

