import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'create_user' })
  async createUser(data: any): Promise<string> {
    const { username, email, password } = data;

    const newUser = await this.userService.createUser(
      username,
      email,
      password,
    );
    return `Created user with username: ${newUser.username}`;
  }
}
