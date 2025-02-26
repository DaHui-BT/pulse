import PaginationType from "../types/pagination"
import { ArticleDocument } from "../entities/article"
import { Request } from "../tools/request"
import type { PaginationOptions, ServiceResponse } from "../types/realm"

class ArticleService {
  private static instance: ArticleService
  private request: Request

  private constructor() {
    this.request = new Request()
  }

  public static getInstance(): ArticleService {
    if (!ArticleService.instance) {
      ArticleService.instance = new ArticleService()
    }
    return ArticleService.instance
  }

  public async findArticleById(articleId: string): Promise<ServiceResponse<ArticleDocument | null>> {
    try {
      const response = await this.request.get<ArticleDocument>(`/article/${articleId}`)
      if (response.code == 200) {
        return { success: true, data: response.data }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async findArticles(
    filter: Partial<ArticleDocument> = {},
    pagination: PaginationOptions = {current: 1, size: 10}
  ): Promise<ServiceResponse<{ articles: ArticleDocument[], pagination: PaginationType }>> {
    try {
      const response = await this.request.get<{data: ArticleDocument[], pagination: PaginationType}>('/article', { params: { ...filter, ...pagination } })
      if (response.code == 200) {
        return { success: true, data: { articles: response.data.data, pagination: response.data.pagination }}
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async createArticle(
    articleData: ArticleDocument
  ): Promise<ServiceResponse<ArticleDocument>> {
    try {
      // collections, documents
      const response = await this.request.post<ArticleDocument>('/article', { data: articleData })
      if (response.code == 200) {
        return { success: true, data: response.data }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async updateArticle(
    articleId: string,
    articleData: Partial<ArticleDocument>
  ): Promise<ServiceResponse<ArticleDocument>> {
    try {
      const response = await this.request.put<ArticleDocument>(`/article/${articleId}`, {data: articleData})
      if (response.code == 200) {
        return { success: true, data: response.data }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
  
  public async addArticleCommentCount(articleId: string): Promise<ServiceResponse<ArticleDocument>> {
    try {
      const response = await this.request.put<ArticleDocument>(`/article/comment-add/${articleId}`)
      if (response.code == 200) {
        return { success: true, data: response.data }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async deleteArticleCommentCount(articleId: string): Promise<ServiceResponse<ArticleDocument>> {
    try {
      const response = await this.request.put<ArticleDocument>(`/article/comment-del/${articleId}`)
      if (response.code == 200) {
        return { success: true, data: response.data }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async deleteById(articleId: string): Promise<ServiceResponse<boolean>> {
    try {
      const response = await this.request.delete<boolean>(`/article/${articleId}`)
      if (response.code == 200) {
        return { success: true, data: response.data }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}


export { ArticleService }
