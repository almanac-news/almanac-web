import React from 'react';
import Radium from 'radium';

import { ButtonGroup, Button } from 'react-bootstrap';

// Radium is activated using a decorator (or you can wrap component)
@Radium
export class ReaderTools extends React.Component {

  render () {
    const styles = {
      base: {
        width: '30px',
        float: 'right'
      }
    };

    return (
      <div
        className='reader-tools-container'
        style={ styles.base }>
        <ButtonGroup vertical>
          <Button>Font +</Button>
          <Button>Font -</Button>
          <Button>Color</Button>
          <Button>BG</Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default ReaderTools;
