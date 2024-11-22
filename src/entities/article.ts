import { TagDocument } from "./tag"

enum ArticleStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}

type ArticleDocument = {
  _id?: string,
  createdBy: string,         // Reference to User._id
  title: string,
  description: string,
  content: string,
  status: number, // 0 indicate can be viewd, 1 indicate private, 2 indicate deleted
  tags: string[],
  tagList?: TagDocument[],
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
