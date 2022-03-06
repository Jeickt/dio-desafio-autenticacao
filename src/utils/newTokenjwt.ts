import User from '../models/User'
import JWT from 'jsonwebtoken'
import { SignOptions } from './../../node_modules/@types/jsonwebtoken/index.d'

export default function newTokenjwt(user: User) {
  const JwtPayload = { username: user?.username }
  const secretKey = process.env.KEYJWT || 'c'
  const JwtOptions: SignOptions = { subject: user?.id, expiresIn: '30d' }
  const jwt = JWT.sign(JwtPayload, secretKey, JwtOptions)
  return jwt
}
