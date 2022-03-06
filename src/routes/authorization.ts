import { Router, Request, Response, NextFunction } from 'express'
import ForbiddenError from '../models/errors/ForbiddenError'
import { StatusCodes } from 'http-status-codes'
import basicAuthenticationMiddleware from '../middlewares/basic-authentication'
import jwtAuthenticationMiddleware from '../middlewares/jwt-authentication'
import newTokenjwt from '../utils/newTokenjwt'

const authorizationRoute = Router()
const mainRoute = '/token'

authorizationRoute.post(
  `${mainRoute}/validate`,
  jwtAuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.OK)
  }
)

authorizationRoute.post(
  mainRoute,
  basicAuthenticationMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user

      if (!user) {
        throw new ForbiddenError('Usuário não informado.')
      }

      const jwt = newTokenjwt(user)
      res.status(StatusCodes.OK).json({ token: jwt })
    } catch (error) {
      next(error)
    }
  }
)

export default authorizationRoute
