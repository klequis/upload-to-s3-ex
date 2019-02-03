// eslint-disable-next-line
import { pink } from 'logger'

const rejectErrors = (res) => {
  const { status } = res
  // pink('res', res.body)
  if (status >= 200 && status < 300) {
    return res
  }

  return Promise.reject({
    statusText: res.statusText,
    status,
    error: res.json()
  })
}

  // let er = ''
  // try {
  //   er = res.json()
  // }
  // catch (e) {
  //   console.log('unknown error')
  // }

export const fetchJson = (url, options = {}) => {
  pink('fetchJson: url', url)
  let headers = {
    ...options.headers,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  return (
    fetch(url, {
      ...options,
      credentials: 'include',
      headers,
    }).then(rejectErrors)
      .then((res) => res.json())
  )
}

export const fetchUploadImage = (url, options = {}) => {
  pink('fetchUploadIamge: url', url)
  return (
    fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Accept': 'application/json',
      },
    })
      .then(rejectErrors)
      .then(res => res.json())
  )
}

export default { fetchJson, fetchUploadImage }
