export function createDownloadPopUp (data, headers, defaultFileName) {
  let filename = defaultFileName
  if (headers['content-disposition']) {
    let match = (headers['content-disposition'].match(/filename="([^"]+)"/))
    if (match[1]) {
      filename = match[1]
    }
  }

  let contentType = (headers['content-type'].split(';'))[0]
  let blob = new Blob([data], {type: contentType})

  let link = document.createElement('a')
  document.body.appendChild(link)
  link.href = window.URL.createObjectURL(blob)
  link.download = filename
  link.click()
}
