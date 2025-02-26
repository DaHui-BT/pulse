import { CommentDocument } from "../entities/comment"
import { Request } from "../tools/request"
import PaginationType from "../types/pagination"
import { ObjectId, PaginationOptions, ServiceResponse } from "../types/realm"

class CommentService {
  private static instance: CommentService
  private readonly collection = 'comment'
  private request: Request

  private constructor() {
    this.request = new Request()
  }

  public static getInstance(): CommentService {
    if (!CommentService.instance) {
      CommentService.instance = new CommentService()
    }
    return CommentService.instance
  }

  public async findCommentById(commentId: string): Promise<ServiceResponse<CommentDocument>> {
    try {
      const response = await this.request.get<CommentDocument>(`/comment/${commentId}`)
      if (response.code == 200) {
        return { success: true, data: response.data }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
  
  public async findComments(
    filter: Partial<CommentDocument> = {},
    pagination: Partial<PaginationType> = {current: 1, size: 10}
  ): Promise<ServiceResponse<{ comments: CommentDocument[], pagination: PaginationType }>> {
    try {
      const response = await this.request.get<{data: CommentDocument[], pagination: PaginationType}>('/comment', {params: {...filter, ...pagination}})
      if (response.code == 200) {
        return { success: true, data: { comments: response.data.data, pagination: response.data.pagination }}
      }
      return { success: false, error: response.message }
      // const [comments, total] = await Promise.all([
      //   this.request.find<CommentDocument>(this.collection, filter, pagination),
      //   this.request.count<CommentDocument>(this.collection, filter)
      // ])

      // return { 
      //   success: true, 
      //   data: { comments, total } 
      // }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async findChildComments(filter: Partial<CommentDocument>, pagination: Partial<PaginationType> = {current: 1, size: 10}
  ): Promise<ServiceResponse<{ comments: CommentDocument[], pagination: PaginationType }>> {
    try {
      const response = await this.request.get<{
                                                data: CommentDocument[],
                                                pagination: PaginationType
                                              }>(`/comment/child`, {params: {...filter, ...pagination}})
      if (response.code == 200) {
        return { success: true, data: { comments: response.data.data, pagination: response.data.pagination }}
      }
      return { success: false, error: response.message }
      // const [comments, total] = await Promise.all([
      //   this.request.find<CommentDocument>(this.collection, filter, pagination),
      //   this.request.count<CommentDocument>(this.collection, filter)
      // ])

      // return { 
      //   success: true, 
      //   data: { comments, total } 
      // }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async createComment(
    commentData: CommentDocument
  ): Promise<ServiceResponse<CommentDocument>> {
    try {
      const response = await this.request.post<CommentDocument>('/comment', { data: commentData })
      if (response.code == 200) {
        return { success: true, data: response.data }
      }
      return { success: false, error: response.message }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async updateComment(
    commentId: string,
    commentData: Partial<CommentDocument>
  ): Promise<ServiceResponse<CommentDocument>> {
    try {
      const response = await this.request.put<CommentDocument>(`/comment/${commentId}`, {data: commentData})
      if (response.code == 200) {
        return { success: true, data: response.data }
      }
      return { success: false, error: response.message }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
  
  public async like(commentId: string, count: 1 | -1): Promise<ServiceResponse<CommentDocument>> {
    try {
      let response = null
      if (count === 1) {
        response = await this.request.put<CommentDocument>(`/comment/like/${commentId}`)
      } else {
        response = await this.request.put<CommentDocument>(`/comment/cancel-like/${commentId}`)
      }
      if (response.code == 200) {
        return { success: true, data: response.data }
      }
      return { success: false, error: response.message }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
  
  public async dislike(commentId: string, count: -1 | 1): Promise<ServiceResponse<CommentDocument>> {
    try {
      let response = null
      if (count === 1) {
        response = await this.request.put<CommentDocument>(`/comment/dislike/${commentId}`)
      } else {
        response = await this.request.put<CommentDocument>(`/comment/cancel-dislike/${commentId}`)
      }
      if (response.code == 200) {
        return { success: true, data: response.data }
      }
      return { success: false, error: response.message }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async deleteById(commentId: string): Promise<ServiceResponse<boolean>> {
    try {
      const response = await this.request.delete<boolean>(`/comment/${commentId}`)
      if (response.code == 200) {
        return { success: true, data: response.data }
      }
      return { success: false, error: response.message }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
    
  }
}


export { CommentService }
