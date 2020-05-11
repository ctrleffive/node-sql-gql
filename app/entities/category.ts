import { ObjectType, Field, ID } from 'type-graphql'
import { Table, Column, Model } from 'sequelize-typescript'

@Table
@ObjectType({ description: 'The Category model' })
export default class Category extends Model<Category> {
  @Column({ primaryKey: true })
  @Field(() => ID)
  id: string

  @Column
  @Field()
  name: String

  @Column
  @Field()
  description: String
}
