export default () => ({
  PORT: parseInt(process.env.HOST_PORT, 10) || 3000,
  DATABASE: {
    HOST: process.env.DB_NAME,
    PORT: parseInt(process.env.DB_PORT, 10) || 5432,
    URL: process.env.DB_URL,
  },
})
