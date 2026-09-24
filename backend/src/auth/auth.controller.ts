import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto/register.dto';
import { LoginDto } from './dto/login.dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() user: RegisterDto) {
    return this.authService.register(user.name, user.email, user.password);
  }
  @Post('login')
  login(@Body() user: LoginDto) {
    return this.authService.login(user.email, user.password);
  }
}
