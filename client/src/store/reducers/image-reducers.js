import { remove } from 'ramda'
import {
  imagesDeleteOneKey,
  imagesListKey,
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

export const imagesList = (state = [], { type, payload }) => {
  // blue('imagesList: state', state)
  // blue('imagesList: type', type)

  switch (type) {
    case imagesListKey:
      // blue('imagesList: payload', payload.images.data.images)
      return payload.images.data.images
    case imagesDeleteOneKey:
      const m = removeImage(state, payload.key)
      // blue('m', m)
      return m
    default:
      return state
  }

}

