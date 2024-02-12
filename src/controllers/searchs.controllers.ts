import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { SEARCH_MESSAGES } from '~/constants/messages'
import { SearchQuery } from '~/models/requests/Search.requests'
import searchService from '~/services/search.services'

export const searchController = async (
  req: Request<ParamsDictionary, any, any, SearchQuery>,
  res: Response,
  next: NextFunction
) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const content = req.query.content
  const { tweets, total } = await searchService.search({
    limit,
    page,
    content,
    media_type: req.query.media_type,
    people_follow: req.query.people_follow,
    user_id: req.decoded_authorization?.user_id as string
  })
  return res.json({
    message: SEARCH_MESSAGES.SEARCH_SUCCESS,
    result: {
      tweets,
      limit,
      page,
      total,
      total_page: Math.ceil(total / limit)
    }
  })
}
