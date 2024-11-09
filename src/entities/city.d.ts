import { ObjectId } from "../types/realm"

type CityDocument = {
  _id?: ObjectId,
  province: String,
  city: String[]
}

export type { CityDocument }
