import { ObjectId } from "./base"

enum UserGender {
  FEMALE = 'FEMALE',
  MALE = 'MALE'
}

interface UserDocument {
  _id: ObjectId,
  username: string,        // unique
  email: string,           // unique
  password: string,        // hashed
  avatar_url?: string,
  avatar: {
    filename: string,
    type: string,
    size: number,
    data: Binary
  },          // URL to avatar image
  gender: UserGender,
  description: string,
  birthday: Date,
  createdAt: Date,
  updatedAt: Date,
  roles: ObjectId[],
  isActive: boolean,
  profile: {
    firstName: string,
    lastName: string,
    location: {
      province: string,
      city: string
    },
    website: string,
    social: {
      twitter: string,
      github: string,
      linkedin: string
    },
    preferences: {
      emailNotification: boolean,
      darkMode: boolean
    }
  },
  subscribers: ObjectId[],  // References to User._id
  subscribing: ObjectId[],  // References to User._id
  statistics: {
    articlesCount: number,
    commentsCount: number,
    subscribersCount: number
  }
}

export {
  UserGender,
  type UserDocument
}
