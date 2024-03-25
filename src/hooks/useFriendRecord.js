import {useQuery} from '@tanstack/react-query'
import friendRecordApi from 'api/friendRecord/api'

export const useGetFriendWill = (id) => {
  console.log("id", id)
  const {data, isLoading} = useQuery({
    queryKey: ['will', id],
    queryFn: () => friendRecordApi.getFriendWill(id)
  })
  return {data, isLoading}
}

export const useGetFriendMessage = (id) => {
  const {data, isLoading} = useQuery({
    queryKey: ['message', id],
    queryFn: () => friendRecordApi.getFriendMessage(id)
  })
  return {data, isLoading}
}

export const useGetFriendBucketlist = (id) => {
  const {data, isLoading} = useQuery({
    queryKey: ['bucketlist', id], 
    queryFn: () => friendRecordApi.getFriendBucketlist(id)
  })
  return {data, isLoading}
}

export const useGetFriendDiary = (id) => {
  const {data, isLoading} = useQuery({
    queryKey: ['diary', id],
    queryFn: () => friendRecordApi.getFriendDiary(id)
  })
  return {data, isLoading}
}
