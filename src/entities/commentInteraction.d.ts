import { BaseDocument } from './base'

type CommentInteractionDocument = {
  _id?: string,
  commentId: IDType,
  articleId: IDType,
  userId: IDType,
  action: 'like' | 'dislike',
  createdAt?: Date
}

export {
  CommentInteractionDocument
}
