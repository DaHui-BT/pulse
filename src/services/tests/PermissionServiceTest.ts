import { PermissionAction, PermissionResource } from "../../entities/permission"
import { PermissionService } from "../PermissionService"


const permissionService = PermissionService.getInstance()

// const permissions = await permissionService.findPermissions()
// console.log(permissions)
// console.log(permissionService.findPermissions())
// console.log(permissionService.createPermission({
//   resource: PermissionResource.TAG,
//   action: PermissionAction.CRATE,
//   description: 'update article permission',
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   isDeleted: true
// }))

// console.log(permissionService.createPermission({
//   resource: PermissionResource.TAG,
//   action: PermissionAction.UPDATE,
//   description: 'update article permission',
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   isDeleted: true
// }))

// console.log(permissionService.createPermission({
//   resource: PermissionResource.TAG,
//   action: PermissionAction.DELETE,
//   description: 'delete article permission',
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   isDeleted: true
// }))

// console.log(permissionService.createPermission({
//   resource: PermissionResource.TAG,
//   action: PermissionAction.READ,
//   description: 'read article permission',
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   isDeleted: true
// }))


// const permission = permissions.data?.permissions[0]
// let per
// permission?._id && (per = await permissionService.findPermissionById(permission?._id))

// console.log(per)

// let updated
// permission?._id && (updated = await permissionService.updatePermission(permission?._id, {
//   // description: 'article create permission'
//   isDeleted: true
// }))

// console.log(updated)

// let deleted
// permission?._id && (deleted = await permissionService.deleteById(permission?._id))
// console.log(deleted)

export {}
