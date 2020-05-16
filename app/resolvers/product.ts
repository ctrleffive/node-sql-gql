import { Resolver, Mutation, Arg, Query, FieldResolver, Root } from 'type-graphql'

import { Product, ProductInput } from '../models/Product'
import { Category } from '../models/category'

@Resolver(_of => Product)
export class ProductResolver {
  @Query(_returns => Product, { nullable: false })
  async returnSingleProduct (@Arg('id') id: string): Promise<any> {
    return await Product.findOne({ where: { id } })
  };

  @Query(() => [Product])
  async returnAllProduct (): Promise<Product[]> {
    return await Product.findAll()
  };

  @Mutation(() => Product)
  async createProduct (@Arg('data') data: ProductInput): Promise<Product> {
    return await Product.create(data)
  };

  @Mutation(() => Boolean)
  async deleteProduct (@Arg('id') id: string): Promise<Boolean> {
    await Product.destroy({ where: { id } })
    return true
  }

  @FieldResolver(_type => (Category))
  async category (@Root() product: Product): Promise<Category> {
    const category: any = await Category.findOne({ where: { id: product.category } })
    return category
  }
}
