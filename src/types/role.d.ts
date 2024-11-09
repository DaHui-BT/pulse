interface Role{
  _id: ObjectId,
  name: String,
  description: String,
  permissions: [ObjectId]  // Array of Permission _ids
}

export type { Role }
