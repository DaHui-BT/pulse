import { ObjectId } from "../types/realm"


type FileDocument = {
  _id?: ObjectId,
  creator: ObjectId,
  filename: string,
  type: string,
  size: Number,
  data: Binary,
  createAt: Date,
  expireAt: Date | null,
  description?: String,
  isDeleted: boolean
}

export type { FileDocument }
