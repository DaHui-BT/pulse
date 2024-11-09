import { ObjectId } from "./base"
import { TagDocument } from "./tag"

enum ArticleStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}

type ArticleDocument = {
  _id?: ObjectId,
  createdBy: ObjectId,         // Reference to User._id
  title: string,
  description: string,
  content: string,
  status: ArticleStatus,
  tags: TagDocument[],
  createdAt?: Date,
  updatedAt?: Date,
  statistics: {
    views: number,
    stars: number,
    collections: number,
    comments: number
  },
  files: {
    filename: string,
    url: string,
    size: number,
    type: string,
    uploadedAt: Date
  }[],
  isAudit: boolean,
  isDeleted: boolean
}


export {
  ArticleStatus,
  type ArticleDocument
}
