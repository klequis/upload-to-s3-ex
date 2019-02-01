import React from 'react'
import injectSheet from 'react-jss'
import iUpload from 'media/icons/cloud-upload-light.svg'
import ResponsiveImage from 'elements/ResponsiveImage'

const DropzoneDefault = ({ classes }) => {
  return (
    <div  className={classes.wrapper}>
      <ResponsiveImage src={iUpload} className={classes.image} alt='upload' />
      <div>Drag file here</div>
      <div>Or click to browse</div>
    </div>
  )
}

const styles = theme => ({
  wrapper: {
    alignItems: 'center',
    backgroundColor: 'grey',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1.5em',
    fontWeight: 500,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  image: {
    maxHeight: 75,
  },
})
export default injectSheet(styles)(DropzoneDefault)

