// import expect from 'expect';
// import React from 'react';
// import TestUtils from 'react-addons-test-utils';
// import NewsCard from 'components/NewsCard';
// import CardTitle from 'material-ui/lib/card/card-title';
// // import TodoTextInput from '../../components/TodoTextInput'
//
// function setup() {
//   let props = {
//     title: expect.createSpy(),
//     abstract: expect.createSpy(),
//     date: expect.createSpy()
//   };
//
//   let renderer = TestUtils.createRenderer();
//   renderer.render(<NewsCard {...props} />);
//   let output = renderer.getRenderOutput();
//
//   return {
//     props,
//     output,
//     renderer
//   };
// }
//
// describe('components', () => {
//   describe('NewsCard', () => {
//     it('should render correctly', () => {
//       const { output } = setup();
//
//       expect(output.type).toBe('Card');
//
//       let [ CardTitle ] = output.props.children;
//
//       expect(Card.type).toBe('div');
//       // expect(Card.props.children).toBe();
//     });
//
//     // it('should call addTodo if length of text is greater than 0', () => {
//     //   const { output, props } = setup()
//     //   let input = output.props.children[1]
//     //   input.props.onSave('')
//     //   expect(props.addTodo.calls.length).toBe(0)
//     //   input.props.onSave('Use Redux')
//     //   expect(props.addTodo.calls.length).toBe(1)
//     // })
//   })
// })
