import React from 'react'

/* components */
import { Tools } from 'components/Tools/Tools'

export class AboutView extends React.Component {
  render() {
    return (
      <div className='container text-center'>
        <h1>About</h1>
        <hr />
        <Tools />
        <hr />
      </div>
    )
  }
}

export default AboutView
