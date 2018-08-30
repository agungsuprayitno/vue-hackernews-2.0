import {VoucherGeneratorAxios} from '@/module/HttpModule';
export default {
  async getUserAccessApi() {
   // TODO: get access from backend
    let accesses = [
     "get-product",
     "product"
    ]
    return await accesses 
  }
}
