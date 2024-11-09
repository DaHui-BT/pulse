import { ObjectId } from "../types/realm"

type BaseDocument = {
  _id: ObjectId,
  author?: ObjectId,
  updateAt: Date,
  createAt: Date
}


export {
  type BaseDocument
}
