import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method,
                AxiosInterceptorManager, InternalAxiosRequestConfig,
                AxiosHeaders } from 'axios'

import { useAuthStore } from '../store'

type Interceptors = {
  request: AxiosInterceptorManager<InternalAxiosRequestConfig>
  response: AxiosInterceptorManager<AxiosResponse>
}

type ResponseType<T> = {
  code: number
  data: T
  message: string
  time: number
}

export class Request {
  instance: AxiosInstance
  timeout: number
  baseURL: string = import.meta.env.VITE_BASE_URL
  interceptors: Interceptors
  store = useAuthStore()
  expireRequests: InternalAxiosRequestConfig[] = []

  constructor(config: AxiosRequestConfig = {}) {
    // Default values for timeout and baseURL
    this.timeout = config.timeout || 10000
    this.instance = axios.create({
      ...config,
      baseURL: this.baseURL,
      timeout: this.timeout,
    })

    this.interceptors = {
      request: axios.interceptors.request,
      response: axios.interceptors.response,
    }

    // Initialize interceptors
    this.setupInterceptors()
  }

  /**
   * Set up request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor - Token management, Add Authorization header
    this.instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig<any>> => {
        const token = this.store.accessToken // Or from your store (e.g., Pinia)
        
        if (token && this.store.getExpireTime(token).getTime() > Date.now()) {
          config.headers = AxiosHeaders.from({
            ...config.headers,
            Authorization: `Bearer ${token}`,
          })
        } else {
          this.expireRequests.push(config)
          if (this.store.refreshToken.length > 0) {
            // return await this.post<string>('refresh', { data: {token: this.store.refreshToken} }).then(
            //   (res) => {
            //     if (res.code === 200) {
            //       this.store.setAccessToken(res.data)
            //       return config
            //     } else {
            //       this.store.logout()
            //     }
            //   }
            // )
          }
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor - Global response handling (e.g., error management)
    this.instance.interceptors.response.use(
      async (response: AxiosResponse) => {
        // Centralized error handling (e.g., logging, alerting)
        if (response.data.code && response.data.code === 401) {
          // Handle token expiry or unauthorized errors globally
          console.error('Unauthorized! Redirecting to login...')
          // Optionally, you could log the user out or refresh the token here
        }
        // return Promise.reject(response)
        // You can handle common response formatting here if needed
        return response.data
      },
      (error) => {
        // Centralized error handling (e.g., logging, alerting)
        if (error.response && error.response.status === 401) {
          // Handle token expiry or unauthorized errors globally
          console.error('Unauthorized! Redirecting to login...')
          // Optionally, you could log the user out or refresh the token here
          localStorage.removeItem('token')
        }
        return Promise.reject(error)
      }
    )
  }

  /**
   * A generic method to make HTTP requests.
   * @param method - HTTP method (GET, POST, PUT, DELETE)
   * @param url - Endpoint URL
   * @param options - Additional Axios configuration
   */
  private request<T>(method: Method, url: string, options: AxiosRequestConfig = {}): Promise<ResponseType<T>> {
    return this.instance.request({
      url,
      method,
      ...options,
    })
  }

  /**
   * Perform a GET request.
   * @param url - The URL of the resource
   * @param options - The Axios configuration (headers, params, etc.)
   */
  get<T>(url: string, options: AxiosRequestConfig = {}): Promise<ResponseType<T>> {
    return this.request<T>('GET', url, options)
  }

  /**
   * Perform a POST request.
   * @param url - The URL of the resource
   * @param options - The Axios configuration (headers, body, etc.)
   */
  post<T>(url: string, options: AxiosRequestConfig = { headers: { 'Content-Type': 'application/x-www-form-urlencodedcharset=UTF-8' } }): Promise<ResponseType<T>> {
    return this.request<T>('POST', url, options)
  }

  /**
   * Perform a PUT request.
   * @param url - The URL of the resource
   * @param options - The Axios configuration (headers, body, etc.)
   */
  put<T>(url: string, options: AxiosRequestConfig = {}): Promise<ResponseType<T>> {
    return this.request<T>('PUT', url, options)
  }

  /**
   * Perform a DELETE request.
   * @param url - The URL of the resource
   * @param options - The Axios configuration (headers, body, etc.)
   */
  delete<T>(url: string, options: AxiosRequestConfig = {}): Promise<ResponseType<T>> {
    return this.request<T>('DELETE', url, options)
  }

  /**
   * Add a custom request interceptor
   * @param onFulfilled - Function to handle request
   * @param onRejected - Function to handle errors
   */
  addRequestInterceptor(onFulfilled: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>, onRejected: (error: any) => any): number {
    return this.instance.interceptors.request.use(onFulfilled, onRejected)
  }

  /**
   * Add a custom response interceptor
   * @param onFulfilled - Function to handle response
   * @param onRejected - Function to handle errors
   */
  addResponseInterceptor(onFulfilled: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>, onRejected: (error: any) => any): number {
    return this.instance.interceptors.response.use(onFulfilled, onRejected)
  }

  /**
   * Remove a request interceptor by ID
   * @param id - The interceptor ID
   */
  ejectRequestInterceptor(id: number): void {
    this.instance.interceptors.request.eject(id)
  }

  /**
   * Remove a response interceptor by ID
   * @param id - The interceptor ID
   */
  ejectResponseInterceptor(id: number): void {
    this.instance.interceptors.response.eject(id)
  }

  /**
   * Clear all interceptors
   */
  clearAllInterceptors(): void {
    this.instance.interceptors.request.clear()
    this.instance.interceptors.response.clear()
  }
}
