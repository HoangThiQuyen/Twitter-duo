import { Router } from 'express'
import { bookmarkTweetController, unbookmarkTweetController } from '~/controllers/bookmarks.controllers'
import { likeTweetController, unlikeTweetController } from '~/controllers/likes.controllers'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const likeRoutes = Router()

/**
 * Description: Like tweet
 * Path: /
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { tweet_id: string }
 */
likeRoutes.post('/', accessTokenValidator, verifiedUserValidator, wrapRequestHandler(likeTweetController))

/**
 * Description: Unlike tweet
 * Path: /tweets/:tweet_id
 * Method: DELETE
 * Header: { Authorization: Bearer <access_token> }
 */
likeRoutes.delete(
  '/tweets/:tweet_id',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(unlikeTweetController)
)

export default likeRoutes
