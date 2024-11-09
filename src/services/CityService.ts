import { CityDocument } from "../entities/city"
import { Database } from "../tools/realm"
import { ObjectId, PaginationOptions, ServiceResponse } from "../types/realm"

class CityService {
  private static instance: CityService
  private readonly collection = 'city'
  private db: Database

  private constructor() {
    this.db = Database.getInstance({
      appId: 'pulse-application-tpfmdtx',
      cluster: 'mongodb-atlas',
      database: 'pulse-database',
      collection: 'city'
    })
  }

  public static getInstance(): CityService {
    if (!CityService.instance) {
      CityService.instance = new CityService()
    }
    return CityService.instance
  }

  public async findCityById(cityId: ObjectId): Promise<ServiceResponse<CityDocument>> {
    try {
      const city = await this.db.findOne<CityDocument>(this.collection, { _id: cityId })
      return { success: true, data: city }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }
  
  public async findAllCitys(): Promise<ServiceResponse<CityDocument[]>> {
    try {
      const citys = await this.db.findAll<CityDocument>(this.collection)
      return { success: true, data: citys }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async findCitys(
    filter: Partial<CityDocument> = {},
    pagination: PaginationOptions = {page: 0, pageSize: 10}
  ): Promise<ServiceResponse<{ citys: CityDocument[], total: number }>> {
    try {
      const [citys, total] = await Promise.all([
        this.db.find<CityDocument>(this.collection, filter, pagination),
        this.db.count<CityDocument>(this.collection, filter)
      ])

      return { 
        success: true, 
        data: { citys, total } 
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async createCity(
    cityData: CityDocument
  ): Promise<ServiceResponse<CityDocument>> {
    try {
      const city = await this.db.insertOne<CityDocument>(this.collection, {
        ...cityData,
      })
      return { success: true, data: city }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async updateCity(
    cityId: ObjectId,
    cityData: Partial<CityDocument>
  ): Promise<ServiceResponse<boolean>> {
    try {
      const updated = await this.db.updateOne<CityDocument>(
        this.collection,
        { _id: cityId },
        cityData
      )
      return { success: true, data: updated }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  public async deleteById(cityId: ObjectId): Promise<ServiceResponse<boolean>> {
    try {
      const updated = this.db.deleteOne<CityDocument>(this.collection, { _id: cityId })
      return { success: true, data: updated }
    } catch (error) {
      return { success: false, error: error.message }
    }
    
  }
}


export { CityService }
