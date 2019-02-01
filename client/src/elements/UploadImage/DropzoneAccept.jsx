import React from 'react'
import injectSheet from 'react-jss'
import iUpload from 'media/icons/cloud-upload-light.svg'
import ResponsiveImage from 'elements/ResponsiveImage'

const DropzoneAccept = ({ classes }) => {
  return (
    <div  className={classes.wrapper}>
      <ResponsiveImage src={iUpload} className={classes.image} alt='upload' />
      <div>Go ahead and drop it!</div>
    </div>
  )
}

const styles = theme => ({
  wrapper: {
    alignItems: 'center',
    backgroundColor: '#00ab0c',
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
export default injectSheet(styles)(DropzoneAccept)

