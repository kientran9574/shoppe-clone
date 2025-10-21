import type { IProduct, IProductList, IProductListConfig } from '../types/product.type'
import type { SuccessResponse } from '../types/utils.type'
import http from '../utils/http'

const URL = 'products'

export const productAPI = {
  getProducts: (params: IProductListConfig) => {
    return http.get<SuccessResponse<IProductList>>(`${URL}`, {
      params
    })
  },
  getProductDetail: (id: string) => {
    return http.get<SuccessResponse<IProduct>>(`${URL}/${id}`)
  }
}
