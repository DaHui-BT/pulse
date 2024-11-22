import { CityDocument } from "../entities/city"
import { Request } from "../tools/request"
import { ObjectId, PaginationOptions, ServiceResponse } from "../types/realm"

class CityService {
  private static instance: CityService
  private request: Request

  private constructor() {
    this.request = new Request()
  }

  public static getInstance(): CityService {
    if (!CityService.instance) {
      CityService.instance = new CityService()
    }
    return CityService.instance
  }

  public async findCityById(cityId: ObjectId): Promise<ServiceResponse<CityDocument>> {
    try {
      const response = await this.request.get<CityDocument>(`/city/${cityId}`)
      if (response.code == 200) {
        return { success: true, data: response.data }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }
  
  public async findAllCitys(): Promise<ServiceResponse<CityDocument[]>> {
    try {
      const response = await this.request.get<CityDocument[]>('/city')
      if (response.code == 200) {
        return { success: true, data: response.data }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async findCitys(
    filter: Partial<CityDocument> = {},
    pagination: PaginationOptions = {page: 0, pageSize: 10}
  ): Promise<ServiceResponse<{ citys: CityDocument[], total: number }>> {
    try {
      const [cityResponse, total] = await Promise.all([
        this.request.get<CityDocument[]>('/city', { params: filter }),
        // this.request.count<CityDocument>(this.collection, filter)
        0
      ])

      return { 
        success: true, 
        data: { citys: cityResponse.data, total } 
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async createCity(
    cityData: CityDocument
  ): Promise<ServiceResponse<CityDocument>> {
    try {
      const response = await this.request.post<CityDocument>('/city', { data: cityData })
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async updateCity(
    cityId: ObjectId,
    cityData: Partial<CityDocument>
  ): Promise<ServiceResponse<boolean>> {
    try {
      const response = await this.request.put<CityDocument>(`/city/${cityId}`, {data: cityData})
      if (response.code == 200) {
        return { success: true, data: response.data }
      } else {
        return { success: false, error: response.message}
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  public async deleteById(cityId: ObjectId): Promise<ServiceResponse<boolean>> {
    try {
      const response = await this.request.delete<CityDocument>(`/city/${cityId}`)
      if (response.code == 200) {
        return { success: true, data: response.data }
      } else {
        return { success: false, error: response.message }
      }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
    
  }
}


export { CityService }
