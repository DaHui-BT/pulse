import { BSON } from "realm-web"

enum Status {
  ACITVE,
  DELETE,
  FROZEN
}

enum Favorite {
  STARRED,
  COLLECTED
}

interface UserType {
  _id?: string,
  username: String | null,
  email: String | null,
  password?: String | null,
  role_id?: BSON.ObjectId | null,  // Reference to Role collection
  avatar_url?: String | null,  // URL to avatar image
  avatar?: {
    filename: String,
    type: String,
    size: Number,
    data: {
      buffer: Uint8Array
    },
  }
  description: String | null,
  location: {
    ip_addr: String | null,
    city: String | null,
    province?: String
  },
  birthday?: Date | null,
  gender: number | null,
  registerDate?: Date,
  status?: Status,
  following?: BSON.ObjectId[],  // Array of User _ids
  followers?: BSON.ObjectId[],  // Array of User _ids
  favorites?: {
    article: BSON.ObjectId,  // Reference to Article collection
    type: Favorite
  }[]
}

export { type UserType, Status }
