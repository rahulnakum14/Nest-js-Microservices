import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export interface UserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User>;
  create(createUserDto: CreateUserDto): Promise<User>;
  update(updateUserDto: UpdateUserDto): Promise<User>;
  delete(id: string): Promise<boolean>;
}
