import * as Realm from 'realm-web'
import { message } from 'ant-design-vue'

import Loading from '../plugins/loading'
import { compressImage, fileToBinary } from './image_tools'
import { PageType } from '../types/page'
import { FileType } from '../types/file'
import { BSON } from 'realm-web'
import { ErrorType, UpdateType } from '../types/realm'


interface OptionsType {
  app_id: string,
  cluster: string,
  database: string,
  collection: string | null
}

class ObjectId extends BSON.ObjectId {
  
}

export { ObjectId }

class Database {
  private options: OptionsType = {
    app_id: 'pulse-application-tpfmdtx',
    cluster: 'mongodb-atlas',
    database: 'pulse-database',
    collection: null
  }
  
  private static instance: Database
  private app: Realm.App | null = null
  private user: Realm.User | null = null
  private database: Realm.Services.MongoDB | null = null
  isLogin: boolean = false

  constructor(options: OptionsType | null = null) {
    // assign variables and assert not be null
    {
      if (options?.app_id) this.options.app_id = options.app_id
      if (options?.cluster) this.options.cluster = options.cluster
      if (options?.database) this.options.database = options.database
      if (options?.collection) this.options.collection = options.collection
    }

    this.app = new Realm.App({ id: this.options.app_id })
    this.user = this.app.currentUser

    if (this.user) {
      this.isLogin = this.user.isLoggedIn
      this.database = this.user.mongoClient(this.options.cluster).db(this.options.database)
    }

    if (!this.database) {
      message.error('Have not login, login first')
    }
  }

  public static getInstance(options: OptionsType | null = null): Database {
    if (!Database.instance) {
      Database.instance = new Database(options)
    }
    return Database.instance
  }

  public getUser(): Realm.User {
    if (!this.user) {
      message.warning('Have not login, login first')
      throw new Error('Have not login, login first')
    }
    return this.user
  }

  async connect(email: string, password: string, database: string | null = null): Promise<void> {
    const crediential = Realm.Credentials.emailPassword(email, password)

    try {
      if (!this.app) throw new Error('System error, try later')
        Loading.show()
        // Promise<Realm.User<globalThis.Realm.DefaultFunctionsFactory & globalThis.Realm.BaseFunctionsFactory, SimpleObject, globalThis.Realm.DefaultUserProfileData>>
        this.user = await this.app.logIn(crediential, false)
        if (this.user) {
          this.isLogin = true
          let database_name = this.options.database
          if (database) { database_name = database }
          this.database = this.user.mongoClient(this.options.cluster).db(database_name)
          message.success('Login successful!')
        }
    } catch (err: any) {
      if (err.errorCode == 'InvalidPassword') {
        message.error('Authorization error, please check your email and password correct')
      } else if (err.errorCode == 'AuthError') {
        message.error(err.errorCode + ': Confirm your account in your email inbox')
      } else {
        message.error(err.errorCode)
      }
      throw new Error('Authentication failed')
    } finally {
      Loading.hide()
    }
  }

  async register(email: string, password: string): Promise<void> {
    try {
      Loading.show()
      await this.app?.emailPasswordAuth.registerUser({ email, password })
      message.success('Register successful!')
    } catch (err: any) {
      message.error(err.error)
      throw new Error('Register Error: ' + err.error)
    } finally {
      Loading.hide()
    }
  }

  async confirmUser(token: string, tokenId: string): Promise<void> {
    try {
      Loading.show()
      await this.app?.emailPasswordAuth.confirmUser({ token, tokenId })
      message.success('Confirm successful!')
    } catch (err: any) {
      message.error(err.error)
      throw new Error('Confirm Error: ' + err.error)
    } finally {
      Loading.hide()
    }
  }
  
  async resendConfirmationEmail(email: string): Promise<void> {
    try {
      Loading.show()
      await this.app?.emailPasswordAuth.resendConfirmationEmail({ email })
      message.success('Resend Confirm successful!')
    } catch (err: any) {
      message.error(err.error)
      throw new Error('Resend Confirm Error: ' + err.error)
    } finally {
      Loading.hide()
    }
  }
  
  async sendResetPasswordEmail(email: string): Promise<void> {
    try {
      Loading.show()
      await this.app?.emailPasswordAuth.sendResetPasswordEmail({ email })
      message.success('Resend Reset Password successful!')
    } catch (err: any) {
      message.error(err.error)
      throw new Error('Resend Reset Password Error: ' + err.error)
    } finally {
      Loading.hide()
    }
  }

  async count(collection: string, filter: object = {}): Promise<number> {
    if (!this.database) throw new Error('Database not initialized')

    return new Promise((resolve, reject) => {
      Loading.show()
      this.database.collection(collection).count<number>(filter).then((res: number) => {
        resolve(res)
      }).catch((err: any) => {
        message.error(err.error)
        reject(err)
      }).finally(() => {
        Loading.hide()
      })
    })
  }

  async findAll<T>(collection: string): Promise<Array<T> | []> {
    return new Promise<Array<T>>((resolve, reject) => {
      Loading.show()
      this.database.collection(collection).find().then((res: Array<T>) => {
        resolve(res)
      }).catch((err: any) => {
        console.log(err)
        reject(err)
        message.error(err.error)
      }).finally(() => {
        Loading.hide()
      })
    })
  }

  async findList<T>(collection: string, filter: object = {}, page_info: PageType = {page: 0, page_size: 10}): Promise<Array<T> | []> {
    return new Promise<Array<T>>((resolve, reject) => {
      Loading.show()
      this.database.collection(collection).aggregate([ { $match: filter },
                                                       { $skip: page_info.page },
                                                       { $limit: page_info.page_size }]).then(res => {
        resolve(res)
      }).catch((err: any) => {
        console.log(err)
        reject(err)
        message.error(err.error)
      }).finally(() => {
        Loading.hide()
      })
    })
  }

  // Single document operations
  async findOne<T>(collection: string, filter: object = {}): Promise<T | null> {
    return new Promise<T | null>((resolve, reject) => {
      Loading.show()
      this.database.collection(collection).findOne(filter).then(res => {
        resolve(res)
      }).catch(err => {
        message.error(err.error)
        reject(err)
      }).finally(() => {
        Loading.hide()
      })
    })
  }

  async addOne(collection: string, document: object = {}): Promise<UpdateType> {
    return new Promise((resolve, reject) => {
      Loading.show()
      this.database.collection(collection).insertOne(document).then(res => {
        resolve(res)
      }).catch((err: ErrorType) => {
        message.error(err.error)
        reject(err)
      }).finally(() => {
        Loading.hide()
      })
    })
  }

  async updateOne(collection: string, filter: object = {}, update: object): Promise<UpdateType> {
    return new Promise((resolve, reject) => {
      Loading.show()
      this.database.collection(collection).updateOne(filter, { $set: update }).then((res: UpdateType) => {
        if (res.modifiedCount == 1) {
          message.success('update success')
        } else {
          message.error('Update Error, target not found')
        }
        resolve(res)
      }).catch((err: ErrorType) => {
        message.error(err.error)
        reject(err)
      }).finally(() => {
        Loading.hide()
      })
    })
  }

  async deleteOne(collection: string, filter: object = {}): Promise<number> {
    return new Promise((resolve, reject) => {
      Loading.show()
      this.database.collection(collection).deleteOne(filter).then(res => {
        resolve(res)
      }).catch(err => {
        message.error(err.error)
        reject(err)
      }).finally(() => {
        Loading.hide()
      })
    })
  }

  // Batch operations
  async addMany(collection: string, documents: object[]): Promise<UpdateType> {
    return new Promise((resolve, reject) => {
      Loading.show()
      this.database.collection(collection).insertMany(documents).then(res => {
        resolve(res)
      }).catch(err => {
        message.error(err.error)
        reject(err)
      }).finally(() => {
        Loading.hide()
      })
    })
  }

  async updateMany(collection: string, filter: object = {}, update: object): Promise<UpdateType> {
    return new Promise((resolve, reject) => {
      Loading.show()
      this.database.collection(collection).updateMany(filter, { $set: update }).then(res => {
        resolve(res)
      }).catch(err => {
        message.error(err.error)
        reject(err)
      }).finally(() => {
        Loading.hide()
      })
    })
  }

  async deleteMany(collection: string, filter: object = {}): Promise<UpdateType> {
    return new Promise((resolve, reject) => {
      Loading.show()
      this.database.collection(collection).deleteMany(filter).then(res => {
        resolve(res)
      }).catch(err => {
        message.error(err.error)
        reject(err)
      }).finally(() => {
        Loading.hide()
      })
    })
  }

  // upload a file
  async uploadFile(collection: string, file: File, metadata: {user_id: BSON.ObjectId}): Promise<UpdateType> {
    Loading.show()
    try {
      const compress_image = await compressImage(file)
      if (compress_image == null) {
        throw Error('compress image error')
      }
      const binary = await fileToBinary(compress_image)
      
      const document: FileType = {
        filename: file.name,
        type: file.type,
        size: file.size,
        uploadDate: new Date(),
        ...metadata,
        data: binary
      }
      
      return new Promise((resolve, reject) => {
        this.database.collection(collection).insertOne(document).then((res: UpdateType) => {
          resolve(res)
        }).catch((err: ErrorType) => {
          message.error(err.error)
          reject(err)
        })
      })
    } catch(err: any) {
      console.log(err)
      message.error(err.message)
    } finally {
      Loading.hide()
    }
  }

  // delete a file
  async deleteFile(collection: string, fileId: Realm.BSON.ObjectId): Promise<UpdateType> {
    return new Promise((resolve, reject) => {
      Loading.show()
      this.database.collection(collection).deleteOne({ _id: fileId }).then(res => {
        resolve(res)
      }).catch(err => {
        message.error(err.error)
        reject(err)
      }).finally(() => {
        Loading.hide()
      })
    })
  }
}

export default Database
