import { Router, Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

const statusRoute = Router()
const mainRoute = '/status'

statusRoute.get(
  mainRoute,
  (req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.OK)
  }
)

export default statusRoute
