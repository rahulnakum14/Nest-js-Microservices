import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto {
  @Field(() => ID)
  readonly id: string;

  @Field({ nullable: true })
  readonly name?: string;

  @Field({ nullable: true })
  readonly email?: string;
}
