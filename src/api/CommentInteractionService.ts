import { CommentInteractionDocument } from "../entities/commentInteraction"
import { Request } from "../tools/request"
import PaginationType from "../types/pagination"
import { ObjectId, PaginationOptions, ServiceResponse } from "../types/realm"

class CommentInteractionService {
  private static instance: CommentInteractionService
  private readonly collection = 'commentInteraction'
  private request: Request

  private constructor() {
    this.request = new Request()
  }

  public static getInstance(): CommentInteractionService {
    if (!CommentInteractionService.instance) {
      CommentInteractionService.instance = new CommentInteractionService()
    }
    return CommentInteractionService.instance
  }

  public async findCommentInteractionById(commentInteractionId: string): Promise<ServiceResponse<CommentInteractionDocument>> {
    try {
      const response = await this.request.get<CommentInteractionDocument>(`/commentInteraction/${commentInteractionId}`)
      if (response.code == 200) {
        return { success: true, data: response.data }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
  
  public async findCommentInteractions(
    filter: Partial<CommentInteractionDocument> = {},
    pagination: Partial<PaginationType> = {current: 1, size: 10}
  ): Promise<ServiceResponse<{ commentInteractions: CommentInteractionDocument[], pagination: PaginationType }>> {
    try {
      const response = await this.request.get<{data: CommentInteractionDocument[], pagination: PaginationType}>('/commentInteraction', {params: {...filter, ...pagination}})
      if (response.code == 200) {
        return { success: true, data: { commentInteractions: response.data.data, pagination: response.data.pagination }}
      }
      return { success: false, error: response.message }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async findAllCommentInteractionsByFilter(
    filter: Partial<CommentInteractionDocument> = {}): Promise<ServiceResponse<CommentInteractionDocument[]>> {
    try {
      const response = await this.request.get<CommentInteractionDocument[]>('/commentInteraction-all', {params: {...filter}})
      if (response.code == 200) {
        return { success: true, data: response.data }
      }
      return { success: false, error: response.message }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
  
  public async countCommentInteractionByArticleId(
    articleId: string
  ): Promise<ServiceResponse<CommentInteractionDocument>> {
    try {
      const response = await this.request.post<CommentInteractionDocument>(`/commentInteraction/count-article/${articleId}`)
      if (response.code == 200) {
        return { success: true, data: response.data, message: response.message }
      }
      return { success: false, error: response.message, message: response.message }
    } catch (error: any) {
      return { success: false, error: error.message, message: error.message }
    }
  }

  public async createCommentInteraction(
    commentInteractionData: CommentInteractionDocument
  ): Promise<ServiceResponse<CommentInteractionDocument>> {
    try {
      const response = await this.request.post<CommentInteractionDocument>('/commentInteraction', { data: commentInteractionData })
      if (response.code == 200) {
        return { success: true, data: response.data, message: response.message }
      }
      return { success: false, error: response.message, message: response.message }
    } catch (error: any) {
      return { success: false, error: error.message, message: error.message }
    }
  }

  public async updateCommentInteraction(
    commentInteractionId: string,
    commentInteractionData: Partial<CommentInteractionDocument>
  ): Promise<ServiceResponse<CommentInteractionDocument>> {
    try {
      const response = await this.request.put<CommentInteractionDocument>(`/commentInteraction/${commentInteractionId}`, {data: commentInteractionData})
      if (response.code == 200) {
        return { success: true, data: response.data }
      }
      return { success: false, error: response.message }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
  
  public async deleteByCommentIdAndAction(commentId: string, action: 'like' | 'dislike'): Promise<ServiceResponse<boolean>> {
    try {
      const response = await this.request.delete<boolean>(`/commentInteraction/${commentId}/${action}`)
      if (response.code == 200) {
        return { success: true, data: response.data }
      }
      return { success: false, error: response.message }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async deleteById(commentInteractionId: string): Promise<ServiceResponse<boolean>> {
    try {
      const response = await this.request.delete<boolean>(`/commentInteraction/${commentInteractionId}`)
      if (response.code == 200) {
        return { success: true, data: response.data }
      }
      return { success: false, error: response.message }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}


export { CommentInteractionService }
