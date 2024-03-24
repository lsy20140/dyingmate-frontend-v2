import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import bucketListApi from 'api/bucketlist/api'


export const useGetBucketlist = () => {
  const {data} = useQuery({
    queryKey: ['bucketlist'],
    queryFn: bucketListApi.getBucketlist
  })
  return {data}
}

export const useAddFileBucketlist = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData) => bucketListApi.postFileBucketlist(formData),
    onSuccess: async() => {
      await queryClient.invalidateQueries({
        queryKey: ['bucketlist'],
        refetchType: 'all'
      })
    }
  })
}

export const useAddTextBucketlist = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (post) => bucketListApi.postTextBucketlist(post),
    onSuccess: async() => {
      await queryClient.invalidateQueries({
        queryKey: ['bucketlist'],
        refetchType: 'all'
      })
    }
  })
}

export const useCompleteBucketlist = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => bucketListApi.completeBucketlist(id),
    onSuccess: async() => {
      await queryClient.invalidateQueries({
        queryKey: ['bucketlist'],
        refetchType: 'all'
      })
    }
  })
}

export const useMovePosition = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({id, x, y}) => bucketListApi.movePosition(id, x, y),
    onSuccess: async() => {
      await queryClient.invalidateQueries({
        queryKey: ['bucketlist'],
        refetchType: 'all'
      })
    }
  })
}

export const useRemoveBucketlist = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => bucketListApi.removeBucketlist(id),
    onSuccess: async() => {
      await queryClient.invalidateQueries({
        queryKey: ['bucketlist'],
        refetchType: 'all'
      })
    }
  })
}