import { FileDocument } from "../entities/file"
import { Request } from "../tools/request"
import { FileType } from "../types/file"
import PaginationType from "../types/pagination"
import { PaginationOptions, ServiceResponse } from "../types/realm"

class FileService {
  private static instance: FileService
  private request: Request

  private constructor() {
    this.request = new Request()
  }

  public static getInstance(): FileService {
    if (!FileService.instance) {
      FileService.instance = new FileService()
    }
    return FileService.instance
  }

  public async findFileById(fileName: string): Promise<ServiceResponse<FileDocument | null>> {
    try {
      const file = await this.request.get<FileDocument>(`/file/${fileName}`)
      return { success: true, data: file.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
  
  public async findAllFiles(): Promise<ServiceResponse<FileDocument[]>> {
    try {
      const files = await this.request.get<FileDocument[]>('/file')
      return { success: true, data: files.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async findFiles(
    filter: Partial<FileType> = {},
    pagination = {current: 0, size: 10}
  ): Promise<ServiceResponse<{ files: FileType[], pagination: PaginationType } | null>> {
    try {
      const res = await this.request.get<{data: FileType[], pagination: PaginationType}>('/file', {
        data: {
          ...filter,
          ...pagination
        }
      })
      if (res.code === 200) {
        return {success: true, data: { files: res.data.data, pagination: res.data.pagination}}
      } else {
        return { success: false, data: null }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async existFileByHash(hash: string): Promise<ServiceResponse<boolean>> {
    try {
      const file = await this.request.get<boolean>(`/file/exist/${hash}`)
      return { success: true, data: file.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async mergeChunks(hash: string): Promise<ServiceResponse<boolean>> {
    try {
      const res = await this.request.post<boolean>(`/file/merge`, { data: { hash } })
      return { success: true, data: res.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async uploadFile(
    fileData: File | FormData
  ): Promise<ServiceResponse<string>> {
    try {
      const response = await this.request.post<string>('/file/upload', 
                                                                  { data: fileData,
                                                                    headers: {
                                                                      "Content-Type": 'multipart/form-data'
                                                                    } })
      if (response.code == 200) {
        return { success: true, data: response.data }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async deleteById(fileName: string): Promise<ServiceResponse<boolean>> {
    try {
      const updated = this.request.delete<FileDocument>(`/file/${fileName}`)
      return { success: true, data: updated }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}


export { FileService }
