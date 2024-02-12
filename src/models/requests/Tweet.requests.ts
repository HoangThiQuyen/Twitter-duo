import { TweetAudience, TweetType } from '~/constants/enums'
import { Media } from '../Other'
import { ParamsDictionary, Query } from 'express-serve-static-core'

export interface TweetReqBody {
  type: TweetType
  audience: TweetAudience
  content: string
  parent_id: null | string // chỉ null khi là tweet gốc, không thì là tweet_id cha dạng string
  hashtags: string[] // tên của hashtag dang ['javascript','reactjs']
  mentions: string[] // user_id[]
  medias: Media[]
}

export interface UnbookmarkTweetParams extends ParamsDictionary {
  tweet_id: string
}

export interface UnlikeTweetParams extends ParamsDictionary {
  tweet_id: string
}

export interface GetTweetController extends ParamsDictionary {
  tweet_id: string
}

export interface TweetParams extends ParamsDictionary {
  tweet_id: string
}

export interface TweetQuery extends Query, PaginationQuery {
  tweet_type: string
}

export interface PaginationQuery extends Query {
  limit: string
  page: string
}
