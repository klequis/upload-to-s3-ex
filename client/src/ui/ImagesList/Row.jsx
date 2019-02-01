import React from 'react'
import injectSheet from 'react-jss'
import ResponsiveImage from 'elements/ResponsiveImage'
import iTrashcan from 'media/icons/trashcan-light.svg'
import RaisedButton from 'elements/RaisedButton'

const Row = ({ classes, deleteImage, image }) => {
  return (
    <div className={classes.row}>
      <div className={classes.img}>
        <ResponsiveImage src={image.url} key={image.Key} alt='unknown' />
      </div>
      <div className={classes.name}>{image.Key}</div>
      <div className={classes.button}>
        <RaisedButton
          aria-label="Delete"
          className={classes.fab}
          onClick={() => deleteImage(image.Key)}

        >
          <img src={iTrashcan} alt='delete' />
        </RaisedButton>
      </div>
    </div>
  )
}

const greyValue = 100

const styles = theme => ({

  row: {
    display: 'flex',
    // border: '1px solid white',
    backgroundColor:' #424242',
    padding: 8,
    boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.075)',
    margin: 16,
  },
  img: {
    maxWidth: 150,
    flexBasis: '20%',
    padding: 8,
  },
  name: {
    color: 'white',
    flexBasis: '40%',
    padding: 8,
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
  }
})
export default injectSheet(styles)(Row)