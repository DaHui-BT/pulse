import { FileDocument } from "../entities/file"
import { Request } from "../tools/request"
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
    filter: Partial<FileDocument> = {},
    pagination: PaginationOptions = {page: 0, pageSize: 10}
  ): Promise<ServiceResponse<{ files: FileDocument[], total: number }>> {
    try {
      // const [files, total] = await Promise.all([
      //   this.request.find<FileDocument>(this.collection, filter, pagination),
      //   this.request.count<FileDocument>(this.collection, filter)
      // ])

      return { 
        success: true, 
        // data: { files, total } 
        data: { files: [], total: 0 } 
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
  ): Promise<ServiceResponse<{fileUrl: string}>> {
    try {
      const response = await this.request.post<{fileUrl: string}>('/file/upload', 
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
