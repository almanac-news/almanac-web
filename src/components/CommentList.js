import React, { Component } from 'react'
import { CommentCard } from 'components/CommentCard'
import Paper from 'material-ui/lib/paper'

export class CommentList extends Component {
  static propTypes = {
    data: React.PropTypes.array.isRequired
  }

  constructor(props) {
    super(props)
  }

  render() {
    const commentArray = this.props.data || null
    if (!commentArray) {
      return (
        null
      )
    } else {
      return (
        <Paper>
        { commentArray.map((comment) => {
          return (
            // NOTE: unique key moved to wrapper div to add line break
            // FIXME: Look into giving a unique identifier to the key instead of random
            <div className='news-card-wrapper' key={ comment.id }>
            <CommentCard
            comment = { comment.comment }
            createdAt = { comment.created_at }
            username = { comment.username }
            />
            <br/>
            </div>
          )
        }) }
        </Paper>
      )
    }
  }
}

export default CommentList
