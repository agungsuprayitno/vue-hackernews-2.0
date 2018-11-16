import axios from 'axios'
import moment from 'moment'
import { isEmpty } from 'lodash'
import {readCookie, key} from '@/module/CacheModule'

const token = function () {
  // const token = readCookie(key)

  // if (isEmpty(token) || (!isEmpty(token) && moment().diff(moment(token.expired)) > 0)) {
  //   // return null
  // }

  //return token.token
  return 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmRyZWFzMkBnbWFpbC5jb20iLCJqd3RJRCI6Ikp1SkEwMUo2S2dleUtFeUdEWnZNNXlhT1dLZHlxSWtkIiwidXNlcm5hbWUiOiJhbmRyZWFzMkBnbWFpbC5jb20iLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwOTAvdjEvYXV0aCIsImlhdCI6MTU0MjI3MDI0MDMwMSwiZXhwIjoxNTQyMjczODQwMzAxfQ.pvnI-U-DweyB4786iqX-QmfjJZQYH7xejGSLEp9XmjjQlL9A_kYcLiaeBu6V9FmIJli6GPUPyTDRd-wefnYoMw'
}
export const VoucherGeneratorAxios = axios.create({
  baseURL: process.env.VOUCHER_GENERATOR_API_URL,
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmRyZWFzMkBnbWFpbC5jb20iLCJqd3RJRCI6Ikp1SkEwMUo2S2dleUtFeUdEWnZNNXlhT1dLZHlxSWtkIiwidXNlcm5hbWUiOiJhbmRyZWFzMkBnbWFpbC5jb20iLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjkwOTAvdjEvYXV0aCIsImlhdCI6MTU0MjI3MDI0MDMwMSwiZXhwIjoxNTQyMjczODQwMzAxfQ.pvnI-U-DweyB4786iqX-QmfjJZQYH7xejGSLEp9XmjjQlL9A_kYcLiaeBu6V9FmIJli6GPUPyTDRd-wefnYoMw',
    'Access-Control-Allow-Origin': '*'
}
  // headers: {
  //   Authorization: token() ? 'Bearer ' + token() : null,
  //   'X-Requested-With': 'XMLHttpRequest',
  //   'Access-Control-Allow-Origin': '*',
  //   'Accept': 'application/json'
  // }
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