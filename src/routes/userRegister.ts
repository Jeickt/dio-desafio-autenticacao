import { Router, Request, Response, NextFunction } from 'express'
import User from '../models/User'
import userRepository from '../repositories/user.repository'
import { StatusCodes } from 'http-status-codes'

const userRegister = Router()
const mainRoute = '/users'

userRegister.post(
  mainRoute,
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body
    const id = await userRepository.createUser(newUser)
    res.status(StatusCodes.CREATED).send(id)
  }
)

export default userRegister
