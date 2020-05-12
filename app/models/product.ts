import { ObjectType, Field, ID, Int, InputType } from 'type-graphql'
import { Table, Column, Model, ForeignKey } from 'sequelize-typescript'
import Category from './category'
import { Length } from 'class-validator'

@Table
@ObjectType({ description: 'The Product model' })
export class Product extends Model<Product> {
  @Column({ primaryKey: true, autoIncrement: true })
  @Field(() => ID)
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
  @Field(_type => String)
  @ForeignKey(() => Category)
  categoryId: number

  _doc: any
}

@InputType()
export class ProductInput implements Partial<Product> {
  @Field()
  name: String

  @Field()
  @Length(1, 255)
  description: String

  @Field()
  color: String

  @Field()
  stock: number

  @Field()
  price: number

  @Field(() => String)
  categoryId: number
}

export default Product
