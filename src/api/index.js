import UserApi from './module/UserApi'
import Access from './module/AccessApi'
import Product from './module/ProductApi'

export const AccessApi = Access
export const ProductApi = Product

export default {
  UserApi,
  AccessApi,
  ProductApi
}