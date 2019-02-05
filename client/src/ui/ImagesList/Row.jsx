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
      <div className={classes.name}>
        <div className={classes.nameText}>{image.Key}</div>
      </div>
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

const styles = theme => {
  const spUnit = theme.spacing.unit

  return {
    row: {
      display: 'flex',
      backgroundColor:' #424242',
      boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.075)',
      margin: `${spUnit}px 0`,
      [theme.breakpoints.up('md')]: {
        margin: 16,
        padding: 8,
      },
    },
    img: {
      [theme.breakpoints.up('md')]: {
        padding: 8,
      },
      display: 'flex',
      alignItems: 'center',
      flexBasis: '30%',
    },
    name: {
      color: 'white',
      padding: 8,
      display: 'flex',
      alignItems: 'center',
      verticalAlign: 'middle',
      flexBasis: '60%',
      minWidth: 0,
    },
    nameText: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexBasis: '10%',
    }
  }
}
export default injectSheet(styles)(Row)