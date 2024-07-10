import { User } from '../../domain/entities/user.entity';

export class UserPresenter {
  id: string;
  name: string;
  email: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
}
