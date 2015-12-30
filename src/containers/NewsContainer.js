import React, { Component } from 'react'
import { NewsList } from 'components/NewsList'

export class NewsContainer extends Component {

  static propTypes = {
    data: React.PropTypes.object.isRequired,
    browser: React.PropTypes.object.isRequired
  }

  render() {
    return (
      <section>
        <NewsList
          key={ this.props.data.url }
          data={ this.props.data }
          browser={ this.props.browser }
        />
      </section>
    )
  }
}

export default NewsContainer
