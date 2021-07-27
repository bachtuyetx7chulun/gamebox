import { config } from 'dotenv'
config()

export const jwt = {
  secret: process.env.JWT_SECRET,
  refresh_secret: process.env.JWT_REFRESH_SECRET,
  time: process.env.JWT_TIME,
}

export const bcrypt = {
  hash: process.env.BCRYPT_HASH || '$2b$10$NLaYzoIc.AGA.UOee3JmXe',
}
