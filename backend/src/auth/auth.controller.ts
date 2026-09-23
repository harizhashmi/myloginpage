import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body()
    user: {
      name: string;
      email: string;
      password: string;
    },
  ) {
    return this.authService.register(user.name, user.email, user.password);
  }
  @Post('login')
  login(
    @Body()
    user: {
      email: string;
      password: string;
    },
  ) {
    return this.authService.login(user.email, user.password);
  }
}
