import { Request, Response } from 'express'
import usersService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterRequestBody } from '~/models/requests/User.requests'

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'quyen@gmail.com' && password === '123456') {
    return res.json({ message: 'Login success' })
  }
  return res.status(400).json({
    error: 'Login failed'
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterRequestBody>, res: Response) => {
  const result = await usersService.register(req.body)
  res.json({
    message: 'Register success',
    result
  })
}
