import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { userDto } from 'dto/user.dto';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getUser(): Promise<userDto[]> {
    return await this.userModel.find({})
    // const users: User[] = await this.userModel.find({}).exec();
    // // Map User documents to UserDto objects
    // return users.map(user => ({
    //   username: user.username,
    //   email: user.email,
    //   password: user.password,
    //   // Add other fields if needed
    // }));
  }

  async createUser(
    username: string,
    email: string,
    password: string,
  ): Promise<userDto> {
    const newUser = await this.userModel.create({
      username: username,
      email: email,
      password: password,
    });
    await newUser.save();
    return newUser;
  }
}
