import 'url-search-params-polyfill'

export function setPagination (pagination) {
  let queryString = new URLSearchParams()
  // Add parameter page to request for get the current page data from backend
  queryString.append('page', pagination.currentPage)
  // Add parameter limit to request for limit the data
  queryString.append('size', pagination.size)

  let qs = queryString.toString() ? '?' + queryString.toString() : ''

  return qs
}