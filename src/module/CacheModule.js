import { isEmpty } from 'lodash'
import moment from 'moment'
export const key = 'TID'
export const keyUserInfo = 'USER_INFO'

export function createCookie (name, value, second = 3600, path = '/', domain) {
  if (typeof (Storage) == 'undefined') { return false }
  const expired = moment().add(second, 'seconds')
  let data = {
    value: value,
    expired: expired,
    path: path
  }
  if (domain != 'undefined') {
    data.domain = domain
  }
  localStorage.setItem(name, JSON.stringify(data))
}

export function readCookie (name, path = '/', domain) {
  if (typeof (Storage) == 'undefined') { return null }
  const record = JSON.parse(localStorage.getItem(name))
  if (!record) { return null }
  const now = moment()
  const expired = moment(record.expired)
  if (expired.diff(now) < 0 && record.value) {
    eraseCookie(name, path, domain)
  }
  return (expired.diff(now) > 0 && record.value && (record.domain != 'undefined' && record.domain === domain) && record.path === path) ? record.value : null
}

export function extendCookie (name) {
  let cookie = readCookie(name)
  if (!isEmpty(cookie)) {
    createCookie(name, cookie)
  }
}

export function eraseCookie (name, path='/', domain) {
  if (typeof (Storage) == 'undefined') { return null }
  const record = JSON.parse(localStorage.getItem(name))
  if (!record) { return null }
  if (record.path === path && (record.domain != 'undefined' && record.domain === domain)) {
    localStorage.removeItem(name)
  }
}
