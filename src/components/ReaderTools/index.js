import React from 'react';
import Radium from 'radium';
import { Button, ButtonGroup } from 'react-bootstrap';

// Radium is activated using a decorator (or you can wrap component)
@Radium
export class ReaderTools extends React.Component {

  render () {
    // const styles = {
    //   base: {
    //   }
    // };

    return (
      <ButtonGroup justified>
        <Button href='#'>Smaller</Button>
        <Button href='#'>Bigger</Button>
        <Button href='#'>Show/Hide</Button>
      </ButtonGroup>
    );
  }
}

export default ReaderTools;
