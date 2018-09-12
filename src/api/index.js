import UserApi from './module/UserApi'
import Access from './module/AccessApi'
import Product from './module/ProductApi'
import ProductVariant from './module/ProductVariantApi'

export const AccessApi = Access
export const ProductApi = Product
export const ProductVariantApi = ProductVariant

export default {
  UserApi,
  AccessApi,
  ProductApi,
  ProductVariantApi
}