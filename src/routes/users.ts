import { Router, Request, Response, NextFunction } from 'express'
import User from '../models/User'
import userRepository from '../repositories/user.repository'
import { StatusCodes } from 'http-status-codes'

const usersRoute = Router()
const mainRoute = '/users'

usersRoute.get(
  mainRoute,
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers()
    res.status(StatusCodes.OK).send(users)
  }
)

usersRoute.get(
  `${mainRoute}/:id`,
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = req.params.id
    try {
      const user = await userRepository.findUserById(id)
      res.status(StatusCodes.OK).send(user)
    } catch (error) {
      next(error)
    }
  }
)

usersRoute.put(
  `${mainRoute}/:id`,
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = req.params.id
    const modifiedUser: User = req.body
    modifiedUser.id = id
    await userRepository.updateUser(modifiedUser)
    res.status(StatusCodes.NO_CONTENT)
  }
)

usersRoute.delete(
  `${mainRoute}/:id`,
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = req.params.id
    await userRepository.deleteUserById(id)
    res.status(StatusCodes.NO_CONTENT)
  }
)

export default usersRoute
