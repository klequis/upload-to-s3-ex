import { combineReducers } from 'redux'
import requests from './requests'
import { images, imageUpload } from './image-reducers'

export default combineReducers({
  images,
  imageUpload,
  requests,
})
