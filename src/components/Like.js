import React from 'react'

export class LikeComponent extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object,
    articleId: React.PropTypes.string,
    likeStatus: React.PropTypes.number
  }

  static contextTypes = {
    actions: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { likeStatus } = this.props
    function buttonClass() {
      if (likeStatus === 1) {
        return 'btn btn-large'
      } else {
        return 'btn btn-large disabled'
      }
    }

    return (
      <div>
        <button type='button'
                onClick={ () => { this.context.actions.toggleLike(this.props.articleId, this.props.likeStatus)} }
                className={ buttonClass.bind(this)() }
                ref='heartButton'
                aria-label='Left Align'>
          <span
            style={{ color: 'red' }}
            className='glyphicon glyphicon-heart'
            aria-hidden='true'>
          </span>
        </button>
        <span style={{ padding: '10' }}>
          { likeStatus }
        </span>
      </div>
    )
  }
}

export default LikeComponent
