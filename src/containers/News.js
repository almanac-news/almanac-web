import React, { Component } from 'react';
import { NewsList }         from 'components/NewsList';

const dummyData = [
  {
    title: 'A News Article',
    abstract: 'Some micro news text.',
    id: '1RztcJr',
    date: Date.now()
  },
  {
    title: 'Another Article',
    abstract: 'Some micro news text.',
    id: '1XQzgT9',
    date: Date.now()
  },
  {
    title: 'This is Clearly the Best News Article',
    abstract: 'Some micro news text.',
    id: '1NJq5Zu',
    date: Date.now()
  },
  {
    title: 'Is this a News Article?',
    abstract: 'Some micro news text.',
    id: '1lMExtd',
    date: Date.now()
  },
  {
    title: 'BREAKING: A News Article',
    abstract: 'Some micro news text.',
    id: '1M1qbut',
    date: Date.now()
  }
];
export class News extends Component {
  // constructor(props) {
  //   super(props);
  //   // TODO: pass dummy data in through here?
  // }
  // componentDidMount: function() {
  //   $.get(this.props.source, function(result) {
  //     var data = result[0];
  //     if (this.isMounted()) {
  //       // this.
  //     }
  //   }.bind(this));
  // },

  render () {
    return (
      <section>
        <NewsList data={ dummyData } />
      </section>
    );
  }
}

export default News;
