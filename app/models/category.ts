import { ObjectType, Field, ID, InputType } from 'type-graphql'
import { Table, Column, Model } from 'sequelize-typescript'
import { Length } from 'class-validator'

@Table
@ObjectType({ description: 'The Category model' })
export class Category extends Model<Category> {
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
  notes: String
}

@InputType()
export class CategoryInput implements Partial<Category> {
  @Field()
  name: string

  @Field()
  @Length(1, 255)
  description: String
}

export default Category
