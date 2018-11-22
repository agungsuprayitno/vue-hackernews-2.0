import {VoucherGeneratorAxios} from '@/module/HttpModule';
export default {
  async getUserAccessApi() {
   // TODO: get access from backend
    let accesses = [
     "get-merchant",
     "create-merchant",
     "update-merchant",
     "activate-merchant",
     "block-merchant",
     "get-user",
     "create-user",
     "update-user",
     "activate-user",
     "block-user",
     "get-product",
     "get-voucher-order",
     "create-voucher-order",
     "get-voucher",
     "activate-voucher",
     "revoke-voucher",
     "get-client",
     "create-client",
     "update-client",
     "activate-client",
     "block-client"
    ]
    return await accesses 
  }
}
