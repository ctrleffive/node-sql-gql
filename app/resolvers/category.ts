import { Resolver, Mutation, Arg, Query } from 'type-graphql'

import { Category, CategoryInput } from '../models/category'

@Resolver(_of => Category)
export class CategoryResolver {
  @Query(_returns => Category, { nullable: false })
  async returnSingleCategory (@Arg('id') id: string): Promise<any> {
    return Category.findOne({ where: { id } })
  };

  @Query(() => [Category])
  async returnAllCategory (): Promise<Category[]> {
    return Category.findAll()
  };

  @Mutation(() => Category)
  async createCategory (@Arg('data') data: CategoryInput): Promise<Category> {
    return Category.create(data)
  };

  @Mutation(() => Boolean)
  async deleteCategory (@Arg('id') id: string): Promise<Boolean> {
    await Category.destroy({ where: { id } })
    return true
  }
}
