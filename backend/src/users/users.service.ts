import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  getUsers() {
    return this.usersRepository.find();
  }

  getUser(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  async createUser(user: CreateUserDto) {
    try {
      const newUser = this.usersRepository.create(user);

      return await this.usersRepository.save(newUser);
    } catch (error) {
      throw new ConflictException('Email already exists');
    }
  }

  updateUser(id: number, data: UpdateUserDto) {
    return this.usersRepository.update(id, data);
  }

  deleteUser(id: number) {
    return this.usersRepository.delete(id);
  }
}
