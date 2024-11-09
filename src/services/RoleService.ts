import { RoleDocument } from "../entities/role"
import { Database } from "../tools/realm"
import { ObjectId, PaginationOptions, ServiceResponse } from "../types/realm"

class RoleService {
  private static instance: RoleService
  private readonly collection = 'role'
  private db: Database

  private constructor() {
    this.db = Database.getInstance({
      appId: 'pulse-application-tpfmdtx',
      cluster: 'mongodb-atlas',
      database: 'pulse-database',
      collection: 'role'
    })
  }

  public static getInstance(): RoleService {
    if (!RoleService.instance) {
      RoleService.instance = new RoleService()
    }
    return RoleService.instance
  }

  public async findRoleById(roleId: ObjectId): Promise<ServiceResponse<RoleDocument>> {
    try {
      const role = await this.db.findOne<RoleDocument>(this.collection, { _id: roleId })
      return { success: true, data: role }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async findRoles(
    filter: Partial<RoleDocument> = {},
    pagination: PaginationOptions = {page: 0, pageSize: 10}
  ): Promise<ServiceResponse<{ roles: RoleDocument[], total: number }>> {
    try {
      const [roles, total] = await Promise.all([
        this.db.find<RoleDocument>(this.collection, filter, pagination),
        this.db.count<RoleDocument>(this.collection, filter)
      ])

      return { 
        success: true, 
        data: { roles, total } 
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async createRole(
    roleData: RoleDocument
  ): Promise<ServiceResponse<RoleDocument>> {
    try {
      const role = await this.db.insertOne<RoleDocument>(this.collection, {
        ...roleData,
        isActive: true,
      })
      return { success: true, data: role }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async updateRole(
    roleId: ObjectId,
    roleData: Partial<RoleDocument>
  ): Promise<ServiceResponse<boolean>> {
    try {
      const updated = await this.db.updateOne<RoleDocument>(
        this.collection,
        { _id: roleId },
        roleData
      )
      return { success: true, data: updated }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async deleteById(roleId: ObjectId): Promise<ServiceResponse<boolean>> {
    try {
      const updated = this.db.updateOne<RoleDocument>(this.collection, { _id: roleId }, { isActive: false })
      return { success: true, data: updated }
    } catch (error) {
      return { success: false, error: error.message }
    }
    
  }
}


export { RoleService }
