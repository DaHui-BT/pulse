import { BaseDocument } from './base'

type CommentDocument = {
  _id?: ObjectId,
  content: string,
  author: {
    userId: ObjectId,         // Reference to User._id
    username: string,
    avatar: string
  },
  article: ObjectId,           // Reference to Article._id
  parentComment: ObjectId,     // Reference to Comment._id (for nested comments)
  like: number,
  dislike: number,
  createdAt: Date,
  updatedAt: Date,
  isDeleted: Boolean
}

type CommentAggrateDocument = {
  _id: ObjectId,
  content: string,
  author: {
    userId: ObjectId,         // Reference to User._id
    username: string,
    avatar: string
  },
  article: ObjectId,           // Reference to Article._id
  parentComment: ObjectId,     // Reference to Comment._id (for nested comments)
  like: number,
  dislike: number,
  children: CommentAggrateDocument[],
  createdAt: Date,
  updatedAt: Date,
  isDeleted: Boolean
}

export {
  CommentDocument,
  CommentAggrateDocument
}

// {
//   "_id": { "$oid": "672c7bac2b1b4fc9b57f774b" },
//   "content": "Comment children",
//   "author": {
//     "userId": {
//       "$old": "671b8d78fecdb9451d176ce9"
//     },
//     "username": "String",
//     "avatar": "String"
//   },
//   "article": {
//     "$old": "67233dcf76e13db9b010ef39"
//   },
//   "parentComment": {
//     "$old": "672c698128f17f5ebfd493ef"
//   },
//   "createdAt": "2024-10-31T08:20:31.513+00:00",
//   "updatedAt": "2024-10-31T08:20:31.513+00:00",
//   "isDeleted": false
// }