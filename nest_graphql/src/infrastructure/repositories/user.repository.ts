import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../application/interfaces/user-repository.interface';
import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { UpdateUserDto } from '../../application/dto/update-user.dto';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(updateUserDto.id, updateUserDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
