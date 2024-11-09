// AuthorizationService.ts
import { BaseDocument } from "../entities/base"
import { PermissionAction, PermissionDocument } from "../entities/permission"
import { RoleDocument } from "../entities/role"
import { UserDocument } from "../entities/user"
import { Database } from "../tools/realm" // Import your Database wrapper

class AuthorizationService {
  
  private static instance: AuthorizationService
  private readonly collection = 'user'
  private db: Database

  private constructor() {
    this.db = Database.getInstance({
      appId: 'pulse-application-tpfmdtx',
      cluster: 'mongodb-atlas',
      database: 'pulse-database',
      collection: this.collection
    })
  }
  
  public static getInstance(): AuthorizationService {
    if (!AuthorizationService.instance) {
      AuthorizationService.instance = new AuthorizationService()
    }
    return AuthorizationService.instance
  }

  public isAuthenticated(): boolean {
    return this.db.getCurrentUser()?.isLoggedIn || false
  }

  // Check if the current user is the resource owner
  public async isOwner<T extends BaseDocument>(userId: string, resourceType: string, resourceId: string): Promise<boolean> {
    const resource = await this.db.findOne<T>(resourceType, { _id: resourceId })
    return resource != null && resource.author.toString() === userId
  }

  // Check if the user has the required role or permission
  public async hasRole(userId: string, requiredRole: string): Promise<boolean> {
    const user = await this.db.findOne<UserDocument>('uesr', { _id: userId })
    const role = await this.db.findOne<RoleDocument>('role', {name: requiredRole})
    return user != null && user.roles.includes(role?._id)
  }

  // Check if a user can perform an action on a specific resource
  public async canPerformAction(userId: string, action: PermissionAction, resourceType: string, resourceId: string): Promise<boolean> {
    // Check if user has the role for the action
    const user = await this.db.findOne<UserDocument>('user', { _id: userId })
    if (!user) return false
    const roles = await this.db.findAll<RoleDocument>('role')

    const permissions: PermissionDocument[] = []
    for (let role of roles) {
      let permission = await this.db.findAll<PermissionDocument>('permission', {_id: {$in: role.permissions}})
      if (permission) permissions.push(...permission)
    }

    if (!permissions.some(permission => permission.action === action)) {
      return false
    }

    // For actions requiring ownership, confirm the user owns the resource
    if (action === PermissionAction.UPDATE || action === PermissionAction.DELETE) {
      return this.isOwner(userId, resourceType, resourceId)
    }

    return true
  }
}

export { AuthorizationService }
