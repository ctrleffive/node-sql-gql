import { InputType, ObjectType, Field } from 'type-graphql'

@InputType()
@ObjectType('NameInput')
export class Name {
  @Field()
  first: String

  @Field()
  last: String
}

// export enum PaymentType {
//   MONTHLY,
//   ANNUALLY
// }

// registerEnumType(PaymentType, { name: 'PaymentType' })

export default (): void => { }
