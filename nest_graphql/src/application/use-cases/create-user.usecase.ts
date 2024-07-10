import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../interfaces/user-repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserDto);
  }
}
