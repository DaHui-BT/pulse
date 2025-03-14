enum UserGender {
  FEMALE = 'FEMALE',
  MALE = 'MALE'
}

interface UserDocument {
  _id: string,
  username: string,        // unique
  email: string,           // unique
  password: string,        // hashed
  avatar?: string,
  gender: UserGender,
  description: string,
  birthday: Date,
  createdAt: Date,
  updatedAt: Date,
  roles: string[],
  isActive: boolean,
  profile: {
    // firstName: string,
    // lastName: string,
    location: {
      province: string,
      city: string
    },
    website?: string,
    social?: {
      twitter?: string,
      github?: string,
      linkedin?: string
    },
    preferences?: {
      emailNotification?: boolean,
      darkMode?: boolean
    }
  },
  subscribers: string[],  // References to User._id
  subscribing: string[],  // References to User._id
  recommands: string[],
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
