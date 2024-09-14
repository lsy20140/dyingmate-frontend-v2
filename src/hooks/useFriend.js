import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import friendApi from 'api/friend/api'
import { useToast } from './useToast'
import { TOAST_MESSAGES } from 'constants/toastMessages'

export const useGetFriendList = () => {
  const {data} = useQuery({
    queryKey: ['friendList'],
    queryFn: friendApi.getFriendList
  })
  return {data}
}

export const useGetSearchUsers = () => {
  const {data} = useQuery({
    queryKey: ['search'],
    queryFn: friendApi.getAllUsers
  })
  return {data}
}


export const useRequestFriend = () => {
  return useMutation({
    mutationFn: (friendData) => friendApi.sendRequest(friendData),
    onSuccess: () => {
      useToast('success', TOAST_MESSAGES.ADD_FRIEND_SUCCESS)
    },
    onError: () => {
      useToast('error', TOAST_MESSAGES.ADD_FRIEND_FAIL)
    }
  })
}

export const useAcceptFriend = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (email) => friendApi.acceptRequest(email),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['friendList'],
        refetchType: 'all'
      })
    }
  })
}

export const useRefuseFriend = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (email) => friendApi.refuseRequest(email),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['friendList'],
        refetchType: 'all'
      })
    }
  })
}