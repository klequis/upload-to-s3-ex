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
  imageUploadOneRequest,
  imageUploadOneRequestKey,
  imagesListRequest,
  imagesListRequestKey,
} from 'store/actions/image-actions'

import Row from './Row'
import { green } from 'logger'

class ImagesList extends React.Component {

  getImages = () => {
    this.props.imagesListRequest(this.props.maxKeys)
  }

  componentDidMount() {
    this.getImages()
  }

  deleteImage = async (name) => {
    await this.props.imagesDeleteOneRequest(name)
  }

  render () {
    const { classes, images, imagesDeleteOneRequestStatus, imagesListRequestStatus } = this.props

    if (imagesListRequestStatus !== 'success') {
      return null
    }

    if (imagesDeleteOneRequestStatus === 'pending') {
      return null
    }

    return (
      <div id='ImagesList-wrapper' className={classes.wrapper}>
        {
          images.map(i => {
            return (
              <Row
                key={i.Key}
                className={classes.row}
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

const styles = theme => ({
  wrapper: {
    // backgroundColor: 'green',
    // padding: '16px 0'
  }
})

const actions = { imagesListRequest, imagesDeleteOneRequest }

const mstp = (state) => {
  return {
    images: getImages(state),
    imagesListRequestStatus: getRequestStatus(state, imagesListRequestKey),
    imagesDeleteOneRequestStatus: getRequestStatus(state, imagesDeleteOneRequestKey)
  }
}

export default compose(
  injectSheet(styles),
  connect(mstp, actions)
)(ImagesList)