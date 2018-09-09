import UserApi from './module/UserApi'
import Access from './module/AccessApi'
import Product from './module/ProductApi'
import Client from './module/ClientApi'

export const AccessApi = Access
export const ProductApi = Product
export const ClientApi = Client

export default {
  UserApi,
  AccessApi,
  ProductApi,
  ClientApi
}