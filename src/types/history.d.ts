interface History {
  _id: ObjectId,
  user: ObjectId,  // Reference to User collection
  article: ObjectId,  // Reference to Article collection
  date: Date
}

export type { History }
