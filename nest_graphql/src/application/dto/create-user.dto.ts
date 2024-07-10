import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  readonly name: string;

  @Field()
  readonly email: string;
}
