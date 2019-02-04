import React from 'react'
import injectSheet from 'react-jss'
import Ink from 'react-ink'

const RaisedButton = ({ children, classes, onClick }) => {
  const _onClick = (e) => {
    onClick(e)
  }
  return (
      <button
        className={classes.button}
        onClick={_onClick}
      >
        <Ink />
        {children}
      </button>
    )
}

// orig
// const backgroundColor = 'rgb(38, 166, 154)'
// const borderColor = 'rgb(255, 255, 255)'

// new
// const backgroundColor = '#9d0038'
// const backgroundColor = 'rgb(255,0,80)'
const backgroundColor = 'rgb(157, 0, 56)'
const borderColor = 'rgb(255, 255, 255)'

const styles = {
  button: {
    backgroundColor: backgroundColor,
    borderBottomColor: borderColor,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    borderBottomStyle: 'none',
    borderBottomWidth: 0,
    borderImageOutset: 0,
    borderImageRepeat: 'stretch',
    borderImageSlice: '100%',
    borderImageSource: 'none',
    borderImageWidth: 1,
    borderLeftColor: borderColor,
    borderLeftStyle: 'none',
    borderLeftWidth: 0,
    borderRightColor: borderColor,
    borderRightStyle: 'none',
    borderRightWidth: 0,
    borderSpacing: '0px 0px', // new
    borderTopColor: borderColor,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderTopStyle: 'none',
    borderTopWidth: 0,
    boxShadow: 'rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 3px 1px -2px, rgba(0, 0, 0, 0.2) 0px 1px 5px 0px',
    boxSizing: 'border-box',
    color: 'rgb(255, 255, 255)',
    cursor: 'pointer',
    display: 'inline-block',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
    fontSize: 14,
    fontWeight: 500,
    height: 36,
    letterSpacing: 0.5,
    // lineHeight: 36,
    inlineSize: 91, // new
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    outline: 'none',
    outlineColor: borderColor,
    outlineStyle: 'none',
    outlineWidth: 0,
    overflow: 'hidden',
    overflowX: 'hidden',
    overflowY: 'hidden',
    paddingBottom: 0,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 0,
    perspectiveOrigin: '45.5px 18px', // new
    position: 'relative',
    textAlign: 'center',
    textDecoration: 'none',
    textDecorationColor: 'rgb(255, 255, 255)',
    textDecorationLine: 'none',
    textDecorationStyle: 'solid',
    textTransform: 'uppercase',
    transformOrigin: '45.5px 18px', // new
    transitionDelay: '0s',
    transitionDuration: '0.3s',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease-out',
    verticalAlign: 'middle',
    zIndex: 1,
    MozAppearance: 'button',
    MozUserSelect: 'none',
    '&:hover': {
      backgroundColor: 'rgb(255,0,80)',
    },
    '&:active': {
      boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
      outline: 'none',
    },
    // '&:selected': {
    //   backgroundColor: 'green',
    // },
  },
}

export default injectSheet(styles)(RaisedButton)