import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  async register(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return {
      name,
      email,
      password: hashedPassword,
    };
  }
}
