import React, { Component } from 'react';
import { NewsList } from 'components/NewsList';

export class NewsContainer extends Component {

  static propTypes = {
    data: React.PropTypes.object.isRequired
  }

  render () {
    return (
      <section>
        <NewsList
          key={ this.props.data.url }
          data={ this.props.data }
        />
      </section>
    );
  }
}

export default NewsContainer;
