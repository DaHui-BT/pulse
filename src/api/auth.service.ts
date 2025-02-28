import { UserDocument } from "../entities/user"
import { Request } from "../tools/request"
import { ServiceResponse } from "../types/realm"
import { useAuthStore } from '../store/index'


type LoginResponse = {user: UserDocument, token: string, refreshToken: string}

class AuthService {
  private static instance: AuthService
  private request: Request
  private store

  private constructor() {
    this.request = new Request()
    this.store = useAuthStore()
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  public async login(username: string, password: string): Promise<ServiceResponse<void>> {
    try {
      const response = await this.request.post<LoginResponse>('/login', {data: {username, password}})

      if (response.code == 200) {
        this.store.login(response.data.token, response.data.refreshToken, response.data.user)
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
  
  async refreshToken(token: string): Promise<ServiceResponse<void>> {
    try {
      const response = await this.request.post('/refresh', {
        data: { token }
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
  
  async confirmAuth(token: string): Promise<ServiceResponse<void>> {
    try {
      const response = await this.request.post(`/confirm`, { data: {token: token} })
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
      const response = await this.request.post('/resend-email', { data: { email: email } })
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
  
}


export default AuthService
