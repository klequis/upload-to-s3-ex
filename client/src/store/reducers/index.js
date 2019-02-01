import { combineReducers } from 'redux'
import requests from './requests'
import { imagesList, imageUpload } from './image-reducers'


export default combineReducers({
  imagesList,
  imageUpload,
  requests,
})
