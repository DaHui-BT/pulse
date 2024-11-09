import { BSON } from "realm-web"

type FileType = {
  _id?: ObjectId,
  user_id: BSON.ObjectId,
  filename: String,
  type: String,
  size: Number,
  data: BSON.Binary,
  uploadDate: Date,
  description?: String
}

export type { FileType }
