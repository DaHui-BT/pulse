import { BaseDocument } from './base'

type TagDocument = {
  _id: string,
  name: string,             // unique
  color: string,            // Hex color code
  createdBy: string,      // Reference to User._id
  createdAt: Date,
  articlesCount: number,
  isDeleted: boolean
}


export {
  TagDocument
}
