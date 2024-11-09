import { BSON } from "realm-web"

type ErrorType = {
  error: string,
  error_code: String,
  link: String
}

type UpdateType = {
  matchedCount: number,
  modifiedCount: number
}

interface DatabaseOptions {
  appId: string;
  cluster: string;
  database: string;
  collection?: string;
}

interface BaseDocument {
  _id?: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PaginationOptions {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 1 | -1;
}

interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

type ObjectId = BSON.ObjectId

export {
  ErrorType,
  UpdateType,
  ObjectId,
  DatabaseOptions,
  BaseDocument,
  PaginationOptions,
  ServiceResponse
}
