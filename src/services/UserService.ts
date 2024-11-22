import { UserDocument } from "../entities/user"
import { fileToBinary, compressImage } from "../tools/image_tools"
import { Database } from "../tools/realm"
import { ObjectId, PaginationOptions, ServiceResponse } from "../types/realm"

class UserService {
  private static instance: UserService
  private readonly collection = 'user'
  private db: Database

  private constructor() {
    this.db = Database.getInstance({
      appId: 'pulse-application-tpfmdtx',
      cluster: 'mongodb-atlas',
      database: 'pulse-database',
      collection: 'user'
    })
  }

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }
    return UserService.instance
  }

  public async login(username: string, password: string): Promise<ServiceResponse<void>> {
    try {
      const user = await this.db.connect(username, password)
      return { success: true, data: user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  async register(email: string, password: string): Promise<ServiceResponse<void>> {
    try {
      const user = await this.db.register(email, password)
      return { success: true, data: user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
  
  
  async confirmUser(token: string, tokenId: string): Promise<ServiceResponse<void>> {
    try {
      const user = await this.db.confirmUser(token, tokenId)
      return { success: true, data: user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
  
  async resendConfirmationEmail(email: string): Promise<ServiceResponse<void>> {
    try {
      const user = await this.db.resendConfirmationEmail(email)
      return { success: true, data: user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
  
  async sendResetPasswordEmail(email: string): Promise<ServiceResponse<void>> {
    try {
      const user = await this.db.sendResetPasswordEmail(email)
      return { success: true, data: user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
  
  public getCurrentUser(): UserDocument {
    const user = this.db.getCurrentUser()
    return user?.customData as unknown as UserDocument
  }

  public async findUserById(userId: ObjectId): Promise<ServiceResponse<UserDocument>> {
    try {
      const user = await this.db.findOne<UserDocument>(this.collection, { _id: userId })
      return { success: true, data: user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async findUsers(
    filter: Partial<UserDocument> = {},
    pagination: PaginationOptions = {page: 0, pageSize: 10}
  ): Promise<ServiceResponse<{ users: UserDocument[], total: number }>> {
    try {
      const [users, total] = await Promise.all([
        this.db.find<UserDocument>(this.collection, filter, pagination),
        this.db.count<UserDocument>(this.collection, filter)
      ])

      return { 
        success: true, 
        data: { users, total } 
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async createUser(
    userData: UserDocument
  ): Promise<ServiceResponse<UserDocument>> {
    try {
      const user = await this.db.insertOne<UserDocument>(this.collection, {
        ...userData,
        isActive: true,
      })
      return { success: true, data: user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async updateUser(
    userId: ObjectId,
    userData: Partial<UserDocument>
  ): Promise<ServiceResponse<boolean>> {
    try {
      const updated = await this.db.updateOne<UserDocument>(
        this.collection,
        { _id: userId },
        userData
      )
      return { success: true, data: updated }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async updateAvatar(
    userId: ObjectId,
    file: File
  ): Promise<ServiceResponse<boolean>> {
    try {
      const compressedImage = await compressImage(file)
      if (!compressedImage) {
        throw new Error('Image compression failed')
      }

      const binary = await fileToBinary(compressedImage)
      const avatar = {
        filename: file.name,
        type: file.type,
        size: file.size,
        data: binary
      }

      return await this.updateUser(userId, { avatar })
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async deleteById(userId: ObjectId): Promise<ServiceResponse<boolean>> {
    try {
      const updated = this.db.updateOne<UserDocument>(this.collection, { _id: userId }, { isActive: false })
      return { success: true, data: updated }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}


export { UserService }
