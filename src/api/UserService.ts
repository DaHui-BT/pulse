import { UserDocument } from "../entities/user"
import { fileToBinary, compressImage } from "../tools/image_tools"
import { Request } from "../tools/request"
import { PaginationOptions, ServiceResponse } from "../types/realm"
import { useAuthStore } from '../store/index'
import { AxiosRequestConfig } from "axios"


type LoginResponse = {user: UserDocument, token: string, refreshToken: string, expiration: number}

class UserService {
  private static instance: UserService
  private request: Request
  private store

  private constructor() {
    this.request = new Request()
    this.store = useAuthStore()
  }

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }
    return UserService.instance
  }

  public async login(username: string, password: string): Promise<ServiceResponse<void>> {
    try {
      const response = await this.request.post<LoginResponse>('/login', {data: {username, password}})

      if (response.code == 200) {
        this.store.setAccessToken(response.data.token, response.data.refreshToken, response.data.expiration)
        this.store.setUser(response.data.user)
        return { success: true }
      } else {
        return { success: false, error: response.message}
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  async register(username: string, email: string, password: string): Promise<ServiceResponse<void>> {
    try {
      const response = await this.request.post('/register', {
        data: {
          email: email,
          username: username,
          password: password
        }
      })
      if (response.code == 200) {
        return { success: true }
      } else {
        return { success: false, error: response.message}
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
  
  
  async confirmUser(token: string): Promise<ServiceResponse<void>> {
    try {
      const response = await this.request.post(`/user/confirm`, { data: {token: token} })
      if (response.code == 200) {
        return { success: true }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
  
  async resendConfirmationEmail(email: string): Promise<ServiceResponse<void>> {
    try {
      const response = await this.request.post('/user/resend-email', { data: { email: email } })
      if (response.code == 200) {
        return { success: true }
      } else {
        return { success: false, error: response.message}
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
  
  async sendResetPasswordEmail(email: string): Promise<ServiceResponse<void>> {
    try {
      const isReset = await this.request.get(`/reset-password/${email}`)
      if (isReset) {
        return { success: true }
      } else {
        return { success: false }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
  
  public async findUserById(userId: string): Promise<ServiceResponse<UserDocument>> {
    try {
      const response = await this.request.get<UserDocument>(`/user/self/${userId}`, { headers: { Authorization: this.store.accessToken }})
      if (response.code == 200) {
        return { success: true, data: response.data }
      } else {
        return { success: false, error: response.message, data: response.data }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
  
  public async findUserByUsername(username: string): Promise<ServiceResponse<UserDocument>> {
    try {
      const response = await this.request.get<UserDocument>(`/user/info-username/${username}`)
      if (response.code == 200) {
        return { success: true, data: response.data }
      } else {
        return { success: false, error: response.message, data: response.data }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
  
  public async existUserByUsername(username: string, options: AxiosRequestConfig = {}): Promise<ServiceResponse<UserDocument>> {
    try {
      const response = await this.request.get<UserDocument>(`/user/exist-username/${username}`, options)
      if (response.code == 200) {
        return { success: true, data: response.data }
      } else {
        return { success: false, error: response.message, data: response.data }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
  
  public async existUserByEmail(email: string, options: AxiosRequestConfig = {}): Promise<ServiceResponse<UserDocument>> {
    try {
      const response = await this.request.get<UserDocument>(`/user/exist-email/${email}`, options)
      if (response.code == 200) {
        return { success: true, data: response.data }
      } else {
        return { success: false, error: response.message, data: response.data }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
  
  public async findUserInfoById(userId: string): Promise<ServiceResponse<UserDocument>> {
    try {
      const response = await this.request.get<UserDocument>(`/user/info/${userId}`)
      if (response.code == 200) {
        return { success: true, data: response.data }
      } else {
        return { success: false, error: response.message, data: response.data }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async findUsers(
    filter: Partial<UserDocument> = {},
    pagination: PaginationOptions = {page: 0, pageSize: 10}
  ): Promise<ServiceResponse<{ users: UserDocument[], total: number }>> {
    try {
      const [users, total] = await Promise.all([
        this.request.get<UserDocument>('/user', { params: filter }),
        // this.request.count<UserDocument>(this.collection, filter)
      ])

      return { 
        success: true, 
        data: { users, total } 
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async createUser(
    userData: UserDocument
  ): Promise<ServiceResponse<UserDocument>> {
    try {
      const response = await this.request.post<UserDocument>('/user', { data: {
        ...userData
      }})
      if (response.code == 200) {
        return { success: true, data: response.data }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async updateUser(
    userId: string,
    userData: Partial<UserDocument>
  ): Promise<ServiceResponse<UserDocument>> {
    try {
      const response = await this.request.put<UserDocument>(`/user/${userId}`, { data: userData })
      if (response.code == 200) {
        return { success: true, data: response.data, message: response.message }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async updateAvatar(
    userId: string,
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

  public async deleteById(userId: string): Promise<ServiceResponse<boolean>> {
    try {
      const response = await this.request.delete<UserDocument>(`/user/${userId}`)
      if (response.code == 200) {
        return { success: true, data: true }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}


export { UserService }
