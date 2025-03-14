import { ChunkType } from "../tools/file.tool"
import { Request, ResponseType } from "../tools/request"
import { FileType } from "../types/file"
import PaginationType from "../types/pagination"
import { ServiceResponse } from "../types/realm"

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

  public async findFileById(fileName: string): Promise<ServiceResponse<FileType | null>> {
    try {
      const file = await this.request.get<FileType>(`/file/${fileName}`)
      return { success: true, data: file.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
  
  public async findAllFiles(): Promise<ServiceResponse<FileType[]>> {
    try {
      const files = await this.request.get<FileType[]>('/file')
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
        params: {
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

  public async mergeChunks(mergeMeta: {fileName: string, fileHash: string, chunkSize: number}): Promise<ResponseType<string>> {
    return this.request.post<string>(`/file/merge`, { data: mergeMeta })
  }
  
  public async uploadFile(
    fileData: FileType
  ): Promise<ServiceResponse<string>> {
    try {
      const response = await this.request.post<string>('/file', {
        data: fileData
      })
      if (response.code == 200) {
        return { success: true, data: response.data, message: response.message }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async uploadChunk(
    chunk: ChunkType,
    signal: AbortSignal | undefined = undefined
  ): Promise<ServiceResponse<{fileUrl: string}>> {
    try {
      const response = await this.request.post<{fileUrl: string}>('/file/chunk', 
                                                                  { data:
                                                                    chunk,
                                                                    headers: {
                                                                      "Content-Type": 'multipart/form-data'
                                                                    }, signal })
      if (response.code == 200) {
        return { success: true, data: response.data }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async updateFile(
    fileId: string,
    fileData: Partial<FileType>
  ): Promise<ServiceResponse<string>> {
    try {
      const response = await this.request.put<string>(`/file/${fileId}`, {
        data: fileData
      })
      if (response.code == 200) {
        return { success: true, data: response.data, message: response.message }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async deleteById(fileName: string): Promise<ServiceResponse<boolean>> {
    try {
      const deleted = await this.request.delete<{data: boolean, message: string}>(`/file/${fileName}`)
      return { success: true, data: deleted.data, message: deleted.message }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }  

  public async deletePerpetualById(fileName: string): Promise<ServiceResponse<boolean>> {
    try {
      const deleted = await this.request.delete<{data: boolean, message: string}>(`/file/${fileName}`)
      return { success: true, data: deleted.data, message: deleted.message }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
}


export { FileService }
