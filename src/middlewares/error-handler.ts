import { StatusCodes } from 'http-status-codes'
import DatabaseError from '../models/errors/DatabaseError'
import { Request, Response, NextFunction } from 'express'
import ForbiddenError from '../models/errors/ForbiddenError'

function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof DatabaseError) {
    res.status(StatusCodes.BAD_REQUEST)
  } else if (error instanceof ForbiddenError) {
    res.status(StatusCodes.FORBIDDEN)
  }
  res.status(StatusCodes.INTERNAL_SERVER_ERROR)
}

export default errorHandler
