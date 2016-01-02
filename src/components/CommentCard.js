import React from 'react'
import CardTitle from 'material-ui/lib/card/card-title'
import Paper from 'material-ui/lib/paper'

export class CommentCard extends React.Component {
  static propTypes = {
    comment: React.PropTypes.string.isRequired,
    username: React.PropTypes.string.isRequired,
    createdAt: React.PropTypes.string.isRequired
  }

  render() {
    return (
      <Paper style={{padding: '5'}}>
        <CardTitle title={ this.props.username } subtitle={ this.props.comment } />
      </Paper>
    )
  }
}

export default CommentCard
