import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import type { AuthenticatedRequest } from '../auth/authenticated-request';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('stats')
  getStats() {
    return this.usersService.getStats();
  }

  @Get('me')
  async getMe(@Req() request: AuthenticatedRequest) {
    return this.usersService.getUser(request.user.userId);
  }

  @Patch('me')
  updateUser(
    @Req() request: AuthenticatedRequest,
    @Body() user: UpdateUserDto,
  ) {
    return this.usersService.updateUser(request.user.userId, user);
  }

  @Delete('me')
  deleteUser(@Req() request: AuthenticatedRequest) {
    return this.usersService.deleteUser(request.user.userId);
  }
}
