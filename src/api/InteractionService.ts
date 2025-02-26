import { InteractionDocument } from "../entities/interaction"
import { Request } from "../tools/request"
import { PageType } from "../types/page"
import PaginationType from "../types/pagination"
import type { ObjectId, PaginationOptions, ServiceResponse } from "../types/realm"

class InteractionService {
  private static instance: InteractionService
  private request: Request

  private constructor() {
    this.request = new Request()
  }

  public static getInstance(): InteractionService {
    if (!InteractionService.instance) {
      InteractionService.instance = new InteractionService()
    }
    return InteractionService.instance
  }

  // public async count(filter: Partial<InteractionDocument> = {}): Promise<ServiceResponse<{total: number}>> {
  //   try {
  //     const number = await this.request.count<InteractionDocument>(this.collection, filter)
  //     return { success: true, data: {total: number}}
  //   } catch (error) {
  //     return { success: false, error: error.message}
  //   }
  // }

  public async findInteractionById(interactionId: ObjectId): Promise<ServiceResponse<InteractionDocument | null>> {
    try {
      const response = await this.request.get<InteractionDocument>(`/interaction/${interactionId}`)
      if (response.code == 200) {
        return { success: true, data: response.data }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async findInteractions(filter: Partial<InteractionDocument & PaginationType> = {}): Promise<ServiceResponse<{ interactions: InteractionDocument[], pagination: PaginationType }>> {
    try {
      const response = await this.request.get<{data: InteractionDocument[], pagination: PaginationType}>('/interaction', { params: filter})
      if (response.code == 200) {
        return { success: true, data: {interactions: response.data.data, pagination: response.data.pagination}}
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
  

  public async findAllInteractionsByUserId(userId: string): Promise<ServiceResponse<InteractionDocument[]>> {
    try {
      const response = await this.request.get<InteractionDocument[]>(`/interaction-all/${userId}`)
      if (response.code == 200) {
        return { success: true, data: response.data}
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async createInteraction(
    interactionData: InteractionDocument
  ): Promise<ServiceResponse<InteractionDocument>> {
    try {
      const response = await this.request.post<InteractionDocument>('/interaction', {data: interactionData})
      if (response.code == 200) {
        return { success: true, data: response.data }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async updateInteractionById(
    interactionId: string,
    interactionData: Partial<InteractionDocument>
  ): Promise<ServiceResponse<InteractionDocument>> {
    try {
      const response = await this.request.put<InteractionDocument>(`/interaction/${interactionId}`,{data: interactionData})
      if (response.code == 200) {
        return { success: true, data: response.data }  
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async deleteInteractionById(interactionId: string): Promise<ServiceResponse<boolean>> {
    try {
      const response = await this.request.delete<null>(`/interaction/${interactionId}`)
      if (response.code == 200) {
        return { success: true }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  
  public async deleteInteractionByFilter(filter: Partial<InteractionDocument>): Promise<ServiceResponse<boolean>> {
    try {
      const response = await this.request.delete<null>('/interaction', { params: filter })
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


export { InteractionService }
