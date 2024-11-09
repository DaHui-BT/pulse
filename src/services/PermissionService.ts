import { PermissionDocument } from "../entities/permission"
import { Database } from "../tools/realm"
import { ObjectId, PaginationOptions, ServiceResponse } from "../types/realm"

class PermissionService {
  private static instance: PermissionService
  private readonly collection = 'permission'
  private db: Database

  private constructor() {
    this.db = Database.getInstance({
      appId: 'pulse-application-tpfmdtx',
      cluster: 'mongodb-atlas',
      database: 'pulse-database',
      collection: 'permission'
    })
  }

  public static getInstance(): PermissionService {
    if (!PermissionService.instance) {
      PermissionService.instance = new PermissionService()
    }
    return PermissionService.instance
  }

  public async findPermissionById(permissionId: ObjectId): Promise<ServiceResponse<PermissionDocument>> {
    try {
      const permission = await this.db.findOne<PermissionDocument>(this.collection, { _id: permissionId })
      return { success: true, data: permission }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
  
  public async findAllPermissions(): Promise<ServiceResponse<PermissionDocument[]>> {
    try {
      const permissions = await this.db.findAll<PermissionDocument>(this.collection)
      return { success: true, data: permissions }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async findPermissions(
    filter: Partial<PermissionDocument> = {},
    pagination: PaginationOptions = {page: 0, pageSize: 10}
  ): Promise<ServiceResponse<{ permissions: PermissionDocument[], total: number }>> {
    try {
      const [permissions, total] = await Promise.all([
        this.db.find<PermissionDocument>(this.collection, filter, pagination),
        this.db.count<PermissionDocument>(this.collection, filter)
      ])

      return { 
        success: true, 
        data: { permissions, total } 
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async createPermission(
    permissionData: PermissionDocument
  ): Promise<ServiceResponse<PermissionDocument>> {
    try {
      const permission = await this.db.insertOne<PermissionDocument>(this.collection, {
        ...permissionData,
        isActive: true,
      })
      return { success: true, data: permission }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async updatePermission(
    permissionId: ObjectId,
    permissionData: Partial<PermissionDocument>
  ): Promise<ServiceResponse<boolean>> {
    try {
      const updated = await this.db.updateOne<PermissionDocument>(
        this.collection,
        { _id: permissionId },
        permissionData
      )
      return { success: true, data: updated }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async deleteById(permissionId: ObjectId): Promise<ServiceResponse<boolean>> {
    try {
      const updated = this.db.updateOne<PermissionDocument>(this.collection, { _id: permissionId }, { isActive: false })
      return { success: true, data: updated }
    } catch (error) {
      return { success: false, error: error.message }
    }
    
  }
}


export { PermissionService }
