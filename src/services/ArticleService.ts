import { ArticleDocument } from "../entities/article"
import { Database } from "../tools/realm"
import type { ObjectId, PaginationOptions, ServiceResponse } from "../types/realm"

class ArticleService {
  private static instance: ArticleService
  private readonly collection = 'article'
  private db: Database

  private constructor() {
    this.db = Database.getInstance({
      appId: 'pulse-application-tpfmdtx',
      cluster: 'mongodb-atlas',
      database: 'pulse-database',
      collection: 'article'
    })
  }

  public static getInstance(): ArticleService {
    if (!ArticleService.instance) {
      ArticleService.instance = new ArticleService()
    }
    return ArticleService.instance
  }

  public async findArticleById(articleId: ObjectId): Promise<ServiceResponse<ArticleDocument | null>> {
    try {
      const article = await this.db.findOne<ArticleDocument>(this.collection, { _id: articleId })
      return { success: true, data: article }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async findArticles(
    filter: Partial<ArticleDocument> = {},
    pagination: PaginationOptions = {page: 0, pageSize: 10}
  ): Promise<ServiceResponse<{ articles: ArticleDocument[], total: number }>> {
    try {
      const [articles, total] = await Promise.all([
        this.db.find<ArticleDocument>(this.collection, filter, pagination),
        this.db.count<ArticleDocument>(this.collection, filter)
      ])

      return {
        success: true, 
        data: { articles, total: Math.ceil(total / pagination.pageSize) } 
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async createArticle(
    articleData: ArticleDocument
  ): Promise<ServiceResponse<ArticleDocument>> {
    try {
      // collections, documents
      const article = await this.db.insertOne<ArticleDocument>(this.collection, {
        ...articleData,
        isDeleted: false
      })
      return { success: true, data: article }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async updateArticle(
    articleId: ObjectId,
    articleData: Partial<ArticleDocument>
  ): Promise<ServiceResponse<boolean>> {
    try {
      const updated = await this.db.updateOne<ArticleDocument>(
        this.collection,
        { _id: articleId },
        articleData
      )
      return { success: true, data: updated }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async deleteById(articleId: ObjectId): Promise<ServiceResponse<boolean>> {
    try {
      const updated = this.db.updateOne<ArticleDocument>(this.collection, { _id: articleId }, { isDeleted: true })
      return { success: true, data: updated }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}


export { ArticleService }
