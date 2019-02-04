import React from 'react'
import injectSheet from 'react-jss'
import iUpload from 'media/icons/cloud-upload-light.svg'
import iStop from 'media/icons/stop-light.svg'
import ResponsiveImage from 'elements/ResponsiveImage'
import classNames from 'classnames'

const getText = (state) => {
  switch (state) {
    case 'accept':
      return 'Go ahead and drop it!'
    case 'reject':
      return 'Only .png & .jpg accepted.'
    case 'default':
    default:
      return 'Drag file here or click to browse'
  }
}

const DropzoneDefault = ({ classes, state='default' }) => {
  const clsName = classNames({
    [classes.wrapper]: true,
    [classes.defaultState]: state === 'default',
    [classes.acceptState]: state === 'accept',
    [classes.rejectState]: state === 'reject',
  })

  // const image = () => {
  //   if (state === 'default') {
  //     return iUpload
  //   } else if (state === 'accept') {
  //     return i
  //   }
  // }

  return (
    <div  className={clsName}>
      <ResponsiveImage
        src={
          state === 'reject' ? iStop : iUpload
        }
        className={classes.image}
        alt='upload'
      />
      <div className={classes.text}>
        {getText(state)}
      </div>
    </div>
  )
}

const styles = theme => ({
  wrapper: {
    alignItems: 'center',

    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1.5em',
    fontWeight: 500,
    height: '100%',
    padding: 10,
    width: '100%',
  },
  defaultState: {
    backgroundColor: 'grey',
  },
  acceptState: {
    backgroundColor: '#00ab0c',
  },
  rejectState: {
    backgroundColor: '#bc0000',
  },
  image: {
    maxWidth: 100,
  },
  text: {
    width: '100%',
    textAlign: 'center',
  }
})
export default injectSheet(styles)(DropzoneDefault)

