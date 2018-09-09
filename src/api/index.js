import UserApi from './module/UserApi'
import Access from './module/AccessApi'
import Product from './module/ProductApi'
import Merchant from './module/MerchantApi'

export const AccessApi = Access
export const ProductApi = Product
export const MerchantApi = Merchant

export default {
  UserApi,
  AccessApi,
  ProductApi,
  MerchantApi
}