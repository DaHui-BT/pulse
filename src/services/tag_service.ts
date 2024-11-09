import { message } from "ant-design-vue"

import Database from "../tools/database"
import { TagType } from "@types/tag"
import { PageType } from "../types/page"


class TagService {
  
  private database: Database
  private readonly COLLECTION_NAME: string = 'tag'

  constructor() {
    this.database = Database.getInstance()
  }

  async findAll(): Promise<TagType[] | []> {
    return new Promise<TagType[] | []>((resolve, reject) => {
      this.database.findAll<TagType>(this.COLLECTION_NAME).then(res => {
        resolve(res)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  }

  async findList(filter: any = {}, page_info: PageType = {page: 0, page_size: 10}): Promise<TagType[] | []> {
    return new Promise<TagType[] | []>((resolve, reject) => {
      this.database.findList<TagType>(this.COLLECTION_NAME, filter, page_info).then(res => {
        resolve(res)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  }

  async findOne(filter: object): Promise<TagType | null> {
    return new Promise<TagType[] | []>((resolve, reject) => {
      this.database.findOne<TagType>(this.COLLECTION_NAME, filter).then(res => {
        resolve(res)
      }).catch(err => {
        message.error(err)
        console.log(err)
        reject(err)
      })
    })
  }

  async addOne(user_info: TagType): Promise<TagType | null> {
    return new Promise<TagType>((resolve, reject) => {
      this.database.addOne(this.COLLECTION_NAME, user_info).then(res => {
        resolve(res)
      }).catch(err => {
        message.error(err)
        console.log(err)
        reject(err)
      })
    }) 
  }
  
  async updateById(id: string, user_info: TagType): Promise<TagType | null> {
    return new Promise<TagType>((resolve, reject) => {
      this.database.updateOne(this.COLLECTION_NAME, {_id: {$eq: id}}, user_info).then(res => {
        resolve(res)
      }).catch(err => {
        message.error(err)
        console.log(err)
        reject(err)
      })
    }) 
  }
}

export { TagService }
