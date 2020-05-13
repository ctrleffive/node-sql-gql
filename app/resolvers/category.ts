import { Resolver, Mutation, Arg, Query } from 'type-graphql'
import { Category, CategoryInput } from '../models/category'

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
  async createCategory (@Arg('data') data: CategoryInput): Promise<Category> {
    return await Category.create(data)
  };

  @Mutation(() => Boolean)
  async deleteCategory (@Arg('id') id: string): Promise<Boolean> {
    await Category.destroy({ where: { id } })
    return true
  }
}
