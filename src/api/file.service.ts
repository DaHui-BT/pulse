import { FileDocument } from "../entities/file"
import { ChunkType } from "../tools/file.tool"
import { Request, ResponseType } from "../tools/request"
import { FileType } from "../types/file"
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

  public async mergeChunks(mergeMeta: {fileName: string, fileHash: string, chunkSize: number}): Promise<ResponseType<string>> {
    return this.request.post<string>(`/file/merge`, { data: mergeMeta })
  }
  
  public async uploadFile(
    fileData: FileType
  ): Promise<ServiceResponse<boolean>> {
    try {
      const response = await this.request.post<boolean>('/file', {
        data: fileData
      })
      if (response.code == 200) {
        return { success: true, data: response.data }
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
