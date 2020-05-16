import 'reflect-metadata'
import Express from 'express'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import { Sequelize } from 'sequelize-typescript'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server-express'

import { context } from './utils/context'
import { auth } from './utils/auth'

dotenv.config()

const main = async (): Promise<void> => {
  console.log('⏳ Server starting..')
  // create database connection
  const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    models: [`${__dirname}/models`],
    logging: false
  })
  await sequelize.sync({ alter: true })

  const schema = await buildSchema({
    resolvers: [`${__dirname}/resolvers/*.{ts,js}`],
    emitSchemaFile: true,
    validate: false
  })

  const server = new ApolloServer({ schema, context })
  const app = Express()

  server.applyMiddleware({ app: app as any })

  app.use(bodyParser.json())
  app.post('/auth', auth)

  const port: string = process.env.PORT ?? '8000'
  app.listen({ port }, () => {
    const apiPath = `http://localhost:${port}${server.graphqlPath}`
    console.log(`🚀 Server ready and listening at => ${apiPath}`)
  })
}
main().catch((error) => {
  console.error(error)
})
