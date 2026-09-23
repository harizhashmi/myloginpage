import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    @Patch(':id')
    updateUser(
        @Param('id') id: string,
        @Body() user: { name?: string; email?: string },
    ) {
        return this.usersService.updateUser(Number(id), user);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(Number(id));
    }


    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.usersService.getUser(Number(id));
    }

    @Post()
    createUser(@Body() user: { name: string; email: string }) {
        return this.usersService.createUser(user);
    }

}