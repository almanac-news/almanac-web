import React from 'react'
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
                <input type='checkbox' ref='Africa' />Africa
              </label>
            </div>
            <div className='checkbox'>
              <label>
                <input type='checkbox' ref='Asia Pacific' />Asia Pacific
              </label>
            </div>
            <div className='checkbox'>
              <label>
                <input type='checkbox' ref='Americas' />Americas
              </label>
            </div>
            <div className='checkbox'>
              <label>
                <input type='checkbox' ref='Business' />Business
              </label>
            </div>
            <div className='checkbox'>
              <label>
                <input type='checkbox' ref='Europe' />Europe
              </label>
            </div>
            <div className='checkbox'>
              <label>
                <input type='checkbox' ref='Politics' />Politics
              </label>
            </div>
            <div className='checkbox'>
              <label>
                <input type='checkbox' ref='National' />National
              </label>
            </div>
            <div className='checkbox'>
              <label>
                <input type='checkbox' ref='Science' />Science
              </label>
            </div>
            <div className='checkbox'>
              <label>
                <input type='checkbox' ref='Technology' />Technology
              </label>
            </div>
            <div className='checkbox'>
              <label>
                <input type='checkbox' ref='Middle East' />Middle East
              </label>
            </div>
            <div className='checkbox'>
              <label>
                <input type='checkbox' ref='Health' />Health
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
