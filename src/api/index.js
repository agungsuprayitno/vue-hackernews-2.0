import User from './module/UserApi'
import Access from './module/AccessApi'
import Product from './module/ProductApi'
import Client from './module/ClientApi'
import ProductVariant from './module/ProductVariantApi'
import Merchant from './module/MerchantApi'
import VoucherOrder from './module/VoucherOrderApi'
import Voucher from './module/VoucherApi'
import Auth from './module/AuthApi'

export const UserApi = User
export const AccessApi = Access
export const ProductApi = Product
export const ClientApi = Client
export const ProductVariantApi = ProductVariant
export const MerchantApi = Merchant
export const VoucherOrderApi = VoucherOrder
export const VoucherApi = Voucher
export const AuthApi = Auth

export default {
  UserApi,
  AccessApi,
  ProductApi,
  ClientApi,
  ProductVariantApi,
  MerchantApi,
  VoucherOrderApi,
  VoucherApi,
  AuthApi
}