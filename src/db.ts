import { Pool } from 'pg'

const connectionString = `postgres://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DB}`
const db = new Pool({ connectionString })

export default db
