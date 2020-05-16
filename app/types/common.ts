import { ObjectType, Field, InputType, Int, ClassType } from 'type-graphql'

@ObjectType({ isAbstract: true })
export abstract class QueryResponse {
  @Field()
  success: Boolean

  @Field()
  message: String
}

@InputType()
export class QueryFilter {
  @Field({ defaultValue: '' })
  search: String

  @Field(_type => Int, { defaultValue: 50 })
  limit: number

  @Field(_type => Int, { defaultValue: 0 })
  offset: number
}

export function FilteredList<TItem> (TItemClass: ClassType<TItem>): any {
  @ObjectType({ isAbstract: true })
  abstract class FilteredListClass {
    @Field(_type => [TItemClass])
    data: TItem[]

    @Field(_type => Int)
    get total (): number {
      return this.data.length
    }
  }

  return FilteredListClass
}

export default (): void => { }
