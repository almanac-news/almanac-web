import React from 'react'
import Radium from 'radium'
import { Button, ButtonGroup } from 'react-bootstrap'

// Radium is activated using a decorator (or you can wrap component)
@Radium
export class ReaderTools extends React.Component {

  render() {
    // const styles = {
    //   base: {
    //   }
    // };

    return (
      <ButtonGroup justified>
        <Button href='#' onClick={() => { console.log('Increase Text Size') } }>Smaller</Button>
        <Button href='#' onClick={() => { console.log('Decrease Text Size') } }>Bigger</Button>
        <Button href='#' onClick={() => { console.log('Show/Hide Box') } }>Show/Hide</Button>
      </ButtonGroup>
    )
  }
}

export default ReaderTools
