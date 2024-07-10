import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../interfaces/user-repository.interface';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.update(updateUserDto);
    if (!user) {
      throw new UserNotFoundException(updateUserDto.id);
    }
    return user;
  }
}
