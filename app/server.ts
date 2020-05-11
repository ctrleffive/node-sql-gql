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

  // eslint-disable-next-line no-new
  const sequelize = new Sequelize({
    database: 'graphql_test',
    dialect: 'mysql',
    username: 'root',
    password: 'rootroot',
    models: [Category, Product]
  })
  await sequelize.sync()

  const server = new ApolloServer({ schema })
  const app = Express()
  server.applyMiddleware({ app: app as any })

  app.listen({ port: 8000 }, () => {
    const apiPath = `http://localhost:8000${server.graphqlPath}`
    console.log(`🚀 Server ready and listening at => ${apiPath}`)
  })
}
main().catch((error) => {
  console.log(error, 'error')
})
