// FileTools.ts
import SparkMD5 from 'spark-md5'
import { FileService } from '../api/file.service'


interface ChunkMeta {
  index: number
  start: number
  end: number
  hash: string
  blob: Blob
}

export type ChunkType = {
  file: Blob,
  hash: string,
  index: number,
  total: number,
  fileHash: string
}

const DEFAULT_CHUNK_SIZE = 2 * 1024 * 1024 // 2MB

export class FileUploader {
  private chunkSize: number
  private concurrency: number
  private file: File | null = null
  private fileHash: string = ''
  private chunkMap: Map<number, ChunkMeta> = new Map()
  private abortController: AbortController = new AbortController()
  private fileService = FileService.getInstance()

  constructor(
    chunkSize: number = DEFAULT_CHUNK_SIZE, 
    concurrency: number = navigator.hardwareConcurrency || 4
  ) {
    this.chunkSize = chunkSize
    this.concurrency = concurrency
  }

  // 生成文件指纹（Web Worker优化版）
  private async generateFileHash(): Promise<string> {
    return new Promise((resolve, reject) => {
      const spark = new SparkMD5.ArrayBuffer()
      const reader = new FileReader()
      const chunkSize = this.chunkSize
      const chunks = Math.ceil(this.file!.size / chunkSize)
      let currentChunk = 0

      reader.onload = (e) => {
        spark.append(e.target!.result as ArrayBuffer)
        currentChunk++

        if (currentChunk < chunks) {
          loadNext()
        } else {
          resolve(spark.end())
        }
      }

      const loadNext = () => {
        const start = currentChunk * chunkSize
        const end = Math.min(start + chunkSize, this.file!.size)
        reader.readAsArrayBuffer(this.file!.slice(start, end))
      }

      loadNext()
    })
  }

  // 智能分片策略
  private createChunks(): ChunkMeta[] {
    if (!this.file) return []
    
    const chunks = []
    const chunkCount = Math.ceil(this.file.size / this.chunkSize)
    
    for (let i = 0; i < chunkCount; i++) {
      const start = i * this.chunkSize
      const end = Math.min(start + this.chunkSize, this.file.size)
      chunks.push({
        index: i,
        start,
        end,
        hash: '',
        blob: this.file.slice(start, end)
      })
    }
    return chunks
  }

  // 分片哈希计算（Worker优化版）
  private async calculateChunkHashes(chunks: ChunkMeta[]): Promise<void> {
    const worker = new Worker(new URL('/workers/hash.worker.ts', import.meta.url), { type: 'module' })
    
    return new Promise((resolve, reject) => {
      worker.onmessage = (e) => {
        if (e.data.error) {
          reject(e.data.error)
          return
        }

        e.data.hashes.forEach((hash: string, index: number) => {
          chunks[index].hash = hash
        })
        resolve()
      }

      worker.postMessage({
        chunks: chunks.map(c => c.blob)
      })
    })
  }

  // 并发上传控制器
  private async uploadChunks(chunks: ChunkMeta[]) {
    const pendingQueue = [...chunks]
    const activeTasks: Promise<void>[] = []
    let completed = 0
    let resolve: (value?: any) => void = () => {}
    let reject: (value?: any) => void = () => {}
    const promise = new Promise((res, rej) => {resolve = res, reject = rej})

    const processNext = async (): Promise<void> => {
      if (pendingQueue.length === 0 || this.abortController.signal.aborted) return

      const chunk = pendingQueue.shift()!
      const task = this.fileService.uploadChunk({
        file: chunk.blob,
        hash: chunk.hash,
        index: chunk.index,
        total: chunks.length,
        fileHash: this.fileHash
      }, this.abortController.signal).then(() => {
        completed++
        console.log(`Progress: ${((completed / chunks.length) * 100).toFixed(1)}%`)
        if (completed === chunks.length) {
          resolve()
        }
      }).catch(err => {
        if (!this.abortController.signal.aborted) {
          pendingQueue.push(chunk) // 重新加入队列
        } else {
          reject(err)
        }
      }).finally(() => {
        activeTasks.splice(activeTasks.indexOf(task), 1)
      })

      activeTasks.push(task)
      await processNext()
    }

    // 启动并发
    const workers = Array(Math.min(this.concurrency, chunks.length))
      .fill(null)
      .map(processNext)

    await Promise.all(workers)
    return promise
  }

  // 主上传流程
  async upload(file: File): Promise<{ success: boolean, data: string | null, message: string }> {
    this.file = file
    try {
      // 步骤1: 计算文件整体哈希
      this.fileHash = await this.generateFileHash()
      
      // 步骤2: 检查服务端是否已存在完整文件
      const existRes = await this.fileService.existFileByHash(this.fileHash)
      if (existRes.data) {
        return { success: true, data: null, message: 'File already upload' }
      }

      // 步骤3: 创建分片
      const chunks = this.createChunks()
      
      // 步骤4: 计算分片哈希
      await this.calculateChunkHashes(chunks)

      // 步骤5: 上传分片
      await this.uploadChunks(chunks)

      // 步骤6: 通知服务端合并
      const response = await this.fileService.mergeChunks({
        fileName: file.name,
        fileHash: this.fileHash,
        chunkSize: this.chunkSize
      })
      if (response.code === 200) {
        return {success: true, data: response.data, message: 'Upload file successfully'}
      }
    } catch (err) {
      console.error('Upload failed:', err)
      return { success: false, message: 'Upload failed', data: null }
    }
  }

  abort() {
    this.abortController.abort()
  }
}

export default FileUploader
