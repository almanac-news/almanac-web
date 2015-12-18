import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { bindActionCreators } from 'redux';
import { HomeView } from 'views/HomeView';

function shallowRender (component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

function renderWithProps (props = {}) {
  return TestUtils.renderIntoDocument(<HomeView {...props} />);
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<HomeView {...props} />);
}

describe('(View) Home', function () {
  let _component, _rendered, _props, _spies;

  beforeEach(function () {
    const newsData = {
      'news': [
        {
          'title': 'Demo News Article 1',
          'abstract': 'Article abstract goes here',
          'id': '1RztcJr'
        },
        {
          'title': 'Demo News Article 2',
          'abstract': 'Article abstract goes here',
          'id': '1XQzgT9'
        },
        {
          'title': 'Demo News Article 3',
          'abstract': 'Article abstract goes here',
          'id': '1NJq5Zu'
        },
        {
          'title': 'Demo News Article 4',
          'abstract': 'Article abstract goes here',
          'id': '1lMExtd'
        },
        {
          'title': 'Demo News Article 5',
          'abstract': 'Article abstract goes here',
          'id': '1M1qbut'
        }
      ]};
    _spies = {};
    _props = {
      news: newsData.news,
      data: newsData,
      ...bindActionCreators({
        actions: (_spies.actions = sinon.spy()),
        isFetching: (_spies.isFetching = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    };

    _component = shallowRenderWithProps(_props);
    _rendered = renderWithProps(_props);
  });

  it('Should render as a <div>.', function () {
    expect(_component.type).to.equal('div');
  });

  it('Should include an <h1> with welcome text.', function () {
    const h1 = TestUtils.findRenderedDOMComponentWithTag(_rendered, 'h1');

    expect(h1).to.exist;
    expect(h1.textContent).to.match(/News Feed/);
  });

  // it('Should render with an <h2> that includes Sample Counter text.', function () {
  //   const h2 = TestUtils.findRenderedDOMComponentWithTag(_rendered, 'h2');
  //
  //   expect(h2).to.exist;
  //   expect(h2.textContent).to.match(/Sample Counter/);
  // });

  it('should have a loading spinner on load', function () {
    const spinner = TestUtils.findRenderedDOMComponentWithClass(_rendered, 'loading');
    expect(spinner).to.exist;
  });

  // it('should dispatch an action on page load', function () {
  //   // _spies.dispatch.should.have.not.been.called;
  //   // TestUtils.Simulate.click(_btn);
  //   _spies.dispatch.should.have.been.called;
  // });

  // it('should have news data loaded', function () {
  //   // console.log(JSON.stringify(_rendered));
  //   const newsContainer = TestUtils.findRenderedComponentWithType(_component, 'NewsContainer');
  //   // _spies.dispatch.should.have.not.been.called;
  //   // TestUtils.Simulate.click(_btn);
  //   expect(newsContainer).to.exist;
  // });

  // it('Should render props.counter at the end of the sample counter <h2>.', function () {
  //   const h2 = TestUtils.findRenderedDOMComponentWithTag(
  //     renderWithProps({ ..._props, counter: 5 }), 'h2'
  //   );
  //
  //   expect(h2).to.exist;
  //   expect(h2.textContent).to.match(/5$/);
  // });

  // describe('An increment button...', function () {
  //   let _btn;
  //
  //   beforeEach(() => {
  //     _btn = TestUtils.scryRenderedDOMComponentsWithTag(_rendered, 'button')
  //       .filter(a => /Increment/.test(a.textContent))[0];
  //   });
  //
  //   it('should be rendered.', function () {
  //     expect(_btn).to.exist;
  //   });
  //
  //   it('should dispatch an action when clicked.', function () {
  //     _spies.dispatch.should.have.not.been.called;
  //     TestUtils.Simulate.click(_btn);
  //     _spies.dispatch.should.have.been.called;
  //   });
  // });

  describe('A Double (Async) button...', function () {
    // let _btn;
    //
    // beforeEach(() => {
    //   _btn = TestUtils.scryRenderedDOMComponentsWithTag(_rendered, 'button')
    //     .filter(a => /Double/.test(a.textContent))[0];
    // });
    //
    // it('should be rendered.', function () {
    //   expect(_btn).to.exist;
    // });

    // it('should dispatch an action when clicked.', function () {
    //   // _spies.dispatch.should.have.not.been.called;
    //   // TestUtils.Simulate.click(_btn);
    //   _spies.dispatch.should.have.been.called;
    // });
  });
});
// import React                  from 'react';
// import TestUtils              from 'react-addons-test-utils';
// import { bindActionCreators } from 'redux';
// import { HomeView }           from 'views/HomeView';
// import * as actions from 'actions/news';
// // import * as types from 'constants/news';
// // import configureMockStore from 'redux-mock-store';
// // import thunk from 'redux-thunk';
// // import nock from 'nock';
//
// // import { Link } from 'react-router';
// // import { NewsContainer } from 'containers/NewsContainer';
// // const CircularProgress = require('material-ui/lib/circular-progress');
// // const middlewares = [ thunk ];
// // const mockStore = configureMockStore(middlewares);
//
// function shallowRender (component) {
//   const renderer = TestUtils.createRenderer();
//
//   renderer.render(component);
//   return renderer.getRenderOutput();
// }
//
// function renderWithProps (props = {}) {
//   return TestUtils.renderIntoDocument(<HomeView {...props} />);
// }
//
// function shallowRenderWithProps (props = {}) {
//   return shallowRender(<HomeView {...props} />);
// }
//
// // describe('async actions', () => {
// //   afterEach(() => {
// //     nock.cleanAll();
// //   });
// //
// //   it('creates FETCH_NEWS_COMPLETED when fetching todos has been done', (done) => {
// //     nock('127.0.0.1:3000')
// //       .get('/api/news')
// //       .reply(200, { body: { news: ['newsObj'] }});
// //
// //     const expectedActions = [
// //       { type: types.FETCH_NEWS_STARTED },
// //       { type: types.FETCH_NEWS_COMPLETED, body: { news: ['newsObj']  } }
// //     ];
// //     const store = mockStore({ news: [] }, expectedActions, done);
// //     store.dispatch(actions.fetchNews());
// //   });
// // });
//
// describe('(View) Home', function () {
//   let _rendered, _props, _spies, server, setupStub, JSONresponse;
//   // let _component;
//
//   beforeEach(function () {
//     JSONresponse = {
//       'news': [
//         {
//           'title': 'Demo News Article 1',
//           'abstract': 'Article abstract goes here',
//           'id': '1RztcJr'
//         },
//         {
//           'title': 'Demo News Article 2',
//           'abstract': 'Article abstract goes here',
//           'id': '1XQzgT9'
//         },
//         {
//           'title': 'Demo News Article 3',
//           'abstract': 'Article abstract goes here',
//           'id': '1NJq5Zu'
//         },
//         {
//           'title': 'Demo News Article 4',
//           'abstract': 'Article abstract goes here',
//           'id': '1lMExtd'
//         },
//         {
//           'title': 'Demo News Article 5',
//           'abstract': 'Article abstract goes here',
//           'id': '1M1qbut'
//         }
//       ]};
//
//     // setupStub = sinon.stub(ActionCreators, 'setup');
//     server = sinon.fakeServer.create();
//     server.respondWith('GET', 'http://localhost:3000/api/news', [
//       200, {'Content-Type':'application/json'}, JSON.stringify(JSONresponse)
//     ]);
//     _spies = {};
//     _props = {
//       actions : bindActionCreators({
//         actions : (_spies.increment = sinon.spy())
//       }, _spies.dispatch = sinon.spy())
//     };
//
//     // _component = shallowRenderWithProps(_props);
//     _rendered  = renderWithProps(_props);
//   });
//
//   it('Should include an <h1> with site Title', function () {
//     const h1 = TestUtils.findRenderedDOMComponentWithTag(_rendered, 'h1');
//
//     expect(h1).to.exist;
//     expect(h1.textContent).to.match(/Almanac News/);
//   });
//
//   it('Should have a populated news list', function () {
//     console.log(_props.actions.fetchNews);
//     _props.actions.fetchNews().then( data => {
//       expect(data.length).to.equal(5);
//     });
//     server.respond();
//     // const newsItems = TestUtils.findRenderedDOMComponentWithTag(_rendered, 'div');
//     // console.log(document.getElementsByClassName('news-card-wrapper'));
//     // expect(document.getElementsByClassName('news-card-wrapper')).to.be.length(5);
//     // assert(setupStub.calledWith(JSONresponse.todos));
//   });
// });
