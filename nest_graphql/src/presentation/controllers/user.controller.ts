import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { UpdateUserDto } from '../../application/dto/update-user.dto';
import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';
import { GetUserUseCase } from '../../application/use-cases/get-user.usecase';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.usecase';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.usecase';
import { User } from '../../domain/entities/user.entity';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Get()
  async findAll(): Promise<User[]> {
    const users = (await this.getUserUseCase.execute()) as User[];
    return users;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = (await this.getUserUseCase.execute(id)) as User;
    return user;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.updateUserUseCase.execute({ id, ...updateUserDto });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return this.deleteUserUseCase.execute(id);
  }
}
