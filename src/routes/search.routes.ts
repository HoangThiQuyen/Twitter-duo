import { Router } from 'express'
import { searchController } from '~/controllers/searchs.controllers'
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
  searchController
)

export default searchRouter
