import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async register(name: string, email: string, password: string) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = this.usersRepository.create({
        name,
        email,
        password: hashedPassword,
      });

      const savedUser = await this.usersRepository.save(newUser);

      return {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
      };
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      }

      throw error;
    }
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  async login(email: string, password: string) {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return {
      access_token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
