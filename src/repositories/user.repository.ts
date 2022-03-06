import DatabaseError from '../models/errors/DatabaseError'
import db from '../db'
import User from '../models/User'

class userRepository {
  async findAllUsers(): Promise<User[]> {
    const query = `SELECT id, username FROM application_user`
    const { rows } = await db.query<User>(query)
    return rows || []
  }

  async findUserById(id: string): Promise<User> {
    try {
      const query = `SELECT id, username FROM application_user WHERE id = $1`
      const values = [id]
      const { rows } = await db.query<User>(query, values)
      const [user] = rows
      return user || []
    } catch (error) {
      throw new DatabaseError('Erro na consulta por ID', error)
    }
  }

  async findByNameAndPassword(
    username: string,
    password: string
  ): Promise<User> {
    try {
      const query = `SELECT id, username FROM application_user WHERE username = $1 AND password = crypt($2, $3)`
      const values = [username, password, process.env.KEYP]
      const { rows } = await db.query<User>(query, values)
      const [user] = rows
      return user || []
    } catch (error) {
      throw new DatabaseError('Erro na consulta por username e password')
    }
  }

  async createUser(user: User): Promise<string> {
    const query = `INSERT INTO application_user (username, password) VALUES ($1, crypt($2, $3))) RETURNING id`
    const values = [user.username, user.password, process.env.KEYP]
    const { rows } = await db.query<{ id: string }>(query, values)
    const [newUser] = rows
    return newUser.id
  }

  async updateUser(user: User): Promise<void> {
    const query = `UPDATE application_user SET username = $1, password = crypt($2, $3) WHERE id = $4 RETURNING id`
    const values = [user.username, user.password, process.env.KEYP, user.id]
    await db.query(query, values)
  }

  async deleteUserById(id: string): Promise<void> {
    const query = `DELETE FROM application_user WHERE id = $1`
    const values = [id]
    await db.query(query, values)
  }
}

export default new userRepository()
