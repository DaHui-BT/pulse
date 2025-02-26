// hash.worker.ts
import SparkMD5 from 'spark-md5'

self.onmessage = async (e) => {
  try {
    const hashes = await Promise.all(
      e.data.chunks.map((blob: Blob) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onload = (e) => {
            const spark = new SparkMD5.ArrayBuffer()
            spark.append(e.target!.result as ArrayBuffer)
            resolve(spark.end())
          }
          reader.readAsArrayBuffer(blob)
        })
      })
    )
    
    self.postMessage({ hashes })
  } catch (err) {
    self.postMessage({ error: err.message })
  }
}
