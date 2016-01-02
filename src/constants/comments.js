import { createConstants } from '../utils'

export default createConstants(
  'FETCH_COMMENTS_STARTED',
  'FETCH_COMMENTS_COMPLETED',
  'FETCH_COMMENTS_FAILED',
  'POST_COMMENT_STARTED',
  'POST_COMMENT_COMPLETED',
  'POST_COMMENT_FAILED'
)
