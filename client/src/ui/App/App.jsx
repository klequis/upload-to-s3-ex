import React from 'react'
import injectSheet from 'react-jss'
import UploadImage from 'elements/UploadImage'
import ImagesList from 'ui/ImagesList'
import Text from 'elements/Text'
import Footer from 'ui/Footer'

class App extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div id='App-wrapper-main' className={classes.wrapper}>
          <header>
            <Text h1 align='center' className={classes.title}>Upload Images to AWS S3</Text>
          </header>
          <main className={classes.main}>
            <UploadImage />
            <ImagesList />
          </main>
          <footer>
            <Footer />
          </footer>
      </div>
    )
  }
}

const styles = theme => ({
  background: {
    // height: '100vh',

  },
  wrapper: {
    // width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    // paddingTop: '3%',

  },
  main: {
    padding: '3%',
    // backgroundColor: 'red',
    height: '100%',
  },
  title: {
    fontSize: '2em',
  },
})

export default injectSheet(styles)(App)
