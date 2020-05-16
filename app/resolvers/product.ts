import { Resolver, Mutation, Arg, Query, FieldResolver, Root } from 'type-graphql'

import { Product, ProductInput } from '../models/product'
import { Category } from '../models/category'

@Resolver(_of => Product)
export class ProductResolver {
  @Query(_returns => Product)
  async returnSingleProduct (@Arg('id') id: string): Promise<any> {
    return Product.findOne({ where: { id } })
  };

  @Query(() => [Product])
  async returnAllProduct (): Promise<Product[]> {
    return Product.findAll()
  };

  @Mutation(() => Product)
  async createProduct (@Arg('data') data: ProductInput): Promise<Product> {
    return Product.create(data)
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
