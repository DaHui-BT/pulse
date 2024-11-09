import { ObjectId } from "../types/realm"


enum OperationType {
  STAR = 'STAR',
  COLLECT = 'COLLECT',
  WATCH = 'WATCH',
  INSERT = 'INSERT',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE'
}

enum CollectionType {
  ARTICLE = 'ARTICLE',
  COMMENT = 'COMMENT'
}

type InteractionDocument = {
  _id?: ObjectId,
  createdBy: ObjectId,
  documentId: ObjectId,
  collection: CollectionType,
  operation: OperationType,
  createdAt: Date,
  isDeleted: boolean
}

export {
  OperationType,
  CollectionType,
  type InteractionDocument
}
