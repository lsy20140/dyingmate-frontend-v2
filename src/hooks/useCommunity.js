import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import communityApi from 'api/community/api'

export const useGetAllComments = () => {
  const {data} = useQuery({
    queryKey: ['comments'],
    queryFn: communityApi.getAllComments
  })
  return {data}
}

export const usePostComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (content) => communityApi.postComment(content),
    onSuccess: async() => {
      await queryClient.invalidateQueries({
        queryKey: ['comments'],
        refetchType: 'all'
      })
    }
  })
}

export const useAddCommentLike = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => communityApi.addCommentLike(id),
    onSuccess: async() => {
      await queryClient.invalidateQueries({
        queryKey: ['comments'],
        refetchType: 'all'
      })
    }
  })
}
export const useRemoveCommentLike = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => communityApi.removeCommentLike(id),
    onSuccess: async() => {
      await queryClient.invalidateQueries({
        queryKey: ['comments'],
        refetchType: 'all'
      })
    }
  })
}