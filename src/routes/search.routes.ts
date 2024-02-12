import { Router } from 'express'
import { searchController } from '~/controllers/searchs.controllers'
import { searchValidator } from '~/middlewares/search.middlewares'
import { paginationValidator } from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, isUserLoggedInValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'

const searchRouter = Router()

/**
 * Description: Search Advance
 * Path: /
 * Method: GET
 * Header: { Authorization?: Bearer <access_token> }
 * Query:{ content: string }
 */
searchRouter.get(
  '/',
  isUserLoggedInValidator(accessTokenValidator),
  isUserLoggedInValidator(verifiedUserValidator),
  paginationValidator,
  searchValidator,
  searchController
)

export default searchRouter
