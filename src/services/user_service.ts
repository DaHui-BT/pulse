import { message } from "ant-design-vue"

import Database from "../tools/database"
import { UserType } from "@types/user"
import { PageType } from "../types/page"
import { BSON } from "realm-web"
import { compressImage, fileToBinary } from "../tools/image_tools"


class UserService {
  
  private database: Database
  private readonly COLLECTION_NAME: string = 'user'

  constructor() {
    this.database = Database.getInstance()
  }

  getUser(): Realm.User {
    return this.database.getUser()
  }

  async login(username: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.database.connect(username, password).then(() => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  }

  async register(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.database.register(email, password).then(() => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  }
  
  async confirmUser(token: string, tokenId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.database.confirmUser(token, tokenId).then(() => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  }
  
  async resendConfirmationEmail(email: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.database.resendConfirmationEmail(email).then(() => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  }
  
  async sendResetPasswordEmail(email: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.database.sendResetPasswordEmail(email).then(() => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  }

  async findList(filter: any = {}, page_info: PageType = {page: 0, page_size: 10}): Promise<UserType[] | []> {
    return new Promise<UserType[] | []>((resolve, reject) => {
      this.database.findList<UserType>(this.COLLECTION_NAME, filter, page_info).then(res => {
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
  
  async updateById(id: string, user_info: UserType): Promise<UserType | null> {
    return new Promise<UserType>((resolve, reject) => {
      this.database.updateOne(this.COLLECTION_NAME, {_id: {$eq: id}}, user_info).then(res => {
        resolve(res)
      }).catch(err => {
        message.error(err)
        console.log(err)
        reject(err)
      })
    }) 
  }

  async updateAvatar(user_id: string, avatar: File) {
    const compress_image = await compressImage(avatar)
    if (compress_image == null) {
      throw Error('compress image error')
    }
    let binary
    await fileToBinary(compress_image).then(res => {
      binary = res
    })
    console.log(binary)

    return this.updateById(user_id, { avatar: {
      filename: compress_image.name,
      type: compress_image.type,
      size: compress_image.size,
      data: binary
    }})
  }
}

export { UserService }
