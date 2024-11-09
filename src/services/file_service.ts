import { message } from "ant-design-vue"
import { BSON } from "realm-web"

import Database from "../tools/database"


class FileService {
  
  private database: Database
  private readonly COLLECTION_NAME: string = 'file'

  constructor() {
    this.database = Database.getInstance()
  }

  async uploadFile(file: File): Promise<{insertedId: BSON.ObjectId, file_name: string}> {
    return new Promise((resolve, reject) => {
      this.database.uploadFile(this.COLLECTION_NAME, file, { user_id: new BSON.ObjectId(this.database.getUser().id)}).then(res => {
        resolve(res)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  }

  async findOne(filter: object): Promise<UserType | null> {
    return new Promise<UserType[] | []>((resolve, reject) => {
      this.database.findOne<UserType>(this.COLLECTION_NAME, filter).then(res => {
        resolve(res)
      }).catch(err => {
        message.error(err)
        console.log(err)
        reject(err)
      })
    })
  }

  async addOne(user_info: UserType): Promise<UserType | null> {
    return new Promise<UserType>((resolve, reject) => {
      this.database.addOne(this.COLLECTION_NAME, user_info).then(res => {
        resolve(res)
      }).catch(err => {
        message.error(err)
        console.log(err)
        reject(err)
      })
    }) 
  }
}

export { FileService }
