interface Permission {
  _id: ObjectId,
  name: String,
  action: {
    type: String,
    enum: ['read', 'write', 'update', 'delete']
  }
}

export type { Permission }