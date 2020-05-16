import { ObjectType, Field, Int, InputType } from 'type-graphql'
import { Table, Column, Model, ForeignKey, AutoIncrement, PrimaryKey } from 'sequelize-typescript'

import { Category } from './category'

@Table
@ObjectType({ description: 'The Product model' })
export class Product extends Model<Product> {
  @AutoIncrement
  @PrimaryKey
  @Column
  @Field(() => Int)
  id: number

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
  @Field(_type => Category)
  @ForeignKey(() => Category)
  category: number
}

@InputType()
export class ProductInput implements Partial<Product> {
  @Field()
  name: String

  @Field()
  description: String

  @Field()
  color: String

  @Field()
  stock: number

  @Field()
  price: number

  @Field(() => Int)
  category: number
}

export default Product
