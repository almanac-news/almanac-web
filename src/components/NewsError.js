import React from 'react';
import { Alert } from 'react-bootstrap';

const NewsError = () => {
  return (
    <Alert bsStyle='info'>
      <strong>All of our servers are busy right now.</strong>
      <br />
      <br />
      Please try again in a few minutes.
    </Alert>
  );
};

// export class NewsError extends React.Component {
//   render () {
//     return (
//       <Alert bsStyle='info'>
//         <strong>All of our servers are busy right now.</strong>
//         <br />
//         <br />
//         Please try again in a few minutes.
//       </Alert>
//     );
//   }
// }

export default NewsError;
