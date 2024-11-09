import { BSON } from 'realm-web'

type CityType = {
  _id?: BSON.ObjectId,
  province: String,
  city: String[]
}

export type { CityType }
