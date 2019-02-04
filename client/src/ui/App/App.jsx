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
          <header className={classes.header}>
            <Text h1 noMargin align='center' className={classes.title}>Upload Images to AWS S3</Text>
          </header>
          <main className={classes.main}>
            <UploadImage />
            <ImagesList />
          </main>
          <footer className={classes.footer}>
            <Footer />
          </footer>
      </div>
    )
  }
}

const styles = theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',

  },
  header: {
    flexBasis: '20%',
    flexShrink: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    padding: '3%',
    flexBasis: '60%',
  },
  footer: {
    flexBasis: '20%',
  },
  title: {
    fontSize: '2em',
  },
})

export default injectSheet(styles)(App)
