// import { BSON } from 'realm-web'
import imageCompression from 'browser-image-compression'

async function compressImage(file: File): Promise<File | null> {
  try {
    // Compression options
    const options = {
      maxSizeMB: 1,              // Maximum size in MB
      maxWidthOrHeight: 1920,    // Maximum width or height
      useWebWorker: true,        // Use Web Worker for better performance
      onProgress: (progress: number) => {
        console.log(`Compression Progress: ${progress}%`);
      },
    };

    // Compress the image
    const compressedFile = await imageCompression(file, options);

    // Create a new File object with the compressed data
    const compressedImage = new File([compressedFile], file.name, {
      type: compressedFile.type
    });

    return compressedImage
  } catch (error) {
    console.error('Error in compression or upload:', error);
  }
  return null
}
// convert File to Binary
async function fileToBinary(file: File): Promise<BSON.Binary> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target && event.target.result) {
        const binary = new BSON.Binary(new Uint8Array(event.target.result as ArrayBuffer))
        resolve(binary)
      } else {
        reject(new Error("Failed to read file"))
      }
    }
    reader.onerror = (error) => reject(error)
    reader.readAsArrayBuffer(file)
  })
}


function getImageUrl(fileData: Uint8Array, metadata: any = {}): string | null {
  try {
    // const { fileData, metadata } = await getFile(dbName, collectionName, fileId)
    
    // Create a Blob from the file data
    const blob = new Blob([fileData], { type: metadata.contentType })
    
    // Create a URL for the Blob
    const imageUrl = URL.createObjectURL(blob)

    return imageUrl
  } catch (error) {
    console.error('Error displaying image:', error)
  }
  return null
}

function getImageBase64(fileData: Binary): string {
  return 'data:image/png;base64,' + fileData.buffer.toString('base64')
}

export { compressImage, fileToBinary, getImageUrl, getImageBase64 }
