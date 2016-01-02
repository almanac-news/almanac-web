import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ActionCreators from 'actions/subscription'
import Paper from 'material-ui/lib/paper'

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
    this.props.actions.subscribe(categories, email)
  }

  render() {
    const categories = [
      'Africa',
      'Asia Pacifc',
      'Americas',
      'Business',
      'Europe',
      'Health',
      'Middle East',
      'National',
      'Politics',
      'Science',
      'Technology'
    ]
    return (
      <div className='container text-center'>
        <h1>Subscribe</h1>
        <hr />
        <div className='row'>
          <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6'>
            <Paper style={{padding: '15'}}>
              <form>
                <div className='form-group'>
                  {categories.map((category) => {
                    return (
                      <div className='checkbox'>
                        <label>
                          <input type='checkbox' ref={category} />{category}
                        </label>
                      </div>
                    )
                  })}
                </div>
                <div className='form-group'>
                  <label htmlFor='email'>Email address</label>
                  <input type='email' className='form-control' id='email' placeholder='Email' ref='email' required />
                </div>
                <button type='submit' className='btn btn-default' onClick={ this.submitForm.bind(this) }>
                Submit</button>
              </form>
            </Paper>
          </div>
          <div className='col-xs-12 col-sm-12 col-md-6 col-lg-6' style={{padding: '15'}}>
            <h4>Almanac News Alerts</h4>
            <hr />
            <p>Almanac News is committed to helping you keep track of the latest changes in the economy as it relates to what's happening in the world.
            Easily subscribe to your favorite news categories to keep track of breaking changes as they roll out.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionView)
