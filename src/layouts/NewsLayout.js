import React from 'react';

export default class NewsLayout extends React.Component {

  render () {
    return (
      <div className='news-container'>
        <div className='news-text-container'>
          Article text goes here.
        </div>
        <div className='news-data-container'>
          Article data goes here.
        </div>
      </div>
    );
  }
}
