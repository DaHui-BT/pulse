import { message } from "ant-design-vue"

import Database, { ObjectId } from "../tools/database"
import { ArticleType } from "@types/article"
import { PageType } from "../types/page"
import { ErrorType } from "../types/realm"


class ArticleService {
  
  private database: Database
  private readonly COLLECTION_NAME: string = 'article'

  constructor() {
    this.database = Database.getInstance()
  }

  async findAll(): Promise<ArticleType[] | []> {
    return new Promise<ArticleType[] | []>((resolve, reject) => {
      this.database.findAll<ArticleType>(this.COLLECTION_NAME).then(res => {
        resolve(res)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  }

  async findList(filter: any = {}, page_info: PageType = {page: 0, page_size: 10}): Promise<ArticleType[] | []> {
    return new Promise<ArticleType[] | []>((resolve, reject) => {
      this.database.findList<ArticleType>(this.COLLECTION_NAME, filter, page_info).then(res => {
        resolve(res)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  }
  
  async findById(id: string): Promise<ArticleType | null> {
    return new Promise<ArticleType[] | []>((resolve, reject) => {
      this.database.findOne<ArticleType>(this.COLLECTION_NAME, {_id: {$eq: new ObjectId(id)}}).then(res => {
        resolve(res)
      }).catch(err => {
        message.error(err)
        console.log(err)
        reject(err)
      })
    })
  }

  async findOne(filter: object): Promise<ArticleType | null> {
    return new Promise<ArticleType[] | []>((resolve, reject) => {
      this.database.findOne<ArticleType>(this.COLLECTION_NAME, filter).then(res => {
        resolve(res)
      }).catch(err => {
        message.error(err)
        console.log(err)
        reject(err)
      })
    })
  }

  async addOne(article: ArticleType): Promise<ArticleType | null> {
    return new Promise<ArticleType>((resolve, reject) => {
      this.database.addOne(this.COLLECTION_NAME, article).then(res => {
        resolve(res)
        message.success('publish successfully!')
      }).catch(err => {
        message.error(err)
        console.log(err)
        reject(err)
      })
    }) 
  }
  
  async updateById(id: string, article_info: ArticleType): Promise<ArticleType | null> {
    return new Promise<ArticleType>((resolve, reject) => {
      this.database.updateOne(this.COLLECTION_NAME, {_id: {$eq: new ObjectId(id)}}, article_info).then(res => {
        resolve(res)
      }).catch(err => {
        message.error(err)
        console.log(err)
        reject(err)
      })
    }) 
  }

  deleteById(id: string): Promise<null> {
    return new Promise((resolve, reject) => {
      this.database.deleteOne(this.COLLECTION_NAME, {_id: {$eq: id}}).then(res => {
        resolve(res)
      }).catch((err: ErrorType) => {
        message.error(err.error)
        reject(err)
      })
    })
  }
}

export { ArticleService }
