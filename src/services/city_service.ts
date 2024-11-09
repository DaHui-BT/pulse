import { message } from "ant-design-vue"

import Database from "../tools/database"

import { PageType } from "../types/page"
import { CityType } from "../types/city"
import { UpdateType } from "../types/realm"


class CityService {
  
  private database: Database
  private readonly COLLECTION_NAME: string = 'city'

  constructor() {
    this.database = Database.getInstance()
  }
  
  async findAll(): Promise<CityType[] | []> {
    return new Promise<CityType[] | []>((resolve, reject) => {
      this.database.findAll<CityType>(this.COLLECTION_NAME).then(res => {
        resolve(res)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  }

  async findList(filter: any = {}, page_info: PageType = {page: 0, page_size: 10}): Promise<CityType[] | []> {
    return new Promise<CityType[] | []>((resolve, reject) => {
      this.database.findList<CityType>(this.COLLECTION_NAME, filter, page_info).then(res => {
        resolve(res)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  }

  async findOne(filter: object): Promise<CityType | null> {
    return new Promise<CityType | null>((resolve, reject) => {
      this.database.findOne<CityType>(this.COLLECTION_NAME, filter).then(res => {
        resolve(res)
      }).catch(err => {
        message.error(err)
        console.log(err)
        reject(err)
      })
    })
  }

  async addOne(user_info: CityType): Promise<UpdateType | null> {
    return new Promise<UpdateType>((resolve, reject) => {
      this.database.addOne(this.COLLECTION_NAME, user_info).then(res => {
        resolve(res)
      }).catch(err => {
        message.error(err)
        console.log(err)
        reject(err)
      })
    }) 
  }
  
  async updateById(id: string, city_info: CityType): Promise<UpdateType | null> {
    return new Promise<UpdateType>((resolve, reject) => {
      this.database.updateOne(this.COLLECTION_NAME, {_id: {$eq: id}}, city_info).then(res => {
        resolve(res)
      }).catch(err => {
        message.error(err)
        console.log(err)
        reject(err)
      })
    }) 
  }

}

export { CityService }
