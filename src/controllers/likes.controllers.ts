import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TokenPayload, UnlikeTweetParams } from '~/models/requests/User.requests'
import { LIKES_MESSAGES } from '~/constants/messages'
import { LikeTweetReqBody } from '~/models/requests/Like.requests'
import likeService from '~/services/likes.services'

export const likeTweetController = async (req: Request<ParamsDictionary, any, LikeTweetReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await likeService.likeTweet(user_id, req.body.tweet_id)
  return res.json({ message: LIKES_MESSAGES.LIKE_TWEET_SUCCESS, result })
}

export const unlikeTweetController = async (req: Request<UnlikeTweetParams>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  await likeService.unlikeTweet(user_id, req.params.tweet_id)
  return res.json({ message: LIKES_MESSAGES.UNLIKE_TWEET_SUCCESS })
}
