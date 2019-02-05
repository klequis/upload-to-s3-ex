import { remove } from 'ramda'
import {
  imagesDeleteOneKey,
  imagesReadKey,
  imageUploadOneKey,
} from '../actions/image-actions'

// eslint-disable-next-line
import { blue } from 'logger'

const getIndexOfImage = (arr, key) => {
  return arr.findIndex(i => i.Key === key)
}

const removeImage = (arr, key) => {
  return remove(getIndexOfImage(arr, key), 1, arr)
}

export const imageUpload = (state = {}, { type, payload }) => {
  switch (type) {
    case imageUploadOneKey:
      const o = {
        imageName: payload.Key,
        imageUrl: payload.Location,
      }
      return o
    default:
      return state
  }
}

export const images = (state = [], { type, payload }) => {
  switch (type) {
    case imagesReadKey:
      return payload.images.data.images
    case imagesDeleteOneKey:
      return removeImage(state, payload.key)
    default:
      return state
  }
}

