import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import userApi from 'api/auth/user'
import { useToast } from './useToast'
import { TOAST_MESSAGES } from 'constants/toastMessages'

export const useGetUser = () => {
  const {data, isSuccess} = useQuery({
    queryKey: ['user'],
    queryFn: userApi.getUserInfo
  })
  return {data, isSuccess}
}

export const useEditUsername = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (username) => userApi.editUsername(username),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['user'],
        refetchType: 'all'
      });
      useToast('success', TOAST_MESSAGES.EDIT_SUCCESS)
    },
    onError: () => {
      useToast('error', TOAST_MESSAGES.EDIT_FAIL)
    }
  })
}