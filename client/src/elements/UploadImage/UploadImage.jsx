import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import injectSheet from 'react-jss'
import {
  imagesDeleteOneRequest,
  imageUploadOneRequest,
} from 'store/actions/image-actions'
import {
  getUploadedImageUrl,
  getUploadedImageName,
} from 'store/selectors/image-selectors'
import DropTarget from './DropTarget'
// import DropzoneDefault from './DropzoneDefault'
// import DropzoneReject from './DropzoneReject'
// import DropzoneAccept from './DropzoneAccept'

class UploadImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      accepted: [],
      rejected: [],
    }
  }

  onDrop = async (accepted, rejected) => {

    this.setState({
      accepted,
      rejected,
    })
    let formData = new FormData()
    formData.append('upload', accepted[0])
    // upload the image
    await this.props.imageUploadOneRequest(formData)
  }
  deleteImage = async () => {
    await imagesDeleteOneRequest(this.props.uploadedImageName)
  }
  render() {
    const { classes } = this.props

    return (
      <div id='UploadImage-wrapper' className={classes.wrapper}>
        <div className={classes.dropZone}>
          {
            <Dropzone
              style={dropzoneStyle}
              acceptStyle={acceptStyle}
              rejectStyle={rejectStyle}
              accept="image/jpeg, image/png"
              onDrop={(accepted, rejected) => this.onDrop(accepted, rejected)}
            >
              {({ isDragActive, isDragAccept }) => {
                if (isDragActive) {
                  return isDragAccept ? <DropTarget state='accept' /> : <DropTarget state='reject'/>
                  // return <div></div>
                } else {
                  return <DropTarget state='default' />
                }
              }}
            </Dropzone>
          }
        </div>
      </div>
    )
  }
}



const acceptStyle = {
  backgroundColor: 'green'
}

const rejectStyle = {
  backgroundColor: 'red'
}

const dropzoneStyle = {
  width: '100%',
  height: '100%',
}

const styles = theme => ({
  wrapper: {
    width: '100%',
    marginBottom: theme.spacing.unit * 6,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    zIndex: '1',
  },
})

const mapStateToProps = (state) => {
  return {
    // imageUploadOneRequest: imageUploadOneRequest,
    // uploadedImageUrl: uploadSelectors.getUploadedImageUrl(state),
    uploadedImageUrl: getUploadedImageUrl(state),
    uploadedImageName: getUploadedImageName(state),
  }
}

const actions = { imageUploadOneRequest }

export default compose(
  injectSheet(styles),
  connect(mapStateToProps, actions)
)(UploadImage)