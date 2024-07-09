import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';
import { userDto } from 'dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({cmd: 'get_user'})
  async getUser():Promise<userDto[]>{    
    return await this.userService.getUser();
  }

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
