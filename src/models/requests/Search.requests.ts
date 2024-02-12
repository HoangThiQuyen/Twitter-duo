import { MediaTypeQuery } from '~/constants/enums'
import { PaginationQuery } from './Tweet.requests'

export interface SearchQuery extends PaginationQuery {
  content: string
  media_type: MediaTypeQuery
}
