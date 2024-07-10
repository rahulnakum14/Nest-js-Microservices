// users.resolver.ts
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UsersService } from './user.service';
import { UserDto, CreateUserInput, UpdateUserInput } from '../dto/users.dto';

@Resolver(() => UserDto)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserDto])
  async users(): Promise<UserDto[]> {
    const users = await this.usersService.findAll();
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
  }

  @Query(() => UserDto, { nullable: true })
  async user(@Args('id', { type: () => ID }) id: string): Promise<UserDto> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  @Mutation(() => UserDto)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserDto> {
    const createdUser = await this.usersService.create(createUserInput);
    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
    };
  }

  @Mutation(() => UserDto)
  async updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<UserDto> {
    const updatedUser = await this.usersService.update(id, updateUserInput);
    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
    };
  }
}
