import { authInstance } from "api/instance"

const communityApi = {
  // 모든 댓글 조회
  getAllComments: async () => {
    const {data} =  await authInstance.get('/community')
    return data.data
  },

  // 댓글 등록
  postComment: async (content) => {
    const {data} = await authInstance.post('/community/register', {
      content: content
    })
    return data
  },

  // 댓글 좋아요 추가
  addCommentLike: async (id) => {
    const {data} = await authInstance.post(`/heart/${id}`,{})
    return data
  },

  // 댓글 좋아요 취소
  removeCommentLike: async (id) => {
    const {data} = await authInstance.delete(`/heart/${id}`,{})
    return data
  }
}

export default communityApi