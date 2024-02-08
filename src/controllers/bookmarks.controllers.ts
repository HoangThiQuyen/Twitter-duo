import { Request, Response } from 'express'
import { BookmarkTweetReqBody } from '~/models/requests/Bookmark.requests'
import { ParamsDictionary } from 'express-serve-static-core'
import { TokenPayload, UnbookmarkTweetParams } from '~/models/requests/User.requests'
import bookmarkService from '~/services/bookmarks.services'
import { BOOKMARKS_MESSAGES } from '~/constants/messages'

export const bookmarkTweetController = async (
  req: Request<ParamsDictionary, any, BookmarkTweetReqBody>,
  res: Response
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await bookmarkService.bookmarkTweet(user_id, req.body.tweet_id)
  return res.json({ message: BOOKMARKS_MESSAGES.BOOKMARK_TWEET_SUCCESS, result })
}

export const unbookmarkTweetController = async (req: Request<UnbookmarkTweetParams>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  await bookmarkService.unbookmarkTweet(user_id, req.params.tweet_id)
  return res.json({ message: BOOKMARKS_MESSAGES.UNBOOKMARK_TWEET_SUCCESS })
}
