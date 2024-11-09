import { BSON } from 'realm-web'

type CommentType = {
  _id?: BSON.ObjectId,
  article_id?: BSON.ObjectId,  // Reference to Article collection
  author_id?: BSON.ObjectId,  // Reference to User collection
  user_info: {
    user_id?: BSON.ObjectId,
    avatar_url: String,
    username: String
  },
  content: String,
  date: Date,
  stars: Number,
  parentComment_id?: BSON.ObjectId,  // Reference to parent Comment, null if top-level
  children: Array<CommentType>
}

export type { CommentType }
