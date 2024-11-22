type FileDocument = {
  _id?: string,
  creator: string,
  filename: string,
  type: string,
  size: Number,
  data: Binary,
  createAt: Date,
  expireAt: Date | null,
  description?: String,
  isDeleted: boolean
}

export type { FileDocument }
