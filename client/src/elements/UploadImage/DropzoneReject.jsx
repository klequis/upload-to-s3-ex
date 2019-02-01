import React from 'react'
import injectSheet from 'react-jss'
import iStop from 'media/icons/stop-light.svg'
import ResponsiveImage from 'elements/ResponsiveImage'

const DropzoneReject = ({ classes }) => {
  return (
    <div className={classes.wrapper}>
      <ResponsiveImage src={iStop} className={classes.image} alt='upload' />
      <div>Only .png & .jpg accepted.</div>
    </div>
  )
}

const styles = theme => ({
  wrapper: {
    alignItems: 'center',
    backgroundColor: '#bc0000',
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
export default injectSheet(styles)(DropzoneReject)