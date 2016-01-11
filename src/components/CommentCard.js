import React from 'react'

export class CommentCard extends React.Component {
  static propTypes = {
    comment: React.PropTypes.string.isRequired,
    username: React.PropTypes.string.isRequired,
    createdAt: React.PropTypes.string.isRequired
  }

  render() {
    return (
        <span><strong>@{this.props.username}: </strong>{this.props.comment}</span>
    )
  }
}

export default CommentCard
