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
    id: '1RztcJr',
    date: Date.now()
  },
  {
    title: 'This is Clearly the Best News Article',
    abstract: 'Some micro news text.',
    id: '1RztcJr',
    date: Date.now()
  },
  {
    title: 'Is this a News Article?',
    abstract: 'Some micro news text.',
    id: '1RztcJr',
    date: Date.now()
  },
  {
    title: 'BREAKING: A News Article',
    abstract: 'Some micro news text.',
    id: '1RztcJr',
    date: Date.now()
  }
];
export class News extends Component {
  // constructor(props) {
  //   super(props);
  //   // TODO: pass dummy data in through here?
  // }

  render () {
    return (
      <section>
        <NewsList data={ dummyData } />
      </section>
    );
  }
}

export default News;
