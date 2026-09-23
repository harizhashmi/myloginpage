import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            name: 'Hariz',
            email: 'hariz@example.com',
        },
        {
            id: 2,
            name: 'John',
            email: 'john@example.com',
        },
    ];

    getUsers() {
        return this.users;
    }

    updateUser(
        id: number,
        data: { name?: string; email?: string },
    ) {
        const user = this.users.find((user) => user.id === id);

        if (!user) {
            return undefined;
        }

        if (data.name !== undefined) {
            user.name = data.name;
        }

        if (data.email !== undefined) {
            user.email = data.email;
        }

        return user;
    }

    deleteUser(id: number) {
        const index = this.users.findIndex((user) => user.id === id);

        if (index === -1) {
            return undefined;
        }

        const deletedUser = this.users[index];

        this.users.splice(index, 1);

        return deletedUser;
    }


    getUser(id: number) {
        return this.users.find((user) => user.id === id);
    }

    createUser(user: { name: string; email: string }) {
        const newUser = {
            id: this.users.length + 1,
            ...user,
        };

        this.users.push(newUser);

        return newUser;
    }

}