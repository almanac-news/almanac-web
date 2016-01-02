import React from 'react'
import { Link } from 'react-router'
import { Panel, Input, ButtonInput } from 'react-bootstrap'

/* components */
import { Tools } from 'components/Tools/Tools'

export class SubscriptionView extends React.Component {

  submitForm() {
    debugger
  }
  render() {
    return (
      <div className='container text-center'>
        <h1>Subscribe to Alerts</h1>
        <hr />
        <Panel ref='categoryCheckboxes'>
          <div className='form-group'>
            <div className='checkbox'>
              <label>
                <input type='checkbox' ref='category1' />category1
              </label>
            </div>
            <div className='checkbox'>
              <label>
                <input type='checkbox' ref='category2' />category2
              </label>
            </div>
          </div>
        </Panel>
        <ButtonInput type='submit' value='Submit' onClick={ () => this.submitForm() }/>
      </div>
    )
  }
}

export default SubscriptionView
