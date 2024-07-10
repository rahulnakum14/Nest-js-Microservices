import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../interfaces/user-repository.interface';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id?: string): Promise<User | User[]> {
    if (id) {
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    }
    return this.userRepository.findAll();
  }
}
