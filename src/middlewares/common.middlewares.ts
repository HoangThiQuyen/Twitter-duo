import { NextFunction, Request, Response } from 'express'
import { pick } from 'lodash'

// Lâý hết những key của type được truyền vào gán vào FilterKeys<T>
type FilterKeys<T> = Array<keyof T>

export const filterMiddleware =
  <T>(filterKeys: FilterKeys<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    req.body = pick(req.body, filterKeys)
    next()
  }
