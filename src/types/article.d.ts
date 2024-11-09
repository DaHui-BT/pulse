import { BSON } from "realm-web"
import { TagType } from "./tag"

const enum Status {
  PRIVATE,
  PUBLIC,
  DELETED
}

type ArticleType = {
  _id?: BSON.ObjectId,
  author: BSON.ObjectId,  // Reference to User collection
  user_info: {
    user_id: BSON.ObjectId,
    user_avatar_url: string,
    username: string
  },
  title: string,
  description: string,
  content: string,
  files: BSON.ObjectId[],  // Array of File _ids
  stars: string[],
  publishDate: Date,
  updateDate: Date,
  comments: BSON.ObjectId[],  // Array of Comment _ids
  status: enum<Status>,
  tag_id_list: string[]  // New field for categorization
  tags: TagType[]  // New field for categorization
}

export { ArticleType }
