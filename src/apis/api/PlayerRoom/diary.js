import { authInstance } from '../../utils/api'

export const getDiary = async () => {
  try {
    const {data} = await authInstance.get('/funeral/select')
    return data
  } 
  catch (error) {
    console.log(error)
  }
}