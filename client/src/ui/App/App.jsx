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
            <Text h1 align='center' className={classes.title}>Upload Images to AWS S3</Text>
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

// flex: grow, shrink, basis

const styles = theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: 'purple',
  },
  header: {
    backgroundColor: 'red',
    flexBasis: '20%',
    flexShrink: 0,
  },
  main: {
    padding: '3%',
    backgroundColor: 'green',
    flexBasis: '60%',

  },
  footer: {
    backgroundColor: 'blue',
    flexBasis: '20%',
  },
  title: {
    fontSize: '2em',
  },
})

export default injectSheet(styles)(App)
