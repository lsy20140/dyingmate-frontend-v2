import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import messageApi from 'api/message/api'
import { useToast } from './useToast'
import { TOAST_MESSAGES } from 'constants/toastMessages'

export const useGetMessage = () => {
  const {data} = useQuery({
    queryKey: ['message'],
    queryFn: messageApi.getMessage
  })
  return {data}
}

export const useSaveMessage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (message) => messageApi.saveMessage(message),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['message'],
        refetchType: 'all'
      })
      useToast('success', TOAST_MESSAGES.SAVE_SUCCESS)
    },
    onError: () => {
      useToast('error', TOAST_MESSAGES.SAVE_FAIL)
    }
  })
}