import React, { Component } from 'react';
import { NewsCard } from 'components/NewsCard';

export class NewsList extends Component {
  static propTypes = {
    data: React.PropTypes.array.isRequired
  }

  render () {
    return (
        <div>
          { this.props.data.map((newsItem) => {
            return (
              // NOTE: unique key moved to wrapper div to add line break
              // FIXME: Look into giving a unique identifier to the key instead of random
              <div className='news-card-wrapper' key={ newsItem.url + Math.random() }>
                <NewsCard
                  url = { newsItem.url }
                  title = { newsItem.title }
                  abstract = { newsItem.abstract }
                  date = { newsItem.date }
                />
                <br/>
              </div>
            );
          }) }
        </div>
    );
  }
}

export default NewsCard;
