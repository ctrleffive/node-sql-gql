import { ObjectType, Field, ID, Int } from 'type-graphql'
import { Table, Column, Model, ForeignKey } from 'sequelize-typescript'
import Category from './category'

@Table
@ObjectType({ description: 'The Product model' })
export default class Product extends Model<Product> {
  @Column({ primaryKey: true })
  @Field(() => ID)
  id: String

  @Column
  @Field()
  name: String

  @Column
  @Field()
  description: String

  @Column
  @Field()
  color: String

  @Column
  @Field(_type => Int)
  stock: number

  @Column
  @Field(_type => Int)
  price: number

  @Column
  @Field(_type => String)
  @ForeignKey(() => Category)
  categoryId: number

  _doc: any
}
