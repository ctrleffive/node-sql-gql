import 'reflect-metadata'
import Express from 'express'
import * as dotenv from 'dotenv'
import { Sequelize } from 'sequelize-typescript'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server-express'

// resolvers
import { ProductResolver } from './resolvers/Product'
import { CategoryResolver } from './resolvers/Category'
import Category from './entities/category'
import Product from './entities/Product'

dotenv.config()

const main = async (): Promise<void> => {
  const schema = await buildSchema({
    resolvers: [CategoryResolver, ProductResolver],
    emitSchemaFile: true,
    validate: false
  })

  // create database connection
  const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    models: [Category, Product]
  })
  await sequelize.sync()

  const server = new ApolloServer({ schema })
  const app = Express()
  server.applyMiddleware({ app: app as any })

  const port: string = process.env.PORT ?? '8000'

  app.listen({ port }, () => {
    const apiPath = `http://localhost:${port}${server.graphqlPath}`
    console.log(`🚀 Server ready and listening at => ${apiPath}`)
  })
}
main().catch((error) => {
  console.log(error, 'error')
})
