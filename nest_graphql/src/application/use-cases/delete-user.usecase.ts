import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../interfaces/user-repository.interface';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<boolean> {
    const deleted = await this.userRepository.delete(id);
    if (!deleted) {
      throw new UserNotFoundException(id);
    }
    return deleted;
  }
}
