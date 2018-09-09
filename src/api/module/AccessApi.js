import {VoucherGeneratorAxios} from '@/module/HttpModule';
export default {
  async getUserAccessApi() {
   // TODO: get access from backend
    let accesses = [
     "product",
     "client"
    ]
    return await accesses 
  }
}
