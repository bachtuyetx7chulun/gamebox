import { config } from 'dotenv'
config()

export const jwt = {
  secret: process.env.JWT_SECRET,
  time: process.env.JWT_TIME,
}
