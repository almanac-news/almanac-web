import React from 'react'
import { Link } from 'react-router'
import { Panel, Input, ButtonInput } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ActionCreators from 'actions/subscription'

const mapStateToProps = (state) => ({
  routerState: state.routing,
  newsData: state.subscription.categories
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch)
})

export class SubscriptionView extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object
  }

  submitForm(e) {
    e.preventDefault()
    const categories = []
    const email = this.refs.email.value
    Object.keys(this.refs).forEach( key => {
      if (this.refs[key].checked) categories.push(key)
    })
    console.log(categories)
    this.props.actions.subscribe(categories, email)
  }
  render() {
    return (
      <div className='container text-center'>
        <h1>Subscribe to Alerts</h1>
        <hr />
        <form>
          <div className='form-group'>
            <label htmlFor='email'>Email address</label>
            <input type='email' className='form-control' id='email' placeholder='Email' ref='email' required />
          </div>
          <div className='form-group'>
            <div className='checkbox'>
              <label>
                <input type='checkbox' ref='africa' />Africa
              </label>
            </div>
            <div className='checkbox'>
              <label>
                <input type='checkbox' ref='apac' />Asia Pacific
              </label>
            </div>
            <div className='checkbox'>
              <label>
                <input type='checkbox' ref='americas' />Americas
              </label>
            </div>
            <div className='checkbox'>
              <label>
                <input type='checkbox' ref='business' />Business
              </label>
            </div>
            <div className='checkbox'>
              <label>
                <input type='checkbox' ref='europe' />Europe
              </label>
            </div>
            <div className='checkbox'>
              <label>
                <input type='checkbox' ref='politics' />Politics
              </label>
            </div>
            <div className='checkbox'>
              <label>
                <input type='checkbox' ref='national' />National
              </label>
            </div>
            <div className='checkbox'>
              <label>
                <input type='checkbox' ref='science' />Science
              </label>
            </div>
            <div className='checkbox'>
              <label>
                <input type='checkbox' ref='technology' />Technology
              </label>
            </div>
            <div className='checkbox'>
              <label>
                <input type='checkbox' ref='mideast' />Middle East
              </label>
            </div>
            <div className='checkbox'>
              <label>
                <input type='checkbox' ref='health' />Health
              </label>
            </div>
          </div>
          <button type='submit' className='btn btn-default' onClick={ this.submitForm.bind(this) }>
          Submit</button>
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionView)
