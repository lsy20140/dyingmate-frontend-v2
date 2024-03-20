import {useQuery} from '@tanstack/react-query'
import userApi from 'api/auth/user'

export const useGetUser = () => {
  const {data, isSuccess} = useQuery({
    queryKey: ['user'],
    queryFn: userApi.getUserInfo
  })
  return {data, isSuccess}
}