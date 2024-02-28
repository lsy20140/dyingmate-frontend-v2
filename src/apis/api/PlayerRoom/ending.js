import axios from 'axios'

const baseUrl = 'https://dying-mate-server.link'
const token = localStorage.getItem('login-token')

export const isAllDone = async () => {
  try {
    const {data} = await axios.get(`${baseUrl}/ending`, {
      headers: {Authorization: 'Bearer ' + token},
    }, )
    return data
  }
  catch(error) {
    console.log(error)
  }
}