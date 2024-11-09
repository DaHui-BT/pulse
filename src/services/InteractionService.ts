import { InteractionDocument } from "../entities/interaction"
import { Database } from "../tools/realm"
import type { ObjectId, PaginationOptions, ServiceResponse } from "../types/realm"

class InteractionService {
  private static instance: InteractionService
  private readonly collection = 'interaction'
  private db: Database

  private constructor() {
    this.db = Database.getInstance({
      appId: 'pulse-application-tpfmdtx',
      cluster: 'mongodb-atlas',
      database: 'pulse-database',
      collection: 'interaction'
    })
  }

  public static getInstance(): InteractionService {
    if (!InteractionService.instance) {
      InteractionService.instance = new InteractionService()
    }
    return InteractionService.instance
  }

  public async count(filter: Partial<InteractionDocument> = {}): Promise<ServiceResponse<{total: number}>> {
    try {
      const number = await this.db.count<InteractionDocument>(this.collection, filter)
      return { success: true, data: {total: number}}
    } catch (error) {
      return { success: false, error: error.message}
    }
  }

  public async findInteractionById(interactionId: ObjectId): Promise<ServiceResponse<InteractionDocument | null>> {
    try {
      const interaction = await this.db.findOne<InteractionDocument>(this.collection, { _id: interactionId })
      return { success: true, data: interaction }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async findInteractions(
    filter: Partial<InteractionDocument> = {},
    pagination: PaginationOptions = {page: 0, pageSize: 10}
  ): Promise<ServiceResponse<{ interactions: InteractionDocument[], total: number }>> {
    try {
      const [interactions, total] = await Promise.all([
        this.db.find<InteractionDocument>(this.collection, filter, pagination),
        this.db.count<InteractionDocument>(this.collection, filter)
      ])

      return {
        success: true, 
        data: { interactions, total: Math.ceil(total / pagination.pageSize) } 
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async createInteraction(
    interactionData: InteractionDocument
  ): Promise<ServiceResponse<InteractionDocument>> {
    try {
      const interaction = await this.db.insertOne<InteractionDocument>(this.collection, {
        ...interactionData,
        isDeleted: false
      })
      return { success: true, data: interaction }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async updateInteraction(
    filter: Partial<InteractionDocument> = {},
    interactionData: Partial<InteractionDocument>
  ): Promise<ServiceResponse<boolean>> {
    try {
      const updated = await this.db.updateOne<InteractionDocument>(
        this.collection,
        filter,
        interactionData
      )
      return { success: true, data: updated }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async updateInteractionById(
    interactionId: ObjectId,
    interactionData: Partial<InteractionDocument>
  ): Promise<ServiceResponse<boolean>> {
    try {
      const updated = await this.db.updateOne<InteractionDocument>(
        this.collection,
        { _id: interactionId },
        interactionData
      )
      return { success: true, data: updated }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async deleteInteraction(filter: Partial<InteractionDocument>): Promise<ServiceResponse<boolean>> {
    try {
      const updated = await this.db.deleteOne<InteractionDocument>(this.collection, filter)
      return { success: true, data: updated }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async deleteInteractionById(interactionId: ObjectId): Promise<ServiceResponse<boolean>> {
    try {
      const deleted = await this.db.deleteOne<InteractionDocument>(this.collection, { _id: interactionId })
      return { success: true, data: deleted }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}


export { InteractionService }
