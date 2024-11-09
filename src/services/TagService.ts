import { TagDocument } from "../entities/tag"
import { Database } from "../tools/realm"
import { ObjectId, PaginationOptions, ServiceResponse } from "../types/realm"

class TagService {
  private static instance: TagService
  private readonly collection = 'tag'
  private db: Database

  private constructor() {
    this.db = Database.getInstance({
      appId: 'pulse-application-tpfmdtx',
      cluster: 'mongodb-atlas',
      database: 'pulse-database',
      collection: 'tag'
    })
  }

  public static getInstance(): TagService {
    if (!TagService.instance) {
      TagService.instance = new TagService()
    }
    return TagService.instance
  }

  public async findTagById(tagId: ObjectId): Promise<ServiceResponse<TagDocument>> {
    try {
      const tag = await this.db.findOne<TagDocument>(this.collection, { _id: tagId })
      return { success: true, data: tag }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
  
  public async findAllTags(): Promise<ServiceResponse<TagDocument[]>> {
    try {
      const tags = await this.db.findAll<TagDocument>(this.collection)
      return { success: true, data: tags }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async findTags(
    filter: Partial<TagDocument> = {},
    pagination: PaginationOptions = {page: 0, pageSize: 10}
  ): Promise<ServiceResponse<{ tags: TagDocument[], total: number }>> {
    try {
      const [tags, total] = await Promise.all([
        this.db.find<TagDocument>(this.collection, filter, pagination),
        this.db.count<TagDocument>(this.collection, filter)
      ])

      return { 
        success: true, 
        data: { tags, total } 
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async createTag(
    tagData: TagDocument
  ): Promise<ServiceResponse<TagDocument>> {
    try {
      const tag = await this.db.insertOne<TagDocument>(this.collection, {
        ...tagData,
        isActive: true,
      })
      return { success: true, data: tag }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async updateTag(
    tagId: ObjectId,
    tagData: Partial<TagDocument>
  ): Promise<ServiceResponse<boolean>> {
    try {
      const updated = await this.db.updateOne<TagDocument>(
        this.collection,
        { _id: tagId },
        tagData
      )
      return { success: true, data: updated }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async deleteById(tagId: ObjectId): Promise<ServiceResponse<boolean>> {
    try {
      const updated = this.db.updateOne<TagDocument>(this.collection, { _id: tagId }, { isActive: false })
      return { success: true, data: updated != undefined }
    } catch (error) {
      return { success: false, error: error.message }
    }
    
  }
}


export { TagService }
