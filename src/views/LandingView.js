import React from 'react'
import 'styles/landingView.scss'
// import { Link } from 'react-router'
const background = require('../styles/images/landingView.png')
/* components */

export class LandingView extends React.Component {
  render() {
    return (
      <div
        className='landing-page'
        style={{
          backgroundImage: 'url(' + background + ')',
          backgroundSize: 'cover',
          height: '800px'
        }}
      >
        <div className='welcome-box'>
          <div id='welcome-box-text'>
          Your single source of news and financial truth.
          <hr />
          <em>See what makes the world tick, one ticker at a time.</em>
          </div>
        </div>
      </div>
    )
  }
}

export default LandingView
