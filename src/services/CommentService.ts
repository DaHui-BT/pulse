import { CommentDocument } from "../entities/comment"
import { Database } from "../tools/realm"
import { ObjectId, PaginationOptions, ServiceResponse } from "../types/realm"

class CommentService {
  private static instance: CommentService
  private readonly collection = 'comment'
  private db: Database

  private constructor() {
    this.db = Database.getInstance({
      appId: 'pulse-application-tpfmdtx',
      cluster: 'mongodb-atlas',
      database: 'pulse-database',
      collection: 'comment'
    })
  }

  public static getInstance(): CommentService {
    if (!CommentService.instance) {
      CommentService.instance = new CommentService()
    }
    return CommentService.instance
  }

  public async findCommentById(commentId: ObjectId): Promise<ServiceResponse<CommentDocument>> {
    try {
      const comment = await this.db.findOne<CommentDocument>(this.collection, { _id: commentId })
      return { success: true, data: comment }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
  
  public async findAllComments(): Promise<ServiceResponse<CommentDocument[]>> {
    try {
      const comments = await this.db.findAll<CommentDocument>(this.collection)
      return { success: true, data: comments }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async findComments(
    filter: Partial<CommentDocument> = {},
    pagination: PaginationOptions = {page: 0, pageSize: 10}
  ): Promise<ServiceResponse<{ comments: CommentDocument[], total: number }>> {
    try {
      const [comments, total] = await Promise.all([
        this.db.find<CommentDocument>(this.collection, filter, pagination),
        this.db.count<CommentDocument>(this.collection, filter)
      ])

      return { 
        success: true, 
        data: { comments, total } 
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async createComment(
    commentData: CommentDocument
  ): Promise<ServiceResponse<CommentDocument>> {
    try {
      const comment = await this.db.insertOne<CommentDocument>(this.collection, {
        ...commentData,
        isDeleted: false,
      })
      return { success: true, data: comment }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async updateComment(
    commentId: ObjectId,
    commentData: Partial<CommentDocument>
  ): Promise<ServiceResponse<boolean>> {
    try {
      const updated = await this.db.updateOne<CommentDocument>(
        this.collection,
        { _id: commentId },
        commentData
      )
      return { success: true, data: updated }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async deleteById(commentId: ObjectId): Promise<ServiceResponse<boolean>> {
    try {
      const updated = this.db.updateOne<CommentDocument>(this.collection, { _id: commentId }, { isDeleted: true })
      return { success: true, data: updated }
    } catch (error) {
      return { success: false, error: error.message }
    }
    
  }
}


export { CommentService }
