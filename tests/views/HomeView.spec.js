import React                  from 'react';
import TestUtils              from 'react-addons-test-utils';
import { bindActionCreators } from 'redux';
import { HomeView }           from 'views/HomeView';

// function shallowRender (component) {
//   const renderer = TestUtils.createRenderer();
//
//   renderer.render(component);
//   return renderer.getRenderOutput();
// }

function renderWithProps (props = {}) {
  return TestUtils.renderIntoDocument(<HomeView {...props} />);
}

// function shallowRenderWithProps (props = {}) {
//   return shallowRender(<HomeView {...props} />);
// }

describe('(View) Home', function () {
  let _rendered, _props, _spies;
  // let _component;

  beforeEach(function () {
    _spies = {};
    _props = {
      actions : bindActionCreators({
        increment : (_spies.increment = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    };

    // _component = shallowRenderWithProps(_props);
    _rendered  = renderWithProps(_props);
  });

  it('Should include an <h1> with site Title', function () {
    const h1 = TestUtils.findRenderedDOMComponentWithTag(_rendered, 'h1');

    expect(h1).to.exist;
    expect(h1.textContent).to.match(/Almanac News/);
  });
});
