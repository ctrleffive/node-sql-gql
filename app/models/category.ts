import { ObjectType, Field, Int, InputType } from 'type-graphql'
import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript'

@Table
@ObjectType({ description: 'The Category model' })
export class Category extends Model<Category> {
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
}

@InputType()
export class CategoryInput implements Partial<Category> {
  @Field()
  name: string

  @Field()
  description: String

  @Field()
  notes: Boolean
}

export default Category
