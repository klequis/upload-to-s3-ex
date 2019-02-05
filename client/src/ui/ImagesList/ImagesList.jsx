import React from 'react'
import injectSheet from 'react-jss'
import { compose } from 'recompose'
import { connect } from 'react-redux'
// Store
import { getImages } from 'store/selectors/image-selectors'
import { getRequestStatus } from 'store/selectors/request-selectors'
import {
  imagesDeleteOneRequest,
  imagesDeleteOneRequestKey,
  imagesReadRequest,
  imagesReadRequestKey,
} from 'store/actions/image-actions'

import Row from './Row'
import { green } from 'logger'

class ImagesList extends React.Component {

  getImages = () => {
    this.props.imagesReadRequest(this.props.maxKeys)
  }

  componentDidMount() {
    this.getImages()
  }

  deleteImage = async (name) => {
    await this.props.imagesDeleteOneRequest(name)
  }

  render () {
    const { images, imagesDeleteOneRequestStatus, imagesReadRequestStatus } = this.props

    if (imagesReadRequestStatus !== 'success') {
      return null
    }

    if (imagesDeleteOneRequestStatus === 'pending') {
      return null
    }

    return (
      <div id='ImagesList-wrapper'>
        {
          images.map(i => {
            return (
              <Row
                key={i.Key}
                deleteImage={this.deleteImage}
                image={i}
              />
            )
          })
        }
      </div>
    )
  }
}

const actions = { imagesReadRequest, imagesDeleteOneRequest }

const mstp = (state) => {
  return {
    images: getImages(state),
    imagesReadRequestStatus: getRequestStatus(state, imagesReadRequestKey),
    imagesDeleteOneRequestStatus: getRequestStatus(state, imagesDeleteOneRequestKey)
  }
}

export default compose(
  connect(mstp, actions)
)(ImagesList)