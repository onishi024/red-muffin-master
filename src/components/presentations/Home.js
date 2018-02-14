import React from 'react'
import {Card, CardMedia, CardTitle} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const Home = () => {
  const styles = {
    path: {
      margin: 12,
      fontSize: 12,
      color: "#9E9E9E",
    }
  }
  const title = `Let's start "J"enius management with "Red Muffin".`
  const subtitle = `"Red Muffin" is designed to fit with monthly manpower management for a large number of projects.`
  return(
    <div>
      <div style={styles.path} >Home</div>
      <MuiThemeProvider>
        <Card>
          <CardMedia
            overlay={<CardTitle title={title} subtitle={subtitle} />}
          >
            <img src="muffin.jpg" alt="" />
          </CardMedia>
        </Card>
      </MuiThemeProvider>
    </div>
  )
}

export default Home
