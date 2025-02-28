import { BSON } from "realm-web"
import PaginationType from "./pagination"

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
  current: number;
  size: number;
  total?: number
  sortBy?: string;
  sortOrder?: 1 | -1;
}

interface ServiceResponse<T> {
  success?: boolean;
  data?: T;
  pagination?: PaginationType,
  message?: string
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
