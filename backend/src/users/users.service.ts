import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getStats() {
    const totalUsers = await this.usersRepository.count();

    return {
      totalUsers,
    };
  }

  getUsers() {
    return this.usersRepository.find();
  }

  getUser(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  updateUser(id: number, data: UpdateUserDto) {
    return this.usersRepository.update(id, data);
  }

  deleteUser(id: number) {
    return this.usersRepository.delete(id);
  }
}
