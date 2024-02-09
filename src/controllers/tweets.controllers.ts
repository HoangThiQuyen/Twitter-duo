import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TweetType } from '~/constants/enums'
import { TWEETS_MESSAGES } from '~/constants/messages'
import { GetTweetController, TweetReqBody } from '~/models/requests/Tweet.requests'
import { TokenPayload } from '~/models/requests/User.requests'
import tweetsService from '~/services/tweets.services'

export const createTweetController = async (req: Request<ParamsDictionary, any, TweetReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await tweetsService.createTweet(user_id, req.body)
  return res.json({
    message: TWEETS_MESSAGES.CREATE_TWEET_SUCCESS,
    result
  })
}

export const getTweetController = async (req: Request<GetTweetController>, res: Response) => {
  const result = await tweetsService.increaseView(req.params.tweet_id, req.decoded_authorization?.user_id)
  const tweet = {
    ...req.tweet,
    guest_views: result.guest_views,
    user_views: result.user_views,
    views: result.guest_views + result.user_views
  }
  return res.json({
    message: TWEETS_MESSAGES.GET_TWEET_SUCCESS,
    result: tweet
  })
}

export const getTweetChildrenController = async (req: Request<GetTweetController>, res: Response) => {
  const tweet_type = Number(req.query.tweet_type) as TweetType
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const { total, tweets } = await tweetsService.getTweetChildren({
    tweet_id: req.params.tweet_id,
    tweet_type,
    limit,
    page
  })
  return res.json({
    message: TWEETS_MESSAGES.GET_TWEET_CHILDREN_SUCCESS,
    result: {
      tweets,
      tweet_type,
      limit,
      page,
      total,
      total_page: Math.ceil(total / limit)
    }
  })
}
