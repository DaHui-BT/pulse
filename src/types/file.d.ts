import { BSON } from "realm-web"

const Type = ['DIRECTORY', 'FILE']

type FileType = {
  _id?: string,
  createdBy: IDType,
  directory: string,
  filename: string,
  type: typeof Type[number], // directory, file
  size: number,
  hash: string,
  dataUrl: string,
  parentId: IDType,
  createdAt: Date,
  updatedAt: Date,
  expiredAt: Date | null,
  description?: string,
  status: number // 0 indicate can be viewd, 1 indicate expired, 2 indicate deleted
}

export type { FileType }
