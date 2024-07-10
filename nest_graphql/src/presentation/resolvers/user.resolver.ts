import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { UpdateUserDto } from '../../application/dto/update-user.dto';
import { UserPresenter } from '../presenters/user.presenter';
import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';
import { GetUserUseCase } from '../../application/use-cases/get-user.usecase';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.usecase';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.usecase';
import { User } from '../../domain/entities/user.entity';

@Resolver(() => UserPresenter)
export class UserResolver {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Query(() => [UserPresenter])
  async users(): Promise<UserPresenter[]> {
    const users = (await this.getUserUseCase.execute()) as User[];
    return users.map((user) => new UserPresenter(user));
  }

  @Query(() => UserPresenter, { nullable: true })
  async user(@Args('id') id: string): Promise<UserPresenter> {
    const user = (await this.getUserUseCase.execute(id)) as User;
    return new UserPresenter(user);
  }

  @Mutation(() => UserPresenter)
  async createUser(
    @Args('createUserDto') createUserDto: CreateUserDto,
  ): Promise<UserPresenter> {
    const user = await this.createUserUseCase.execute(createUserDto);
    return new UserPresenter(user);
  }

  @Mutation(() => UserPresenter)
  async updateUser(
    @Args('updateUserDto') updateUserDto: UpdateUserDto,
  ): Promise<UserPresenter> {
    const user = await this.updateUserUseCase.execute(updateUserDto);
    return new UserPresenter(user);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    return this.deleteUserUseCase.execute(id);
  }
}
