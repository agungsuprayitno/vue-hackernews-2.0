import axios from 'axios'
import moment from 'moment'
import { isEmpty } from 'lodash'
import {readCookie, key} from '@/module/CacheModule'

const token = function () {
  const token = readCookie(key)

  if (isEmpty(token) || (!isEmpty(token) && moment().diff(moment(token.expired)) > 0)) {
    return null
  }

  return token.token
}
export const VoucherGeneratorAxios = axios.create({
  baseURL: process.env.VOUCHER_GENERATOR_API_URL,
  headers: {
    Authorization: token() ? 'Bearer ' + token() : null,
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json'
  }
})

VoucherGeneratorAxios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status===401) {
    window.location.href = '/'
  }
  throw error
})

export default {
  VoucherGeneratorAxios
}