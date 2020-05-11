import { Resolver, Mutation, Arg, Query, FieldResolver, Root } from 'type-graphql'
import Product from '../entities/Product'
import Category from '../entities/category'
import { ProductInput } from './types/product'

@Resolver(_of => Product)
export class ProductResolver {
  @Query(_returns => Product, { nullable: false })
  async returnSingleProduct (@Arg('id') id: string): Promise<any> {
    return Product.findOne({ where: { id } })
  };

  @Query(() => [Product])
  async returnAllProduct (): Promise<Product[]> {
    return Product.findAll()
  };

  @Mutation(() => Product)
  async createProduct (@Arg('data') { name, description, color, stock, price, categoryId }: ProductInput): Promise<Product> {
    return Product.create({
      name,
      description,
      color,
      stock,
      price,
      categoryId
    })
  };

  @Mutation(() => Boolean)
  async deleteProduct (@Arg('id') id: string): Promise<Boolean> {
    await Product.destroy({ where: { id } })
    return true
  }

  @FieldResolver(_type => (Category))
  async category (@Root() product: Product): Promise<Category> {
    const category: any = await Category.findOne({ where: { id: product.categoryId } })
    return category
  }
}
