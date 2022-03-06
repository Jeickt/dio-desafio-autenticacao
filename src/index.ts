import express from 'express'
import usersRoute from './routes/users'
import statusRoute from './routes/status'
import errorHandler from './middlewares/error-handler'
import authorizationRoute from './routes/authorization'
import jwtAuthenticationMiddleware from './middlewares/jwt-authentication'
import userRegister from './routes/userRegister'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(statusRoute)
app.use(userRegister)
app.use(authorizationRoute)

app.use(jwtAuthenticationMiddleware)
app.use(usersRoute)

app.use(errorHandler)

app.listen(3000, () => {
  console.log('Executando aplicação na porta 3000.')
})
