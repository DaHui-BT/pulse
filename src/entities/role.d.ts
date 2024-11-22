type RoleDocument = {
  _id?: string,
  name: string,               // Role name, e.g., 'admin', 'editor', 'moderator'
  description: string,         // Description of the role
  permissions: string[],    // Array of permission IDs referencing Permissions._id
  createdAt: date,
  updatedAt: date,
  isDeleted: boolean
}

export { RoleDocument }
