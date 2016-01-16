import React from 'react'
import Radium from 'radium'
import { ReaderTools } from 'components/ReaderTools'
import Paper from 'material-ui/lib/paper'
// import Card from 'material-ui/lib/card/card'
// import CardTitle from 'material-ui/lib/card/card-title'

@Radium
export class Reader extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    body: React.PropTypes.string,
    bg_color: React.PropTypes.string,
    text_color: React.PropTypes.string,
    text_size: React.PropTypes.number
  }

  static contextTypes = {
    actions: React.PropTypes.object.isRequired,
    browser: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { body, bg_color, text_color } = this.props

    /**
     * Using inline styles with Radium, we declare the object below
     */
    const styles = {
      base: {
        background: bg_color,
        textAlign: 'justify',
        color: text_color,
        padding: '1.5em',
        height: (this.context.browser.height - 100),
        overflow: 'scroll'
      }
    }

    /**
     * bodyText is used to wrap the text body coming in from Flask service
     */
    const bodyText = `<div class='reader-text-block'>${ body }</div>`

    return (
      <Paper zDepth={1}>
        <ReaderTools />
        <div dangerouslySetInnerHTML={{ __html: bodyText }} style={ styles.base } />
      </Paper>
    )
  }
}

export default Reader
