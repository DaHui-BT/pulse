
// export const Type = ['DIRECTORY', 'FILE']
export enum FileDirectoryType {
  DIRECTORY,
  FILE
}

type FileType = {
  _id?: string,
  createdBy: string,
  title: string,
  tags: string[],
  description: string,
  public: boolean,
  expiredAt: Date | null,

  directory: string,
  filename: string,
  type: FileDirectoryType, // directory, file
  size: number,
  hash: string,
  dataUrl: string,
  parentId: string,
  createdAt?: Date,
  updatedAt?: Date,
  status?: number // 0 indicate can be viewd, 1 indicate expired, 2 indicate deleted
}

export type { FileType }
