import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import stageApi from 'api/stage/api'

export const useGetStage = () => {
  const {data, isSuccess} = useQuery({
    queryKey: ['stage'],
    queryFn: stageApi.getStage
  })
  return {data, isSuccess}
}