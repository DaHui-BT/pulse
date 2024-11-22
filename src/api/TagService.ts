import { TagDocument } from "../entities/tag"
import { Request } from "../tools/request"
import { ObjectId, PaginationOptions, ServiceResponse } from "../types/realm"

class TagService {
  private static instance: TagService
  private request: Request

  private constructor() {
    this.request = new Request()
  }

  public static getInstance(): TagService {
    if (!TagService.instance) {
      TagService.instance = new TagService()
    }
    return TagService.instance
  }

  public async findTagById(tagId: string): Promise<ServiceResponse<TagDocument>> {
    try {
      const response = await this.request.get<TagDocument>(`/tag/${tagId}`)
      if (response.code == 200) {
        return { success: true, data: response.data }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
  
  public async findTagByIds(tagIds: string[]): Promise<ServiceResponse<TagDocument[]>> {
    try {
      const response = await this.request.get<TagDocument[]>('/tag-ids', { params: {ids: tagIds}})
      if (response.code == 200) {
        return { success: true, data: response.data }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
  
  public async findAllTags(): Promise<ServiceResponse<TagDocument[]>> {
    try {
      const response = await this.request.get<TagDocument[]>('/tag')
      if (response.code == 200) {
        return { success: true, data: response.data }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async findTags(
    filter: Partial<TagDocument> = {}
  ): Promise<ServiceResponse<{ tags: TagDocument[], total: number }>> {
    try {
      const response = await this.request.get<TagDocument[]>('/tag', { params: filter })
      if (response.code == 200) {
        return { success: true, data: {tags: response.data, total: 1} }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async createTag(
    tagData: TagDocument
  ): Promise<ServiceResponse<TagDocument>> {
    try {
      const response = await this.request.post<TagDocument>('/tag', { data: tagData })
      if (response.code == 200) {
        return { success: false, data: response.data}
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async updateTag(
    tagId: string,
    tagData: Partial<TagDocument>
  ): Promise<ServiceResponse<TagDocument>> {
    try {
      const response = await this.request.put<TagDocument>(`/tag/${tagId}`, { data: tagData })
      if (response.code == 200) {
        return { success: true, data: response.data }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async deleteById(tagId: string): Promise<ServiceResponse<boolean>> {
    try {
      const response = await this.request.delete<TagDocument>(`/tag/${tagId}`)
      if (response.code == 200) {
        return { success: true }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
    
  }
}


export { TagService }
