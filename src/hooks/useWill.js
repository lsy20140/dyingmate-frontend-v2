import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import willApi from 'api/will/api'
import { useToast } from './useToast'
import { TOAST_MESSAGES } from 'constants/toastMessages'

export const useGetWill = () => {
  const {data, isSuccess} = useQuery({
    queryKey: ['will'],
    queryFn: willApi.getWill
  })
  return {data, isSuccess}
}

export const useSaveWill = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (content) => willApi.saveWill(content),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['will'],
        refetchType: 'all'
      });
      useToast('success', TOAST_MESSAGES.SAVE_SUCCESS)
    },
    onError: () => {
      useToast('error', TOAST_MESSAGES.SAVE_FAIL)
    }
  })
}

export const useUpdateWill = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (content) => willApi.editWill(content),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['will'],
        refetchType: 'all'
      });
      useToast('success', TOAST_MESSAGES.EDIT_SUCCESS)
    },
    onError: () => {
      useToast('error', TOAST_MESSAGES.EDIT_FAIL)
    }
  })
}