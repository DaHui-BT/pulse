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
  _id?: string,
  createdBy: string,
  documentId: string,
  collectionName: CollectionType,
  operation: OperationType,
  createdAt: Date,
  isDeleted: boolean
}

export {
  OperationType,
  CollectionType,
  type InteractionDocument
}
