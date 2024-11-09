import { FileDocument } from "../entities/file"
import { Database } from "../tools/realm"
import { ObjectId, PaginationOptions, ServiceResponse } from "../types/realm"

class FileService {
  private static instance: FileService
  private readonly collection = 'file'
  private db: Database

  private constructor() {
    this.db = Database.getInstance({
      appId: 'pulse-application-tpfmdtx',
      cluster: 'mongodb-atlas',
      database: 'pulse-database',
      collection: 'file'
    })
  }

  public static getInstance(): FileService {
    if (!FileService.instance) {
      FileService.instance = new FileService()
    }
    return FileService.instance
  }

  public async findFileById(fileId: ObjectId): Promise<ServiceResponse<FileDocument | null>> {
    try {
      const file = await this.db.findOne<FileDocument>(this.collection, { _id: fileId })
      return { success: true, data: file }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
  
  public async findAllFiles(): Promise<ServiceResponse<FileDocument[]>> {
    try {
      const files = await this.db.findAll<FileDocument>(this.collection)
      return { success: true, data: files }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async findFiles(
    filter: Partial<FileDocument> = {},
    pagination: PaginationOptions = {page: 0, pageSize: 10}
  ): Promise<ServiceResponse<{ files: FileDocument[], total: number }>> {
    try {
      const [files, total] = await Promise.all([
        this.db.find<FileDocument>(this.collection, filter, pagination),
        this.db.count<FileDocument>(this.collection, filter)
      ])

      return { 
        success: true, 
        data: { files, total } 
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async uploadFile(
    fileData: FileDocument
  ): Promise<ServiceResponse<FileDocument>> {
    try {
      const file = await this.db.insertOne<FileDocument>(this.collection, {
        ...fileData,
        isDeleted: false,
      })
      return { success: true, data: file }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async updateFile(
    fileId: ObjectId,
    fileData: Partial<FileDocument>
  ): Promise<ServiceResponse<boolean>> {
    try {
      const updated = await this.db.updateOne<FileDocument>(
        this.collection,
        { _id: fileId },
        fileData
      )
      return { success: true, data: updated }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async deleteById(fileId: ObjectId): Promise<ServiceResponse<boolean>> {
    try {
      const updated = this.db.updateOne<FileDocument>(this.collection, { _id: fileId }, { isDeleted: true })
      return { success: true, data: updated }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
}


export { FileService }
