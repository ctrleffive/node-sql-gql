import { Resolver, Mutation, Arg, Query } from 'type-graphql'
import { CategoryInput } from './types/category'
import Category from '../entities/category'

@Resolver()
export class CategoryResolver {
  @Query(_returns => Category, { nullable: false })
  async returnSingleCategory (@Arg('id') id: string): Promise<any> {
    return await Category.findOne({ where: { id } })
  };

  @Query(() => [Category])
  async returnAllCategory (): Promise<Category[]> {
    return await Category.findAll()
  };

  @Mutation(() => Category)
  async createCategory (@Arg('data') { name, description }: CategoryInput): Promise<Category> {
    return await Category.create({ name, description })
  };

  @Mutation(() => Boolean)
  async deleteCategory (@Arg('id') id: string): Promise<Boolean> {
    await Category.destroy({ where: { id } })
    return true
  }
}
