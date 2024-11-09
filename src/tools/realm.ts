import * as Realm from 'realm-web'
import { DatabaseOptions, PaginationOptions } from "../types/realm"


class Database {
  private static instance: Database
  private app: Realm.App
  private user: Realm.User | null = null
  private db: Realm.Services.MongoDB | null = null
  
  private constructor(private options: DatabaseOptions) {
    this.app = new Realm.App({ id: options.appId })
    this.initializeCurrentUser()
  }

  private initializeCurrentUser(): void {
    this.user = this.app.currentUser
    if (this.user?.isLoggedIn) {
      this.db = this.user.mongoClient(this.options.cluster).db(this.options.database)
    }
  }

  public static getInstance(options?: DatabaseOptions): Database {
    if (!Database.instance) {
      if (!options) {
        throw new Error('Database options required for initialization')
      }
      Database.instance = new Database(options)
    }
    return Database.instance
  }

  public getCurrentUser(): Realm.User | null {
    return this.user
  }

  public async connect(email: string, password: string, fetchProfile: boolean = false): Promise<void> {
    try {
      const credentials = Realm.Credentials.emailPassword(email, password)
      this.user = await this.app.logIn(credentials, fetchProfile)
      this.initializeCurrentUser()
    } catch (error) {
      throw this.handleError(error)
    }
  }


  public async register(email: string, password: string): Promise<void> {
    try {
      await this.app?.emailPasswordAuth.registerUser({ email, password })
    } catch (err: any) {
      throw new Error('Register Error: ' + err.error)
    }
  }

  async confirmUser(token: string, tokenId: string): Promise<void> {
    try {
      await this.app?.emailPasswordAuth.confirmUser({ token, tokenId })
    } catch (err: any) {
      throw new Error('Confirm Error: ' + err.error)
    }
  }
  
  async resendConfirmationEmail(email: string): Promise<void> {
    try {
      await this.app?.emailPasswordAuth.resendConfirmationEmail({ email })
    } catch (err: any) {
      throw new Error('Resend Confirm Error: ' + err.error)
    }
  }
  
  async sendResetPasswordEmail(email: string): Promise<void> {
    try {
      await this.app?.emailPasswordAuth.sendResetPasswordEmail({ email })
    } catch (err: any) {
      throw new Error('Resend Reset Password Error: ' + err.error)
    }
  }

  public async isOwner(collection: string, resourceId: string, userId: string): Promise<boolean> {
    const resource = await this.db.findOne(collection, { _id: resourceId, author: userId });
    return !!resource;
  }

  private handleError(error: any): Error {
    const errorMessage = error.errorCode ? `${error.errorCode}: ${error.message}` : error.message
    return new Error(errorMessage)
  }

  public async findOne<T>(
    collection: string,
    filter: Partial<T>
  ): Promise<T | null> {
    if (!this.db) throw new Error('Database not initialized')
    return this.db.collection<T>(collection).findOne(filter)
  }
  
  public async findAll<T>(
    collection: string,
    filter: Partial<T> = {}
  ): Promise<T[]> {
    if (!this.db) throw new Error('Database not initialized')
    return this.db.collection<T>(collection).find(filter)
  }

  public async find<T>(
    collection: string,
    filter: Partial<T>,
    options: PaginationOptions
  ): Promise<T[]> {
    if (!this.db) throw new Error('Database not initialized')
    
    const { page, pageSize, sortBy, sortOrder } = options
    const skip = page * pageSize

    // Using aggregate for pagination and sorting in Realm Web SDK
    const pipeline = [
      { $match: filter },
      ...(sortBy ? [{ $sort: { [sortBy]: sortOrder || -1 } }] : []),
      { $skip: skip },
      { $limit: pageSize }
    ]

    return this.db.collection<T>(collection).aggregate(pipeline)
  }

  public async count<T>(
    collection: string,
    filter: Partial<T> = {}
  ): Promise<number> {
    if (!this.db) throw new Error('Database not initialized')
    return this.db.collection<T>(collection).count(filter)
  }

  public async insertOne<T>(
    collection: string,
    document: T
  ): Promise<T> {
    if (!this.db) throw new Error('Database not initialized')
    
    const now = new Date()
    const documentWithTimestamps = {
      ...document,
      createdAt: now,
      updatedAt: now,
    }
    
    const result = await this.db.collection<T>(collection).insertOne(documentWithTimestamps as T)
    return { ...documentWithTimestamps, _id: result.insertedId } as T
  }

  public async updateOne<T>(
    collection: string,
    filter: Partial<T>,
    update: Partial<T>
  ): Promise<boolean> {
    if (!this.db) throw new Error('Database not initialized')
    
    const updateDoc = {
      $set: {
        ...update,
        updatedAt: new Date(),
      },
    }
    
    const result = await this.db.collection<T>(collection).updateOne(filter, updateDoc)
    return result.modifiedCount > 0
  }

  public async deleteOne<T>(
    collection: string,
    filter: Partial<T>
  ): Promise<boolean> {
    if (!this.db) throw new Error('Database not initialized')
    const result = await this.db.collection<T>(collection).deleteOne(filter)
    return result.deletedCount > 0
  }
}

export { Database }
