import React from 'react';
import Radium from 'radium';

@Radium
export class Reader extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    body: React.PropTypes.string,
    bg_color: React.PropTypes.string,
    text_color: React.PropTypes.string,
    text_size: React.PropTypes.number
  }

  constructor (props) {
    super(props);
  }

  render () {
    const { body, bg_color, text_color } = this.props;

    /**
     * Using inline styles with Radium, we declare the object below
     */
    const styles = {
      base: {
        background: bg_color,
        textAlign: 'justify',
        color: text_color,
        border: '1px solid black',
        padding: '1.5em',
        height: '400px',
        overflow: 'scroll'
      }
    };

    /**
     * bodyText is used to wrap the text body coming in from Flask service
     */
    const bodyText = `<div class='reader-text-block'>${ body }</div>`;

    return (
      <div className='reader-outer-container'>
        <div dangerouslySetInnerHTML={{ __html: bodyText }} style={ styles.base } />
      </div>
    );
  }
}

export default Reader;
