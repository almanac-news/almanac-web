import React, { Component } from 'react';
import { NewsCard } from 'components/NewsCard';

export class NewsList extends Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
    browser: React.PropTypes.object.isRequired
  }

  render () {
    const newsData = this.props.data;
    return (
        <div>
          { Object.keys(newsData).map((newsKey) => {
            const newsItem = newsData[newsKey];
            return (
              // NOTE: unique key moved to wrapper div to add line break
              // FIXME: Look into giving a unique identifier to the key instead of random
              <div className='news-card-wrapper' key={ newsItem.url + Math.random() }>
                <NewsCard
                  url = { newsItem.url }
                  title = { newsItem.title }
                  abstract = { newsItem.abstract }
                  date = { newsItem.date }
                  browser = { this.props.browser }
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
