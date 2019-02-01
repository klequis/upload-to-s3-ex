import { createRequestThunk, logError } from './action-helpers'
import api from 'api'
import { /* orange,*/ red } from 'logger'

// Read/List
export const imagesListRequestKey = 'imagesListRequestKey'
export const imagesListKey = 'imagesListKey'

const imagesList = (images) => {
  return ({
    type: imagesListKey,
    payload: { images }
  })
}

export const imagesListRequest = createRequestThunk({
  request: api.images.list,
  key: imagesListRequestKey,
  success: [ imagesList ],
  // failure: [ (e) => console.log(e)]
})

// Upload

export const imageUploadOneKey = 'actionKeyUploadOneImage'
export const imageUploadOneRequestKey = 'imageUploadOneRequestKey'

const uploadOneImage = (imageInfo) => ({
  type: imageUploadOneKey,
  payload: imageInfo
})

export const imageUploadOneRequest = createRequestThunk({
  request: api.images.create,
  key: imageUploadOneRequestKey,
  success: [ uploadOneImage, imagesListRequest ],
  failure: [ error => logError(error, imageUploadOneRequestKey) ],
})

// Delete



export const imagesDeleteOneKey = 'imagesDeleteOneKey'
export const imagesDeleteOneRequestKey = 'imagesDeleteOneRequestKey'

/*
    @param data
    format: { Key: string, action: string }
    where action is one of: deleteOne
    * is the only action type so far
*/
const imagesDeleteOne = (data) => {
  const key = data.Key
  // orange('imagesDeleteOne: key', key)
  return ({
    type: imagesDeleteOneKey,
    payload: { key }
  })
}

export const imagesDeleteOneRequest = createRequestThunk({
  request: api.images.delete,
  key: imagesDeleteOneRequestKey,
  success: [imagesDeleteOne],
  failure: [error => red(error)]
})

