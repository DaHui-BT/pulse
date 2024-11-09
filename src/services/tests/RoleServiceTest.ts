import { PermissionResource } from "../../entities/permission"
import { PermissionService } from "../PermissionService"
import { RoleService } from "../RoleService"


const roleService = RoleService.getInstance()

// const roles = await roleService.findRoles()
// console.log(roles)
// console.log(roleService.findRoles())
// console.log(roleService.createRole({
//   name: 'user',
//   description: 'user role',
//   permissions: [],
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   isDeleted: true
// }))

// console.log(roleService.createRole({
//   name: 'admin',
//   description: 'admin role',
//   permissions: [],
//   createdAt: new Date(),
//   updatedAt: new Date(),
//   isDeleted: true
// }))


// user permission
// const role = roles.data?.roles[0]
// let per
// role?._id && (per = await roleService.findRoleById(role?._id))

// console.log(per)

// const permissionService = PermissionService.getInstance()
// const permissions = await permissionService.findAllPermissions()
// console.log(permissions)
// const permission_id_list: string[] = []
// permissions.data?.forEach(permission => {
//   permission_id_list.push(permission._id + '')
// })
// console.log(permission_id_list)

// let updated
// role?._id && (updated = await roleService.updateRole(role?._id, {
//   // description: 'article create role'
//   permissions: permission_id_list
// }))


// admin permission
// const role = roles.data?.roles[1]
// let per
// role?._id && (per = await roleService.findRoleById(role?._id))

// console.log(per)

// const permissionService = PermissionService.getInstance()
// const permissions = await permissionService.findAllPermissions()
// console.log(permissions)
// const permission_id_list: string[] = []
// permissions.data?.forEach(permission => permission_id_list.push(permission._id + ''))
// console.log(permission_id_list)

// let updated
// role?._id && (updated = await roleService.updateRole(role?._id, {
//   // description: 'article create role'
//   permissions: permission_id_list
// }))

// console.log(updated)

// let deleted
// role?._id && (deleted = await roleService.deleteById(role?._id))
// console.log(deleted)

export {}
