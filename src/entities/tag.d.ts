import { BaseDocument } from './base'

type TagDocument = {
  _id: ObjectId,
  name: string,             // unique
  color: string,            // Hex color code
  createdBy: ObjectId,      // Reference to User._id
  createdAt: Date,
  articlesCount: number,
  isDeleted: boolean
}


export {
  TagDocument
}
