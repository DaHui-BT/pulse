import { ObjectId } from '../types/realm'

enum PermissionResource{
  ARTICLE = 'ARTICLE',
  COMMENT = 'COMMENT',
  USER = 'USER',
  TAG = 'TAG'
}

enum PermissionAction {
  CRATE = 'CRATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE'
}

interface PermissionDocument {
  _id?: ObjectId,
  resource: PermissionResource,
  action: PermissionAction,
  description: string,        // Description of the permission, e.g., 'can edit articles'
  createdAt: Date,
  updatedAt: Date,
  isDeleted: boolean
}

export {
  PermissionResource,
  PermissionAction,
  type PermissionDocument
}
