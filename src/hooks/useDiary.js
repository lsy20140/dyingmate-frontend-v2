import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import diaryApi from 'api/diary/api'
import { useToast } from './useToast'
import { TOAST_MESSAGES } from 'constants/toastMessages'

export const useGetDiary = () => {
  const {data} = useQuery({
    queryKey: ['diary'],
    queryFn: diaryApi.getDiary
  })
  return {data}
}

export const useSaveDiary = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData) => diaryApi.saveDiary(formData),
    onSuccess: async() => {
      await queryClient.invalidateQueries({
        queryKey: ['diary'],
        refetchType: 'all'
      })
      useToast(TOAST_MESSAGES.SAVE_SUCCESS)
    },
    onError: async () => {
      useToast(TOAST_MESSAGES.SAVE_FAIL)
    }
  })
}

export const useUpdateDiary = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData) => diaryApi.updateDiary(formData),
    onSuccess: async() => {
      await queryClient.invalidateQueries({
        queryKey: ['diary'],
        refetchType: 'all'
      })
      useToast(TOAST_MESSAGES.EDIT_SUCCESS)
    },
    onError: async () => {
      useToast(TOAST_MESSAGES.EDIT_FAIL)
    }
  })
}
